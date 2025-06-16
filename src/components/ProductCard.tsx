
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye, Clock, Percent } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onViewProduct?: () => void;
}

export const ProductCard = ({ product, onAddToCart, onViewProduct }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <Percent className="w-3 h-3" />
          {product.discount}% OFF
        </div>
      )}

      {/* Availability Badge */}
      <div className={`absolute top-3 right-3 z-20 px-2 py-1 rounded-full text-xs font-medium ${
        product.availability 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        <div className={`w-2 h-2 rounded-full inline-block mr-1 ${
          product.availability ? 'bg-green-500' : 'bg-red-500'
        }`} />
        {product.availability ? 'Available' : 'Out of Stock'}
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-32 h-40 bg-gradient-to-b from-amber-700/70 to-amber-900/90 rounded-lg border-2 border-amber-600/40 flex items-center justify-center">
            <span className="text-white text-sm font-bold text-center px-2">
              {product.name.split(' ')[0]}
            </span>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Hover overlay */}
        {onViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onViewProduct}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-medium flex items-center gap-2 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.button>
          </motion.div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-xs font-medium">
          {product.category.toUpperCase()}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
            <span>{product.volume}</span>
            <span>•</span>
            <span>{product.alcohol}</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Delivery Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>30 min delivery</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">incl. all taxes</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            disabled={!product.availability}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
              product.availability
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">
              {product.availability ? 'Add' : 'Unavailable'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
