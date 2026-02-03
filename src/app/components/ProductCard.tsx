import { Card, CardContent } from '@/app/components/ui/card';
import { motion } from 'framer-motion';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  shopName: string;
  language: 'en' | 'ur';
  onCardClick: () => void;
}

export function ProductCard({ image, name, price, shopName, onCardClick }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card 
        className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white shadow-sm"
        onClick={onCardClick}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50 overflow-hidden relative">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col flex-1 gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem] leading-snug">
                {name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                {shopName}
              </p>
            </div>

            <div className="mt-auto pt-2 flex items-center justify-between">
              <div className="text-xl font-bold text-blue-600">
                ₨{price.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}