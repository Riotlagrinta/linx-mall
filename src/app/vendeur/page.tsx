'use client';

import { motion } from 'framer-motion';
import { Store, TrendingUp, ShieldCheck, Zap, ArrowRight, BarChart3, Package, Users } from 'lucide-react';
import Link from 'next/link';

export default function SellerLandingPage() {
  const benefits = [
    {
      icon: <TrendingUp size={32} />,
      title: "Boostez vos ventes",
      description: "Touchez des milliers de clients partout au Togo, 24h/24 et 7j/7."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Paiements sécurisés",
      description: "Recevez vos fonds via T-Money ou Flooz dès que la commande est validée."
    },
    {
      icon: <Zap size={32} />,
      title: "Gestion simplifiée",
      description: "Un tableau de bord intuitif pour gérer vos stocks et vos commandes."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Statistiques détaillées",
      description: "Suivez l'évolution de votre chiffre d'affaires en temps réel."
    }
  ];

  return (
    <div className="seller-landing">
      {/* Hero Section */}
      <section className="seller-hero">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-text"
          >
            <h1>Vendez plus, vendez mieux avec <span className="highlight">Linx Mall</span></h1>
            <p>La marketplace N°1 au Togo pour digitaliser votre commerce et atteindre de nouveaux sommets.</p>
            <div className="hero-actions">
              <Link href="/vendeur/inscription" className="btn btn-primary btn-lg">
                Ouvrir ma boutique gratuite <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="btn btn-outline btn-lg">Comment ça marche ?</a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-preview"
          >
            <div className="dashboard-mockup">
              <div className="mockup-header">
                <div className="dots"><span></span><span></span><span></span></div>
                <div className="url">vendeur.linxmall.tg/dashboard</div>
              </div>
              <div className="mockup-body">
                <div className="sidebar"></div>
                <div className="content">
                  <div className="stats-row">
                    <div className="stat-box"></div>
                    <div className="stat-box"></div>
                    <div className="stat-box"></div>
                  </div>
                  <div className="chart-box"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits container py-20">
        <div className="section-header text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Linx Mall ?</h2>
          <p className="text-muted max-w-2xl mx-auto">Nous fournissons les outils technologiques, vous fournissez les produits. Ensemble, révolutionnons le commerce au Togo.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="benefit-card"
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="steps-section py-20">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h2 className="text-3xl font-bold">Lancez-vous en 3 étapes</h2>
          </div>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <Store size={40} className="mb-4 text-primary" />
              <h3>Créez votre boutique</h3>
              <p>Remplissez le formulaire d'inscription avec vos infos professionnelles.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <Package size={40} className="mb-4 text-primary" />
              <h3>Ajoutez vos produits</h3>
              <p>Importez vos photos, fixez vos prix et gérez vos stocks facilement.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <Users size={40} className="mb-4 text-primary" />
              <h3>Vendez et encaissez</h3>
              <p>Recevez des commandes et soyez payé directement par Mobile Money.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta container py-20">
        <div className="cta-card">
          <h2>Prêt à booster votre business ?</h2>
          <p>Rejoignez la communauté des marchands Linx Mall aujourd'hui.</p>
          <Link href="/vendeur/inscription" className="btn btn-white btn-lg">
            Commencer maintenant
          </Link>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .seller-landing { overflow-x: hidden; }
        
        .seller-hero {
          background: var(--hero-gradient);
          padding: 8rem 0;
          position: relative;
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          align-items: center;
          gap: 4rem;
        }
        .hero-text h1 { font-size: 3.5rem; line-height: 1.1; font-weight: 800; margin-bottom: 1.5rem; }
        .hero-text .highlight { color: var(--primary); }
        .hero-text p { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 2.5rem; }
        .hero-actions { display: flex; gap: 1rem; }

        .dashboard-mockup {
          background: var(--card-bg);
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
          overflow: hidden;
        }
        .mockup-header {
          padding: 0.75rem 1.25rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .dots { display: flex; gap: 6px; }
        .dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
        .url { font-size: 0.75rem; color: var(--text-muted); background: var(--card-bg); padding: 4px 12px; border-radius: 99px; border: 1px solid var(--border); flex: 1; text-align: center; }
        
        .mockup-body { display: grid; grid-template-columns: 60px 1fr; height: 350px; }
        .sidebar { background: var(--surface); border-right: 1px solid var(--border); }
        .content { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .stat-box { height: 60px; background: var(--surface); border-radius: 8px; }
        .chart-box { flex: 1; background: var(--surface); border-radius: 12px; }

        .benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .benefit-card { background: var(--card-bg); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--border); transition: var(--transition); }
        .benefit-card:hover { border-color: var(--primary); box-shadow: var(--shadow); }
        .benefit-icon { color: var(--primary); margin-bottom: 1.5rem; }
        .benefit-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
        .benefit-card p { color: var(--text-muted); line-height: 1.6; }

        .steps-section { background: var(--surface); }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; position: relative; }
        .step-item { text-align: center; position: relative; z-index: 2; }
        .step-number { width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 1.5rem; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3); }
        .step-item h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; }
        .step-item p { color: var(--text-muted); }

        .cta-card { background: var(--primary); color: white; border-radius: 32px; padding: 5rem 2rem; text-align: center; }
        .cta-card h2 { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; }
        .cta-card p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2.5rem; }
        .btn-white { background: white; color: var(--primary); }
        .btn-white:hover { background: #f8fafc; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

        @media (max-width: 1024px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-actions { justify-content: center; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      ` }} />
    </div>
  );
}
