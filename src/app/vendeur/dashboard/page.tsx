'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, 
  Settings, Bell, Plus, Search, TrendingUp, ArrowUpRight, 
  CheckCircle, Clock, AlertCircle, Sparkles
} from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

export default function SellerDashboard() {
  const stats = [
    { label: "Ventes totales", value: "850.000", unit: "FCFA", icon: <TrendingUp size={20} />, trend: "+12.5%", color: "blue" },
    { label: "Commandes", value: "24", unit: "", icon: <ShoppingCart size={20} />, trend: "+5", color: "orange" },
    { label: "Produits actifs", value: "12", unit: "", icon: <Package size={20} />, trend: "0", color: "green" },
    { label: "Visiteurs", value: "1.2k", unit: "", icon: <Users size={20} />, trend: "+18%", color: "purple" }
  ];

  const recentOrders = [
    { id: "LX-102", customer: "Amivi D.", amount: 45000, status: "pending", date: "Il y a 2h" },
    { id: "LX-101", customer: "Koffi A.", amount: 155000, status: "completed", date: "Il y a 5h" },
    { id: "LX-100", customer: "Fousseni M.", amount: 25000, status: "completed", date: "Hier" }
  ];

  return (
    <div className="seller-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="vendor-logo">
            <Sparkles size={24} />
          </div>
          <div className="vendor-info">
            <h4>Kara Boutique</h4>
            <span className="badge-status">Vendeur Certifié</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link href="/vendeur/dashboard" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</Link>
          <a href="#" className="nav-item"><Package size={20} /> Mes Produits</a>
          <a href="#" className="nav-item"><ShoppingCart size={20} /> Commandes</a>
          <a href="#" className="nav-item"><BarChart3 size={20} /> Statistiques</a>
          <div className="nav-divider"></div>
          <a href="#" className="nav-item"><Settings size={20} /> Paramètres</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="content-header">
          <div className="header-left">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Rechercher une commande..." />
            </div>
          </div>
          <div className="header-actions">
            <button className="upgrade-premium-btn">
              <Sparkles size={16} /> 
              <span>Devenir Premium</span>
            </button>
            <button className="icon-btn notification-btn">
              <Bell size={20} />
              <span className="pulse-dot"></span>
            </button>
            <button className="btn btn-primary add-product-btn">
              <Plus size={18} /> <span>Produit</span>
            </button>
          </div>
        </header>

        <section className="dashboard-hero">
          <div className="welcome-text">
            <h1>Bienvenue, Kara Boutique ! 👋</h1>
            <p>Aujourd'hui est une excellente journée pour vendre.</p>
          </div>
          <div className="date-display">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </section>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className={`stat-icon-wrapper ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-data">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value-row">
                  <h3>{stat.value} <small>{stat.unit}</small></h3>
                  <span className="stat-trend-tag">{stat.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid-layout">
          {/* Recent Orders */}
          <div className="card-panel orders-panel">
            <div className="panel-header">
              <h3>Dernières commandes</h3>
              <Link href="#" className="view-all-link">Tout voir <ArrowUpRight size={14} /></Link>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID Commande</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id}</td>
                      <td className="customer-name">{order.customer}</td>
                      <td className="order-amount">{order.amount.toLocaleString()} <small>FCFA</small></td>
                      <td>
                        <span className={`badge-pill ${order.status}`}>
                          {order.status === 'completed' ? 'Livré' : 'En attente'}
                        </span>
                      </td>
                      <td className="order-date">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="card-panel products-panel">
            <div className="panel-header">
              <h3>Meilleurs produits</h3>
            </div>
            <div className="top-products-stack">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="mini-product-item">
                  <div className="mini-img" style={{ backgroundImage: `url(${product.image})` }}></div>
                  <div className="mini-info">
                    <h4>{product.name}</h4>
                    <p>{product.price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="mini-stats">
                    <span className="sales-count">12</span>
                    <span className="sales-label">ventes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .seller-dashboard { 
          display: grid; 
          grid-template-columns: 280px 1fr; 
          min-height: 100vh; 
          background: var(--background); 
        }
        
        /* Sidebar */
        .dashboard-sidebar { 
          background: var(--card-bg); 
          border-right: 1px solid var(--border); 
          padding: 2.5rem 1.5rem; 
          display: flex; 
          flex-direction: column; 
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 3.5rem; }
        .vendor-logo { width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 15px rgba(37, 99, 235, 0.25); }
        .vendor-info h4 { font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px; }
        .badge-status { font-size: 0.7rem; color: #10b981; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.4rem; }
        .nav-item { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.25rem; border-radius: 12px; color: var(--text-muted); font-weight: 600; transition: var(--transition); text-decoration: none; font-size: 0.95rem; }
        .nav-item:hover { background: var(--surface); color: var(--primary); }
        .nav-item.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
        .nav-divider { height: 1px; background: var(--border); margin: 1.5rem 0; }

        /* Main Content */
        .dashboard-content { padding: 2rem 3.5rem; }
        .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        
        .search-box { display: flex; align-items: center; gap: 0.75rem; background: var(--surface); border: 1px solid var(--border); padding: 0.7rem 1.5rem; border-radius: 14px; width: 400px; transition: var(--transition); }
        .search-box:focus-within { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .search-box input { border: none; background: none; font-size: 0.9rem; color: var(--text-main); outline: none; width: 100%; font-family: inherit; }
        
        .header-actions { display: flex; align-items: center; gap: 1.25rem; }
        .upgrade-premium-btn { display: flex; align-items: center; gap: 0.6rem; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 0.7rem 1.25rem; border-radius: 12px; font-weight: 700; font-size: 0.85rem; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2); }
        .upgrade-premium-btn small { font-weight: 400; opacity: 0.9; }
        
        .icon-btn { position: relative; background: var(--surface); border: 1px solid var(--border); width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: var(--transition); }
        .icon-btn:hover { border-color: var(--primary); color: var(--primary); }
        .pulse-dot { position: absolute; top: 12px; right: 12px; width: 8px; height: 8px; background: var(--accent); border: 2px solid var(--surface); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

        .dashboard-hero { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .dashboard-hero h1 { font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; letter-spacing: -0.5px; }
        .dashboard-hero p { color: var(--text-muted); font-size: 1.1rem; }
        .date-display { background: var(--surface); padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 700; font-size: 0.85rem; color: var(--primary); border: 1px solid var(--border); }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat-card { background: var(--card-bg); padding: 1.75rem; border-radius: 24px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 1.5rem; transition: var(--transition); }
        .stat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: var(--primary); }
        
        .stat-icon-wrapper { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-icon-wrapper.blue { background: rgba(37, 99, 235, 0.1); color: #2563eb; }
        .stat-icon-wrapper.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .stat-icon-wrapper.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .stat-icon-wrapper.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        
        .stat-label { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }
        .stat-value-row { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
        .stat-value-row h3 { font-size: 1.75rem; font-weight: 800; color: var(--text-main); letter-spacing: -0.5px; }
        .stat-value-row h3 small { font-size: 0.9rem; opacity: 0.6; margin-left: 2px; }
        .stat-trend-tag { font-size: 0.75rem; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 8px; }

        .dashboard-grid-layout { display: grid; grid-template-columns: 1.8fr 1fr; gap: 2rem; margin-top: 2.5rem; }
        .card-panel { background: var(--card-bg); border-radius: 24px; border: 1px solid var(--border); padding: 2rem; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .panel-header h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
        .view-all-link { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--primary); font-weight: 700; }

        .dashboard-table { width: 100%; border-collapse: collapse; }
        .dashboard-table th { text-align: left; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; padding: 1rem 0; border-bottom: 1px solid var(--border); }
        .dashboard-table td { padding: 1.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.95rem; }
        
        .order-id { font-weight: 700; color: var(--primary); }
        .customer-name { font-weight: 600; color: var(--text-main); }
        .order-amount { font-weight: 800; color: var(--text-main); }
        .order-date { color: var(--text-muted); }
        
        .badge-pill { padding: 6px 14px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; }
        .badge-pill.completed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .badge-pill.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .top-products-stack { display: flex; flex-direction: column; gap: 1.5rem; }
        .mini-product-item { display: flex; align-items: center; gap: 1.25rem; padding: 0.5rem; border-radius: 16px; transition: var(--transition); }
        .mini-product-item:hover { background: var(--surface); }
        .mini-img { width: 56px; height: 56px; border-radius: 12px; background-size: cover; background-position: center; border: 1px solid var(--border); }
        .mini-info h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 2px; }
        .mini-info p { font-size: 0.85rem; color: var(--primary); font-weight: 700; }
        .mini-stats { margin-left: auto; text-align: right; }
        .sales-count { display: block; font-size: 1.1rem; font-weight: 800; color: var(--text-main); }
        .sales-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; }

        @media (max-width: 1200px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dashboard-grid-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .seller-dashboard { grid-template-columns: 1fr; }
          .dashboard-sidebar { display: none; }
          .dashboard-content { padding: 1.5rem; }
          .search-box { width: 100%; }
          .dashboard-hero { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      ` }} />
    </div>
  );
}
