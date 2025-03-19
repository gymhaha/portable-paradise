
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product, formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface FeaturedProductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const FeaturedProduct = ({ product, onAddToCart }: FeaturedProductProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 h-[500px] md:h-[600px] w-full">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/40 z-10"></div>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center ${
            imageLoaded ? 'img-blur-up loaded' : 'img-blur-up'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-2xl">
        <div className="space-y-6 animate-slide-in">
          <div className="inline-block px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm text-sm font-medium">
            New Arrival
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="text-2xl md:text-3xl font-bold">
              {product.discountPrice 
                ? formatPrice(product.discountPrice) 
                : formatPrice(product.price)
              }
            </div>
            
            {product.discountPrice && (
              <div className="text-xl text-gray-500 line-through">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button 
              size="lg" 
              className="group"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </Button>
            
            <Link to={`/product/${product.id}`}>
              <Button 
                size="lg" 
                variant="outline" 
                className="group"
              >
                <span>View Details</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
