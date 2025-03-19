
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, AlertCircle, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, formatPrice } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Load cart from localStorage
  useEffect(() => {
    setLoading(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
    setLoading(false);
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
      duration: 3000,
    });
  };
  
  const handleClearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      duration: 3000,
    });
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout process",
      description: "This would normally proceed to checkout",
      duration: 3000,
    });
    // In a real app, navigate to checkout page
    // navigate('/checkout');
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.discountPrice || item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);
  
  const shippingCost = subtotal > 999 ? 0 : 35;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shippingCost + tax;
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartItems={cartItems} />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse p-12">
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-32"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cartItems} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-3" />
            Shopping Cart
          </h1>
          
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingCart size={36} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Looks like you haven't added any laptops to your cart yet. 
                Browse our collection to find the perfect laptop for you.
              </p>
              <Link to="/products">
                <Button className="flex items-center">
                  Continue Shopping
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart items list */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-medium">
                      Cart Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </h2>
                    <button 
                      onClick={handleClearCart}
                      className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y divide-gray-200 px-6">
                    {cartItems.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                  
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <Link 
                      to="/products" 
                      className="text-black hover:underline inline-flex items-center"
                    >
                      <ArrowRight size={16} className="mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-24">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Order Summary</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>{formatPrice(shippingCost)}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (7%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    
                    {shippingCost === 0 && (
                      <div className="bg-green-50 rounded p-3 text-sm flex">
                        <div className="text-green-500 mr-2">
                          <AlertCircle size={16} />
                        </div>
                        <p className="text-green-800">
                          You've qualified for free shipping!
                        </p>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <div className="mt-4 text-center text-xs text-gray-500">
                      <p>Secure Checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
