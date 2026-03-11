'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, MapPin, Phone, Mail, User, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';

export default function SellerRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'inscription
    setTimeout(() => {
      setIsSubmitting(false);
      showNotification("Votre demande d'ouverture de boutique a été reçue !", "success");
      router.push('/vendeur/dashboard');
    }, 2000);
  };

  return (
    <div className="registration-page container py-20">
      <div className="registration-card">
        <div className="registration-header">
          <div className="icon-circle">
            <Store size={32} />
          </div>
          <h1>Devenir vendeur Linx Mall</h1>
          <p>Créez votre boutique en moins de 2 minutes et commencez à vendre.</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-section">
            <h3><User size={18} /> Informations Personnelles</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nom complet du responsable</label>
                <input type="text" required placeholder="Ex: Koffi Mensah" />
              </div>
              <div className="form-group">
                <label>Email professionnel</label>
                <input type="email" required placeholder="contact@maboutique.tg" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3><Store size={18} /> Votre Boutique</h3>
            <div className="form-grid">
              <div className="form-group full">
                <label>Nom de la boutique</label>
                <input type="text" required placeholder="Ex: Kara Électronique" />
              </div>
              <div className="form-group">
                <label>Téléphone professionnel</label>
                <input type="tel" required placeholder="+228 90 00 00 00" />
              </div>
              <div className="form-group">
                <label>Catégorie principale</label>
                <select required>
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="electronics">Électronique</option>
                  <option value="fashion">Mode & Beauté</option>
                  <option value="home">Maison & Jardin</option>
                  <option value="local">Produits Locaux</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Adresse physique (si applicable)</label>
                <input type="text" placeholder="Ex: Marché de Hanoukopé, Lomé" />
              </div>
            </div>
          </div>

          <div className="terms-check">
            <input type="checkbox" required id="terms" />
            <label htmlFor="terms">J'accepte les conditions générales de vente et la charte de qualité Linx Mall.</label>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="animate-spin" /> Création en cours...</>
            ) : (
              <>{'Confirmer l\'ouverture de ma boutique'} <ArrowRight size={20} /></>
            )}
          </button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .registration-page { display: flex; justify-content: center; background: var(--surface); min-height: 100vh; }
        .registration-card { background: var(--card-bg); width: 100%; max-width: 800px; padding: 3rem; border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow); }
        
        .registration-header { text-align: center; margin-bottom: 3rem; }
        .icon-circle { width: 70px; height: 70px; background: rgba(37, 99, 235, 0.1); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .registration-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .registration-header p { color: var(--text-muted); }

        .form-section { margin-bottom: 2.5rem; }
        .form-section h3 { display: flex; align-items: center; gap: 0.75rem; font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-main); border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem; }
        .form-group input, .form-group select { width: 100%; padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; transition: var(--transition); }
        .form-group input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

        .terms-check { display: flex; gap: 0.75rem; align-items: flex-start; margin-bottom: 2.5rem; font-size: 0.9rem; color: var(--text-muted); }
        .terms-check input { margin-top: 0.25rem; }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .registration-card { padding: 1.5rem; }
          .form-grid { grid-template-columns: 1fr; }
          .form-group.full { grid-column: span 1; }
        }
      ` }} />
    </div>
  );
}
