'use client';

import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="Changer de thème"
    >
      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
      
      <style dangerouslySetInnerHTML={{ __html: `
        .theme-toggle-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-main);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .theme-toggle-btn:hover {
          background: var(--border);
          transform: translateY(-2px);
        }
      ` }} />
    </motion.button>
  );
}
