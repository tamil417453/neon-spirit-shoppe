
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
  onViewProduct?: () => void;
}

export const ProductCard = ({ product, onAddToCart, onViewProduct }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border-2 border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 shadow-lg hover:shadow-cyan-500/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 flex items-center justify-center overflow-hidden">
        <div className="w-32 h-48 bg-gradient-to-b from-gray-700/80 to-gray-900/80 rounded-lg shadow-2xl transform group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20">
          {/* Enhanced Simulated bottle */}
          <div className="w-full h-full rounded-lg bg-gradient-to-b from-amber-700/70 to-amber-900/90 border-2 border-amber-600/40 relative overflow-hidden">
            {/* Bottle cap */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-sm shadow-lg"></div>
            
            {/* Label */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-black/90 rounded border-2 border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-xs text-cyan-300 font-bold text-center leading-tight px-1">
                {product.name.split(' ')[0]}
              </span>
            </div>
            
            {/* Liquid effect */}
            <motion.div
              className="absolute bottom-2 left-2 right-2 h-32 bg-gradient-to-t from-amber-600/60 to-amber-400/40 rounded-b"
              animate={isHovered ? { 
                background: "linear-gradient(to top, rgba(251, 191, 36, 0.7), rgba(245, 158, 11, 0.5))" 
              } : {}}
              transition={{ duration: 0.3 }}
            />
            
            {/* Reflection */}
            <div className="absolute top-6 left-2 w-2 h-8 bg-white/30 rounded-full blur-sm"></div>
          </div>
        </div>

        {/* Enhanced Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm flex items-center justify-center"
        >
          {onViewProduct && (
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              onClick={onViewProduct}
              className="px-6 py-3 bg-black/70 backdrop-blur-sm rounded-full text-white border-2 border-cyan-400/50 hover:bg-black/80 transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Eye className="w-5 h-5" />
              View Details
            </motion.button>
          )}
        </motion.div>

        {/* Enhanced Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cyan-600/90 to-purple-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
          {product.category.toUpperCase()}
        </div>
      </div>

      {/* Enhanced Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300 font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-cyan-400 font-medium">{product.alcohol}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-400 ml-2">incl. taxes</span>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2 border border-cyan-500/30"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add</span>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent, rgba(168, 85, 247, 0.1), transparent)",
          backgroundSize: "400% 400%",
        }}
        animate={isHovered ? {
          backgroundPosition: ["0% 0%", "100% 100%"],
        } : {}}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};
