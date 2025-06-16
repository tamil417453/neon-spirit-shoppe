
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check, X, Clock } from 'lucide-react';

const serviceableAreas = [
  { pincode: '110001', area: 'New Delhi', deliveryTime: '30-45 mins' },
  { pincode: '400001', area: 'Mumbai', deliveryTime: '25-40 mins' },
  { pincode: '560001', area: 'Bangalore', deliveryTime: '35-50 mins' },
  { pincode: '600001', area: 'Chennai', deliveryTime: '40-60 mins' },
  { pincode: '700001', area: 'Kolkata', deliveryTime: '30-45 mins' },
  { pincode: '500001', area: 'Hyderabad', deliveryTime: '35-50 mins' },
];

export const DeliveryChecker = () => {
  const [pincode, setPincode] = useState('');
  const [checkResult, setCheckResult] = useState<{
    available: boolean;
    area?: string;
    deliveryTime?: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    if (!pincode.trim()) return;
    
    setIsChecking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const serviceArea = serviceableAreas.find(area => 
      area.pincode.startsWith(pincode.slice(0, 3))
    );
    
    setCheckResult({
      available: !!serviceArea,
      area: serviceArea?.area,
      deliveryTime: serviceArea?.deliveryTime
    });
    
    setIsChecking(false);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
      <div className="container mx-auto text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Check Delivery Availability</h3>
          <p className="text-gray-400 mb-6">Enter your pincode to check if we deliver to your area</p>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter your pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              maxLength={6}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheck}
              disabled={isChecking || !pincode.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
            >
              {isChecking ? 'Checking...' : 'Check'}
            </motion.button>
          </div>

          {checkResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${
                checkResult.available
                  ? 'border-green-500/30 bg-green-500/10'
                  : 'border-red-500/30 bg-red-500/10'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                {checkResult.available ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  checkResult.available ? 'text-green-400' : 'text-red-400'
                }`}>
                  {checkResult.available ? 'Available' : 'Not Available'}
                </span>
              </div>
              
              {checkResult.available && checkResult.area && (
                <div className="space-y-1">
                  <p className="text-white">We deliver to {checkResult.area}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm">
                      Estimated delivery: {checkResult.deliveryTime}
                    </span>
                  </div>
                </div>
              )}
              
              {!checkResult.available && (
                <p className="text-gray-300">
                  We don't deliver to this area yet. We're expanding soon!
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
