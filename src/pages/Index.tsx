
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AgeVerificationModal } from '../components/AgeVerificationModal';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ProductCard } from '../components/ProductCard';
import { CategorySection } from '../components/CategorySection';
import { ShoppingCart as ShoppingCartComponent } from '../components/ShoppingCart';
import { ProductPage } from '../components/ProductPage';
import { DeliveryChecker } from '../components/DeliveryChecker';
import { ProductCarousel } from '../components/ProductCarousel';
import { products, getProductsByCategory, Product, getFeaturedProducts } from '../data/products';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');

  const featuredProducts = getFeaturedProducts();
  const rumProducts = getProductsByCategory('rum');
  const vodkaProducts = getProductsByCategory('vodka');
  const beerProducts = getProductsByCategory('beer');

  const categories = [
    { name: "Rum", count: rumProducts.length, icon: "🥃" },
    { name: "Vodka", count: vodkaProducts.length, icon: "🍸" },
    { name: "Beer", count: beerProducts.length, icon: "🍺" },
    { name: "Traditional", count: getProductsByCategory('traditional').length, icon: "🍶" }
  ];

  const addToCart = (product: Product) => {
    if (!product.availability) return;
    
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
    <div className="min-h-screen bg-gray-50">
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
      <Header 
        cartItemsCount={totalCartItems}
        onCartClick={() => setShowCart(true)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection categories={categories} />

      {/* Featured Products */}
      <section className="py-16 px-4 lg:px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium spirits with special offers and discounts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Product Carousels */}
      <div className="bg-gray-50">
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
      </div>

      {/* Delivery Checker */}
      <DeliveryChecker />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">N</span>
                </div>
                <span className="text-xl font-bold">Neon Spirit</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's fastest liquor delivery service. Premium spirits delivered to your doorstep in 30 minutes.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Rum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vodka</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wine</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              Drink Responsibly. Must be 21+ to purchase.
              <br />
              © 2024 Neon Spirit Shoppe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
