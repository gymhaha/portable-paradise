
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType, formatPrice } from '@/lib/data';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };
  
  const handleRemove = () => {
    onRemove(item.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-200 animate-fade-in">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover ${
              imageLoaded ? 'img-blur-up loaded' : 'img-blur-up'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
      </div>
      
      {/* Product info */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-gray-600">
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
          </div>
          
          <div className="mt-2 sm:mt-0 text-right">
            <p className="font-medium">
              {item.discountPrice 
                ? formatPrice(item.discountPrice) 
                : formatPrice(item.price)
              }
            </p>
            {item.discountPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(item.price)}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          {/* Quantity controls */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={handleDecrement}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Reduce quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
              disabled={item.quantity >= item.stock}
            >
              <Plus size={14} />
            </button>
          </div>
          
          {/* Subtotal and remove */}
          <div className="flex items-center gap-4">
            <p className="font-medium">
              {formatPrice((item.discountPrice || item.price) * item.quantity)}
            </p>
            <button
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
