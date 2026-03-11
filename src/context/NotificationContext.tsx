'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="notification-container">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`notification-item ${n.type}`}
            >
              <div className="notification-icon">
                {n.type === 'success' && <CheckCircle size={20} />}
                {n.type === 'error' && <AlertCircle size={20} />}
                {n.type === 'info' && <Info size={20} />}
              </div>
              <p className="notification-message">{n.message}</p>
              <button className="notification-close" onClick={() => removeNotification(n.id)}>
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }
        .notification-item {
          pointer-events: auto;
          min-width: 320px;
          max-width: 420px;
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        
        .notification-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: currentColor;
          width: 100%;
          animation: progress 3s linear forwards;
          opacity: 0.2;
        }
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }

        .notification-item.success { border-left: 6px solid #10b981; }
        .notification-item.error { border-left: 6px solid #ef4444; }
        .notification-item.info { border-left: 6px solid var(--primary); }

        .notification-icon { 
          width: 40px; 
          height: 40px; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-shrink: 0;
        }
        .success .notification-icon { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .error .notification-icon { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .info .notification-icon { background: rgba(37, 99, 235, 0.1); color: var(--primary); }

        .notification-message { flex: 1; font-weight: 700; font-size: 0.9rem; color: var(--text-main); line-height: 1.4; }
        .notification-close { background: var(--surface); color: var(--text-muted); cursor: pointer; padding: 6px; border-radius: 10px; display: flex; transition: var(--transition); border: 1px solid var(--border); }
        .notification-close:hover { background: var(--border); color: var(--text-main); }

        @media (max-width: 640px) {
          .notification-container { top: auto; bottom: 30px; right: 15px; left: 15px; }
          .notification-item { min-width: 0; width: 100%; border-radius: 24px; padding: 1rem; }
        }
      `}} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
