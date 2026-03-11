'use client';

import { motion } from 'framer-motion';
import { Store, TrendingUp, ShieldCheck, Zap, ArrowRight, BarChart3, Package, Users, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AICopilot from '@/components/AICopilot';

export default function VendeurPage() {
  const benefits = [
    {
      icon: <Store size={32} />,
      title: "Vitrine 100% digitale",
      description: "Votre boutique accessible partout au Togo, 24h/24, sans frais de loyer physique."
    },
    {
      icon: <Users size={32} />,
      title: "Audience qualifiée",
      description: "Profitez de notre trafic pour attirer des clients qui recherchent activement vos produits."
    },
    {
      icon: <Zap size={32} />,
      title: "Ventes instantanées",
      description: "Recevez vos paiements via T-Money ou Flooz dès que la commande est confirmée."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Confiance client",
      description: "Bénéficiez de la notoriété de Linx Mall pour rassurer vos acheteurs et fidéliser votre clientèle."
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
      price: "9 900 FCFA",
      description: "Pour les professionnels qui veulent dominer le marché.",
      features: [
        "Produits illimités",
        "Statistiques avancées",
        "Badge 'Vendeur Certifié'",
        "Visibilité Prioritaire",
        "Support dédié 24/7"
      ],
      button: "Devenir Premium",
      link: "/vendeur/inscription",
      active: true,
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
        .seller-landing { background: var(--background); overflow-x: hidden; }
        
        /* Base styles (Mobile First) */
        .seller-hero { padding: 6rem 1.5rem 4rem; background: var(--hero-gradient); text-align: center; }
        .hero-content { display: flex; flex-direction: column; gap: 3rem; }
        
        .badge-promo { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 0.6rem 1.25rem; border-radius: 99px; font-weight: 700; font-size: 0.85rem; margin-bottom: 2rem; }
        .hero-text h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -1px; color: var(--text-main); }
        .hero-text .highlight { color: var(--primary); }
        .hero-text p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }
        .hero-actions { display: flex; flex-direction: column; gap: 1rem; }
        .hero-visual { display: none; }

        .benefits-section { padding: 4rem 1.5rem; }
        .benefits-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .benefit-card { background: var(--card-bg); padding: 2.5rem 1.5rem; border-radius: 24px; border: 1px solid var(--border); text-align: center; }
        .benefit-icon-wrapper { width: 60px; height: 60px; background: var(--surface); color: var(--primary); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .benefit-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); }
        .benefit-card p { color: var(--text-muted); line-height: 1.5; font-size: 0.95rem; }

        .pricing-section { padding: 4rem 1.5rem; }
        .plans-grid { display: flex; flex-direction: column; gap: 2rem; }
        .plan-card { background: var(--card-bg); padding: 3rem 2rem; border-radius: 32px; border: 1px solid var(--border); position: relative; display: flex; flex-direction: column; }
        .plan-card.featured { border: 2px solid var(--primary); box-shadow: var(--shadow-lg); }
        .plan-tag { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; padding: 0.4rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; white-space: nowrap; }
        .plan-header h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); }
        .plan-price { font-size: 2.25rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
        .plan-header p { color: var(--text-muted); margin-bottom: 2rem; font-size: 1rem; }
        .plan-features { list-style: none; margin-bottom: 2.5rem; flex: 1; }
        .plan-features li { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; font-weight: 600; color: var(--text-main); font-size: 0.9rem; }
        .check-icon { color: #10b981; flex-shrink: 0; }

        /* Tablet & Desktop Improvements */
        @media (min-width: 768px) {
          .hero-text h1 { font-size: 3.5rem; }
          .hero-actions { flex-direction: row; justify-content: center; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
          .plans-grid { flex-direction: row; max-width: 900px; margin: 0 auto; }
          .plan-card { flex: 1; }
          .plan-tag { top: 20px; right: 30px; left: auto; transform: none; }
        }

        @media (min-width: 1024px) {
          .seller-hero { padding: 8rem 0 6rem; text-align: left; }
          .hero-content { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 5rem; }
          .hero-actions { justify-content: flex-start; }
          .hero-visual { display: block; }
          .benefits-grid { grid-template-columns: repeat(4, 1fr); }
          .benefit-card { padding: 3rem 2rem; }
          .plan-price { font-size: 3rem; }
          .dashboard-preview-card { background: var(--card-bg); border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); overflow: hidden; height: 400px; }
        }
      ` }} />
      <AICopilot />
    </div>
  );
}
