import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, User, MapPin, Star, ChevronRight, Clock, Shield } from 'lucide-react';
import { AgeVerificationModal } from '../components/AgeVerificationModal';
import { LiquorBottle } from '../components/LiquorBottle';
import { ProductCard } from '../components/ProductCard';
import { CategorySection } from '../components/CategorySection';
import { ShoppingCart as ShoppingCartComponent } from '../components/ShoppingCart';
import { ProductPage } from '../components/ProductPage';
import { DeliveryChecker } from '../components/DeliveryChecker';
import { ProductCarousel } from '../components/ProductCarousel';
import { products, getProductsByCategory, Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [currentBottle, setCurrentBottle] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');

  const featuredProducts = products.slice(0, 3);
  const rumProducts = getProductsByCategory('rum');
  const vodkaProducts = getProductsByCategory('vodka');
  const beerProducts = getProductsByCategory('beer');

  const categories = [
    { name: "Rum", count: rumProducts.length, icon: "🥃" },
    { name: "Vodka", count: vodkaProducts.length, icon: "🍸" },
    { name: "Beer", count: beerProducts.length, icon: "🍺" },
    { name: "Traditional", count: getProductsByCategory('traditional').length, icon: "🍶" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBottle((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const backToHome = () => {
    setSelectedProduct(null);
    setCurrentView('home');
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (currentView === 'product' && selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct}
        onAddToCart={addToCart}
        onBack={backToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <AgeVerificationModal 
        isOpen={showAgeVerification} 
        onClose={() => setShowAgeVerification(false)} 
      />
      
      <ShoppingCartComponent
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
      
      {/* Header */}
      <header className="relative z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="text-2xl font-bold">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Neon Spirit Shoppe
            </span>
            <span className="text-xs text-cyan-400/80 tracking-wider">PREMIUM LIQUOR DELIVERY</span>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-cyan-400 transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors relative group">
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors relative group">
            Categories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-colors" />
          <User className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-colors" />
          <div className="relative">
            <ShoppingCart 
              className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-colors" 
              onClick={() => setShowCart(true)}
            />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {totalCartItems}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Enhanced Neon Styling */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-purple-900/10 to-pink-900/10"></div>
        
        {/* Floating Neon Orbs */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 10)}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-7xl md:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block text-white drop-shadow-2xl">Neon</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Spirit
                </span>
                <span className="block text-5xl md:text-6xl text-cyan-300 drop-shadow-lg">Shoppe</span>
              </motion.h1>
              
              <motion.div 
                className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Experience the future of premium liquor delivery. Discover India's finest collection of spirits, 
              delivered with precision and style to your doorstep.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border border-cyan-500/30"
              >
                Explore Collection
                <ChevronRight className="inline-block w-5 h-5 ml-2" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border border-cyan-400 rounded-full text-lg font-semibold hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm"
              >
                Browse Categories
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-8 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">30min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Age verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm">4.9/5 rated</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Bottle Display */}
          <motion.div 
            className="relative h-96 lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-cyan-400">Loading 3D Model...</div>
              </div>
            }>
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 45 }}
                onError={(error) => {
                  console.error('Canvas error:', error);
                }}
              >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
                <pointLight position={[-10, -10, 10]} intensity={0.8} color="#a855f7" />
                <pointLight position={[0, 10, -10]} intensity={0.6} color="#ec4899" />
                
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                  <LiquorBottle 
                    product={featuredProducts[currentBottle]}
                    position={[0, 0, 0]}
                  />
                </Float>
                
                <Environment preset="night" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
              </Canvas>
            </Suspense>
            
            {/* Enhanced Product Info Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBottle}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-2">{featuredProducts[currentBottle].name}</h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  ₹{featuredProducts[currentBottle].price}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">{featuredProducts[currentBottle].rating}</span>
                  </div>
                  <span className="text-sm text-cyan-400">{featuredProducts[currentBottle].alcohol}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Neon Ring Animation */}
            <motion.div
              className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ 
                clipPath: "polygon(0% 0%, 100% 0%, 100% 10%, 0% 10%)",
                filter: "blur(1px)"
              }}
            />
          </motion.div>
        </div>

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection categories={categories} />

      {/* Product Carousels */}
      <ProductCarousel 
        title="Premium Rum Collection"
        products={rumProducts}
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />

      <ProductCarousel 
        title="Vodka Selection"
        products={vodkaProducts}
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />

      <ProductCarousel 
        title="Beer Collection"
        products={beerProducts}
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />

      {/* Featured Products */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Spirits
              </span>
            </h2>
            <p className="text-xl text-gray-400">Handpicked premium spirits for the discerning connoisseur</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={() => addToCart(product)}
                  onViewProduct={() => viewProduct(product)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Checker */}
      <DeliveryChecker />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-cyan-500/20 bg-black/50">
        <div className="container mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-xl font-bold">N</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Neon Spirit Shoppe
              </span>
              <span className="text-xs text-cyan-400/60 tracking-wider">PREMIUM LIQUOR DELIVERY</span>
            </div>
          </div>
          <p className="text-sm">
            Drink Responsibly. Must be 21+ to purchase. 
            <br />
            © 2024 Neon Spirit Shoppe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
