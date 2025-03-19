
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 text-xl font-semibold mb-6">
              <span className="bg-black text-white px-2 py-1 rounded">TECH</span>
              <span>ELITE</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Premium laptops for professionals, gamers, and creators. Experience technology like never before.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Gaming%20Laptops" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Gaming Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=Business%20Laptops" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Business Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=Ultrabooks" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Ultrabooks
                </Link>
              </li>
              <li>
                <Link to="/products?category=Macbooks" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Macbooks
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Deals & Offers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Warranty Information
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Tech Street, Innovation Valley, CA 94043, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gray-600 mr-3 flex-shrink-0" />
                <a href="tel:+1-800-TECHELITE" className="text-gray-600 hover:text-gray-900 transition-colors">
                  +1-800-TECHELITE
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gray-600 mr-3 flex-shrink-0" />
                <a href="mailto:support@techelite.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  support@techelite.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with payment methods and copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} TechElite. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="hover:text-gray-900 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
