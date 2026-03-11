'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Loader2, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const { showNotification } = useNotification();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

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
      <div className="container py-24 text-center">
        <div className="empty-checkout-icon mb-6">🛒</div>
        <h2 className="text-3xl font-extrabold mb-4">Votre panier est vide</h2>
        <p className="text-muted mb-10 text-lg">Ajoutez des produits pour pouvoir passer commande.</p>
        <Link href="/" className="btn btn-primary btn-lg">Explorer la boutique</Link>
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
    
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      showNotification("Commande passée avec succès !", "success");
    }, 2500);
  };

  if (orderComplete) {
    return (
      <div className="container py-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="order-success-card"
        >
          <div className="success-icon-bg">
            <CheckCircle2 size={48} color="#10b981" strokeWidth={3} />
          </div>
          <h1>Merci pour votre commande !</h1>
          <p className="order-number">N° #LX-{Math.floor(Math.random() * 9000) + 1000}</p>
          
          <div className="success-summary mt-8">
            <div className="summary-row">
              <span>Client</span>
              <strong>{formData.fullName}</strong>
            </div>
            <div className="summary-row">
              <span>Mode</span>
              <strong className="uppercase">{formData.paymentMethod}</strong>
            </div>
          </div>

          <div className="next-steps mt-8">
            <p>On vous appelle au <strong>{formData.phone}</strong> pour la livraison.</p>
          </div>

          <Link href="/" className="btn btn-primary btn-lg w-full mt-10">
            Retour à l'accueil
          </Link>
        </motion.div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .order-success-card { background: var(--card-bg); padding: 3rem 1.5rem; border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); text-align: center; max-width: 500px; margin: 0 auto; }
          .success-icon-bg { width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
          .order-success-card h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); line-height: 1.2; }
          .order-number { color: var(--text-muted); margin-top: 0.5rem; font-weight: 600; }
          .success-summary { background: var(--surface); border-radius: 20px; padding: 1.5rem; }
          .summary-row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
          .summary-row:last-child { border-bottom: none; }
          .next-steps { color: var(--text-muted); font-size: 0.95rem; }
        `}} />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container py-6">
        <Link href="/" className="back-link mb-6">
          <ArrowLeft size={18} /> Retour
        </Link>

        <h1 className="checkout-title">Finaliser la commande</h1>

        <div className="checkout-layout">
          {/* Order Summary */}
          <aside className="checkout-summary-side">
            <div className="summary-card">
              <h3>Résumé de la commande</h3>
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="item-row">
                    <div className="item-img" style={{ backgroundImage: `url(${item.image})` }}>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-footer">
                <div className="total-line grand-total">
                  <span>Total à payer</span>
                  <span>{cartTotal.toLocaleString()} <small>FCFA</small></span>
                </div>
              </div>
            </div>
          </aside>

          <div className="checkout-form-side">
            <form onSubmit={handleSubmit}>
              {/* Delivery Section */}
              <div className="checkout-section">
                <div className="section-title">
                  <div className="icon-box"><MapPin size={20} /></div>
                  <h2>Informations de livraison</h2>
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Nom complet</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input type="text" name="fullName" required placeholder="Votre nom" value={formData.fullName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Téléphone (T-Money / Flooz)</label>
                    <div className="input-wrapper">
                      <Phone size={18} className="input-icon" />
                      <input type="tel" name="phone" required placeholder="Ex: 90 00 00 00" value={formData.phone} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Ville</label>
                    <select name="city" value={formData.city} onChange={handleInputChange}>
                      <option value="Lomé">Lomé</option>
                      <option value="Kara">Kara</option>
                      <option value="Sokodé">Sokodé</option>
                      <option value="Kpalimé">Kpalimé</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Quartier / Adresse précise</label>
                    <input type="text" name="address" required placeholder="Ex: Adidogomé, face école..." value={formData.address} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="checkout-section mt-6">
                <div className="section-title">
                  <div className="icon-box orange"><CreditCard size={20} /></div>
                  <h2>Mode de paiement</h2>
                </div>
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 't-money' ? 'active' : ''}`}>
                    <input type="radio" name="paymentMethod" value="t-money" checked={formData.paymentMethod === 't-money'} onChange={handleInputChange} />
                    <div className="opt-content">
                      <div className="opt-icon tm"></div>
                      <div className="opt-text">
                        <strong>T-Money</strong>
                        <span>Paiement Togocom</span>
                      </div>
                    </div>
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'flooz' ? 'active' : ''}`}>
                    <input type="radio" name="paymentMethod" value="flooz" checked={formData.paymentMethod === 'flooz'} onChange={handleInputChange} />
                    <div className="opt-content">
                      <div className="opt-icon flz"></div>
                      <div className="opt-text">
                        <strong>Flooz</strong>
                        <span>Paiement Moov Africa</span>
                      </div>
                    </div>
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'cash' ? 'active' : ''}`}>
                    <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} />
                    <div className="opt-content">
                      <div className="opt-icon cash">💵</div>
                      <div className="opt-text">
                        <strong>À la livraison</strong>
                        <span>Payez en espèces</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="animate-spin" /> En cours...</> : `Confirmer la commande`}
              </button>
              
              <div className="security-notice">
                <ShieldCheck size={14} /> Vos données sont protégées et sécurisées.
              </div>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-page { background: var(--background); min-height: 100vh; padding-bottom: 4rem; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 600; text-decoration: none; font-size: 0.9rem; }
        .checkout-title { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 2rem; }

        .checkout-layout { display: flex; flex-direction: column; gap: 2rem; }
        
        .summary-card { background: var(--surface); border-radius: 24px; padding: 1.5rem; border: 1px solid var(--border); }
        .summary-card h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text-main); }
        .summary-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .item-row { display: flex; align-items: center; gap: 1rem; }
        .item-img { width: 50px; height: 50px; border-radius: 10px; background-size: cover; background-position: center; border: 1px solid var(--border); position: relative; flex-shrink: 0; }
        .item-img span { position: absolute; top: -6px; right: -6px; background: var(--text-main); color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 800; }
        .item-info h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .item-info p { color: var(--primary); font-weight: 800; font-size: 0.85rem; }
        
        .summary-footer { border-top: 1px dashed var(--border); padding: 1rem 0 0; }
        .total-line { display: flex; justify-content: space-between; align-items: center; }
        .grand-total { color: var(--text-main); font-size: 1.25rem; font-weight: 900; }
        .grand-total small { color: var(--primary); font-size: 0.85rem; }

        .checkout-section { background: var(--card-bg); padding: 1.5rem; border-radius: 24px; border: 1px solid var(--border); }
        .section-title { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .section-title h2 { font-size: 1.1rem; font-weight: 800; color: var(--text-main); }
        .icon-box { width: 36px; height: 36px; background: rgba(37, 99, 235, 0.1); color: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .icon-box.orange { background: rgba(245, 158, 11, 0.1); color: var(--secondary); }

        .form-grid { display: flex; flex-direction: column; gap: 1.25rem; }
        .input-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-wrapper input { padding-left: 3rem !important; }
        .input-group input, .input-group select { width: 100%; padding: 0.8rem 1rem; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; font-size: 0.95rem; }

        .payment-options { display: flex; flex-direction: column; gap: 0.75rem; }
        .payment-option { border: 1px solid var(--border); padding: 1rem; border-radius: 16px; cursor: pointer; transition: var(--transition); position: relative; }
        .payment-option.active { border-color: var(--primary); background: rgba(37, 99, 235, 0.05); }
        .payment-option input { position: absolute; opacity: 0; }
        .opt-content { display: flex; align-items: center; gap: 1rem; }
        .opt-icon { width: 40px; height: 30px; background-size: contain; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .opt-text strong { display: block; font-size: 0.95rem; color: var(--text-main); }
        .opt-text span { font-size: 0.75rem; color: var(--text-muted); }

        .btn-submit { width: 100%; height: 56px; border-radius: 16px; font-size: 1.1rem; font-weight: 800; margin-top: 2rem; box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2); }
        .security-notice { text-align: center; margin-top: 1rem; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
        
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (min-width: 1024px) {
          .checkout-title { font-size: 2.5rem; margin-bottom: 3rem; }
          .checkout-layout { display: grid; grid-template-columns: 1fr 400px; gap: 4rem; align-items: start; }
          .checkout-summary-side { position: sticky; top: 100px; }
          .checkout-section { padding: 2.5rem; }
          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .summary-card { padding: 2.5rem; }
        }
      `}} />
    </div>
  );
}
