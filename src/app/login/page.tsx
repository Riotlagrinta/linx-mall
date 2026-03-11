'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion future
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
            <h1>Bon retour !</h1>
            <p>Connectez-vous pour gérer vos commandes et vos favoris.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Mot de passe</label>
                <Link href="#" className="forgot-link">Oublié ?</Link>
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
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

            <button type="submit" className="btn btn-primary btn-submit">
              Se connecter <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>Ou continuer avec</span>
          </div>

          <div className="social-auth">
            <button className="social-btn">
              <Chrome size={20} />
              <span>Google</span>
            </button>
            <button className="social-btn">
              <Github size={20} />
              <span>GitHub</span>
            </button>
          </div>

          <p className="auth-footer">
            Pas encore de compte ? <Link href="/register">Inscrivez-vous</Link>
          </p>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--surface); padding: 1.5rem; }
        .auth-container { width: 100%; max-width: 450px; }
        
        .auth-card { background: var(--card-bg); padding: 2.5rem 2rem; border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        
        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-logo { display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; margin-bottom: 1.5rem; }
        .auth-logo span { font-size: 1.5rem; font-weight: 800; color: var(--text-main); letter-spacing: -1px; }
        .auth-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-muted); font-size: 0.95rem; }

        .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .label-row { display: flex; justify-content: space-between; align-items: center; }
        .forgot-link { font-size: 0.85rem; font-weight: 700; color: var(--primary); text-decoration: none; }
        
        .form-group label { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-wrapper input { width: 100%; padding: 0.85rem 1rem 0.85rem 3rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; outline: none; }
        .input-wrapper input:focus { border-color: var(--primary); }
        .eye-btn { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; }

        .btn-submit { width: 100%; height: 56px; border-radius: 16px; font-size: 1.1rem; font-weight: 800; margin-top: 1rem; }

        .auth-divider { display: flex; align-items: center; margin: 2rem 0; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; }
        .auth-divider::before, .auth-divider::after { content: ""; flex: 1; height: 1px; background: var(--border); }
        .auth-divider span { padding: 0 1rem; }

        .social-auth { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .social-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.85rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-weight: 700; cursor: pointer; transition: var(--transition); }
        .social-btn:hover { background: var(--border); }

        .auth-footer { text-align: center; margin-top: 2rem; font-size: 0.95rem; color: var(--text-muted); }
        .auth-footer a { color: var(--primary); font-weight: 700; text-decoration: none; }

        @media (max-width: 480px) {
          .auth-card { padding: 2rem 1.5rem; }
        }
      ` }} />
    </div>
  );
}
