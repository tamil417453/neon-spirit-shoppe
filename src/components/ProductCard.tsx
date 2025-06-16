
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  alcohol: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center overflow-hidden">
        <div className="w-32 h-48 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-xl transform group-hover:scale-110 transition-transform duration-500">
          {/* Simulated bottle with gradient */}
          <div className="w-full h-full rounded-lg bg-gradient-to-b from-amber-700/60 to-amber-900/80 border border-amber-600/30 relative">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-yellow-600 rounded-sm"></div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-black/80 rounded border border-purple-400/30 flex items-center justify-center">
              <span className="text-xs text-purple-300 font-bold text-center leading-tight">
                {product.name.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30 hover:bg-white/30 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
          {product.category.toUpperCase()}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{product.rating}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-purple-400">{product.alcohol}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-white">₹{product.price}</span>
            <span className="text-sm text-gray-400 ml-2">incl. taxes</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add</span>
          </motion.button>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};
