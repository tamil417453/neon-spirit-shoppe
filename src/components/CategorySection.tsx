
import { motion } from 'framer-motion';

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <section className="py-20 px-6 bg-black/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Premium Categories
            </span>
          </h2>
          <p className="text-xl text-gray-400">Explore our curated collection of finest spirits</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)"
              }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border-2 border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400/50 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Neon glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent, rgba(168, 85, 247, 0.1), transparent)",
                  backgroundSize: "400% 400%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                  {category.name}
                </h3>
                
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-gray-400">{category.count} products</span>
                  <motion.div
                    className="w-1 h-1 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                <motion.div
                  className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
