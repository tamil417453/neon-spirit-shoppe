
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Shield, Star, Truck } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh] py-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Order
                <span className="block text-yellow-300">Premium</span>
                <span className="block text-4xl lg:text-5xl">Liquor Online</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/90 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Get your favorite spirits, wines, and beers delivered to your doorstep in 30 minutes.
              </motion.p>
            </div>

            {/* Quick Search */}
            <motion.div 
              className="bg-white rounded-2xl p-4 shadow-2xl max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <input
                  type="text"
                  placeholder="Enter your delivery location"
                  className="flex-1 text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
              <div className="h-px bg-gray-200 my-3" />
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for liquor, beer, wine..."
                  className="flex-1 text-gray-700 placeholder-gray-400 outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Search
                </motion.button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-white/90">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">30min delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="text-sm font-medium">Age verified</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span className="text-sm font-medium">4.9/5 rated</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Truck className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium">Free delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=800&fit=crop"
                alt="Premium Liquor Collection"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 -left-6 bg-white rounded-2xl p-4 shadow-xl z-20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">30 min</p>
                  <p className="text-sm text-gray-600">Delivery</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-10 -right-6 bg-white rounded-2xl p-4 shadow-xl z-20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9★</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
