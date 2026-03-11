'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>Contactez-nous</h1>
            <p>Une question ? Un partenariat ? Notre équipe vous répond en moins de 2h.</p>
          </motion.div>
        </div>
      </header>

      <section className="contact-content py-20">
        <div className="container">
          <div className="contact-grid">
            {/* Info Side */}
            <div className="contact-info">
              <div className="info-card">
                <h2>Informations de contact</h2>
                <p className="mb-8">N'hésitez pas à nous joindre via l'un de ces canaux ou à remplir le formulaire.</p>
                
                <div className="info-list">
                  <div className="info-item">
                    <div className="icon-box"><Phone size={20} /></div>
                    <div>
                      <span>Téléphone / WhatsApp</span>
                      <strong>+228 90 00 00 00</strong>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="icon-box"><Mail size={20} /></div>
                    <div>
                      <span>Email</span>
                      <strong>contact@linxmall.tg</strong>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="icon-box"><MapPin size={20} /></div>
                    <div>
                      <span>Siège Social</span>
                      <strong>Lomé, Quartier Hedzranawoé</strong>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="icon-box"><Clock size={20} /></div>
                    <div>
                      <span>Heures d'ouverture</span>
                      <strong>Lun - Sam: 08h - 20h</strong>
                    </div>
                  </div>
                </div>

                <div className="social-cta mt-12">
                  <a href="https://wa.me/22890000000" className="whatsapp-btn">
                    <MessageCircle size={20} /> Discuter sur WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="contact-form-container">
              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="sent-success"
                >
                  <div className="success-icon"><CheckCircle2 size={48} /></div>
                  <h3>Message envoyé !</h3>
                  <p>Merci de nous avoir contactés. Nous reviendrons vers vous très rapidement.</p>
                  <button onClick={() => setIsSent(false)} className="btn btn-outline mt-6">Envoyer un autre message</button>
                </motion.div>
              ) : (
                <div className="form-card">
                  <h3>Envoyez-nous un message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nom complet</label>
                        <input type="text" placeholder="Votre nom" required />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="votre@email.com" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Sujet</label>
                      <select required>
                        <option value="">Sélectionnez un sujet</option>
                        <option value="support">Support Client</option>
                        <option value="vendeur">Devenir Vendeur</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea rows={5} placeholder="Comment pouvons-nous vous aider ?" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : <><Send size={18} /> Envoyer le message</>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-page { background: var(--background); }
        
        .contact-hero { padding: 6rem 0 4rem; background: var(--hero-gradient); text-align: center; border-bottom: 1px solid var(--border); }
        .contact-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        .contact-hero p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        
        .info-card { background: var(--surface); padding: 2.5rem; border-radius: 32px; border: 1px solid var(--border); }
        .info-card h2 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        .info-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .info-item { display: flex; align-items: center; gap: 1.25rem; }
        .info-item .icon-box { width: 48px; height: 48px; background: rgba(37, 99, 235, 0.1); color: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .info-item span { display: block; font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .info-item strong { font-size: 1rem; color: var(--text-main); }

        .whatsapp-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; background: #25d366; color: white; padding: 1rem; border-radius: 16px; font-weight: 700; text-decoration: none; transition: var(--transition); }
        .whatsapp-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(37, 211, 102, 0.2); }

        .form-card { background: var(--card-bg); padding: 2.5rem; border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        .form-card h3 { font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 2rem; }
        
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .form-group label { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
        .form-group input, .form-group select, .form-group textarea { padding: 0.8rem 1.25rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; outline: none; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--primary); }
        
        .btn-submit { width: 100%; height: 56px; border-radius: 16px; font-size: 1.1rem; font-weight: 800; }

        .sent-success { text-align: center; background: var(--card-bg); padding: 4rem 2rem; border-radius: 32px; border: 1px solid var(--border); }
        .success-icon { width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .sent-success h3 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        .sent-success p { color: var(--text-muted); }

        @media (min-width: 1024px) {
          .contact-hero h1 { font-size: 4rem; }
          .contact-grid { grid-template-columns: 450px 1fr; gap: 4rem; }
          .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
      ` }} />
    </div>
  );
}
