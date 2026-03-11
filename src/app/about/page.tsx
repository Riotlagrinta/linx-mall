'use client';

import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck, Rocket, ArrowRight, Store, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { label: "Vendeurs", value: "500+", icon: <Store size={20} /> },
    { label: "Clients", value: "10k+", icon: <Users size={20} /> },
    { label: "Villes", value: "15+", icon: <MapPin size={20} /> },
    { label: "Satisfaction", value: "98%", icon: <Sparkles size={20} /> },
  ];

  const values = [
    {
      icon: <Target size={32} />,
      title: "Notre Mission",
      desc: "Digitaliser le commerce de proximité au Togo en offrant une plateforme moderne et accessible à tous les entrepreneurs."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Confiance & Sécurité",
      desc: "Garantir des transactions sûres via T-Money et Flooz pour protéger acheteurs et vendeurs."
    },
    {
      icon: <Rocket size={32} />,
      title: "Innovation Continue",
      desc: "Utiliser les meilleures technologies pour offrir une expérience d'achat fluide et ultra-rapide sur mobile."
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
            <span className="badge">L'histoire de Linx Mall</span>
            <h1>Le futur du commerce au <span className="highlight">Togo</span> commence ici.</h1>
            <p>Plus qu'une simple marketplace, Linx Mall est l'écosystème qui connecte les talents locaux aux consommateurs de tout le pays.</p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section py-20">
        <div className="container">
          <div className="vision-grid">
            <div className="vision-text">
              <h2>Pourquoi Linx Mall ?</h2>
              <p>
                Dans un monde qui se digitalise, nous avons remarqué que de nombreux commerçants talentueux au Togo manquaient d'outils pour toucher une audience nationale. 
                <strong> Linx Mall</strong> a été créé par l'agence <strong>Kelvix</strong> pour combler ce fossé.
              </p>
              <p>
                Notre plateforme permet à n'importe quel boutique, de Lomé à Cinkassé, de posséder une vitrine digitale professionnelle en moins de 5 minutes.
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
            <h2>Prêt à rejoindre l'aventure ?</h2>
            <p>Que vous soyez acheteur ou vendeur, il y a une place pour vous dans notre communauté.</p>
            <div className="cta-btns">
              <Link href="/vendeur" className="btn btn-primary btn-lg">Ouvrir ma boutique</Link>
              <Link href="/search" className="btn btn-outline btn-lg">Commencer mes achats</Link>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .about-page { background: var(--background); overflow-x: hidden; }
        
        .about-hero { padding: 6rem 0 4rem; background: var(--hero-gradient); text-align: center; border-bottom: 1px solid var(--border); }
        .about-hero .badge { background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 0.5rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; margin-bottom: 1.5rem; display: inline-block; }
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

        .cta-card { background: linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%); padding: 4rem 2rem; border-radius: 32px; text-align: center; color: white; }
        .cta-card h2 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
        .cta-card p { opacity: 0.9; font-size: 1.1rem; margin-bottom: 2.5rem; max-width: 500px; margin-left: auto; margin-right: auto; }
        .cta-btns { display: flex; flex-direction: column; gap: 1rem; }
        .cta-btns .btn-outline { border-color: white; color: white; }
        .cta-btns .btn-outline:hover { background: white; color: var(--primary); }

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
