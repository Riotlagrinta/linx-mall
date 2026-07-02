'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Heart, Users, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';

export default function EngagementsPage() {
  const commitments = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Offres vérifiées",
      desc: "Chaque abonnement présent dans notre catalogue est sélectionné pour sa fiabilité et sa clarté."
    },
    {
      icon: <Users size={32} />,
      title: "Soutien local",
      desc: "Nous gardons une équipe locale pour accompagner les clients et simplifier chaque activation."
    },
    {
      icon: <Leaf size={32} />,
      title: "Éco-responsabilité",
      desc: "Un modèle digital limite les déplacements inutiles et réduit les opérations physiques."
    },
    {
      icon: <Heart size={32} />,
      title: "Satisfaction Client",
      desc: "Votre confiance est notre priorité. Si un abonnement pose problème, notre politique de support reste simple et transparente."
    }
  ];

  return (
    <div className="engagements-page">
      <header className="engagements-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="badge">Nos Valeurs</span>
            <h1>Nos engagements pour le <span className="highlight">Togo</span>.</h1>
            <p>Chez Charlee Store, nous ne nous contentons pas de vendre. Nous bâtissons une expérience digitale durable, claire et utile.</p>
          </motion.div>
        </div>
      </header>

      <section className="commitments-grid-section py-20">
        <div className="container">
          <div className="commitments-grid">
            {commitments.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="commitment-card"
              >
                <div className="icon-box">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="transparency-section py-20 bg-surface">
        <div className="container">
          <div className="transparency-content">
            <div className="text">
              <h2>Transparence totale</h2>
              <p>Nous croyons qu&apos;une boutique digitale solide repose sur la confiance. C&apos;est pourquoi nous appliquons des règles strictes :</p>
              <ul className="rules-list">
                <li><CheckCircle size={18} /> Aucun frais caché lors du paiement.</li>
                <li><CheckCircle size={18} /> Protection intégrale de vos données personnelles.</li>
                <li><CheckCircle size={18} /> Assistance après confirmation de la commande.</li>
              </ul>
            </div>
            <div className="visual">
              <div className="trust-seal">
                <Award size={64} />
                <span>100% Confiance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partnership-cta py-20">
        <div className="container">
          <div className="cta-box">
            <h2>Vous partagez nos valeurs ?</h2>
            <p>Rejoignez un mouvement qui transforme positivement l&apos;accès au digital au Togo.</p>
            <div className="btns">
              <Link href="/vendeur" className="btn btn-primary btn-lg">Devenir Partenaire</Link>
              <Link href="/about" className="btn btn-outline btn-lg">Découvrir notre équipe</Link>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .engagements-page { background: var(--background); }
        
        .engagements-hero { padding: 8rem 0 6rem; background: var(--hero-gradient); text-align: center; border-bottom: 1px solid var(--border); }
        .engagements-hero .badge { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.5rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; margin-bottom: 1.5rem; display: inline-block; }
        .engagements-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.5rem; }
        .engagements-hero .highlight { color: var(--primary); }
        .engagements-hero p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .commitments-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .commitment-card { background: var(--card-bg); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--border); transition: var(--transition); }
        .commitment-card:hover { border-color: var(--primary); transform: translateY(-5px); }
        .icon-box { width: 64px; height: 64px; background: var(--surface); color: var(--primary); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .commitment-card h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        .commitment-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }

        .transparency-content { display: flex; flex-direction: column; gap: 3rem; }
        .transparency-content h2 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.5rem; }
        .rules-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .rules-list li { display: flex; align-items: center; gap: 0.75rem; font-weight: 600; color: var(--text-main); font-size: 0.95rem; }
        .rules-list li svg { color: #10b981; }

        .visual { display: flex; justify-content: center; }
        .trust-seal { width: 180px; height: 180px; background: var(--card-bg); border-radius: 50%; border: 4px double var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; color: var(--primary); font-weight: 800; text-transform: uppercase; font-size: 0.7rem; box-shadow: var(--shadow-lg); }

        .cta-box { background: var(--surface); color: var(--text-main); padding: 4rem 2rem; border-radius: 32px; text-align: center; border: 1px solid var(--border); }
        .cta-box h2 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); }
        .cta-box p { color: var(--text-muted); margin-bottom: 2.5rem; }
        .btns { display: flex; flex-direction: column; gap: 1rem; }
        .btns .btn-primary { background: var(--primary); color: white; }
        .btns .btn-outline { border-color: var(--primary); color: var(--primary); }
        .btns .btn-outline:hover { background: var(--primary); color: white; }

        @media (min-width: 768px) {
          .engagements-hero h1 { font-size: 4rem; }
          .commitments-grid { grid-template-columns: repeat(2, 1fr); }
          .btns { flex-direction: row; justify-content: center; }
        }

        @media (min-width: 1024px) {
          .commitments-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
          .transparency-content { flex-direction: row; align-items: center; justify-content: space-between; }
          .transparency-content .text { flex: 1; }
          .transparency-content .visual { flex: 1; }
        }
      ` }} />
    </div>
  );
}
