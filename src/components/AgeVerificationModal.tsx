
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgeVerificationModal = ({ isOpen, onClose }: AgeVerificationModalProps) => {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 21) {
      setError('You must be 21 or older to access this site');
      return;
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-gray-900/95 to-black/95 border-2 border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-cyan-500/20 backdrop-blur-md"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative mb-6"
              >
                <Shield className="w-20 h-20 text-cyan-400 mx-auto" />
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold text-white mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Age Verification
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-400 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Welcome to <span className="text-cyan-400 font-semibold">Neon Spirit Shoppe</span>
                <br />
                You must be 21 years or older to enter this site
              </motion.p>
            </div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVerify}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-semibold border border-cyan-500/30"
                >
                  I am 21+
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
                >
                  Exit
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-xs text-gray-500 leading-relaxed">
                Please drink responsibly. Alcoholic beverages are for adults 21 and over.
                <br />
                <span className="text-cyan-400/60">Neon Spirit Shoppe</span> promotes responsible consumption.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
