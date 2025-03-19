
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, formatPrice } from '@/lib/data';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
      duration: 3000,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:scale-[1.02] border border-gray-200">
        {/* Discount badge */}
        {product.discountPrice && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
        
        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-3 right-3 z-10 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            NEW
          </div>
        )}
        
        {/* Product image */}
        <div className="overflow-hidden h-48 md:h-64 bg-gray-100 relative transition-all duration-300">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'img-blur-up loaded' : 'img-blur-up'
            }`}
            onLoad={() => setImageLoaded(true)}
            width={600}
            height={400}
          />
          
          {/* Quick action buttons overlay */}
          <div className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/0 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleWishlist}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-all transform hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-all transform hover:scale-110"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">{product.name}</h3>
          
          <div className="mt-2 flex items-center space-x-2">
            {product.discountPrice ? (
              <>
                <span className="font-semibold">{formatPrice(product.discountPrice)}</span>
                <span className="text-gray-500 line-through text-sm">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-semibold">{formatPrice(product.price)}</span>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 space-y-1">
            <p className="line-clamp-1">{product.specs.processor}</p>
            <p className="line-clamp-1">{product.specs.memory} • {product.specs.storage}</p>
            <p className="line-clamp-1">{product.specs.display}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
