'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, Zap, MessageSquare, Store, BarChart3, HelpCircle } from 'lucide-react';

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setNotifications] = useState([
    { role: 'assistant', content: "Bonjour ! Je suis votre Copilote Linx Mall. Je peux vous aider à configurer votre boutique, rédiger vos fiches produits ou répondre à vos questions sur la plateforme. Que faisons-nous aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const quickActions = [
    { label: "Créer ma boutique", icon: <Store size={16} /> },
    { label: "Générer une description", icon: <Zap size={16} /> },
    { label: "Analyser mes prix", icon: <BarChart3 size={16} /> },
    { label: "Aide vendeur", icon: <HelpCircle size={16} /> },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    // @ts-ignore
    setNotifications([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulation réponse IA
    setTimeout(() => {
      // @ts-ignore
      setNotifications(prev => [...prev, { role: 'assistant', content: "C'est noté ! Je prépare cela pour vous. (L'intégration réelle de l'IA arrive bientôt...)" }]);
    }, 1000);
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
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3>Copilote Linx Mall</h3>
                  <span className="status-online">En ligne</span>
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
                    {m.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="msg-bubble">
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-footer">
              <div className="quick-actions-row">
                {quickActions.map((action, i) => (
                  <button key={i} className="action-chip" onClick={() => setInput(action.label)}>
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
              <div className="ai-input-area">
                <input 
                  type="text" 
                  placeholder="Posez votre question..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="ai-send-btn">
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

        .ai-messages { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; background: var(--background); }
        .msg-wrapper { display: flex; gap: 0.75rem; max-width: 85%; }
        .msg-wrapper.user { align-self: flex-end; flex-direction: row-reverse; }
        .msg-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--text-muted); flex-shrink: 0; }
        .user .msg-avatar { background: var(--primary); color: white; }
        .msg-bubble { padding: 1rem; border-radius: 20px; font-size: 0.95rem; line-height: 1.5; background: var(--surface); color: var(--text-main); }
        .assistant .msg-bubble { border-top-left-radius: 4px; }
        .user .msg-bubble { background: var(--primary); color: white; border-top-right-radius: 4px; }

        .ai-footer { padding: 1.5rem; background: var(--surface); border-top: 1px solid var(--border); }
        .quick-actions-row { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 1rem; scrollbar-width: none; }
        .quick-actions-row::-webkit-scrollbar { display: none; }
        .action-chip { flex-shrink: 0; display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; font-size: 0.85rem; font-weight: 600; color: var(--text-main); cursor: pointer; transition: var(--transition); }
        .action-chip:hover { border-color: var(--primary); color: var(--primary); }

        .ai-input-area { display: flex; gap: 0.75rem; background: var(--card-bg); padding: 0.5rem; border-radius: 16px; border: 1px solid var(--border); }
        .ai-input-area input { flex: 1; border: none; background: none; outline: none; padding: 0.5rem; font-family: inherit; color: var(--text-main); }
        .ai-send-btn { width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        @media (max-width: 768px) {
          .ai-panel { inset: 0; width: 100%; height: 100%; max-height: none; border-radius: 0; bottom: 0; right: 0; }
          .ai-fab { bottom: 20px; right: 20px; }
        }
      ` }} />
    </>
  );
}
