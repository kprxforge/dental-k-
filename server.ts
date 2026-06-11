import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

// Gemini Setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post('/api/ai/smile-simulator', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'Image is required' });

    // Use Gemini Vision to "simulate" a smile or describe potential improvements
    // For a real simulation, we'd use a generative model to modify the image
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Good for image editing tasks
      contents: {
        parts: [
          { inlineData: { data: image.split(',')[1], mimeType: 'image/png' } },
          { text: 'Analyze this patients smile. Generate a new image showing their smile after a professional dental makeover with perfect alignment and whitening. Maintain their facial features but improve the dental aesthetic significantly. Return ONLY the new image.' }
        ]
      }
    });

    let generatedImage = null;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        generatedImage = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    if (!generatedImage) {
      // Fallback: Just return a description or a mock if generation fails
      return res.status(500).json({ error: 'Failed to generate smile preview' });
    }

    res.json({ result: generatedImage });
  } catch (error: any) {
    console.error('Smile Simulator Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ai/assistant', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are a professional Dental Assistant for 'Luxury Dental Clinic'. Help patients with their queries about tooth pain, treatments, and appointments. Be polite, premium, and professional. If a patient mentions pain, suggest booking an appointment immediately. Treatments offered: Dental Implants, Root Canal, Whitening, Orthodontics, Smile Makeover.",
      },
    });

    // In a real implementation, we'd map history to the correct format
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
