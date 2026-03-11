'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Mail, Phone, MapPin, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';
import AICopilot from '@/components/AICopilot';

export default function VendeurInscription() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  if (isComplete) {
    return (
      <div className="container py-24 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="success-icon-wrapper mb-8">
            <CheckCircle2 size={64} color="#10b981" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Félicitations !</h1>
          <p className="text-muted text-lg mb-10">Votre demande de création de boutique a été reçue. Notre équipe va vérifier vos informations et vous contactera sous 24h.</p>
          <Link href="/vendeur/dashboard" className="btn btn-primary btn-lg">Accéder à mon tableau de bord</Link>
        </motion.div>
        <style dangerouslySetInnerHTML={{ __html: `
          .success-icon-wrapper { width: 100px; height: 100px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
        `}} />
      </div>
    );
  }

  return (
    <div className="inscription-page">
      <div className="container py-12">
        <div className="inscription-container">
          <div className="inscription-header text-center mb-12">
            <span className="badge">Étape {step} sur 3</span>
            <h1>Créez votre boutique</h1>
            <p>Remplissez les informations pour lancer votre activité sur Linx Mall.</p>
          </div>

          <div className="step-indicator mb-12">
            <div className={`step ${step >= 1 ? 'active' : ''}`}><span>1</span></div>
            <div className={`line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}><span>2</span></div>
            <div className={`line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}><span>3</span></div>
          </div>

          <form onSubmit={handleSubmit} className="inscription-form">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="form-step">
                <h3>Informations Personnelles</h3>
                <div className="form-group">
                  <label>Nom complet du responsable</label>
                  <input type="text" placeholder="Ex: Jean Dogbé" required />
                </div>
                <div className="form-group">
                  <label>Email professionnel</label>
                  <input type="email" placeholder="votre@email.com" required />
                </div>
                <div className="form-group">
                  <label>Numéro de téléphone (WhatsApp)</label>
                  <input type="tel" placeholder="90 00 00 00" required />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="form-step">
                <h3>Détails de la Boutique</h3>
                <div className="form-group">
                  <label>Nom de la boutique</label>
                  <input type="text" placeholder="Ex: Kara Fashion" required />
                </div>
                <div className="form-group">
                  <label>Catégorie principale</label>
                  <select required>
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="electronics">Électronique</option>
                    <option value="fashion">Mode & Beauté</option>
                    <option value="home">Maison</option>
                    <option value="local">Produits Locaux</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ville de localisation</label>
                  <select required>
                    <option value="Lomé">Lomé</option>
                    <option value="Kara">Kara</option>
                    <option value="Sokodé">Sokodé</option>
                    <option value="Kpalimé">Kpalimé</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="form-step">
                <h3>Validation & Identité</h3>
                <div className="form-group">
                  <label>Type d'entreprise</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="type" value="particulier" defaultChecked />
                      <div className="opt-box">
                        <strong>Particulier / Artisan</strong>
                        <span>Vendez en votre nom propre</span>
                      </div>
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="type" value="entreprise" />
                      <div className="opt-box">
                        <strong>Entreprise Enregistrée</strong>
                        <span>SARL, EURL, etc.</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="security-notice">
                  <ShieldCheck size={18} />
                  <p>En cliquant sur confirmer, vous acceptez nos conditions de vente pour les marchands.</p>
                </div>
              </motion.div>
            )}

            <div className="form-footer mt-10">
              {step > 1 && (
                <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Retour</button>
              )}
              <button type="submit" className="btn btn-primary flex-1">
                {step < 3 ? 'Continuer' : isSubmitting ? 'Traitement...' : 'Confirmer la création'}
                {step < 3 && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </div>
      </div>

      <AICopilot />

      <style dangerouslySetInnerHTML={{ __html: `
        .inscription-page { background: var(--background); min-height: 100vh; }
        .inscription-container { max-width: 600px; margin: 0 auto; }
        
        .inscription-header .badge { background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 0.4rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem; margin-bottom: 1rem; display: inline-block; }
        .inscription-header h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        
        .step-indicator { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .step { width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--text-muted); background: var(--card-bg); transition: all 0.3s ease; }
        .step.active { border-color: var(--primary); color: var(--primary); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .line { height: 2px; width: 40px; background: var(--border); }
        .line.active { background: var(--primary); }

        .form-step h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 2rem; text-align: center; }
        .inscription-form { background: var(--card-bg); padding: 2.5rem; border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .form-group label { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }
        .form-group input, .form-group select { padding: 0.85rem 1.25rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; outline: none; }
        .form-group input:focus { border-color: var(--primary); }

        .radio-group { display: flex; flex-direction: column; gap: 1rem; }
        .radio-option { position: relative; cursor: pointer; }
        .radio-option input { position: absolute; opacity: 0; }
        .opt-box { padding: 1.25rem; border: 1px solid var(--border); border-radius: 16px; display: flex; flex-direction: column; transition: var(--transition); }
        .radio-option input:checked + .opt-box { border-color: var(--primary); background: rgba(37, 99, 235, 0.05); }
        .opt-box strong { font-size: 1rem; color: var(--text-main); }
        .opt-box span { font-size: 0.8rem; color: var(--text-muted); }

        .security-notice { display: flex; gap: 0.75rem; background: var(--surface); padding: 1rem; border-radius: 12px; margin-top: 2rem; color: var(--text-muted); align-items: center; }
        .security-notice p { font-size: 0.8rem; line-height: 1.4; }
        .security-notice svg { color: #10b981; flex-shrink: 0; }

        .form-footer { display: flex; gap: 1rem; }
        .form-footer .btn { height: 56px; border-radius: 16px; font-weight: 800; }

        @media (max-width: 768px) {
          .inscription-form { padding: 1.5rem; border-radius: 24px; }
          .inscription-header h1 { font-size: 1.75rem; }
        }
      ` }} />
    </div>
  );
}
