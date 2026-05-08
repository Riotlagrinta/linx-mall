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
import { useState, useEffect } from "react";

function Header() {
  const { wishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo-section">
          <MobileMenuButton />
          <Link href="/" className="logo-container">
            <Image 
              src="/images/logo.png.jpeg" 
              alt="Linx Mall Logo" 
              width={isScrolled ? 32 : 40} 
              height={isScrolled ? 32 : 40} 
              className="logo-img"
              priority
            />
            <div className="logo-text">
              <span className="logo-linx">Linx</span>
              <span className="logo-mall">Mall</span>
            </div>
          </Link>
        </div>

        <div className="header-search-desktop">
          <SearchBar />
        </div>

        <nav className="nav-actions">
          <ThemeToggle />
          <Link href="/wishlist" className="nav-btn-icon">
            <Heart size={22} />
            {wishlist.length > 0 && <span className="cart-count wishlist-count">{wishlist.length}</span>}
          </Link>
          <Link href="/login" className="nav-btn-icon">
            <User size={22} />
          </Link>
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
                  Votre boutique de prêt-à-porter homme &amp; femme à Lomé. Mode, élégance et style togolais pour toute la famille.
                </p>
              </div>
              <div className="footer-col">
                <h4>La Boutique</h4>
                <ul>
                  <li><Link href="/about">À propos de nous</Link></li>
                  <li><Link href="/search">Notre catalogue</Link></li>
                  <li><Link href="/engagements">Nos engagements</Link></li>
                  <li><Link href="/careers">Recrutement</Link></li>
                </ul>
                </div>
                <div className="footer-col">
                <h4>Service Client</h4>
                <ul>
                  <li><Link href="/help">Centre d'aide</Link></li>
                  <li><Link href="/help">Livraison & Retours</Link></li>
                  <li><Link href="/tracking">Suivre ma commande</Link></li>
                  <li><Link href="/contact">Contactez-nous</Link></li>
                </ul>
                </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <p>Lomé, Togo</p>
                <p>Email: contact@linxmall.tg</p>
                <p>Tél: +228 90 00 00 00</p>
                <p style={{marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)'}}>Lun–Sam : 8h–19h</p>
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
              padding-left: env(safe-area-inset-left);
              padding-right: env(safe-area-inset-right);
              background: var(--header-bg);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border-bottom: 1px solid var(--border);
              z-index: 1000;
              padding: 1rem 0;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .main-header.scrolled {
              padding: 0.6rem 0;
              background: var(--card-bg);
              box-shadow: var(--shadow);
            }
            .header-content {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1.5rem;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 0.75rem;
            }
            .logo-container {
              display: flex;
              align-items: center;
              gap: 0.6rem;
              text-decoration: none;
            }
            .logo-img {
              object-fit: contain;
              transition: all 0.4s ease;
            }
            .logo-text {
              font-size: 1.25rem;
              font-weight: 800;
              letter-spacing: -0.8px;
              display: flex;
              transition: all 0.4s ease;
            }
            .main-header.scrolled .logo-text { font-size: 1.1rem; }
            .logo-linx { color: var(--primary); }
            .logo-mall { color: var(--text-main); }
            
            .header-search-desktop { flex: 1; max-width: 500px; display: none; }

            .nav-actions {
              display: flex;
              align-items: center;
              gap: 1rem;
            }
            .nav-btn-icon {
              background: var(--surface);
              color: var(--text-main);
              width: 44px;
              height: 44px;
              border-radius: 12px;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: var(--transition);
              border: 1px solid var(--border);
            }
            .nav-btn-icon:hover {
              color: var(--primary);
              border-color: var(--primary);
              background: rgba(139, 34, 82, 0.05);
            }

            @media (min-width: 1024px) {
              .header-search-desktop { display: block; }
              .logo-text { font-size: 1.5rem; }
              .nav-actions { gap: 1.25rem; }
              .nav-btn-icon { width: 48px; height: 48px; }
            }

            @media (max-width: 768px) {
              .header-content {
                gap: 0.5rem;
              }
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
              .footer-bottom .container {
                flex-direction: column;
                gap: 0.75rem;
                text-align: center;
              }
              .main-footer {
                padding-bottom: calc(2rem + env(safe-area-inset-bottom));
              }
            }
            .mb-1 { margin-bottom: 1rem; }
          ` }} />
        </Providers>
      </body>
    </html>
  );
}
