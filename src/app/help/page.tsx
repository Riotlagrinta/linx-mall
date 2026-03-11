'use client';

import { motion } from 'framer-motion';
import { Search, HelpCircle, Truck, CreditCard, RefreshCcw, ShieldCheck, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const categories = [
    { icon: <Truck size={24} />, title: "Livraison", desc: "Suivi, délais et frais de port" },
    { icon: <CreditCard size={24} />, title: "Paiements", desc: "T-Money, Flooz et Cash" },
    { icon: <RefreshCcw size={24} />, title: "Retours", desc: "Politique de remboursement" },
    { icon: <ShieldCheck size={24} />, title: "Sécurité", desc: "Protection de vos données" },
  ];

  const faqs = [
    { q: "Comment suivre ma commande ?", a: "Vous pouvez suivre votre commande en temps réel via la page 'Suivi de commande' munie de votre numéro LX-XXXX." },
    { q: "Quels sont les délais de livraison ?", a: "À Lomé, nous livrons en moins de 24h. Pour l'intérieur du pays, comptez 48h à 72h." },
    { q: "Puis-je payer à la livraison ?", a: "Oui, nous acceptons le paiement en espèces lors de la remise du colis pour vous garantir une totale confiance." },
  ];

  return (
    <div className="help-page">
      <header className="help-hero">
        <div className="container">
          <h1>Comment pouvons-nous vous aider ?</h1>
          <div className="help-search">
            <Search size={20} />
            <input type="text" placeholder="Rechercher une solution..." />
          </div>
        </div>
      </header>

      <section className="help-categories py-12">
        <div className="container">
          <div className="help-grid">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="help-card"
              >
                <div className="help-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <ArrowRight size={16} className="arrow" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section py-12 bg-surface">
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-support py-16">
        <div className="container">
          <div className="support-banner">
            <div className="support-text">
              <h2>Vous ne trouvez pas de réponse ?</h2>
              <p>Notre équipe est disponible 7j/7 pour vous accompagner.</p>
            </div>
            <div className="support-actions">
              <a href="https://wa.me/22890000000" className="support-btn whatsapp">
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a href="tel:+22890000000" className="support-btn call">
                <Phone size={20} /> Appeler
              </a>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .help-page { background: var(--background); min-height: 100vh; }
        
        .help-hero { background: var(--hero-gradient); padding: 5rem 0; text-align: center; border-bottom: 1px solid var(--border); }
        .help-hero h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 2rem; padding: 0 1rem; }
        .help-search { max-width: 500px; margin: 0 auto; background: var(--card-bg); border-radius: 16px; padding: 0.75rem 1.5rem; display: flex; align-items: center; gap: 1rem; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        .help-search input { flex: 1; border: none; background: none; outline: none; font-size: 1rem; color: var(--text-main); }

        .help-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .help-card { background: var(--card-bg); padding: 2rem; border-radius: 24px; border: 1px solid var(--border); position: relative; cursor: pointer; }
        .help-icon { color: var(--primary); margin-bottom: 1rem; }
        .help-card h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); }
        .help-card p { font-size: 0.9rem; color: var(--text-muted); }
        .help-card .arrow { position: absolute; bottom: 2rem; right: 2rem; color: var(--border); }

        .section-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 2rem; text-align: center; }
        .faq-list { display: flex; flex-direction: column; gap: 1.5rem; max-width: 700px; margin: 0 auto; }
        .faq-item { background: var(--card-bg); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border); }
        .faq-item h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main); }
        .faq-item p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }

        .support-banner { background: var(--text-main); color: white; padding: 3rem 2rem; border-radius: 32px; text-align: center; }
        .support-text h2 { font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; }
        .support-text p { opacity: 0.8; margin-bottom: 2rem; }
        .support-actions { display: flex; flex-direction: column; gap: 1rem; }
        .support-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 1rem; border-radius: 14px; font-weight: 700; text-decoration: none; transition: var(--transition); }
        .support-btn.whatsapp { background: #25d366; color: white; }
        .support-btn.call { background: var(--primary); color: white; }

        @media (min-width: 768px) {
          .help-hero h1 { font-size: 3rem; }
          .help-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .support-actions { flex-direction: row; justify-content: center; }
          .support-btn { width: 200px; }
        }

        @media (min-width: 1024px) {
          .help-grid { grid-template-columns: repeat(4, 1fr); }
        }
      ` }} />
    </div>
  );
}
