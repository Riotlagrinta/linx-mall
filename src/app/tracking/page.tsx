'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [isTracked, setIsTracked] = useState(false);

  const steps = [
    { id: 1, title: "Commande validée", date: "11 Mars, 09:30", status: "completed", icon: <CheckCircle2 size={20} /> },
    { id: 2, title: "En préparation", date: "11 Mars, 11:45", status: "completed", icon: <Package size={20} /> },
    { id: 3, title: "En cours de livraison", date: "Aujourd'hui, 14:20", status: "active", icon: <Truck size={20} /> },
    { id: 4, title: "Livré", date: "Estimation : 1h", status: "pending", icon: <Clock size={20} /> },
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.length > 3) setIsTracked(true);
  };

  return (
    <div className="tracking-page">
      <div className="container py-12">
        <Link href="/" className="back-link mb-8">
          <ArrowLeft size={18} /> Retour boutique
        </Link>

        <div className="tracking-container">
          <div className="tracking-header text-center mb-12">
            <h1>Suivi de commande</h1>
            <p>Entrez votre numéro de commande pour savoir où elle se trouve.</p>
            
            <form onSubmit={handleTrack} className="tracking-form mt-8">
              <div className="input-group">
                <Search size={20} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Ex: LX-1234" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                />
                <button type="submit" className="btn btn-primary">Suivre</button>
              </div>
            </form>
          </div>

          {isTracked && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="tracking-results"
            >
              <div className="order-brief mb-8">
                <div className="brief-item">
                  <span>Statut actuel</span>
                  <strong>En cours de livraison</strong>
                </div>
                <div className="brief-item">
                  <span>Destination</span>
                  <strong>Lomé, Hedzranawoé</strong>
                </div>
              </div>

              <div className="tracking-timeline">
                {steps.map((step, i) => (
                  <div key={step.id} className={`timeline-step ${step.status}`}>
                    <div className="step-icon-wrapper">
                      <div className="step-icon">{step.icon}</div>
                      {i < steps.length - 1 && <div className="step-line"></div>}
                    </div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="delivery-info-card mt-10">
                <div className="delivery-person">
                  <div className="avatar">K</div>
                  <div className="details">
                    <strong>Koffi (Livreur)</strong>
                    <span>En route vers vous</span>
                  </div>
                  <a href="tel:+22890000000" className="call-btn"><Clock size={18} /></a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tracking-page { background: var(--background); min-height: 90vh; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 600; text-decoration: none; }
        
        .tracking-container { max-width: 600px; margin: 0 auto; }
        .tracking-header h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        
        .tracking-form { background: var(--card-bg); padding: 0.5rem; border-radius: 20px; border: 1px solid var(--border); box-shadow: var(--shadow); }
        .input-group { display: flex; align-items: center; gap: 1rem; padding-left: 1rem; }
        .search-icon { color: var(--text-muted); }
        .input-group input { flex: 1; border: none; background: none; outline: none; font-size: 1rem; color: var(--text-main); font-weight: 600; }
        .input-group .btn { border-radius: 14px; padding: 0.75rem 1.5rem; }

        .order-brief { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: var(--surface); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); }
        .brief-item span { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
        .brief-item strong { font-size: 1rem; color: var(--text-main); }

        .tracking-timeline { padding: 1rem 0; }
        .timeline-step { display: flex; gap: 1.5rem; margin-bottom: 2rem; }
        .timeline-step:last-child { margin-bottom: 0; }
        
        .step-icon-wrapper { display: flex; flex-direction: column; align-items: center; position: relative; }
        .step-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--surface); color: var(--text-muted); display: flex; align-items: center; justify-content: center; z-index: 2; border: 2px solid var(--border); }
        .step-line { position: absolute; top: 40px; width: 2px; height: calc(100% + 1rem); background: var(--border); z-index: 1; }
        
        .timeline-step.completed .step-icon { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: #10b981; }
        .timeline-step.completed .step-line { background: #10b981; }
        
        .timeline-step.active .step-icon { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .timeline-step.active h4 { color: var(--primary); }

        .step-content h4 { font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; }
        .step-content p { font-size: 0.85rem; color: var(--text-muted); }

        .delivery-info-card { background: var(--card-bg); padding: 1.5rem; border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        .delivery-person { display: flex; align-items: center; gap: 1rem; }
        .avatar { width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .details { flex: 1; }
        .details strong { display: block; font-size: 1rem; color: var(--text-main); }
        .details span { font-size: 0.8rem; color: var(--text-muted); }
        .call-btn { width: 40px; height: 40px; background: var(--surface); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); text-decoration: none; border: 1px solid var(--border); }

        @media (max-width: 768px) {
          .tracking-header h1 { font-size: 1.75rem; }
          .tracking-form { margin: 0 1rem; }
        }
      ` }} />
    </div>
  );
}
