
import { useState } from 'react';
import { Search, ShoppingCart, User, MapPin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Select Location');

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-cyan-500/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-xl lg:text-2xl font-bold">N</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Neon Spirit
              </span>
              <span className="text-xs text-cyan-400/80 tracking-wider">PREMIUM DELIVERY</span>
            </div>
          </div>

          {/* Location Selector - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 cursor-pointer hover:text-cyan-400 transition-colors">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Deliver to</span>
              <span className="text-xs text-gray-400">{location}</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for liquor, beer, wine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <Search className="w-6 h-6 lg:hidden cursor-pointer hover:text-cyan-400 transition-colors" />
            
            {/* User Icon */}
            <User className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-colors" />
            
            {/* Cart */}
            <div className="relative">
              <ShoppingCart 
                className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-colors" 
                onClick={onCartClick}
              />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-700/50 py-4"
            >
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for liquor, beer, wine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400"
                />
              </div>

              {/* Mobile Location */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-cyan-400 transition-colors mb-4">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Deliver to</span>
                  <span className="text-xs text-gray-400">{location}</span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                <a href="#" className="block py-2 hover:text-cyan-400 transition-colors">Home</a>
                <a href="#" className="block py-2 hover:text-cyan-400 transition-colors">Categories</a>
                <a href="#" className="block py-2 hover:text-cyan-400 transition-colors">Offers</a>
                <a href="#" className="block py-2 hover:text-cyan-400 transition-colors">About</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
