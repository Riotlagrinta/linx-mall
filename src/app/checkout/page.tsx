'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Loader2, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      <div className="container py-24 max-w-3xl">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="order-success-card"
        >
          <div className="success-lottie">🎉</div>
          <div className="success-icon-bg">
            <CheckCircle2 size={60} color="#10b981" strokeWidth={3} />
          </div>
          <h1>Commande confirmée !</h1>
          <p className="order-number">N° de commande : <strong>#LX-{Math.floor(Math.random() * 9000) + 1000}</strong></p>
          
          <div className="success-summary mt-10">
            <div className="summary-row">
              <span>Client</span>
              <strong>{formData.fullName}</strong>
            </div>
            <div className="summary-row">
              <span>Destination</span>
              <strong>{formData.city}, {formData.address}</strong>
            </div>
            <div className="summary-row">
              <span>Mode de paiement</span>
              <strong className="uppercase">{formData.paymentMethod}</strong>
            </div>
          </div>

          <div className="next-steps mt-10">
            <p>Notre équipe va vous appeler au <strong>{formData.phone}</strong> pour confirmer l'heure de livraison.</p>
          </div>

          <Link href="/" className="btn btn-primary btn-lg w-full mt-10">
            Retour à l'accueil
          </Link>
        </motion.div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .order-success-card { background: var(--card-bg); padding: 4rem; border-radius: 40px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); text-align: center; }
          .success-lottie { font-size: 4rem; margin-bottom: 1rem; }
          .success-icon-bg { width: 100px; height: 100px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
          .order-success-card h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); }
          .order-number { color: var(--text-muted); font-size: 1.1rem; }
          .success-summary { background: var(--surface); border-radius: 24px; padding: 2rem; border: 1px solid var(--border); }
          .summary-row { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border); }
          .summary-row:last-child { border-bottom: none; }
          .next-steps { color: var(--text-muted); font-size: 1.05rem; }
        `}} />
      </div>
    );
  }

  return (
    <div className="checkout-page container py-12">
      <Link href="/" className="back-link mb-10">
        <ArrowLeft size={18} /> Retour à la boutique
      </Link>

      <h1 className="text-4xl font-extrabold mb-12 letter-tight">Caisse</h1>

      <div className="checkout-layout">
        <div className="checkout-form-side">
          <form onSubmit={handleSubmit}>
            {/* Delivery */}
            <div className="checkout-card mb-8">
              <div className="card-title">
                <div className="icon-box blue"><MapPin size={20} /></div>
                <h2>Livraison</h2>
              </div>
              <div className="form-grid">
                <div className="input-group full">
                  <label>Nom complet</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input type="text" name="fullName" required placeholder="Votre nom" value={formData.fullName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Téléphone</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input type="tel" name="phone" required placeholder="+228 90..." value={formData.phone} onChange={handleInputChange} />
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
                <div className="input-group full">
                  <label>Adresse / Quartier</label>
                  <input type="text" name="address" required placeholder="Ex: Hedzranawoé, rue 123" value={formData.address} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-card">
              <div className="card-title">
                <div className="icon-box orange"><CreditCard size={20} /></div>
                <h2>Paiement</h2>
              </div>
              <div className="payment-stack">
                <label className={`payment-pill ${formData.paymentMethod === 't-money' ? 'active' : ''}`}>
                  <input type="radio" name="paymentMethod" value="t-money" checked={formData.paymentMethod === 't-money'} onChange={handleInputChange} />
                  <div className="pill-content">
                    <div className="p-icon tm"></div>
                    <div className="p-text">
                      <strong>T-Money</strong>
                      <span>Paiement instantané Togocom</span>
                    </div>
                  </div>
                </label>
                <label className={`payment-pill ${formData.paymentMethod === 'flooz' ? 'active' : ''}`}>
                  <input type="radio" name="paymentMethod" value="flooz" checked={formData.paymentMethod === 'flooz'} onChange={handleInputChange} />
                  <div className="pill-content">
                    <div className="p-icon flz"></div>
                    <div className="p-text">
                      <strong>Flooz</strong>
                      <span>Paiement sécurisé Moov</span>
                    </div>
                  </div>
                </label>
                <label className={`payment-pill ${formData.paymentMethod === 'cash' ? 'active' : ''}`}>
                  <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} />
                  <div className="pill-content">
                    <div className="p-icon cash">💵</div>
                    <div className="p-text">
                      <strong>Cash à la livraison</strong>
                      <span>Payez quand vous recevez</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full mt-10 submit-btn" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="animate-spin" /> Traitement...</> : `Payer ${cartTotal.toLocaleString()} FCFA`}
            </button>
          </form>
        </div>

        <aside className="checkout-summary-side">
          <div className="summary-sticky-card">
            <h3>Votre commande</h3>
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
              <div className="total-line">
                <span>Sous-total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="total-line">
                <span>Livraison</span>
                <span className="free">Gratuit</span>
              </div>
              <div className="total-line grand-total">
                <span>Total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
            </div>
            <div className="security-guarantee">
              <ShieldCheck size={16} /> 100% Sécurisé
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-layout { display: grid; grid-template-columns: 1fr 420px; gap: 4rem; }
        .checkout-card { background: var(--card-bg); padding: 2.5rem; border-radius: 32px; border: 1px solid var(--border); }
        .card-title { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
        .card-title h2 { font-size: 1.5rem; font-weight: 800; color: var(--text-main); }
        .icon-box { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .icon-box.blue { background: rgba(37, 99, 235, 0.1); color: var(--primary); }
        .icon-box.orange { background: rgba(245, 158, 11, 0.1); color: var(--secondary); }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-grid .full { grid-column: span 2; }
        .input-group label { display: block; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }
        .input-wrapper input { padding-left: 3rem !important; }
        .input-group input, .input-group select { width: 100%; padding: 0.9rem 1.25rem; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); color: var(--text-main); font-family: inherit; font-size: 1rem; transition: var(--transition); }
        .input-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); outline: none; }

        .payment-stack { display: flex; flex-direction: column; gap: 1rem; }
        .payment-pill { border: 1px solid var(--border); padding: 1.25rem; border-radius: 20px; cursor: pointer; transition: var(--transition); position: relative; overflow: hidden; }
        .payment-pill:hover { border-color: var(--primary); background: rgba(37, 99, 235, 0.02); }
        .payment-pill.active { border-color: var(--primary); background: rgba(37, 99, 235, 0.05); }
        .payment-pill input { position: absolute; opacity: 0; }
        .pill-content { display: flex; align-items: center; gap: 1.25rem; }
        .p-icon { width: 50px; height: 35px; background-size: contain; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .p-text strong { display: block; font-size: 1.1rem; color: var(--text-main); }
        .p-text span { font-size: 0.85rem; color: var(--text-muted); }

        .summary-sticky-card { position: sticky; top: 120px; background: var(--surface); border-radius: 32px; padding: 2.5rem; border: 1px solid var(--border); }
        .summary-sticky-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 2rem; }
        .summary-items { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem; }
        .item-row { display: flex; align-items: center; gap: 1.25rem; }
        .item-img { width: 64px; height: 64px; border-radius: 12px; background-size: cover; background-position: center; border: 1px solid var(--border); position: relative; }
        .item-img span { position: absolute; top: -8px; right: -8px; background: var(--text-main); color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
        .item-info h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 2px; }
        .item-info p { color: var(--primary); font-weight: 800; font-size: 0.9rem; }

        .summary-footer { border-top: 1px solid var(--border); padding-top: 2rem; }
        .total-line { display: flex; justify-content: space-between; margin-bottom: 1rem; font-weight: 600; color: var(--text-muted); }
        .total-line.grand-total { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px dashed var(--border); color: var(--text-main); font-size: 1.5rem; font-weight: 900; }
        .free { color: #10b981; }

        .security-guarantee { margin-top: 2rem; text-align: center; font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .submit-btn { height: 64px; font-size: 1.2rem; border-radius: 20px; box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .checkout-layout { grid-template-columns: 1fr; }
          .checkout-summary-side { order: -1; }
        }
      `}} />
    </div>
  );
}
