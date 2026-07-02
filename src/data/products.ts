import { Product } from '../types/product';

export const categories = [
  { id: 'all', name: 'Tout', icon: '✨' },
  { id: 'video', name: 'Streaming vidéo', icon: '🎬' },
  { id: 'audio', name: 'Streaming audio', icon: '🎧' },
  { id: 'cloud', name: 'Cloud & stockage', icon: '☁️' },
  { id: 'social', name: 'Divertissement', icon: '🌈' }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Netflix Premium',
    description: 'Profitez de Netflix en Ultra HD 4K sur 4 écrans en simultané. Accès illimité aux films, séries et documentaires.',
    price: 6500,
    category: 'Streaming vidéo',
    image: '/images/netflix-cover.jpg',
    stock: 100,
    badge: 'Populaire',
    specs: ['4 écrans', 'Ultra HD 4K', 'Activation rapide'],
    rating: 4.9,
    reviews: 120,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 2,
    name: 'Apple Music',
    description: 'Plus de 100 millions de morceaux en qualité Lossless. Écoutez sans publicité, en ligne ou hors ligne.',
    price: 3500,
    category: 'Streaming audio',
    image: '/images/applemusic-cover.jpg',
    stock: 100,
    specs: ['Sans publicité', 'Lossless audio', 'Activation rapide'],
    rating: 4.8,
    reviews: 85,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 3,
    name: 'Spotify Premium',
    description: 'Musique sans pub, écoute hors connexion et zapping illimité. Qualité sonore exceptionnelle.',
    price: 3000,
    category: 'Streaming audio',
    image: '/images/spotify-cover.jpg',
    stock: 100,
    specs: ['Mode hors connexion', 'Qualité max', 'Activation rapide'],
    rating: 4.7,
    reviews: 204,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 4,
    name: 'iCloud+ 50 Go',
    description: 'Augmentez le stockage de votre iPhone. Inclut le relais privé iCloud, Masquer mon e-mail et la vidéo sécurisée HomeKit.',
    price: 1500,
    category: 'Cloud & stockage',
    image: '/images/icloudplus.jpg',
    stock: 100,
    specs: ['50 Go', 'Relais privé iCloud', 'Activation rapide'],
    rating: 4.6,
    reviews: 50,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 5,
    name: 'Snapchat+',
    description: 'Accédez à des fonctionnalités exclusives, expérimentales et en avant-première sur Snapchat.',
    price: 3000,
    category: 'Divertissement',
    image: '/images/snapchatplus.jpg',
    stock: 100,
    specs: ['Fonctions VIP', 'Badge exclusif', 'Activation rapide'],
    rating: 4.5,
    reviews: 42,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 6,
    name: 'Amazon Prime Video',
    description: 'Regardez des films et séries exclusifs Amazon Originals, ainsi que des films et séries populaires.',
    price: 4500,
    category: 'Streaming vidéo',
    image: '/images/primevideo-cover.jpg',
    stock: 100,
    specs: ['Catalogue complet', 'Films exclusifs', 'Activation rapide'],
    rating: 4.8,
    reviews: 110,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 7,
    name: 'Disney+',
    description: 'Accédez aux univers Disney, Pixar, Marvel, Star Wars et National Geographic en un seul abonnement.',
    price: 5000,
    category: 'Streaming vidéo',
    image: '/images/disneyplus.jpg',
    stock: 100,
    badge: 'Nouveau',
    specs: ['4 écrans', 'Contenus exclusifs', 'Activation rapide'],
    rating: 4.8,
    reviews: 96,
    shop: { id: 1, name: 'Charlee Store' }
  }
];

export const getFeaturedProducts = () => products.slice(0, 4);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductById = (id: number) => products.find(p => p.id === id);
