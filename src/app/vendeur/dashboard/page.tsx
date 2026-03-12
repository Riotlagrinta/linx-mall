'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, 
  Settings, Bell, Plus, Search, TrendingUp, ArrowUpRight, ArrowRight,
  CheckCircle, Clock, AlertCircle, Sparkles, Wand2,
  Calendar, CreditCard, ChevronRight, MoreVertical,
  ArrowDownRight, ShoppingBag, Percent, Tag, Camera, X,
  MessageCircle, Phone, MapPin, Trash2, Edit3, Star, Zap, Send
} from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';
import AICopilot from '@/components/AICopilot';

// --- COMPOSANTS INTERNES ---

const SalesChart = () => (
  <div className="chart-container">
    <svg viewBox="0 0 400 150" className="line-chart">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      <path d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20 V150 H0 Z" fill="url(#chartGradient)" />
    </svg>
  </div>
);

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreatingPromo, setIsCreatingPromo] = useState(false);
  
  // Gestion multi-images avec légendes
  const [productImages, setProductImages] = useState<{file: string, caption: string}[]>([]);
  
  const [shopSettings, setShopSettings] = useState({
    name: 'Kara Boutique',
    description: 'Le meilleur de la mode et de l\'électronique à Kara.',
    phone: '+228 90 00 00 00',
    tmoney: '90123456',
    flooz: '99123456',
    location: 'Kara, Togo'
  });

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImages([...productImages, { file: reader.result as string, caption: '' }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAICaption = (index: number) => {
    const newImages = [...productImages];
    newImages[index].caption = "Cette image met en avant les finitions premium et le design élégant du produit. Idéal pour un usage quotidien.";
    setProductImages(newImages);
  };

  const stats = [
    { label: "Ventes totales", value: "850.000", unit: "F", icon: <TrendingUp size={20} />, trend: "+12.5%", color: "blue" },
    { label: "Commandes", value: "24", unit: "", icon: <ShoppingCart size={20} />, trend: "+5", color: "orange" },
    { label: "Stock total", value: "156", unit: "art.", icon: <Package size={20} />, trend: "-2", color: "green" },
    { label: "Avis Clients", value: "4.8", unit: "/5", icon: <Star size={20} />, trend: "+0.2", color: "purple" }
  ];

  const recentOrders = [
    { id: "LX-102", customer: "Amivi D.", amount: 45000, status: 'pending', date: "Il y a 2h" },
    { id: "LX-101", customer: "Koffi A.", amount: 155000, status: 'completed', date: "Il y a 5h" }
  ];

  // --- RENDU DES VUES ---

  const renderOverview = () => (
    <>
      <section className="dashboard-hero">
        <div className="welcome-text">
          <h1>Tableau de bord 📊</h1>
          <p>Bienvenue chez <strong>{shopSettings.name}</strong>. Voici vos performances.</p>
        </div>
        <div className="quick-info">
          <div className="date-display"><Calendar size={16} /> {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</div>
        </div>
      </section>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-icon-wrapper ${stat.color}`}>{stat.icon}</div>
            <div className="stat-data">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-value-row">
                <h3>{stat.value} <small>{stat.unit}</small></h3>
                <span className={`stat-trend-tag ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid-layout">
        <div className="card-panel analytics-panel">
          <div className="panel-header"><h3>Ventes de la semaine</h3></div>
          <SalesChart />
        </div>
        <div className="card-panel">
          <div className="panel-header"><h3>Alertes</h3></div>
          <div className="alert-item warning"><AlertCircle size={18} /> <span>2 produits bientôt en rupture</span></div>
          <div className="alert-item info"><MessageCircle size={18} /> <span>Nouveau message client</span></div>
        </div>
      </div>
    </>
  );

  const renderProducts = () => (
    <div className="tab-view">
      <div className="view-header">
        <h2>Mes Articles</h2>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}><Plus size={18} /> Publier une annonce</button>
      </div>
      
      <div className="product-listing-style">
        {products.slice(0, 5).map(p => (
          <div key={p.id} className="listing-card">
            <div className="listing-img" style={{ backgroundImage: `url(${p.image})` }}></div>
            <div className="listing-info">
              <div className="listing-top">
                <h3>{p.name}</h3>
                <span className="listing-price">{p.price.toLocaleString()} FCFA</span>
              </div>
              <div className="listing-meta">
                <span><Tag size={14} /> {p.category}</span>
                <span><Package size={14} /> Stock: {p.stock}</span>
              </div>
              <div className="listing-actions">
                <button className="btn-icon-text"><Edit3 size={14} /> Modifier</button>
                <button className="btn-icon-text delete"><Trash2 size={14} /> Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="tab-view">
      <div className="view-header">
        <h2>Clients Fidèles</h2>
        <p className="text-muted">Vos meilleurs ambassadeurs.</p>
      </div>
      <div className="customers-list-pro">
        {[
          { name: "Amivi Dogbé", orders: 12, spent: "450.000", last: "Il y a 2 jours", avatar: "AD" },
          { name: "Koffi Amélédji", orders: 8, spent: "820.000", last: "Il y a 5h", avatar: "KA" },
          { name: "Sika Gakou", orders: 5, spent: "120.000", last: "Hier", avatar: "SG" }
        ].map((c, i) => (
          <div key={i} className="customer-row-pro">
            <div className="c-avatar-pro">{c.avatar}</div>
            <div className="c-info-pro">
              <h4>{c.name}</h4>
              <p>{c.orders} commandes • <strong>{c.spent} F</strong></p>
            </div>
            <div className="c-actions-pro">
              <a href="#" className="c-btn wa"><MessageCircle size={18} /></a>
              <a href="#" className="c-btn call"><Phone size={18} /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPromotions = () => (
    <div className="tab-view">
      <div className="view-header">
        <h2>Booster mes ventes</h2>
        <button className="btn btn-primary" onClick={() => setIsCreatingPromo(true)}><Sparkles size={18} /> Créer un Boost</button>
      </div>
      
      <div className="promo-options-grid">
        <div className="promo-type-card featured">
          <div className="p-badge">POPULAIRE</div>
          <div className="p-icon-l"><Star size={32} /></div>
          <h3>Article Vedette</h3>
          <p>Votre produit s'affiche en haut des résultats de recherche.</p>
          <button className="btn btn-primary w-full mt-4">Activer</button>
        </div>
        <div className="promo-type-card urgent">
          <div className="p-icon-l"><Clock size={32} /></div>
          <h3>Vente Urgente</h3>
          <p>Ajoute un badge "URGENT" pour accélérer la vente.</p>
          <button className="btn btn-outline w-full mt-4">Activer</button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="tab-view">
      <div className="view-header">
        <h2>Configuration Boutique</h2>
      </div>
      <div className="card-panel settings-form-pro">
        <div className="form-group">
          <label>Nom public</label>
          <input type="text" value={shopSettings.name} onChange={(e) => setShopSettings({...shopSettings, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Localisation</label>
          <div className="input-with-icon">
            <MapPin size={18} />
            <input type="text" value={shopSettings.location} onChange={(e) => setShopSettings({...shopSettings, location: e.target.value})} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>WhatsApp Business</label>
            <input type="text" value={shopSettings.phone} onChange={(e) => setShopSettings({...shopSettings, phone: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Numéro T-Money (Réception paiements)</label>
            <input type="text" value={shopSettings.tmoney} />
          </div>
        </div>
        <button className="btn btn-primary btn-lg mt-6">Mettre à jour ma boutique</button>
      </div>
    </div>
  );

  const [selectedChat, setSelectedChat] = useState<any>(null);

  const renderMessages = () => (
    <div className="tab-view h-full flex flex-col">
      <div className="view-header">
        <h2>Messagerie</h2>
        <p className="text-muted">Discutez avec vos clients en temps réel.</p>
      </div>
      
      <div className="chat-layout-pro">
        <div className="chat-sidebar-pro">
          {[
            { name: "Amivi Dogbé", msg: "Est-ce que le smartphone est encore dispo ?", time: "14:20", unread: 2, avatar: "AD" },
            { name: "Koffi Amélédji", msg: "Merci pour la livraison rapide !", time: "Hier", unread: 0, avatar: "KA" },
            { name: "Sika Gakou", msg: "Je voudrais en commander 3.", time: "Lun", unread: 0, avatar: "SG" }
          ].map((chat, i) => (
            <div key={i} className={`chat-item-pro ${selectedChat?.name === chat.name ? 'active' : ''}`} onClick={() => setSelectedChat(chat)}>
              <div className="c-avatar-chat">{chat.avatar}</div>
              <div className="c-info-chat">
                <div className="c-top">
                  <strong>{chat.name}</strong>
                  <span>{chat.time}</span>
                </div>
                <p className="truncate">{chat.msg}</p>
              </div>
              {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
            </div>
          ))}
        </div>

        <div className="chat-main-pro">
          {selectedChat ? (
            <div className="chat-window">
              <div className="chat-header-win">
                <div className="c-avatar-win">{selectedChat.avatar}</div>
                <div>
                  <h4>{selectedChat.name}</h4>
                  <span className="status-online">En ligne</span>
                </div>
              </div>
              <div className="chat-messages-area">
                <div className="msg-bubble-pro assistant">
                  Bonjour ! Comment puis-je vous aider aujourd'hui ?
                </div>
                <div className="msg-bubble-pro user">
                  {selectedChat.msg}
                </div>
              </div>
              <div className="chat-input-pro">
                <div className="input-wrapper-pro">
                  <input type="text" placeholder="Écrire votre message..." />
                  <button className="ai-reply-btn"><Wand2 size={16} /> <span>IA</span></button>
                </div>
                <button className="send-btn-pro"><Send size={20} /></button>
              </div>
            </div>
          ) : (
            <div className="chat-empty">
              <MessageCircle size={48} className="opacity-20 mb-4" />
              <p>Sélectionnez une conversation pour commencer à discuter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`seller-dashboard ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AICopilot />
      
      {/* ... Add Product Modal Content Resté inchangé ... */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="modal-overlay">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="product-modal-pro">
              <div className="modal-header-pro">
                <h3>Vendre un article</h3>
                <button onClick={() => setIsAddModalOpen(false)}><X /></button>
              </div>
              <div className="modal-body-pro">
                <div className="image-upload-section">
                  <label>Photos de l'article (max 5)</label>
                  <div className="images-grid-pro">
                    {productImages.map((img, i) => (
                      <div key={i} className="img-item-pro">
                        <div className="img-thumb" style={{ backgroundImage: `url(${img.file})` }}>
                          <button className="remove-img" onClick={() => setProductImages(productImages.filter((_, idx) => idx !== i))}><X size={12} /></button>
                        </div>
                        <div className="caption-area">
                          <input 
                            type="text" 
                            placeholder="Ajouter une légende..." 
                            value={img.caption}
                            onChange={(e) => {
                              const n = [...productImages];
                              n[i].caption = e.target.value;
                              setProductImages(n);
                            }}
                          />
                          <button className="ai-caption-btn" onClick={() => generateAICaption(i)}><Wand2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                    {productImages.length < 5 && (
                      <label className="add-img-btn-pro">
                        <Camera size={32} />
                        <span>Ajouter</span>
                        <input type="file" hidden accept="image/*" onChange={handleAddImage} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-group-pro mt-6">
                  <label>Titre de l'annonce</label>
                  <input type="text" placeholder="Que vendez-vous ?" />
                </div>
                <div className="form-row-pro">
                  <div className="form-group-pro">
                    <label>Prix</label>
                    <input type="number" placeholder="Prix en FCFA" />
                  </div>
                  <div className="form-group-pro">
                    <label>Catégorie</label>
                    <select><option>Électronique</option><option>Mode</option></select>
                  </div>
                </div>
              </div>
              <div className="modal-footer-pro">
                <button className="btn btn-primary w-full btn-lg">Publier l'annonce</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <aside className="dashboard-sidebar">
        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
          <ChevronRight size={16} style={{ transform: isSidebarCollapsed ? '' : 'rotate(180deg)' }} />
        </button>
        <div className="sidebar-header">
          <div className="vendor-logo"><Sparkles size={24} /></div>
          {!isSidebarCollapsed && <div className="vendor-info"><h4>{shopSettings.name}</h4><span className="badge-status">Pro</span></div>}
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><LayoutDashboard size={20} /> {!isSidebarCollapsed && "Dashboard"}</button>
          <button className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><Package size={20} /> {!isSidebarCollapsed && "Mes Articles"}</button>
          <button className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}><MessageCircle size={20} /> {!isSidebarCollapsed && "Messages"}</button>
          <button className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}><Users size={20} /> {!isSidebarCollapsed && "Clients Fidèles"}</button>
          <button className={`nav-item ${activeTab === 'promotions' ? 'active' : ''}`} onClick={() => setActiveTab('promotions')}><Zap size={20} /> {!isSidebarCollapsed && "Boosts"}</button>
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> {!isSidebarCollapsed && "Paramètres"}</button>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="content-header-pro">
          <div className="search-pro"><Search size={18} /><input type="text" placeholder="Rechercher..." /></div>
          <div className="actions-pro">
            <button className="icon-btn-pro"><Bell size={20} /></button>
            <div className="user-avatar-pro">K</div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'messages' && renderMessages()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'promotions' && renderPromotions()}
          {activeTab === 'settings' && renderSettings()}
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .seller-dashboard { display: flex; min-height: 100vh; background: var(--background); }
        .dashboard-sidebar { width: 280px; background: var(--card-bg); border-right: 1px solid var(--border); padding: 2rem 1.25rem; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; transition: width 0.3s ease; }
        .sidebar-collapsed .dashboard-sidebar { width: 80px; padding: 2rem 0.75rem; align-items: center; }
        
        .sidebar-toggle-btn { position: absolute; right: -12px; top: 30px; width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; z-index: 10; }
        .nav-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 12px; color: var(--text-muted); font-weight: 600; border: none; background: none; cursor: pointer; width: 100%; transition: all 0.2s; margin-bottom: 0.5rem; text-align: left; }
        .nav-item.active { background: var(--primary); color: white; }
        .sidebar-collapsed .nav-item { justify-content: center; padding: 1rem 0; }

        .dashboard-content { flex: 1; padding: 2rem; }
        .content-header-pro { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .search-pro { display: flex; align-items: center; gap: 0.75rem; background: var(--surface); border: 1px solid var(--border); padding: 0.75rem 1.5rem; border-radius: 16px; width: 400px; }
        .search-pro input { border: none; background: none; outline: none; color: var(--text-main); width: 100%; }
        .actions-pro { display: flex; align-items: center; gap: 1rem; }
        .user-avatar-pro { width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; }

        /* Listing Style (Coin Afrique) */
        .listing-card { display: flex; gap: 1.5rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 1rem; margin-bottom: 1rem; transition: var(--transition); }
        .listing-card:hover { border-color: var(--primary); box-shadow: var(--shadow); }
        .listing-img { width: 140px; height: 120px; border-radius: 12px; background-size: cover; background-position: center; border: 1px solid var(--border); }
        .listing-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .listing-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .listing-price { font-weight: 900; color: var(--primary); font-size: 1.2rem; }
        .listing-meta { display: flex; gap: 1.5rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; }
        .listing-actions { display: flex; gap: 1rem; }
        .btn-icon-text { display: flex; align-items: center; gap: 0.5rem; background: var(--surface); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
        .btn-icon-text.delete { color: var(--accent); }

        /* Multi-Image Modal */
        .product-modal-pro { background: var(--card-bg); width: 100%; max-width: 700px; border-radius: 32px; overflow: hidden; box-shadow: var(--shadow-lg); }
        .modal-header-pro { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .modal-body-pro { padding: 2rem; max-height: 70vh; overflow-y: auto; }
        .images-grid-pro { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; margin-top: 1rem; }
        .add-img-btn-pro { height: 120px; border: 2px dashed var(--border); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; color: var(--text-muted); cursor: pointer; }
        .img-item-pro { border: 1px solid var(--border); border-radius: 16px; padding: 8px; background: var(--surface); }
        .img-thumb { height: 100px; border-radius: 10px; background-size: cover; position: relative; }
        .caption-area { margin-top: 8px; display: flex; gap: 4px; }
        .caption-area input { flex: 1; font-size: 0.75rem; border: 1px solid var(--border); border-radius: 6px; padding: 4px 8px; background: var(--card-bg); }
        .ai-caption-btn { padding: 4px; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; }

        /* Customers CRM */
        .customer-row-pro { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; margin-bottom: 1rem; }
        .c-avatar-pro { width: 50px; height: 50px; background: var(--surface); color: var(--primary); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; }
        .c-info-pro { flex: 1; }
        .c-actions-pro { display: flex; gap: 0.75rem; }
        .c-btn { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; }
        .c-btn.wa { background: #25d366; }
        .c-btn.call { background: var(--primary); }

        /* Boosts Style */
        .promo-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .promo-type-card { padding: 2.5rem; border-radius: 32px; border: 1px solid var(--border); text-align: center; position: relative; }
        .promo-type-card.featured { border: 2px solid var(--primary); }
        .p-badge { position: absolute; top: 20px; right: 20px; background: var(--primary); color: white; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 99px; }

        /* Chat Interface Styles */
        .chat-layout-pro { display: grid; grid-template-columns: 320px 1fr; background: var(--card-bg); border: 1px solid var(--border); border-radius: 24px; height: 600px; overflow: hidden; }
        .chat-sidebar-pro { border-right: 1px solid var(--border); overflow-y: auto; background: var(--surface); }
        .chat-item-pro { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; cursor: pointer; border-bottom: 1px solid var(--border); transition: var(--transition); position: relative; }
        .chat-item-pro:hover { background: var(--border); }
        .chat-item-pro.active { background: var(--card-bg); border-left: 4px solid var(--primary); }
        .c-avatar-chat { width: 44px; height: 44px; border-radius: 12px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
        .c-info-chat { flex: 1; min-width: 0; }
        .c-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .c-top strong { font-size: 0.9rem; color: var(--text-main); }
        .c-top span { font-size: 0.7rem; color: var(--text-muted); }
        .c-info-chat p { font-size: 0.8rem; color: var(--text-muted); }
        .unread-badge { background: var(--primary); color: white; font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 10px; position: absolute; right: 1.25rem; bottom: 1.25rem; }

        .chat-main-pro { flex: 1; display: flex; flex-direction: column; background: var(--card-bg); }
        .chat-window { display: flex; flex-direction: column; height: 100%; }
        .chat-header-win { padding: 1.25rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem; background: var(--surface); }
        .c-avatar-win { width: 40px; height: 40px; border-radius: 10px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .chat-header-win h4 { font-size: 1rem; font-weight: 800; }
        
        .chat-messages-area { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; background: var(--background); }
        .msg-bubble-pro { padding: 1rem; border-radius: 18px; font-size: 0.9rem; line-height: 1.5; max-width: 80%; }
        .msg-bubble-pro.assistant { align-self: flex-start; background: var(--surface); color: var(--text-main); border-bottom-left-radius: 4px; }
        .msg-bubble-pro.user { align-self: flex-end; background: var(--primary); color: white; border-bottom-right-radius: 4px; }

        .chat-input-pro { padding: 1.25rem; border-top: 1px solid var(--border); display: flex; gap: 1rem; align-items: center; background: var(--surface); }
        .input-wrapper-pro { flex: 1; display: flex; align-items: center; background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 0.25rem 0.5rem; }
        .input-wrapper-pro input { flex: 1; border: none; background: none; outline: none; padding: 0.6rem 0.75rem; font-family: inherit; color: var(--text-main); }
        .ai-reply-btn { display: flex; align-items: center; gap: 4px; background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%); color: white; border: none; padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; cursor: pointer; }
        .send-btn-pro { width: 44px; height: 44px; background: var(--primary); color: white; border: none; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .chat-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); font-weight: 600; }

        @media (max-width: 1024px) {
          .chat-layout-pro { grid-template-columns: 1fr; }
          .chat-sidebar-pro { display: ${selectedChat ? 'none' : 'block'}; }
          .chat-main-pro { display: ${selectedChat ? 'flex' : 'none'}; }
        }
      ` }} />
    </div>
  );
}
