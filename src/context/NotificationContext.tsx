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
          top: 100px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }
        .notification-item {
          pointer-events: auto;
          min-width: 300px;
          max-width: 400px;
          background: var(--card-bg);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .notification-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: currentColor;
          width: 100%;
          animation: progress 3s linear forwards;
          opacity: 0.3;
        }
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }

        .notification-item.success { color: #10b981; border-left: 4px solid #10b981; }
        .notification-item.error { color: #ef4444; border-left: 4px solid #ef4444; }
        .notification-item.info { color: var(--primary); border-left: 4px solid var(--primary); }

        .notification-icon { flex-shrink: 0; }
        .notification-message { flex: 1; font-weight: 500; font-size: 0.95rem; color: var(--text-main); }
        .notification-close { background: none; color: var(--text-muted); cursor: pointer; padding: 4px; border-radius: 4px; transition: var(--transition); }
        .notification-close:hover { background: var(--surface); color: var(--text-main); }

        @media (max-width: 640px) {
          .notification-container { top: auto; bottom: 20px; right: 20px; left: 20px; }
          .notification-item { min-width: 0; width: 100%; }
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
