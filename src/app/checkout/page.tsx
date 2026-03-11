'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart } = useCart();
  const { showNotification } = useNotification();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lomé',
    address: '',
    paymentMethod: 't-money'
  });

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <p className="text-muted mb-8">Ajoutez des produits pour pouvoir passer commande.</p>
        <Link href="/" className="btn btn-primary">Retour à la boutique</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'une commande (API Call)
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      showNotification("Commande passée avec succès !", "success");
      // On pourrait ici vider le panier
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="container py-20 max-w-2xl text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="order-success-card"
        >
          <div className="success-icon mb-6">
            <CheckCircle2 size={80} color="#10b981" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Merci pour votre commande !</h1>
          <p className="text-lg text-muted mb-8">
            Votre commande <strong>#LX-2026-99</strong> a été enregistrée. 
            Vous recevrez un appel de confirmation sous peu pour la livraison.
          </p>
          <div className="order-details-summary mb-8">
            <div className="summary-item">
              <span>Mode de paiement</span>
              <span className="font-bold uppercase">{formData.paymentMethod}</span>
            </div>
            <div className="summary-item">
              <span>Livraison à</span>
              <span className="font-bold">{formData.city}, {formData.address}</span>
            </div>
          </div>
          <Link href="/" className="btn btn-primary btn-lg w-full">Retour à l'accueil</Link>
        </motion.div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .order-success-card { background: var(--card-bg); padding: 3rem; border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow); }
          .summary-item { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border); }
          .summary-item:last-child { border-bottom: none; }
        `}} />
      </div>
    );
  }

  return (
    <div className="checkout-page container py-10">
      <Link href="/" className="back-link mb-8">
        <ArrowLeft size={18} /> Retour à la boutique
      </Link>

      <h1 className="text-3xl font-bold mb-10">Finaliser ma commande</h1>

      <div className="checkout-grid">
        {/* Formulaire */}
        <div className="checkout-main">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Delivery */}
            <section className="checkout-section">
              <div className="section-title">
                <Truck size={24} />
                <h2>Informations de livraison</h2>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Nom complet</label>
                  <input 
                    type="text" name="fullName" required 
                    placeholder="Jean-Marc KOFFI"
                    value={formData.fullName} onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone (T-Money/Flooz)</label>
                  <input 
                    type="tel" name="phone" required 
                    placeholder="+228 90 00 00 00"
                    value={formData.phone} onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Ville</label>
                  <select name="city" value={formData.city} onChange={handleInputChange}>
                    <option value="Lomé">Lomé</option>
                    <option value="Atakpamé">Atakpamé</option>
                    <option value="Kpalimé">Kpalimé</option>
                    <option value="Sokodé">Sokodé</option>
                    <option value="Kara">Kara</option>
                    <option value="Dapaong">Dapaong</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Adresse précise / Quartier</label>
                  <input 
                    type="text" name="address" required 
                    placeholder="Ex: Adidogomé, près de l'école XYZ"
                    value={formData.address} onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Payment */}
            <section className="checkout-section mt-8">
              <div className="section-title">
                <CreditCard size={24} />
                <h2>Mode de paiement</h2>
              </div>
              <div className="payment-options">
                <label className={`payment-card ${formData.paymentMethod === 't-money' ? 'active' : ''}`}>
                  <input 
                    type="radio" name="paymentMethod" value="t-money" 
                    checked={formData.paymentMethod === 't-money'} 
                    onChange={handleInputChange} 
                  />
                  <div className="payment-info">
                    <span className="payment-name">T-Money</span>
                    <span className="payment-desc">Payer avec votre compte Togocom</span>
                  </div>
                  <div className="payment-logo tm"></div>
                </label>

                <label className={`payment-card ${formData.paymentMethod === 'flooz' ? 'active' : ''}`}>
                  <input 
                    type="radio" name="paymentMethod" value="flooz" 
                    checked={formData.paymentMethod === 'flooz'} 
                    onChange={handleInputChange} 
                  />
                  <div className="payment-info">
                    <span className="payment-name">Flooz</span>
                    <span className="payment-desc">Payer avec votre compte Moov</span>
                  </div>
                  <div className="payment-logo flz"></div>
                </label>

                <label className={`payment-card ${formData.paymentMethod === 'cash' ? 'active' : ''}`}>
                  <input 
                    type="radio" name="paymentMethod" value="cash" 
                    checked={formData.paymentMethod === 'cash'} 
                    onChange={handleInputChange} 
                  />
                  <div className="payment-info">
                    <span className="payment-name">Cash à la livraison</span>
                    <span className="payment-desc">Payer en espèces dès réception</span>
                  </div>
                </label>
              </div>
            </section>

            <div className="checkout-actions mt-10">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" /> Traitement en cours...</>
                ) : (
                  `Confirmer ma commande (${cartTotal.toLocaleString()} FCFA)`
                )}
              </button>
              <div className="security-note mt-4">
                <ShieldCheck size={16} />
                <span>Paiement 100% sécurisé et garanti par Linx Mall</span>
              </div>
            </div>
          </form>
        </div>

        {/* Récapitulatif */}
        <aside className="checkout-sidebar">
          <div className="order-summary-card">
            <h3>Résumé de la commande</h3>
            <div className="order-items-list mt-6">
              {cart.map((item) => (
                <div key={item.id} className="summary-product">
                  <div className="summary-img" style={{ backgroundImage: `url(${item.image})` }}>
                    <span className="summary-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-details">
                    <h4>{item.name}</h4>
                    <span className="summary-price">{(item.price * item.quantity).toLocaleString()} <small>FCFA</small></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals mt-8">
              <div className="total-row">
                <span>Sous-total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="total-row">
                <span>Frais de livraison</span>
                <span className="free">GRATUIT</span>
              </div>
              <div className="total-row grand-total mt-4">
                <span>Total à payer</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-grid { display: grid; grid-template-columns: 1fr 400px; gap: 3rem; }
        .checkout-section { background: var(--card-bg); padding: 2rem; border-radius: 20px; border: 1px solid var(--border); }
        .section-title { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; color: var(--primary); }
        .section-title h2 { font-size: 1.5rem; color: var(--text-main); font-weight: 700; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem; }
        .form-group input, .form-group select { width: 100%; padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; transition: var(--transition); }
        .form-group input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

        .payment-options { display: flex; flex-direction: column; gap: 1rem; }
        .payment-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: 14px; cursor: pointer; transition: var(--transition); position: relative; }
        .payment-card:hover { border-color: var(--primary); background: rgba(37, 99, 235, 0.02); }
        .payment-card.active { border-color: var(--primary); background: rgba(37, 99, 235, 0.05); }
        .payment-card input { position: absolute; opacity: 0; }
        .payment-info { flex: 1; }
        .payment-name { display: block; font-weight: 700; color: var(--text-main); font-size: 1.1rem; }
        .payment-desc { font-size: 0.85rem; color: var(--text-muted); }
        .payment-logo { width: 60px; height: 35px; background-size: contain; background-repeat: no-repeat; background-position: right; }

        .order-summary-card { position: sticky; top: 100px; background: var(--surface); padding: 2rem; border-radius: 20px; border: 1px solid var(--border); }
        .summary-product { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .summary-img { width: 60px; height: 60px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid var(--border); position: relative; }
        .summary-qty { position: absolute; top: -8px; right: -8px; background: var(--text-main); color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; }
        .summary-details h4 { font-size: 0.95rem; margin-bottom: 0.25rem; color: var(--text-main); }
        .summary-price { font-weight: 700; color: var(--primary); }

        .total-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .total-row.grand-total { border-top: 1px solid var(--border); padding-top: 1rem; font-size: 1.25rem; color: var(--text-main); font-weight: 800; }
        .total-row .free { color: #10b981; }

        .security-note { display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.85rem; }
        .back-link { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 500; text-decoration: none; transition: var(--transition); }
        .back-link:hover { color: var(--primary); }

        @media (max-width: 1024px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .checkout-sidebar { order: -1; }
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-group.full { grid-column: span 1; }
        }
        .mt-8 { margin-top: 2rem; }
        .mt-10 { margin-top: 2.5rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
