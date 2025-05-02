
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { CartItem } from '@/lib/data';

interface NavbarProps {
  cartItems: CartItem[];
}

const Navbar = ({ cartItems }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);
  
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    // Add a delay before closing the dropdown
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // 300ms delay
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);
  
  const categories = [
    "Gaming Laptops",
    "Business Laptops",
    "Ultrabooks",
    "Macbooks"
  ];

  // Handle smooth scrolling for anchor links
  const handleSupportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If not on homepage, navigate to homepage with hash
    if (location.pathname !== '/') {
      window.location.href = '/#support';
      return;
    }
    
    // If on homepage, smooth scroll to the section
    const supportSection = document.getElementById('support');
    if (supportSection) {
      supportSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass backdrop-blur-md border-b border-gray-200/70' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-semibold"
            >
              <span className="bg-supabase-green text-white px-2 py-1 rounded">LAPPY</span>
              <span>SALE</span>
            </Link>
            
            {!isMobile && (
              <nav className="flex space-x-8 text-sm">
                <Link 
                  to="/" 
                  className="hover:text-gray-600 transition-colors py-2 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <div 
                  className="relative group"
                  ref={dropdownRef}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link 
                    to="/products" 
                    className="hover:text-gray-600 transition-colors py-2 flex items-center relative"
                  >
                    Laptops
                    <ChevronDown size={16} className="ml-1" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <div 
                    className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-40 transition-all duration-200 ${
                      dropdownOpen 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="py-2">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/products?category=${encodeURIComponent(category)}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link 
                  to="/deals" 
                  className="hover:text-gray-600 transition-colors py-2 relative group"
                >
                  Deals
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <a 
                  href="/#support"
                  onClick={handleSupportClick}
                  className="hover:text-gray-600 transition-colors py-2 relative group cursor-pointer"
                >
                  Support
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>
            )}
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              {!isMobile && (
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                </button>
              )}
              
              {!isMobile && (
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Account"
                >
                  <User size={20} />
                </button>
              )}
              
              <Link 
                to="/cart" 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-scale-in">
                    {totalCartItems}
                  </span>
                )}
              </Link>
              
              {isMobile && (
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              searchOpen ? 'h-14 opacity-100 mb-3' : 'h-0 opacity-0'
            }`}
          >
            <div className="relative mt-1">
              <input
                type="text"
                placeholder="Search for laptops..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                autoFocus={searchOpen}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </header>
      
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isMobile ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center border-b pb-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
              <span className="bg-supabase-green text-white px-2 py-1 rounded">LAPPY</span>
              <span>SALE</span>
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col mt-6 space-y-6 text-lg">
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <div>
              <Link to="/products" className="hover:text-gray-600 transition-colors">
                Laptops
              </Link>
              <div className="ml-4 mt-2 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="block text-gray-500 hover:text-gray-800 text-base"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/deals" className="hover:text-gray-600 transition-colors">
              Deals
            </Link>
            <a 
              href="/#support" 
              onClick={handleSupportClick}
              className="hover:text-gray-600 transition-colors"
            >
              Support
            </a>
          </nav>
          
          <div className="mt-auto border-t pt-4 space-y-4">
            <Link to="/account" className="flex items-center space-x-2 hover:text-gray-600 transition-colors">
              <User size={20} />
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="flex items-center space-x-2 hover:text-gray-600 transition-colors">
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className={`h-16 ${searchOpen ? 'h-32' : ''}`}></div>
    </>
  );
};

export default Navbar;
