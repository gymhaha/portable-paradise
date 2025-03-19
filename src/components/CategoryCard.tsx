
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/data';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="relative group block overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border border-gray-200"
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {/* Category image with overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 z-10"></div>
        <img
          src={category.image}
          alt={category.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'img-blur-up loaded' : 'img-blur-up'
          }`}
          onLoad={() => setImageLoaded(true)}
          width={800}
          height={400}
        />
        
        {/* Category info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-transform duration-300">
          <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
          <p className="text-white/80 text-sm">{category.count} Products</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
