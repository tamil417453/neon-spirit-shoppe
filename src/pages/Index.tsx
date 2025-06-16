import { useState, useEffect } from 'react';
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
      <header className="relative z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">L</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            LiquorLounge
          </span>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Products</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Categories</a>
          <a href="#" className="hover:text-purple-400 transition-colors">About</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 cursor-pointer hover:text-purple-400 transition-colors" />
          <User className="w-6 h-6 cursor-pointer hover:text-purple-400 transition-colors" />
          <div className="relative">
            <ShoppingCart 
              className="w-6 h-6 cursor-pointer hover:text-purple-400 transition-colors" 
              onClick={() => setShowCart(true)}
            />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Bottles */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Premium
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Liquor
              </span>
              <span className="block text-4xl md:text-5xl">Delivered Fast</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-md">
              Discover India's finest collection of premium spirits, delivered to your doorstep with care and authenticity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Shop Now
                <ChevronRight className="inline-block w-5 h-5 ml-2" />
              </motion.button>
              
              <button className="px-8 py-4 border border-purple-400 rounded-full text-lg font-semibold hover:bg-purple-400/10 transition-all duration-300">
                Browse Categories
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-sm">30min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Age verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm">4.8/5 rated</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Bottle Display */}
          <div className="relative h-96 lg:h-[500px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
              <pointLight position={[-10, -10, 10]} intensity={0.5} color="#3b82f6" />
              
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                <LiquorBottle 
                  product={featuredProducts[currentBottle]}
                  position={[0, 0, 0]}
                  rotation={[0, Date.now() * 0.001, 0]}
                />
              </Float>
              
              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
            
            {/* Product Info Overlay */}
            <motion.div
              key={currentBottle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30"
            >
              <h3 className="text-lg font-semibold">{featuredProducts[currentBottle].name}</h3>
              <p className="text-purple-400">₹{featuredProducts[currentBottle].price}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">{featuredProducts[currentBottle].rating}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Featured Products
              </span>
            </h2>
            <p className="text-xl text-gray-400">Handpicked premium spirits for the connoisseur</p>
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
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">L</span>
            </div>
            <span className="text-xl font-bold">LiquorLounge</span>
          </div>
          <p className="text-sm">
            Drink Responsibly. Must be 21+ to purchase. 
            <br />
            © 2024 LiquorLounge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
