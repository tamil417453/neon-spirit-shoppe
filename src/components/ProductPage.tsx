
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { LiquorBottle } from './LiquorBottle';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const ProductPage = ({ product, onAddToCart, onBack }: ProductPageProps) => {
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews'>('description');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 3D Product View */}
        <div className="relative h-96 lg:h-[600px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
            <pointLight position={[-10, -10, 10]} intensity={0.5} color="#3b82f6" />
            
            <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
              <LiquorBottle product={product} position={[0, 0, 0]} />
            </Float>
            
            <Environment preset="night" />
            <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-purple-400 mb-4">{product.brand}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg">{product.rating}</span>
                <span className="text-gray-400">({product.reviews.length} reviews)</span>
              </div>
              <span className="px-3 py-1 bg-purple-600/30 rounded-full text-sm">
                {product.category.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-gray-400 text-sm">Alcohol Content</h3>
                <p className="text-white font-semibold">{product.alcohol}</p>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-gray-400 text-sm">Volume</h3>
                <p className="text-white font-semibold">{product.volume}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-3xl font-bold text-white">₹{product.price}</span>
                <span className="text-gray-400 ml-2">incl. all taxes</span>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              
              <button className="px-4 py-3 border border-purple-500 rounded-lg hover:bg-purple-500/10 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-purple-500/30 mb-4">
              <button
                onClick={() => setSelectedTab('description')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  selectedTab === 'description'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  selectedTab === 'reviews'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>

            {selectedTab === 'description' && (
              <div className="text-gray-300 leading-relaxed">
                {product.description}
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews.length === 0 ? (
                  <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                ) : (
                  product.reviews.map((review) => (
                    <div key={review.id} className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">{review.comment}</p>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
