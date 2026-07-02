'use client';

import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck, Rocket, Store, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: "Clients", value: "3k+", icon: <Users size={20} /> },
    { label: "Services", value: "7+", icon: <Store size={20} /> },
    { label: "Activations", value: "24h", icon: <MapPin size={20} /> },
    { label: "Satisfaction", value: "98%", icon: <Sparkles size={20} /> },
  ];

  const values = [
      {
        icon: <Target size={32} />,
        title: "Notre mission",
        desc: "Rendre les abonnements numériques internationaux accessibles au Togo, sans carte bancaire et sans friction."
      },
      {
        icon: <ShieldCheck size={32} />,
        title: "Fiabilité garantie",
        desc: "Chaque commande est suivie, validée et accompagnée par une équipe locale disponible pour aider."
      },
      {
        icon: <Rocket size={32} />,
        title: "Activation rapide",
        desc: "Nous livrons des accès digitaux simples à utiliser, avec une expérience pensée pour mobile."
      }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <span className="badge">Notre histoire</span>
            <h1>Les abonnements digitaux, <span className="highlight">pensés pour vous</span>.</h1>
            <p>Charlee Store est votre point d&apos;accès aux abonnements premium au Togo. Nous rendons l&apos;achat simple, rapide et compatible avec T-Money ou Flooz.</p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section py-20">
        <div className="container">
          <div className="vision-grid">
            <div className="vision-text">
              <h2>Pourquoi Charlee Store ?</h2>
              <p>
                <strong>Charlee Store</strong> est une boutique numérique pensée pour simplifier l&apos;accès aux services premium: streaming, stockage cloud et divertissement.
              </p>
              <p>
                Notre catalogue est sélectionné pour rester clair, utile et rapide à parcourir, avec des abonnements fiables et des images produit dédiées.
              </p>
              <div className="stats-row">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-box">
                    <div className="stat-icon">{stat.icon}</div>
                    <span className="stat-val">{stat.value}</span>
                    <span className="stat-lab">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="vision-image">
              <div className="image-stack">
                <div className="img-main"></div>
                <div className="img-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="values-section py-20">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h2>Nos Valeurs Fondamentales</h2>
            <p>Ce qui nous anime au quotidien pour vous servir.</p>
          </div>
          <div className="values-grid">
            {values.map((val, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="value-card"
              >
                <div className="val-icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta py-20">
        <div className="container">
          <div className="cta-card">
            <h2>Prête à vous faire belle ?</h2>
            <p>Découvrez notre collection et trouvez la pièce qui vous ressemble. Livraison partout au Togo.</p>
            <div className="cta-btns">
              <Link href="/search" className="btn btn-primary btn-lg">Voir la collection</Link>
              <Link href="/contact" className="btn btn-outline btn-lg">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .about-page { background: var(--background); overflow-x: hidden; }
        
        .about-hero { padding: 6rem 0 4rem; background: var(--hero-gradient); text-align: center; border-bottom: 1px solid var(--border); }
        .about-hero .badge { background: rgba(139, 34, 82, 0.08); color: var(--primary); padding: 0.5rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; margin-bottom: 1.5rem; display: inline-block; }
        .about-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -1px; }
        .about-hero .highlight { color: var(--primary); }
        .about-hero p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .vision-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; }
        .vision-text h2 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.5rem; }
        .vision-text p { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem; }
        
        .stats-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2.5rem; }
        .stat-box { background: var(--card-bg); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); text-align: center; }
        .stat-icon { color: var(--primary); margin-bottom: 0.75rem; display: flex; justify-content: center; }
        .stat-val { display: block; font-size: 1.5rem; font-weight: 800; color: var(--text-main); }
        .stat-lab { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

        .vision-image { display: none; }

        .values-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .value-card { background: var(--card-bg); padding: 2.5rem 2rem; border-radius: 24px; border: 1px solid var(--border); text-align: center; }
        .val-icon { width: 64px; height: 64px; background: var(--surface); color: var(--primary); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .value-card h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        .value-card p { color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; }

        .cta-card { background: var(--text-main); padding: 4rem 2rem; border-radius: 32px; text-align: center; color: var(--background); border: 1px solid var(--border); }
        .cta-card h2 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--background); }
        .cta-card p { opacity: 0.9; font-size: 1.1rem; margin-bottom: 2.5rem; max-width: 500px; margin-left: auto; margin-right: auto; color: var(--background); }
        .cta-btns { display: flex; flex-direction: column; gap: 1rem; }
        .cta-btns .btn-primary { background: var(--background); color: var(--text-main); }
        .cta-btns .btn-outline { border-color: var(--background); color: var(--background); }
        .cta-btns .btn-outline:hover { background: var(--background); color: var(--text-main); }

        @media (min-width: 768px) {
          .about-hero h1 { font-size: 4rem; }
          .stats-row { grid-template-columns: repeat(4, 1fr); }
          .cta-btns { flex-direction: row; justify-content: center; }
          .values-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 1024px) {
          .vision-grid { grid-template-columns: 1.2fr 1fr; align-items: center; }
          .vision-image { display: block; position: relative; }
          .image-stack { position: relative; height: 450px; }
          .img-main { position: absolute; top: 0; right: 0; width: 80%; height: 80%; background: var(--surface); border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
          .img-accent { position: absolute; bottom: 0; left: 0; width: 60%; height: 60%; background: var(--primary); border-radius: 32px; opacity: 0.1; }
        }
      ` }} />
    </div>
  );
}
