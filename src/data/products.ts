
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  alcohol: string;
  description: string;
  brand: string;
  volume: string;
  availability: boolean;
  discount?: number;
  originalPrice?: number;
}

export const products: Product[] = [
  // Rum Category
  {
    id: 1,
    name: "Old Monk Dark Rum",
    price: 650,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=600&fit=crop",
    rating: 4.5,
    category: "rum",
    alcohol: "42.8% ABV",
    description: "India's most iconic dark rum with a rich heritage and smooth taste",
    brand: "Old Monk",
    volume: "750ml",
    availability: true,
    discount: 10,
    originalPrice: 720
  },
  {
    id: 2,
    name: "McDowell's Celebration Rum",
    price: 580,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=600&fit=crop",
    rating: 4.2,
    category: "rum",
    alcohol: "42.8% ABV",
    description: "Premium aged rum with smooth finish and rich aroma",
    brand: "McDowell's",
    volume: "750ml",
    availability: true
  },
  {
    id: 3,
    name: "Contessa Rum",
    price: 420,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=600&fit=crop",
    rating: 4.0,
    category: "rum",
    alcohol: "42.8% ABV",
    description: "Light and smooth rum perfect for cocktails",
    brand: "Contessa",
    volume: "750ml",
    availability: true
  },

  // Vodka Category
  {
    id: 4,
    name: "Magic Moments Vodka",
    price: 380,
    image: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=400&h=600&fit=crop",
    rating: 4.1,
    category: "vodka",
    alcohol: "42.8% ABV",
    description: "Premium vodka with crisp and clean taste",
    brand: "Magic Moments",
    volume: "750ml",
    availability: true,
    discount: 15,
    originalPrice: 450
  },
  {
    id: 5,
    name: "Romanov Vodka",
    price: 320,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 3.9,
    category: "vodka",
    alcohol: "42.8% ABV",
    description: "Smooth vodka with neutral taste profile",
    brand: "Romanov",
    volume: "750ml",
    availability: true
  },
  {
    id: 6,
    name: "White Mischief Vodka",
    price: 290,
    image: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=400&h=600&fit=crop",
    rating: 3.8,
    category: "vodka",
    alcohol: "42.8% ABV",
    description: "Affordable vodka with clean finish",
    brand: "White Mischief",
    volume: "750ml",
    availability: true
  },

  // Beer Category
  {
    id: 7,
    name: "Kingfisher Premium Beer",
    price: 140,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=600&fit=crop",
    rating: 4.3,
    category: "beer",
    alcohol: "4.8% ABV",
    description: "India's most popular premium beer with crisp taste",
    brand: "Kingfisher",
    volume: "650ml",
    availability: true
  },
  {
    id: 8,
    name: "Bira 91 Blonde",
    price: 160,
    image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400&h=600&fit=crop",
    rating: 4.4,
    category: "beer",
    alcohol: "4.9% ABV",
    description: "Craft beer with light and refreshing taste",
    brand: "Bira 91",
    volume: "330ml",
    availability: true,
    discount: 5,
    originalPrice: 170
  },
  {
    id: 9,
    name: "Haywards 5000",
    price: 120,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=600&fit=crop",
    rating: 4.0,
    category: "beer",
    alcohol: "8% ABV",
    description: "Strong beer with robust flavor",
    brand: "Haywards",
    volume: "650ml",
    availability: true
  },
  {
    id: 10,
    name: "Old Monk 10000 Super Beer",
    price: 180,
    image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400&h=600&fit=crop",
    rating: 4.2,
    category: "beer",
    alcohol: "8% ABV",
    description: "Premium strong beer from the house of Old Monk",
    brand: "Old Monk",
    volume: "650ml",
    availability: true
  },

  // Traditional Category
  {
    id: 11,
    name: "Goan Feni",
    price: 850,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=600&fit=crop",
    rating: 4.1,
    category: "traditional",
    alcohol: "43% ABV",
    description: "Traditional Goan spirit made from cashew or palm",
    brand: "Goa Traditional",
    volume: "750ml",
    availability: true
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.discount || product.rating >= 4.2);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};
