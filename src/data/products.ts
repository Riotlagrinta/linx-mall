import { Product } from '../types/product';

export const categories = [
  { id: 'all', name: 'Tout', icon: '🌟' },
  { id: 'video', name: 'Streaming Vidéo', icon: '🎬' },
  { id: 'audio', name: 'Streaming Audio', icon: '🎧' },
  { id: 'cloud', name: 'Cloud & Services', icon: '☁️' }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Netflix Premium (1 Mois)',
    description: 'Profitez de Netflix en Ultra HD 4K sur 4 écrans en simultané. Accès illimité aux films, séries et documentaires.',
    price: 6500,
    category: 'Streaming Vidéo',
    image: '/images/netflix.svg',
    stock: 100,
    specs: ['4 Écrans', 'Ultra HD 4K', 'Livraison instantanée'],
    rating: 4.9,
    reviews: 120,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 2,
    name: 'Apple Music (1 Mois)',
    description: 'Plus de 100 millions de morceaux en qualité Lossless. Écoutez sans publicité, en ligne ou hors ligne.',
    price: 3500,
    category: 'Streaming Audio',
    image: '/images/applemusic.jpg',
    stock: 100,
    specs: ['Sans publicité', 'Lossless Audio', 'Livraison instantanée'],
    rating: 4.8,
    reviews: 85,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 3,
    name: 'Spotify Premium (1 Mois)',
    description: 'Musique sans pub, écoute hors connexion et zapping illimité. Qualité sonore exceptionnelle.',
    price: 3000,
    category: 'Streaming Audio',
    image: '/images/spotify.svg',
    stock: 100,
    specs: ['Mode hors connexion', 'Qualité max', 'Livraison instantanée'],
    rating: 4.7,
    reviews: 204,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 4,
    name: 'iCloud+ 50 Go (1 Mois)',
    description: 'Augmentez le stockage de votre iPhone. Inclut le relais privé iCloud, masquer mon e-mail et la vidéo sécurisée HomeKit.',
    price: 1500,
    category: 'Cloud & Services',
    image: '/images/icloud.jpg',
    stock: 100,
    specs: ['50 Go', 'Relais privé iCloud', 'Livraison instantanée'],
    rating: 4.6,
    reviews: 50,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 5,
    name: 'Snapchat+ (1 Mois)',
    description: 'Accédez à des fonctionnalités exclusives, expérimentales et en avant-première sur Snapchat.',
    price: 3000,
    category: 'Cloud & Services',
    image: '/images/snapchat.jpg',
    stock: 100,
    specs: ['Fonctions VIP', 'Badge exclusif', 'Livraison instantanée'],
    rating: 4.5,
    reviews: 42,
    shop: { id: 1, name: 'Charlee Store' }
  },
  {
    id: 6,
    name: 'Amazon Prime Video (1 Mois)',
    description: 'Regardez des films et séries exclusifs Amazon Originals, ainsi que des films et séries populaires.',
    price: 4500,
    category: 'Streaming Vidéo',
    image: '/images/primevideo.jpg',
    stock: 100,
    specs: ['Catalogue complet', 'Films exclusifs', 'Livraison instantanée'],
    rating: 4.8,
    reviews: 110,
    shop: { id: 1, name: 'Charlee Store' }
  }
];

export const getFeaturedProducts = () => products.slice(0, 4);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductById = (id: number) => products.find(p => p.id === id);
