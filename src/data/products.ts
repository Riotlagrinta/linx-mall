import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Iphone 11 Pro Max",
    price: 155000,
    rating: 4.8,
    reviews: 124,
    category: "Électronique",
    description: "L'iphone 11 Pro Max  redéfinit la performance mobile. Avec son processeur ultra-rapide et son écran Super Retina, profitez d'une expérience fluide pour le gaming et le multitâche. Appareil photo 108MP pour des clichés professionnels même en basse lumière.",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop",
    badge: "Populaire",
    specs: ["Écran 6.7 pouces", "Batterie 5000mAh", "12GB RAM", "256GB Stockage"],
    stock: 15,
    shop: { id: 1, name: "Kara Boutique" }
  },
  {
    id: 2,
    name: "Écouteurs Linx Buds",
    price: 25000,
    rating: 4.5,
    reviews: 89,
    category: "Électronique",
    description: "Une immersion sonore totale sans compromis. Les Linx Buds offrent une réduction de bruit active de pointe et une autonomie de 30 heures. Design ergonomique pour un confort optimal toute la journée.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    badge: "Nouveau",
    specs: ["Bluetooth 5.2", "Réduction de bruit", "Étanche IPX4", "USB-C Charge"],
    stock: 42,
    shop: { id: 2, name: "Sokodé High-Tech" }
  },
  {
    id: 3,
    name: "Montre Connectée S1",
    price: 45000,
    rating: 4.7,
    reviews: 56,
    category: "Électronique",
    description: "Votre compagnon santé et fitness ultime. Suivez votre rythme cardiaque, votre sommeil et plus de 20 modes sportifs. Notifications intelligentes et design élégant en acier inoxydable.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT4X3ref_VW_34FR+watch-46-alum-silver-nc-s10_VW_34FR_WF_CO?wid=1200&hei=1200&fmt=png-alpha",
    badge: "Promo",
    specs: ["Écran AMOLED", "GPS Intégré", "Autonomie 10j", "Bracelet Interchangeable"],
    stock: 8,
    shop: { id: 1, name: "Kara Boutique" }
  },
  {
    id: 4,
    name: "Tablette WorkTab 10",
    price: 120000,
    rating: 4.6,
    reviews: 42,
    category: "Électronique",
    description: "La puissance d'un PC dans la finesse d'une tablette. Idéale pour les créatifs et les professionnels mobiles. Compatible avec stylet et clavier pour une productivité maximale.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-spaceblack-wifi_AV1?wid=1200&hei=1200&fmt=jpeg",
    badge: "Exclusivité",
    specs: ["Écran 2K 10.5\"", "Quad Speakers", "Puce M-Series", "Finition Aluminium"],
    stock: 5,
    shop: { id: 2, name: "Sokodé High-Tech" }
  },
  {
    id: 5,
    name: "Robe d'Été Fleurie",
    price: 18500,
    rating: 4.9,
    reviews: 31,
    category: "Mode & Beauté",
    description: "Une robe légère et élégante pour vos sorties ensoleillées. Tissu respirant de haute qualité avec des motifs floraux modernes.",
    image: "https://images.unsplash.com/photo-1572804013307-a9a11198427e?q=80&w=1000&auto=format&fit=crop",
    badge: "Tendance",
    specs: ["100% Coton", "Lavage machine", "Tailles S à XL"],
    stock: 20,
    shop: { id: 3, name: "Lomé Fashion" }
  },
  {
    id: 6,
    name: "Café de Kpalimé (Aroma)",
    price: 3500,
    rating: 5.0,
    reviews: 156,
    category: "Produits Locaux",
    description: "Le meilleur café du Togo, torréfié artisanalement à Kpalimé. Un arôme intense et une saveur authentique qui soutient les producteurs locaux.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
    badge: "Local",
    specs: ["Torréfaction artisanale", "250g", "Grains entiers ou moulu"],
    stock: 100,
    shop: { id: 4, name: "Coopérative Kpalimé" }
  }
];

export const categories = [
  { id: 1, name: "Tout", icon: "🏠" },
  { id: 2, name: "Électronique", icon: "💻", count: "1.2k+ produits" },
  { id: 3, name: "Mode & Beauté", icon: "👗", count: "850+ produits" },
  { id: 4, name: "Maison", icon: "🏠", count: "430+ produits" },
  { id: 5, name: "Produits Locaux", icon: "🇹🇬", count: "210+ produits" },
];
