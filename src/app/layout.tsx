import type { Metadata } from "next";
import "./globals.css";
import { ShoppingBag, Search, User, Menu, Heart } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Linx Mall | Le plus grand centre commercial numérique du Togo",
  description: "Découvrez le meilleur du commerce en ligne au Togo avec Linx Mall. Électronique, mode, produits locaux et bien plus encore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header className="main-header">
          <div className="container header-content">
            <div className="logo-section">
              <Menu className="mobile-menu-btn" size={24} />
              <div className="logo">
                <span className="logo-linx">Linx</span>
                <span className="logo-mall">Mall</span>
              </div>
            </div>

            <div className="search-bar">
              <input type="text" placeholder="Rechercher un produit, une marque..." />
              <button className="search-btn">
                <Search size={20} />
              </button>
            </div>

            <nav className="nav-actions">
              <ThemeToggle />
              <button className="nav-btn-icon">
                <Heart size={22} />
              </button>
              <button className="nav-btn-icon">
                <User size={22} />
              </button>
              <button className="nav-btn-icon cart-btn">
                <ShoppingBag size={22} />
                <span className="cart-count">0</span>
              </button>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="main-footer">
          <div className="container footer-grid">
            <div className="footer-col">
              <div className="logo mb-1">
                <span className="logo-linx">Linx</span>
                <span className="logo-mall">Mall</span>
              </div>
              <p className="footer-desc">
                La marketplace de référence au Togo. Qualité, sécurité et rapidité pour tous vos achats.
              </p>
            </div>
            <div className="footer-col">
              <h4>Linx Mall</h4>
              <ul>
                <li><a href="#">À propos de nous</a></li>
                <li><a href="#">Devenir vendeur</a></li>
                <li><a href="#">Nos engagements</a></li>
                <li><a href="#">Recrutement</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Aide & Support</h4>
              <ul>
                <li><a href="#">Centre d'aide</a></li>
                <li><a href="#">Livraison & Retours</a></li>
                <li><a href="#">Suivre ma commande</a></li>
                <li><a href="#">Contactez-nous</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p>Lomé, Togo</p>
              <p>Email: contact@linxmall.tg</p>
              <p>Tél: +228 90 00 00 00</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <p>&copy; 2026 Linx Mall. Tous droits réservés.</p>
              <div className="payment-methods">
                <span className="badge">T-Money</span>
                <span className="badge">Flooz</span>
                <span className="badge">CB</span>
              </div>
            </div>
          </div>
        </footer>

        <style dangerouslySetInnerHTML={{ __html: `
          .main-header {
            position: sticky;
            top: 0;
            background: var(--header-bg);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            z-index: 1000;
            padding: 1rem 0;
            transition: var(--transition);
          }
          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
          }
          .logo-section {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .mobile-menu-btn {
            display: none;
            color: var(--text-main);
          }
          .logo {
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: -1px;
            display: flex;
          }
          .logo-linx { color: var(--primary); }
          .logo-mall { color: var(--text-main); }
          
          .search-bar {
            flex: 1;
            max-width: 600px;
            display: flex;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 0.25rem;
            transition: var(--transition);
          }
          .search-bar input {
            flex: 1;
            border: none;
            background: transparent;
            padding: 0.5rem 1rem;
            font-family: inherit;
            outline: none;
            color: var(--text-main);
          }
          .search-bar input::placeholder {
            color: var(--text-muted);
          }
          .search-btn {
            background: var(--primary);
            color: white;
            padding: 0.5rem 1.25rem;
            border-radius: calc(var(--radius) - 4px);
          }
          
          .nav-actions {
            display: flex;
            align-items: center;
            gap: 1.25rem;
          }
          .nav-btn-icon {
            background: transparent;
            color: var(--text-main);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
          }
          .nav-btn-icon:hover {
            color: var(--primary);
          }
          .cart-count {
            position: absolute;
            top: -5px;
            right: -8px;
            background: var(--accent);
            color: white;
            font-size: 0.7rem;
            font-weight: 700;
            min-width: 18px;
            height: 18px;
            border-radius: 99px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
          }

          .main-footer {
            background: var(--surface);
            border-top: 1px solid var(--border);
            padding: 4rem 0 2rem;
            margin-top: 4rem;
            transition: var(--transition);
          }
          .footer-col h4 {
            margin-bottom: 1.5rem;
            font-weight: 700;
            color: var(--text-main);
          }
          .footer-col ul {
            list-style: none;
          }
          .footer-col ul li {
            margin-bottom: 0.75rem;
          }
          .footer-col ul a {
            color: var(--text-muted);
            transition: color 0.2s;
          }
          .footer-col ul a:hover {
            color: var(--primary);
          }
          .footer-desc {
            color: var(--text-muted);
            max-width: 300px;
          }
          .footer-bottom {
            padding-top: 2rem;
            border-top: 1px solid var(--border);
          }
          .footer-bottom .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-muted);
            font-size: 0.875rem;
          }
          .payment-methods {
            display: flex;
            gap: 0.5rem;
          }

          @media (max-width: 768px) {
            .header-content {
              gap: 1rem;
            }
            .search-bar {
              display: none;
            }
            .mobile-menu-btn {
              display: block;
            }
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
          }
          .mb-1 { margin-bottom: 1rem; }
        ` }} />
      </body>
    </html>
  );
}
