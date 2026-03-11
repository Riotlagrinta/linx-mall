'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, Zap, Store, BarChart3, HelpCircle, Image as ImageIcon, Camera } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  image?: string;
}

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Bonjour ! Je suis votre Copilote Linx Mall. Envoyez-moi une photo de votre produit, et je rédigerai pour vous une description attractive et professionnelle !" }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;
    
    const newUserMessage: Message = { 
      role: 'user', 
      content: input || (selectedImage ? "Analyse cette photo pour moi." : ""),
      image: selectedImage || undefined
    };

    setMessages([...messages, newUserMessage]);
    setInput('');
    setSelectedImage(null);
    
    // Simulation réponse IA Vision
    setTimeout(() => {
      const aiResponse: Message = { 
        role: 'assistant', 
        content: newUserMessage.image 
          ? "Magnifique produit ! D'après l'image, voici une proposition de description : 'Ce smartphone élégant arbore un design ultra-fin avec une finition premium. Son écran borderless promet une immersion totale...' Souhaitez-vous ajuster le ton ?" 
          : "C'est noté ! Je prépare cela pour vous." 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`ai-fab ${isOpen ? 'hidden' : ''}`}
      >
        <div className="ai-fab-gradient"></div>
        <Sparkles size={24} className="sparkle-icon" />
        <span className="ai-label">Copilote IA</span>
      </motion.button>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            className="ai-panel"
          >
            <div className="ai-header">
              <div className="ai-title">
                <div className="ai-avatar">
                  <Bot size={20} />
                </div>
                <div>
                  <h3>Copilote Vision</h3>
                  <span className="status-online">IA Vision Active</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="ai-close">
                <X size={20} />
              </button>
            </div>

            <div className="ai-messages">
              {messages.map((m, i) => (
                <div key={i} className={`msg-wrapper ${m.role}`}>
                  <div className="msg-avatar">
                    {m.role === 'assistant' ? <Sparkles size={16} /> : <User size={16} />}
                  </div>
                  <div className="msg-content-wrapper">
                    {m.image && (
                      <div className="msg-image">
                        <img src={m.image} alt="Produit envoyé" />
                      </div>
                    )}
                    <div className="msg-bubble">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-footer">
              <AnimatePresence>
                {selectedImage && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="image-preview-bar"
                  >
                    <div className="preview-thumb">
                      <img src={selectedImage} alt="Preview" />
                      <button className="remove-img" onClick={() => setSelectedImage(null)}>
                        <X size={12} />
                      </button>
                    </div>
                    <span className="preview-label">Image prête pour analyse</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="ai-input-area">
                <button 
                  className="ai-attach-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  hidden 
                  accept="image/*" 
                  onChange={handleImageSelect}
                />
                <input 
                  type="text" 
                  placeholder={selectedImage ? "Ajoutez une instruction..." : "Décris cet article..."} 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className={`ai-send-btn ${(input || selectedImage) ? 'active' : ''}`}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .ai-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          height: 56px;
          padding: 0 1.5rem;
          border-radius: 28px;
          background: #0f172a;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
          z-index: 9000;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .ai-fab-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 50%, #d946ef 100%);
          opacity: 0.8;
          z-index: -1;
        }
        .ai-label { font-weight: 800; font-size: 0.95rem; }
        .sparkle-icon { animation: rotate 4s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .ai-panel {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 400px;
          height: 600px;
          max-height: calc(100vh - 60px);
          background: var(--card-bg);
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          z-index: 9001;
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .ai-header { padding: 1.5rem; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .ai-title { display: flex; align-items: center; gap: 1rem; }
        .ai-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #8b5cf6); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .ai-title h3 { font-size: 1rem; font-weight: 800; color: var(--text-main); }
        .status-online { font-size: 0.7rem; color: #10b981; font-weight: 700; text-transform: uppercase; }
        .ai-close { background: none; border: none; color: var(--text-muted); cursor: pointer; }

        .ai-messages { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; background: var(--background); }
        .msg-wrapper { display: flex; gap: 0.75rem; max-width: 85%; }
        .msg-wrapper.user { align-self: flex-end; flex-direction: row-reverse; }
        .msg-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--text-muted); flex-shrink: 0; }
        .user .msg-avatar { background: var(--primary); color: white; }
        
        .msg-content-wrapper { display: flex; flex-direction: column; gap: 0.5rem; }
        .msg-image { border-radius: 16px; overflow: hidden; border: 1px solid var(--border); max-width: 200px; }
        .msg-image img { width: 100%; display: block; }
        
        .msg-bubble { padding: 1rem; border-radius: 20px; font-size: 0.95rem; line-height: 1.5; background: var(--surface); color: var(--text-main); }
        .assistant .msg-bubble { border-top-left-radius: 4px; }
        .user .msg-bubble { background: var(--primary); color: white; border-top-right-radius: 4px; }

        .ai-footer { padding: 1.25rem; background: var(--surface); border-top: 1px solid var(--border); }
        
        .image-preview-bar { display: flex; align-items: center; gap: 1rem; padding-bottom: 1rem; }
        .preview-thumb { position: relative; width: 50px; height: 50px; border-radius: 10px; overflow: hidden; border: 2px solid var(--primary); }
        .preview-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .remove-img { position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.5); color: white; border-radius: 50%; border: none; cursor: pointer; padding: 2px; }
        .preview-label { font-size: 0.8rem; font-weight: 700; color: var(--primary); }

        .ai-input-area { display: flex; gap: 0.5rem; background: var(--card-bg); padding: 0.4rem; border-radius: 16px; border: 1px solid var(--border); align-items: center; }
        .ai-attach-btn { width: 40px; height: 40px; color: var(--text-muted); border: none; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: var(--transition); }
        .ai-attach-btn:hover { background: var(--surface); color: var(--primary); }
        
        .ai-input-area input { flex: 1; border: none; background: none; outline: none; padding: 0.5rem; font-family: inherit; color: var(--text-main); font-size: 0.95rem; }
        .ai-send-btn { width: 40px; height: 40px; background: var(--surface); color: var(--text-muted); border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; cursor: not-allowed; transition: var(--transition); }
        .ai-send-btn.active { background: var(--primary); color: white; cursor: pointer; }

        @media (max-width: 768px) {
          .ai-panel { inset: 0; width: 100%; height: 100%; max-height: none; border-radius: 0; bottom: 0; right: 0; }
          .ai-fab { bottom: 20px; right: 20px; }
        }
      ` }} />
    </>
  );
}
