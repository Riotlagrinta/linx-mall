'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription future
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card"
        >
          <div className="auth-header">
            <Link href="/" className="auth-logo">
              <Image src="/images/logo.png.jpeg" alt="Linx Mall" width={48} height={48} />
              <span>Linx Mall</span>
            </Link>
            <h1>Créer un compte</h1>
            <p>Rejoignez la plus grande marketplace du Togo.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Nom complet</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Ex: Koffi Amélédji" 
                  required 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  required 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input 
                  type="tel" 
                  placeholder="90 00 00 00" 
                  required 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <p className="terms-text">
              En vous inscrivant, vous acceptez nos <Link href="/engagements">Conditions d'utilisation</Link>.
            </p>

            <button type="submit" className="btn btn-primary btn-submit">
              Créer mon compte <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">
            Déjà un compte ? <Link href="/login">Connectez-vous</Link>
          </p>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--surface); padding: 1.5rem; }
        .auth-container { width: 100%; max-width: 450px; }
        
        .auth-card { background: var(--card-bg); padding: 2.5rem 2rem; border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        
        .auth-header { text-align: center; margin-bottom: 2rem; }
        .auth-logo { display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; margin-bottom: 1rem; }
        .auth-logo span { font-size: 1.5rem; font-weight: 800; color: var(--text-main); letter-spacing: -1px; }
        .auth-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-muted); font-size: 0.95rem; }

        .auth-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--text-main); }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-wrapper input { width: 100%; padding: 0.85rem 1rem 0.85rem 3rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; outline: none; }
        .input-wrapper input:focus { border-color: var(--primary); }
        .eye-btn { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; }

        .terms-text { font-size: 0.8rem; color: var(--text-muted); text-align: center; margin: 0.5rem 0; }
        .terms-text a { color: var(--primary); font-weight: 600; }

        .btn-submit { width: 100%; height: 56px; border-radius: 16px; font-size: 1.1rem; font-weight: 800; margin-top: 1rem; }

        .auth-footer { text-align: center; margin-top: 2rem; font-size: 0.95rem; color: var(--text-muted); }
        .auth-footer a { color: var(--primary); font-weight: 700; text-decoration: none; }

        @media (max-width: 480px) {
          .auth-card { padding: 2rem 1.5rem; }
        }
      ` }} />
    </div>
  );
}
