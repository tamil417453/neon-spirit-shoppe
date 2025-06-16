
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  category: 'rum' | 'vodka' | 'beer' | 'traditional';
  alcohol: string;
  description: string;
  volume: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  // Rum
  {
    id: 1,
    name: "Old Monk",
    brand: "Old Monk",
    price: 850,
    image: "/placeholder.svg",
    rating: 4.8,
    category: "rum",
    alcohol: "42.8%",
    volume: "750ml",
    description: "India's most beloved dark rum with a smooth, rich flavor profile.",
    reviews: [
      { id: 1, user: "Rajesh K.", rating: 5, comment: "Classic taste, never disappoints!", date: "2024-01-15" },
      { id: 2, user: "Priya S.", rating: 4, comment: "Great for cocktails", date: "2024-01-10" }
    ]
  },
  {
    id: 2,
    name: "McDowell's Celebration",
    brand: "McDowell's",
    price: 720,
    image: "/placeholder.svg",
    rating: 4.5,
    category: "rum",
    alcohol: "42.8%",
    volume: "750ml",
    description: "Premium aged rum with notes of vanilla and caramel.",
    reviews: [
      { id: 3, user: "Amit P.", rating: 4, comment: "Smooth finish, good value", date: "2024-01-12" }
    ]
  },
  {
    id: 3,
    name: "Contessa Rum",
    brand: "Contessa",
    price: 650,
    image: "/placeholder.svg",
    rating: 4.2,
    category: "rum",
    alcohol: "42.8%",
    volume: "750ml",
    description: "Light and versatile rum perfect for mixing.",
    reviews: []
  },

  // Vodka
  {
    id: 4,
    name: "Magic Moments",
    brand: "Magic Moments",
    price: 650,
    image: "/placeholder.svg",
    rating: 4.5,
    category: "vodka",
    alcohol: "40%",
    volume: "750ml",
    description: "Premium triple-distilled vodka for the perfect cocktail experience.",
    reviews: [
      { id: 4, user: "Neha M.", rating: 5, comment: "Best vodka in this price range", date: "2024-01-08" }
    ]
  },
  {
    id: 5,
    name: "Romanov Vodka",
    brand: "Romanov",
    price: 580,
    image: "/placeholder.svg",
    rating: 4.3,
    category: "vodka",
    alcohol: "40%",
    volume: "750ml",
    description: "Crystal clear vodka with a clean, crisp taste.",
    reviews: []
  },
  {
    id: 6,
    name: "White Mischief",
    brand: "White Mischief",
    price: 750,
    image: "/placeholder.svg",
    rating: 4.4,
    category: "vodka",
    alcohol: "40%",
    volume: "750ml",
    description: "Premium vodka with a smooth, refined character.",
    reviews: []
  },

  // Beer
  {
    id: 7,
    name: "Kingfisher Premium",
    brand: "Kingfisher",
    price: 180,
    image: "/placeholder.svg",
    rating: 4.3,
    category: "beer",
    alcohol: "4.8%",
    volume: "650ml",
    description: "India's favorite premium lager beer with crisp, refreshing taste.",
    reviews: [
      { id: 5, user: "Vikram R.", rating: 4, comment: "Refreshing after a long day", date: "2024-01-14" }
    ]
  },
  {
    id: 8,
    name: "Bira 91 White",
    brand: "Bira 91",
    price: 220,
    image: "/placeholder.svg",
    rating: 4.6,
    category: "beer",
    alcohol: "4.9%",
    volume: "330ml",
    description: "Craft wheat beer with a citrusy flavor and smooth finish.",
    reviews: []
  },
  {
    id: 9,
    name: "Haywards 5000",
    brand: "Haywards",
    price: 200,
    image: "/placeholder.svg",
    rating: 4.1,
    category: "beer",
    alcohol: "7%",
    volume: "650ml",
    description: "Strong premium beer with a bold taste.",
    reviews: []
  },
  {
    id: 10,
    name: "Old Monk 10000 Super",
    brand: "Old Monk",
    price: 250,
    image: "/placeholder.svg",
    rating: 4.4,
    category: "beer",
    alcohol: "8%",
    volume: "650ml",
    description: "High-strength premium beer with rich malty flavor.",
    reviews: []
  },

  // Traditional
  {
    id: 11,
    name: "Cazulo Feni",
    brand: "Cazulo",
    price: 950,
    image: "/placeholder.svg",
    rating: 4.0,
    category: "traditional",
    alcohol: "43%",
    volume: "750ml",
    description: "Authentic Goan feni made from cashew fruit.",
    reviews: [
      { id: 6, user: "Maria D.", rating: 4, comment: "Authentic Goan taste", date: "2024-01-05" }
    ]
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};
