'use client';

import Image from "next/image";
import "./globals.css";
import { User, Heart } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Providers from "@/components/Providers";
import CartDrawer from "@/components/CartDrawer";
import CartButton from "@/components/CartButton";
import MobileMenu from "@/components/MobileMenu";
import MobileMenuButton from "@/components/MobileMenuButton";
import SearchBar from "@/components/SearchBar";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

function Header() {
  const { wishlist } = useWishlist();
  
  return (
    <header className="main-header">
      <div className="container header-content">
        <div className="logo-section">
          <MobileMenuButton />
          <div className="logo-container">
            <Link href="/" className="logo-container">
              <Image 
                src="/images/logo.png.jpeg" 
                alt="Linx Mall Logo" 
                width={40} 
                height={40} 
                className="logo-img"
                priority
              />
              <div className="logo-text">
                <span className="logo-linx">Linx</span>
                <span className="logo-mall">Mall</span>
              </div>
            </Link>
          </div>
        </div>

        <SearchBar />

        <nav className="nav-actions">
          <ThemeToggle />
          <Link href="/wishlist" className="nav-btn-icon">
            <Heart size={22} />
            {wishlist.length > 0 && <span className="cart-count wishlist-count">{wishlist.length}</span>}
          </Link>
          <button className="nav-btn-icon">
            <User size={22} />
          </button>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('linx-theme');
              var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
              if (!theme && supportDarkMode) theme = 'dark';
              if (!theme) theme = 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        `}} />
      </head>
      <body>
        <Providers>
          <CartDrawer />
          <MobileMenu />
          <Header />

          <main>{children}</main>

          <footer className="main-footer">
            <div className="container footer-grid">
              <div className="footer-col">
                <div className="logo-container mb-1">
                  <Image 
                    src="/images/logo.png.jpeg" 
                    alt="Linx Mall Logo" 
                    width={32} 
                    height={32} 
                    className="logo-img"
                  />
                  <div className="logo-text">
                    <span className="logo-linx">Linx</span>
                    <span className="logo-mall">Mall</span>
                  </div>
                </div>
                <p className="footer-desc">
                  La marketplace de référence au Togo. Qualité, sécurité et rapidité pour tous vos achats.
                </p>
              </div>
              <div className="footer-col">
                <h4>Linx Mall</h4>
                <ul>
                  <li><Link href="/about">À propos de nous</Link></li>
                  <li><Link href="/vendeur">Devenir vendeur</Link></li>
                  <li><Link href="/about">Nos engagements</Link></li>
                  <li><Link href="/careers">Recrutement</Link></li>
                </ul>
                </div>
                <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><Link href="/help">Centre d'aide</Link></li>
                  <li><Link href="/help">Livraison & Retours</Link></li>
                  <li><Link href="/tracking">Suivre ma commande</Link></li>
                  <li><Link href="/help">Contactez-nous</Link></li>
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
            .logo-container {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              text-decoration: none;
            }
            .logo-img {
              object-fit: contain;
              width: auto;
              max-height: 40px;
            }
            .logo-text {
              font-size: 1.5rem;
              font-weight: 800;
              letter-spacing: -1px;
              display: flex;
            }
            .logo-linx { color: var(--primary); }
            .logo-mall { color: var(--text-main); }
            
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
            .wishlist-count {
              background: var(--secondary);
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
        </Providers>
      </body>
    </html>
  );
}
