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
              alt="Charlee Store Logo" 
              width={isScrolled ? 32 : 40} 
              height={isScrolled ? 32 : 40} 
              className="logo-img"
              priority
            />
            <div className="logo-text">
              <span className="logo-linx">Charlee</span>
              <span className="logo-mall">Store</span>
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
                    alt="Charlee Store Logo" 
                    width={32} 
                    height={32} 
                    className="logo-img"
                  />
                  <div className="logo-text">
                    <span className="logo-linx">Charlee</span>
                    <span className="logo-mall">Store</span>
                  </div>
                </div>
                <p className="footer-desc">
                  Votre plateforme d&apos;abonnements numériques premium. Accédez à Netflix, Apple Music, Spotify, Disney+ et bien d&apos;autres services sans carte bancaire, directement depuis le Togo.
                </p>
              </div>
              <div className="footer-col">
                <h4>La Boutique</h4>
                <ul>
                  <li><Link href="/about">À propos de nous</Link></li>
                  <li><Link href="/search">Notre catalogue</Link></li>
                  <li><Link href="/engagements">Nos engagements</Link></li>
                  <li><Link href="/careers">Rejoindre l&apos;équipe</Link></li>
                </ul>
                </div>
                <div className="footer-col">
                <h4>Service Client</h4>
                <ul>
                  <li><Link href="/help">Centre d'aide</Link></li>
                  <li><Link href="/help">Paiement & Activation</Link></li>
                  <li><Link href="/tracking">Suivre ma commande</Link></li>
                  <li><Link href="/contact">Contactez-nous</Link></li>
                </ul>
                </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <p>Lomé, Togo</p>
                <p>Email: contact@charleestore.tg</p>
                <p>Tél: +228 90 00 00 00</p>
                <p style={{marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)'}}>Lun–Sam : 8h–19h</p>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="container">
                <p>&copy; 2026 Charlee Store. Tous droits réservés.</p>
                <div className="payment-methods">
                  <span className="badge">T-Money</span>
                  <span className="badge">Flooz</span>
                  <span className="badge">CB</span>
                </div>
              </div>
            </div>
          </footer>

        </Providers>
      </body>
    </html>
  );
}
