
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product, CartItem, products, categories, getFeaturedProducts, getNewProducts, getDiscountedProducts } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProduct from '@/components/FeaturedProduct';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  
  // Initialize data on component mount
  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
    setNewArrivals(getNewProducts());
    setDiscountedProducts(getDiscountedProducts());
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product already in cart
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new product to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cartItems} />
      
      <main className="flex-grow">
        {/* Hero section with featured product */}
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {featuredProducts.length > 0 && (
              <FeaturedProduct 
                product={featuredProducts[0]} 
                onAddToCart={handleAddToCart} 
              />
            )}
          </div>
        </section>
        
        {/* Categories section */}
        <section className="py-16 bg-gray-50 border-t-4 border-supabase-green">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Categories</h2>
                <p className="text-gray-600">Explore our collection of premium laptops</p>
              </div>
              <Link to="/products" className="inline-flex items-center mt-4 md:mt-0 text-supabase-green hover:text-supabase-darkGreen">
                View All Categories
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* New arrivals section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
                <p className="text-gray-600">The latest and greatest laptops have landed</p>
              </div>
              <Link to="/products?filter=new" className="inline-flex items-center mt-4 md:mt-0 text-supabase-green hover:text-supabase-darkGreen">
                View All New Arrivals
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Special offers section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 border-t-4 border-supabase-green">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers</h2>
                <p className="text-gray-600">Limited time deals you don't want to miss</p>
              </div>
              <Link to="/deals" className="inline-flex items-center mt-4 md:mt-0 text-supabase-green hover:text-supabase-darkGreen">
                View All Deals
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {discountedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
              <p className="text-gray-300 mb-8">
                Stay updated with the latest products and special offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md text-black"
                />
                <Button variant="supabase" className="px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
