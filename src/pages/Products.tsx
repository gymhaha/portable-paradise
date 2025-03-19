import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  SortAsc, 
  Grid2X2, 
  Grid3X3
} from 'lucide-react';
import { Product, CartItem, products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

const Products = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [gridView, setGridView] = useState<'grid' | 'grid-dense'>('grid');
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Filters state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortOption, setSortOption] = useState('featured');
  const [showNew, setShowNew] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  
  // Extract available filter options
  const availableBrands = [...new Set(products.map(product => product.brand))];
  const availableCategories = [...new Set(products.map(product => product.category))];
  
  // Parse URL query params for initial filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const filterParam = searchParams.get('filter');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
    
    if (filterParam === 'new') {
      setShowNew(true);
    }
    
    if (filterParam === 'discount') {
      setShowDiscount(true);
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
  }, [location.search]);
  
  // Update filtered products when filters change
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => {
        const price = product.discountPrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    // Filter by "new" flag
    if (showNew) {
      filtered = filtered.filter(product => product.isNew);
    }
    
    // Filter by discount
    if (showDiscount) {
      filtered = filtered.filter(product => product.discountPrice !== undefined);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - put featured products first
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories, priceRange, sortOption, showNew, showDiscount]);
  
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
  
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 3000]);
    setShowNew(false);
    setShowDiscount(false);
    setSortOption('featured');
  };
  
  const toggleFilterMenu = () => {
    setFilterMenuOpen(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cartItems} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shop Laptops</h1>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar (desktop) */}
            {!isMobile && (
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className="sticky top-24 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {(selectedBrands.length > 0 || selectedCategories.length > 0 || showNew || showDiscount || priceRange[0] > 0 || priceRange[1] < 3000) && (
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-gray-500 hover:text-black"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <Slider 
                      defaultValue={[0, 3000]} 
                      min={0} 
                      max={3000}
                      step={100}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {availableCategories.map(category => (
                        <div key={category} className="flex items-center">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategoryFilter(category)}
                            className="mr-2"
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Brand</h3>
                    <div className="space-y-2">
                      {availableBrands.map(brand => (
                        <div key={brand} className="flex items-center">
                          <Checkbox 
                            id={`brand-${brand}`} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrandFilter(brand)}
                            className="mr-2"
                          />
                          <label 
                            htmlFor={`brand-${brand}`}
                            className="text-sm cursor-pointer"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Other filters */}
                  <div>
                    <h3 className="font-medium mb-3">Product Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="filter-new" 
                          checked={showNew}
                          onCheckedChange={() => setShowNew(!showNew)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor="filter-new"
                          className="text-sm cursor-pointer"
                        >
                          New Arrivals
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="filter-sale" 
                          checked={showDiscount}
                          onCheckedChange={() => setShowDiscount(!showDiscount)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor="filter-sale"
                          className="text-sm cursor-pointer"
                        >
                          On Sale
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product grid */}
            <div className="flex-1">
              {/* Sort and display options */}
              <div className="flex flex-wrap gap-3 items-center justify-between mb-6 pb-4 border-b border-gray-200">
                {/* Mobile filter button */}
                {isMobile && (
                  <Button 
                    variant="outline" 
                    onClick={toggleFilterMenu}
                    className="flex items-center gap-2"
                  >
                    <Filter size={16} />
                    Filters
                  </Button>
                )}
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <SortAsc size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[150px] sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="rating-desc">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Grid view options */}
                <div className="flex items-center gap-2">
                  <button
                    className={`p-1.5 rounded ${gridView === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => setGridView('grid')}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    className={`p-1.5 rounded ${gridView === 'grid-dense' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => setGridView('grid-dense')}
                    aria-label="Dense grid view"
                  >
                    <Grid2X2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Products grid */}
              {filteredProducts.length > 0 ? (
                <div className={`grid ${
                  gridView === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                } gap-6`}>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-gray-500 mb-4">No products match your filters.</p>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="mx-auto"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile filter drawer */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
            filterMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleFilterMenu}
        >
          <div 
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl transition-transform duration-300 ${
              filterMenuOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={20} />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>
              <div className="flex items-center gap-4">
                {(selectedBrands.length > 0 || selectedCategories.length > 0 || showNew || showDiscount || priceRange[0] > 0 || priceRange[1] < 3000) && (
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-gray-500"
                  >
                    Reset
                  </button>
                )}
                <button onClick={toggleFilterMenu}>
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider 
                  defaultValue={[0, 3000]} 
                  min={0} 
                  max={3000}
                  step={100}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceRangeChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-3">
                  {availableCategories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`mobile-category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`mobile-category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brands */}
              <div>
                <h3 className="font-medium mb-3">Brand</h3>
                <div className="space-y-3">
                  {availableBrands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <Checkbox 
                        id={`mobile-brand-${brand}`} 
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrandFilter(brand)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`mobile-brand-${brand}`}
                        className="text-sm cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Other filters */}
              <div>
                <h3 className="font-medium mb-3">Product Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox 
                      id="mobile-filter-new" 
                      checked={showNew}
                      onCheckedChange={() => setShowNew(!showNew)}
                      className="mr-2"
                    />
                    <label 
                      htmlFor="mobile-filter-new"
                      className="text-sm cursor-pointer"
                    >
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="mobile-filter-sale" 
                      checked={showDiscount}
                      onCheckedChange={() => setShowDiscount(!showDiscount)}
                      className="mr-2"
                    />
                    <label 
                      htmlFor="mobile-filter-sale"
                      className="text-sm cursor-pointer"
                    >
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <Button 
                className="w-full"
                onClick={toggleFilterMenu}
              >
                View {filteredProducts.length} Results
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Products;
