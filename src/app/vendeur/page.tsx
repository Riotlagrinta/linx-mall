'use client';

import { motion } from 'framer-motion';
import { Store, TrendingUp, ShieldCheck, Zap, ArrowRight, BarChart3, Package, Users, Check, Sparkles } from 'lucide-react';
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

  const plans = [
    {
      name: "Standard",
      price: "Gratuit",
      description: "Idéal pour débuter votre activité en ligne.",
      features: [
        "Jusqu'à 15 produits",
        "Tableau de bord basique",
        "Support par email",
        "Paiements Mobile Money"
      ],
      button: "Commencer gratuitement",
      link: "/vendeur/inscription",
      active: true
    },
    {
      name: "Premium",
      price: "Bientôt disponible",
      description: "Pour les professionnels qui veulent dominer le marché.",
      features: [
        "Produits illimités",
        "Statistiques avancées",
        "Badge 'Vendeur Certifié'",
        "Visibilité Prioritaire",
        "Support dédié 24/7"
      ],
      button: "Me notifier au lancement",
      link: "#",
      active: false,
      featured: true
    }
  ];

  return (
    <div className="seller-landing">
      {/* Hero Section */}
      <section className="seller-hero">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-text"
          >
            <div className="badge-promo animate-fade">
              <Sparkles size={14} /> Partenaire de votre croissance
            </div>
            <h1>Vendez plus, vendez mieux avec <span className="highlight">Linx Mall</span></h1>
            <p>La marketplace de référence au Togo pour digitaliser votre commerce et atteindre de nouveaux clients en un clic.</p>
            <div className="hero-actions">
              <Link href="/vendeur/inscription" className="btn btn-primary btn-lg">
                Ouvrir ma boutique <ArrowRight size={20} />
              </Link>
              <a href="#plans" className="btn btn-outline btn-lg">Voir nos forfaits</a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-visual"
          >
            <div className="dashboard-preview-card">
              <div className="preview-header">
                <div className="preview-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="preview-body">
                <div className="preview-stats">
                  <div className="p-stat"></div>
                  <div className="p-stat"></div>
                </div>
                <div className="p-chart"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits-section py-24">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Pourquoi choisir Linx Mall ?</h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">Nous fournissons les meilleurs outils technologiques du marché pour faire décoller votre business.</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="benefit-card"
              >
                <div className="benefit-icon-wrapper">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="pricing-section py-24">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Tarifs simples et transparents</h2>
            <p className="text-muted text-lg">Pas de frais cachés. Choisissez l'offre qui vous convient.</p>
          </div>
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`plan-card ${plan.featured ? 'featured' : ''} ${!plan.active ? 'is-coming-soon' : ''}`}
              >
                {plan.featured && <div className="plan-tag">Le plus populaire</div>}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">{plan.price}</div>
                  <p>{plan.description}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex}><Check size={18} className="check-icon" /> {feature}</li>
                  ))}
                </ul>
                <Link 
                  href={plan.link} 
                  className={`btn w-full btn-lg ${plan.featured ? 'btn-primary' : 'btn-outline'} ${!plan.active ? 'disabled' : ''}`}
                >
                  {plan.button}
                </Link>
                {!plan.active && <div className="coming-soon-label">Arrive bientôt</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .seller-landing { background: var(--background); }
        
        .seller-hero { padding: 10rem 0 6rem; background: var(--hero-gradient); }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 5rem; }
        
        .badge-promo { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 0.6rem 1.25rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; margin-bottom: 2rem; }
        .hero-text h1 { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -1.5px; color: var(--text-main); }
        .hero-text .highlight { color: var(--primary); }
        .hero-text p { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 3rem; line-height: 1.6; }
        .hero-actions { display: flex; gap: 1.5rem; }

        .dashboard-preview-card { background: var(--card-bg); border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); overflow: hidden; height: 400px; }
        .preview-header { height: 40px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 1.5rem; }
        .preview-dots { display: flex; gap: 6px; }
        .preview-dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
        .preview-body { padding: 2rem; }
        .preview-stats { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .p-stat { height: 60px; flex: 1; background: var(--surface); border-radius: 12px; }
        .p-chart { height: 180px; background: var(--surface); border-radius: 16px; width: 100%; }

        .benefit-card { background: var(--card-bg); padding: 3rem 2rem; border-radius: 32px; border: 1px solid var(--border); transition: var(--transition); text-align: center; }
        .benefit-card:hover { border-color: var(--primary); box-shadow: var(--shadow-lg); }
        .benefit-icon-wrapper { width: 70px; height: 70px; background: var(--surface); color: var(--primary); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; transition: var(--transition); }
        .benefit-card:hover .benefit-icon-wrapper { background: var(--primary); color: white; transform: rotate(10deg); }
        .benefit-card h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); }
        .benefit-card p { color: var(--text-muted); line-height: 1.6; font-size: 1.05rem; }

        .plans-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; max-width: 1000px; margin: 0 auto; }
        .plan-card { background: var(--card-bg); padding: 4rem 3rem; border-radius: 40px; border: 1px solid var(--border); position: relative; transition: var(--transition); display: flex; flex-direction: column; }
        .plan-card.featured { border: 2px solid var(--primary); box-shadow: 0 30px 60px rgba(37, 99, 235, 0.15); transform: translateY(-10px); }
        .plan-tag { position: absolute; top: 20px; right: 30px; background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; }
        .plan-header h3 { font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); }
        .plan-price { font-size: 3rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; letter-spacing: -1px; }
        .plan-header p { color: var(--text-muted); margin-bottom: 3rem; font-size: 1.1rem; }
        .plan-features { list-style: none; margin-bottom: 4rem; flex: 1; }
        .plan-features li { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; font-weight: 600; color: var(--text-main); }
        .check-icon { color: #10b981; flex-shrink: 0; }
        .plan-card.featured .check-icon { color: var(--primary); }

        .is-coming-soon { opacity: 0.8; }
        .coming-soon-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); backdrop-filter: blur(2px); border-radius: 40px; font-size: 1.5rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; transform: rotate(-10deg); pointer-events: none; z-index: 20; }
        [data-theme="dark"] .coming-soon-label { background: rgba(0,0,0,0.2); }

        .btn-coming-soon { background: var(--border); color: var(--text-muted); cursor: not-allowed; }

        @media (max-width: 1024px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-actions { justify-content: center; }
          .hero-text h1 { font-size: 3rem; }
          .hero-visual { display: none; }
          .plans-grid { grid-template-columns: 1fr; }
          .plan-card.featured { transform: translateY(0); }
        }
      ` }} />
    </div>
  );
}
