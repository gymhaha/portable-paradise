
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  Heart, 
  Share, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product, CartItem, getProductById, getRelatedProducts, formatPrice } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Load product and cart data
  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(foundProduct));
        setCurrentImageIndex(0);
        setImageLoaded(false);
      } else {
        // Redirect to 404 if product not found
        navigate('/not-found');
      }
    }
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, [id, navigate]);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already in cart
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new product to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} (Qty: ${quantity}) has been added to your cart`,
      duration: 3000,
    });
  };
  
  const handleAddRelatedToCart = (relatedProduct: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === relatedProduct.id);
      
      if (existingItem) {
        // Increase quantity if product already in cart
        return prevItems.map(item => 
          item.id === relatedProduct.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new product to cart
        return [...prevItems, { ...relatedProduct, quantity: 1 }];
      }
    });
  };
  
  const changeImage = (index: number) => {
    setCurrentImageIndex(index);
    setImageLoaded(false);
  };
  
  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex(prev => (prev + 1) % product.images.length);
    setImageLoaded(false);
  };
  
  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
    setImageLoaded(false);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist`,
      duration: 3000,
    });
  };
  
  if (!product) {
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
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex text-sm text-gray-500">
              <li className="flex items-center">
                <Link to="/" className="hover:text-gray-900">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="hover:text-gray-900">Laptops</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link 
                  to={`/products?category=${encodeURIComponent(product.category)}`} 
                  className="hover:text-gray-900"
                >
                  {product.category}
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium truncate max-w-[200px]">
                {product.name}
              </li>
            </ol>
          </nav>
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 mb-4">
                {/* Main image */}
                <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Navigation arrows */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -mt-6 bg-white/80 hover:bg-white rounded-full p-2 shadow-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -mt-6 bg-white/80 hover:bg-white rounded-full p-2 shadow-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {/* New badge */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                
                {/* Discount badge */}
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => changeImage(index)}
                    className={`rounded border overflow-hidden aspect-square ${
                      currentImageIndex === index 
                        ? 'border-black' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-24">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {product.brand}
                    </span>
                    <div className="flex items-center ml-4">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.round(product.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300 fill-gray-300"
                            } 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    {product.discountPrice ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          {formatPrice(product.discountPrice)}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={product.stock > 0 ? 'text-green-700' : 'text-red-700'}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                {/* Key specs */}
                <div className="mb-6">
                  <h2 className="font-medium mb-3">Key Specifications:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Processor:</span>
                      <span>{product.specs.processor}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Memory:</span>
                      <span>{product.specs.memory}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Storage:</span>
                      <span>{product.specs.storage}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Display:</span>
                      <span>{product.specs.display}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">Graphics:</span>
                      <span>{product.specs.graphics}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-24">OS:</span>
                      <span>{product.specs.operatingSystem}</span>
                    </div>
                  </div>
                </div>
                
                {/* Add to cart section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-4 mb-4">
                    {/* Quantity selector */}
                    <div className="flex border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-3 py-2 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={18} />
                      </button>
                      <div className="w-12 flex items-center justify-center border-x border-gray-300">
                        {quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="px-3 py-2 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    {/* Add to cart button */}
                    <Button 
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                  
                  {/* Wishlist and share buttons */}
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={handleAddToWishlist}
                    >
                      <Heart size={18} />
                      <span>Add to Wishlist</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Share size={18} />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
                
                {/* Shipping and returns info */}
                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Truck size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Free delivery</p>
                      <p className="text-gray-600">Free shipping on orders over $999</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="font-medium">2 Years Warranty</p>
                      <p className="text-gray-600">All our products include warranty</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <RotateCcw size={18} />
                    </div>
                    <div>
                      <p className="font-medium">30-day returns</p>
                      <p className="text-gray-600">Return or exchange within 30 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product details tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="details">Full Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="px-1">
                <div className="prose max-w-none">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Brand</td>
                        <td className="py-3 px-4">{product.brand}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Processor</td>
                        <td className="py-3 px-4">{product.specs.processor}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Memory</td>
                        <td className="py-3 px-4">{product.specs.memory}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Storage</td>
                        <td className="py-3 px-4">{product.specs.storage}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Display</td>
                        <td className="py-3 px-4">{product.specs.display}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Graphics</td>
                        <td className="py-3 px-4">{product.specs.graphics}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Operating System</td>
                        <td className="py-3 px-4">{product.specs.operatingSystem}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium bg-gray-50">Battery Life</td>
                        <td className="py-3 px-4">{product.specs.batteryLife}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium bg-gray-50">Weight</td>
                        <td className="py-3 px-4">{product.specs.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={24} 
                        className={i < Math.round(product.rating) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300 fill-gray-300"
                        } 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    Based on {product.reviewCount} reviews
                  </p>
                  
                  <Button variant="outline">Write a Review</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping">
                <div className="space-y-6 max-w-3xl mx-auto px-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-600">
                      We offer free standard shipping on all orders over $999. For orders under $999, 
                      standard shipping rates apply. Expedited shipping options are available at checkout.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Delivery Timeframes</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Standard Shipping: 3-5 business days</li>
                      <li>Expedited Shipping: 2-3 business days</li>
                      <li>Next-Day Shipping: Next business day</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                    <p className="text-gray-600">
                      We offer a 30-day return policy. If you're not satisfied with your purchase, 
                      you can return it within 30 days of delivery for a full refund or exchange.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Warranty Information</h3>
                    <p className="text-gray-600">
                      All laptops come with a 2-year manufacturer's warranty covering hardware defects 
                      and malfunctions. Extended warranty options are available at checkout.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddRelatedToCart} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
