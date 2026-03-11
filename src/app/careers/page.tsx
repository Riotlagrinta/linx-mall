'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Users, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const perks = [
    { icon: <Zap size={24} />, title: "Impact Réel", desc: "Travaillez sur des projets qui digitalisent l'économie togolaise." },
    { icon: <Users size={24} />, title: "Culture Collaborative", desc: "Rejoignez une équipe jeune, passionnée et soudée." },
    { icon: <Globe size={24} />, title: "Flexibilité", desc: "Nous valorisons les résultats plus que les heures de bureau." },
    { icon: <Heart size={24} />, title: "Bien-être", desc: "Un environnement sain pour exprimer votre plein potentiel." },
  ];

  const jobs = [
    { title: "Développeur Fullstack Next.js", type: "CDI", location: "Lomé / Hybride", category: "Tech" },
    { title: "Responsable Marketing Digital", type: "CDI", location: "Lomé", category: "Marketing" },
    { title: "Chargé de Relation Client", type: "CDD", location: "Lomé", category: "Support" },
  ];

  return (
    <div className="careers-page">
      <header className="careers-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge">Rejoignez l'aventure</span>
            <h1>Construisons ensemble le futur de la Tech au <span className="highlight">Togo</span>.</h1>
            <p>Chez Linx Mall (Kelvix), nous cherchons des esprits créatifs et audacieux pour transformer le commerce africain.</p>
            <a href="#open-positions" className="btn btn-primary btn-lg mt-8">Voir les postes ouverts</a>
          </motion.div>
        </div>
      </header>

      <section className="perks-section py-20 bg-surface">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h2>Pourquoi nous rejoindre ?</h2>
            <p>Plus qu'un travail, une mission passionnante au service du pays.</p>
          </div>
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <div key={i} className="perk-card">
                <div className="perk-icon">{perk.icon}</div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="open-positions" className="jobs-section py-20">
        <div className="container">
          <div className="section-header mb-12">
            <h2>Postes ouverts</h2>
            <p>Trouvez le rôle qui vous correspond le mieux.</p>
          </div>
          <div className="jobs-list">
            {jobs.map((job, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="job-card"
              >
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span><Briefcase size={14} /> {job.type}</span>
                    <span><MapPin size={14} /> {job.location}</span>
                    <span className="job-cat">{job.category}</span>
                  </div>
                </div>
                <button className="apply-btn">Postuler <ArrowRight size={16} /></button>
              </motion.div>
            ))}
          </div>
          
          <div className="spontaneous-apply mt-16">
            <div className="apply-card">
              <h3>Candidature spontanée ?</h3>
              <p>Vous avez un talent particulier qui n'est pas listé ici ? Écrivez-nous !</p>
              <a href="mailto:careers@kelvix.tg" className="btn btn-outline">Envoyer mon CV</a>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .careers-page { background: var(--background); }
        
        .careers-hero { padding: 8rem 0 6rem; background: var(--hero-gradient); text-align: center; border-bottom: 1px solid var(--border); }
        .careers-hero .badge { background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 0.5rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; margin-bottom: 1.5rem; display: inline-block; }
        .careers-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.5rem; line-height: 1.1; }
        .careers-hero .highlight { color: var(--primary); }
        .careers-hero p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .perks-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .perk-card { background: var(--card-bg); padding: 2rem; border-radius: 24px; border: 1px solid var(--border); text-align: center; }
        .perk-icon { color: var(--primary); margin-bottom: 1.25rem; display: flex; justify-content: center; }
        .perk-card h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); }
        .perk-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }

        .jobs-list { display: flex; flex-direction: column; gap: 1rem; }
        .job-card { background: var(--card-bg); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 1.5rem; }
        .job-info h3 { font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.75rem; }
        .job-meta { display: flex; flex-wrap: wrap; gap: 1rem; }
        .job-meta span { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        .job-cat { background: var(--surface); padding: 2px 10px; border-radius: 6px; color: var(--primary) !important; }
        
        .apply-btn { background: var(--surface); color: var(--text-main); font-weight: 700; border: 1px solid var(--border); padding: 0.75rem 1.5rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: var(--transition); }
        .apply-btn:hover { background: var(--primary); color: white; border-color: var(--primary); }

        .apply-card { background: var(--text-main); color: white; padding: 3rem 2rem; border-radius: 32px; text-align: center; }
        .apply-card h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; }
        .apply-card p { opacity: 0.8; margin-bottom: 2rem; }
        .apply-card .btn-outline { border-color: white; color: white; }
        .apply-card .btn-outline:hover { background: var(--text-main); color: white; }

        @media (min-width: 768px) {
          .careers-hero h1 { font-size: 4rem; }
          .perks-grid { grid-template-columns: repeat(2, 1fr); }
          .job-card { flex-direction: row; align-items: center; justify-content: space-between; padding: 2rem; }
        }

        @media (min-width: 1024px) {
          .perks-grid { grid-template-columns: repeat(4, 1fr); }
        }
      ` }} />
    </div>
  );
}
