import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Welcome to Luxury Dental. I am your AI Assistant. How can I help you achieve your perfect smile today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Bubble */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[100] w-16 h-16 rounded-full bg-gold text-black flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-32 left-8 z-[100] w-[380px] h-[550px] rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-widest uppercase">Dental Assistant</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'ai' 
                      ? 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none' 
                      : 'bg-gold text-black font-medium rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-gold rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-xs focus:border-gold outline-none transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center mt-4 text-[8px] uppercase tracking-[0.2em] text-white/20">
                Powered by Gemini <Sparkles className="w-2 h-2 inline-block ml-1" />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
