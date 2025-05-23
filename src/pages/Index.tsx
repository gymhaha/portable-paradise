
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { Product, CartItem, products, categories, getFeaturedProducts, getNewProducts, getDiscountedProducts } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProduct from '@/components/FeaturedProduct';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import ProductCarousel from '@/components/ProductCarousel';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  
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

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }
  
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
        
        {/* Product Carousel */}
        <section className="py-12 border-t-4 border-supabase-green">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Products</h2>
                <p className="text-gray-600">Our most popular products this week</p>
              </div>
              <Link to="/products" className="inline-flex items-center mt-4 md:mt-0 text-supabase-green hover:text-supabase-darkGreen">
                View All Products
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <ProductCarousel products={products.slice(0, 6)} onAddToCart={handleAddToCart} />
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

        {/* Get in touch section */}
        <section id="support" className="py-16 bg-gray-50 border-t-4 border-supabase-green">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our products or services? We're here to help you find the perfect laptop for your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us how we can help you..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </Form>
              </div>
              
              {/* Contact info cards */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                    <div className="p-3 bg-supabase-green/10 rounded-full mb-4">
                      <Phone className="h-6 w-6 text-supabase-green" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Call Us</h4>
                    <p className="text-gray-600 mb-3">Mon-Fri from 8am to 5pm</p>
                    <a href="tel:+918374700000" className="text-supabase-green hover:underline font-medium">
                      +91 83747
                    </a>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                    <div className="p-3 bg-supabase-green/10 rounded-full mb-4">
                      <Mail className="h-6 w-6 text-supabase-green" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Email Us</h4>
                    <p className="text-gray-600 mb-3">We'll respond as soon as possible</p>
                    <a href="mailto:xyz@gmail.com" className="text-supabase-green hover:underline font-medium">
                      xyz@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <div className="p-3 bg-supabase-green/10 rounded-full mb-4">
                    <MessageCircle className="h-6 w-6 text-supabase-green" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Live Chat</h4>
                  <p className="text-gray-600 mb-4">Get instant help from our team</p>
                  <Button variant="outline" className="border-supabase-green text-supabase-green hover:bg-supabase-green/10">
                    Start Chat
                  </Button>
                </div>
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
