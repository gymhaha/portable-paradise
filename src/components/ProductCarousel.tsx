import { Product } from "@/lib/data";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { useEffect, useState, useRef, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  autoplayInterval?: number;
}

const ProductCarousel = ({ 
  products, 
  onAddToCart,
  autoplayInterval = 2000 // Reduced from 3000 to 2000 milliseconds
}: ProductCarouselProps) => {
  const isMobile = useIsMobile();
  const [itemsPerView, setItemsPerView] = useState(4);
  const [api, setApi] = useState<any>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    autoplayTimerRef.current = setTimeout(() => {
      if (api) {
        api.scrollNext();
      }
      startAutoplay();
    }, autoplayInterval);
  }, [api, autoplayInterval]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);
  
  // Initialize autoplay
  useEffect(() => {
    if (api) {
      startAutoplay();
    }
    
    return () => {
      stopAutoplay();
    };
  }, [api, startAutoplay, stopAutoplay]);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else if (width < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      className="w-full"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product) => (
          <CarouselItem 
            key={product.id} 
            className={`pl-2 md:pl-4 ${
              isMobile 
                ? 'basis-full' 
                : itemsPerView === 2 
                  ? 'basis-1/2' 
                  : itemsPerView === 3 
                    ? 'basis-1/3' 
                    : 'basis-1/4'
            }`}
          >
            <ProductCard 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-end gap-2 mt-4">
        <CarouselPrevious className="relative static left-0 right-auto translate-y-0 bg-white/50 hover:bg-white border-supabase-green text-supabase-green hover:text-supabase-darkGreen" />
        <CarouselNext className="relative static left-0 right-auto translate-y-0 bg-white/50 hover:bg-white border-supabase-green text-supabase-green hover:text-supabase-darkGreen" />
      </div>
    </Carousel>
  );
};

export default ProductCarousel;
