
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  specs: {
    processor: string;
    memory: string;
    storage: string;
    display: string;
    graphics: string;
    operatingSystem: string;
    batteryLife: string;
    weight: string;
  };
  description: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Gaming Laptops",
    image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=2070&auto=format&fit=crop",
    count: 12
  },
  {
    id: 2,
    name: "Business Laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
    count: 8
  },
  {
    id: 3,
    name: "Ultrabooks",
    image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?q=80&w=2051&auto=format&fit=crop",
    count: 15
  },
  {
    id: 4,
    name: "Macbooks",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2787&auto=format&fit=crop",
    count: 6
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    brand: "Apple",
    category: "Macbooks",
    price: 2499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2787&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 245,
    stock: 15,
    isNew: true,
    isFeatured: true,
    specs: {
      processor: "Apple M2 Pro",
      memory: "16GB Unified Memory",
      storage: "512GB SSD",
      display: "16-inch Liquid Retina XDR display",
      graphics: "16-core GPU",
      operatingSystem: "macOS",
      batteryLife: "Up to 22 hours",
      weight: "2.15 kg"
    },
    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro chip — the first of its kind to be built with cutting-edge technology — you get phenomenal performance and amazing battery life. Add to that a stunning Liquid Retina XDR display and all the ports you need, and you've got a pro laptop that's in a class of its own."
  },
  {
    id: 2,
    name: "Dell XPS 15",
    brand: "Dell",
    category: "Ultrabooks",
    price: 1899,
    discountPrice: 1799,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609240873366-5c3b4d74b2c5?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625752136300-fd1ec2627668?q=80&w=1887&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 189,
    stock: 8,
    isNew: false,
    isFeatured: true,
    specs: {
      processor: "12th Gen Intel Core i7-12700H",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: "15.6-inch 3.5K OLED TouchScreen",
      graphics: "NVIDIA RTX 3050 Ti",
      operatingSystem: "Windows 11 Home",
      batteryLife: "Up to 12 hours",
      weight: "1.92 kg"
    },
    description: "The XPS 15 is a high-performance, ultra-thin laptop that's designed for creators and professionals. With a stunning 3.5K OLED display and powerful specs, it's perfect for video editing, graphic design, and demanding productivity tasks."
  },
  {
    id: 3,
    name: "Razer Blade 15",
    brand: "Razer",
    category: "Gaming Laptops",
    price: 2299,
    image: "https://images.unsplash.com/photo-1631898039260-397a66e9d7a9?q=80&w=1912&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631898039260-397a66e9d7a9?q=80&w=1912&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1662675157687-288da4a2ba75?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 132,
    stock: 5,
    isNew: true,
    isFeatured: false,
    specs: {
      processor: "12th Gen Intel Core i7-12800H",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: "15.6-inch QHD 240Hz",
      graphics: "NVIDIA RTX 3070 Ti",
      operatingSystem: "Windows 11 Home",
      batteryLife: "Up to 6 hours",
      weight: "2.01 kg"
    },
    description: "The Razer Blade 15 is the ultimate gaming laptop, combining high-end performance with a sleek, premium design. With a powerful RTX graphics card and high refresh rate display, it delivers smooth gameplay for even the most demanding titles."
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "Business Laptops",
    price: 1699,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639249227523-85afa3876f1c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2076&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 210,
    stock: 12,
    isNew: false,
    isFeatured: true,
    specs: {
      processor: "12th Gen Intel Core i7-1260P",
      memory: "16GB LPDDR5",
      storage: "512GB NVMe SSD",
      display: "14-inch WUXGA IPS Anti-glare",
      graphics: "Intel Iris Xe Graphics",
      operatingSystem: "Windows 11 Pro",
      batteryLife: "Up to 19 hours",
      weight: "1.12 kg"
    },
    description: "The ThinkPad X1 Carbon is designed for professionals who need reliability, security, and performance in a lightweight package. With military-grade durability, all-day battery life, and enterprise-level security features, it's the ultimate business laptop."
  },
  {
    id: 5,
    name: "MacBook Air M2",
    brand: "Apple",
    category: "Macbooks",
    price: 1199,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 278,
    stock: 20,
    isNew: true,
    isFeatured: false,
    specs: {
      processor: "Apple M2",
      memory: "8GB Unified Memory",
      storage: "256GB SSD",
      display: "13.6-inch Liquid Retina display",
      graphics: "8-core GPU",
      operatingSystem: "macOS",
      batteryLife: "Up to 18 hours",
      weight: "1.24 kg"
    },
    description: "The new MacBook Air is strikingly thin and brings exceptional speed and power efficiency to everyday tasks. With a next-generation M2 chip, a silent, fanless design, and all-day battery life, it's the ultraportable laptop that can handle everything from professional-quality editing to demanding workloads."
  },
  {
    id: 6,
    name: "ASUS ROG Zephyrus G14",
    brand: "ASUS",
    category: "Gaming Laptops",
    price: 1599,
    discountPrice: 1399,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 156,
    stock: 9,
    isNew: false,
    isFeatured: true,
    specs: {
      processor: "AMD Ryzen 9 6900HS",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: "14-inch QHD 120Hz",
      graphics: "AMD Radeon RX 6700S",
      operatingSystem: "Windows 11 Home",
      batteryLife: "Up to 10 hours",
      weight: "1.65 kg"
    },
    description: "The ROG Zephyrus G14 is a powerful, compact gaming laptop that doesn't compromise on performance. With an AMD Ryzen 9 processor and RX 6700S graphics, it delivers high-end gaming in a surprisingly portable 14-inch design."
  },
  {
    id: 7,
    name: "HP Spectre x360",
    brand: "HP",
    category: "Ultrabooks",
    price: 1449,
    image: "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?q=80&w=1931&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?q=80&w=1931&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615750185825-fc76b3b8ca6e?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 169,
    stock: 11,
    isNew: false,
    isFeatured: false,
    specs: {
      processor: "12th Gen Intel Core i7-1255U",
      memory: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: "13.5-inch 3K2K OLED TouchScreen",
      graphics: "Intel Iris Xe Graphics",
      operatingSystem: "Windows 11 Home",
      batteryLife: "Up to 16 hours",
      weight: "1.36 kg"
    },
    description: "The HP Spectre x360 is a premium 2-in-1 laptop with a stunning OLED display and versatile 360° hinge design. It's perfect for creative professionals, with a gem-cut design that stands out from the crowd and powerful performance for photo and video editing."
  },
  {
    id: 8,
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    category: "Ultrabooks",
    price: 1299,
    image: "https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=2076&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 143,
    stock: 7,
    isNew: true,
    isFeatured: false,
    specs: {
      processor: "12th Gen Intel Core i5-1235U",
      memory: "8GB LPDDR5x",
      storage: "512GB SSD",
      display: "13.5-inch PixelSense Touch Display",
      graphics: "Intel Iris Xe Graphics",
      operatingSystem: "Windows 11 Home",
      batteryLife: "Up to 18 hours",
      weight: "1.27 kg"
    },
    description: "The Surface Laptop 5 combines sleek, elegant design with improved performance and all-day battery life. The high-resolution PixelSense touchscreen display and premium keyboard deliver a premium experience for work or creative projects."
  }
];

export interface CartItem extends Product {
  quantity: number;
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(product: Product, count: number = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export function getFeaturedProducts(count: number = 4): Product[] {
  return products
    .filter(p => p.isFeatured)
    .slice(0, count);
}

export function getNewProducts(count: number = 4): Product[] {
  return products
    .filter(p => p.isNew)
    .slice(0, count);
}

export function getDiscountedProducts(count: number = 4): Product[] {
  return products
    .filter(p => p.discountPrice !== undefined)
    .slice(0, count);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
