import type { Product, ProductCategory } from "@org/lib";

export const PRODUCT_CATEGORIES: ("All" | ProductCategory)[] = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Books",
  "Furniture",
];

export const PRODUCTS: Product[] = [
  // ── Electronics ───────────────────────────────────────────────
  {
    id: "1",
    name: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    originalPrice: 399.99,
    category: "Electronics",
    description:
      "Industry-leading noise canceling headphones with 30-hour battery life and crystal-clear call quality via a precise voice pickup system.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 2341,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "MacBook Pro 14-inch",
    price: 1999.0,
    originalPrice: 2199.0,
    category: "Electronics",
    description:
      "Supercharged by M3 Pro chip, the MacBook Pro delivers groundbreaking performance with up to 18 hours of battery life.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 1872,
    inStock: true,
    badge: "New",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    price: 999.0,
    category: "Electronics",
    description:
      "Titanium design, A17 Pro chip, and a pro camera system with 48MP main camera and 5x optical zoom.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 5210,
    inStock: true,
  },
  {
    id: "4",
    name: "Apple Watch Series 9",
    price: 399.0,
    originalPrice: 429.0,
    category: "Electronics",
    description:
      "Advanced health features including blood oxygen monitoring, ECG, crash detection, and up to 18 hours of battery life.",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 987,
    inStock: true,
  },
  {
    id: "5",
    name: "Sony Alpha A7 IV Camera",
    price: 2498.0,
    category: "Electronics",
    description:
      "Full-frame mirrorless camera with 33MP sensor, real-time eye autofocus, and 4K 60p video recording.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 634,
    inStock: true,
    badge: "Top Rated",
  },
  {
    id: "6",
    name: "Apple AirPods Pro 2nd Gen",
    price: 249.0,
    originalPrice: 279.0,
    category: "Electronics",
    description:
      "Active noise cancellation, Adaptive Transparency, and Personalized Spatial Audio for immersive listening.",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 3120,
    inStock: true,
  },
  {
    id: "7",
    name: "iPad Air 5th Generation",
    price: 749.0,
    category: "Electronics",
    description:
      "10.9-inch Liquid Retina display, M1 chip, USB-C connector, and support for Apple Pencil and Magic Keyboard.",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4512a86a8?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 1456,
    inStock: true,
  },
  {
    id: "8",
    name: "PlayStation 5 Controller",
    price: 69.99,
    category: "Electronics",
    description:
      "DualSense wireless controller featuring haptic feedback, adaptive triggers, and built-in microphone.",
    image:
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 4521,
    inStock: true,
    badge: "Popular",
  },
  {
    id: "9",
    name: "Bose SoundLink Revolve+ Speaker",
    price: 329.0,
    originalPrice: 369.0,
    category: "Electronics",
    description:
      "True 360-degree sound, 17-hour battery life, water-resistant design, and built-in handle for portability.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 892,
    inStock: true,
  },
  {
    id: "10",
    name: "LG 27-inch 4K Monitor",
    price: 449.99,
    originalPrice: 499.99,
    category: "Electronics",
    description:
      "27-inch IPS 4K UHD display with HDR400, 99% sRGB color gamut, and USB-C connectivity.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 761,
    inStock: false,
  },

  // ── Clothing ──────────────────────────────────────────────────
  {
    id: "11",
    name: "Men's Leather Biker Jacket",
    price: 189.99,
    originalPrice: 249.99,
    category: "Clothing",
    description:
      "Premium full-grain leather jacket with quilted lining, multiple pockets, and classic moto styling.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: "12",
    name: "Women's Floral Midi Dress",
    price: 89.99,
    originalPrice: 119.99,
    category: "Clothing",
    description:
      "Lightweight floral print midi dress with flutter sleeves, adjustable tie waist, and a flattering A-line silhouette.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&q=80",
    rating: 4.4,
    reviewCount: 528,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "13",
    name: "Nike Air Max 270 Sneakers",
    price: 150.0,
    category: "Clothing",
    description:
      "Lightweight Air Max cushioning, breathable mesh upper, and a bold design for all-day comfort and style.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 2876,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "14",
    name: "Slim Fit Dark Wash Jeans",
    price: 79.99,
    category: "Clothing",
    description:
      "Premium stretch denim with slim fit cut, dark wash finish, and five-pocket styling for a versatile everyday look.",
    image:
      "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=600&h=600&fit=crop&q=80",
    rating: 4.3,
    reviewCount: 945,
    inStock: true,
  },
  {
    id: "15",
    name: "Classic White Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    description:
      "100% organic cotton crew-neck t-shirt with a relaxed fit, pre-washed for softness, and available in all sizes.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 1203,
    inStock: true,
  },
  {
    id: "16",
    name: "Oversized Fleece Hoodie",
    price: 64.99,
    originalPrice: 79.99,
    category: "Clothing",
    description:
      "Ultra-soft fleece hoodie with kangaroo pocket, ribbed cuffs, and an oversized drop-shoulder fit.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 687,
    inStock: true,
  },
  {
    id: "17",
    name: "Polarized Aviator Sunglasses",
    price: 45.99,
    originalPrice: 65.99,
    category: "Clothing",
    description:
      "Classic aviator frame with polarized UV400 lenses, lightweight metal frame, and spring hinges.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&q=80",
    rating: 4.4,
    reviewCount: 453,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "18",
    name: "Structured Baseball Cap",
    price: 34.99,
    category: "Clothing",
    description:
      "Six-panel structured cap with curved brim, adjustable snapback closure, and embroidered front panel.",
    image:
      "https://images.unsplash.com/photo-1534215754734-18e55168e5d6?w=600&h=600&fit=crop&q=80",
    rating: 4.2,
    reviewCount: 329,
    inStock: true,
  },
  {
    id: "19",
    name: "Chelsea Ankle Boots",
    price: 129.99,
    originalPrice: 159.99,
    category: "Clothing",
    description:
      "Genuine leather Chelsea boots with elastic side panels, pull tab, and stacked heel for a polished look.",
    image:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&h=600&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 214,
    inStock: true,
  },
  {
    id: "20",
    name: "Wool-Blend Overcoat",
    price: 219.99,
    originalPrice: 289.99,
    category: "Clothing",
    description:
      "Elegant single-breasted overcoat crafted from a premium wool-blend fabric with notched lapels and welt pockets.",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
  },

  // ── Home & Kitchen ────────────────────────────────────────────
  {
    id: "21",
    name: "Nespresso Vertuo Coffee Maker",
    price: 199.99,
    originalPrice: 229.99,
    category: "Home & Kitchen",
    description:
      "Brews five cup sizes from espresso to Alto XL using Centrifusion™ technology with one-touch simplicity.",
    image:
      "https://images.unsplash.com/photo-1610024062303-e355e94c7bc6?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 2103,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "22",
    name: "Vitamix 5200 Blender",
    price: 449.95,
    category: "Home & Kitchen",
    description:
      "Professional-grade blender with variable speed control, self-cleaning, and a hardened stainless-steel blade.",
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 876,
    inStock: true,
  },
  {
    id: "23",
    name: "All-Clad Stainless Cookware Set",
    price: 699.99,
    originalPrice: 849.99,
    category: "Home & Kitchen",
    description:
      "10-piece bonded stainless steel set with aluminum core for fast, even heating and oven-safe up to 600°F.",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 541,
    inStock: true,
    badge: "Top Rated",
  },
  {
    id: "24",
    name: "Ninja Air Fryer XL",
    price: 129.99,
    originalPrice: 159.99,
    category: "Home & Kitchen",
    description:
      "5.5-quart air fryer with Max Crisp Technology, digital display, and 4 cooking modes for crispy results.",
    image:
      "https://images.unsplash.com/photo-1585237017125-06d1fb3e2dea?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 3654,
    inStock: true,
  },
  {
    id: "25",
    name: "Dyson V15 Detect Vacuum",
    price: 749.99,
    originalPrice: 799.99,
    category: "Home & Kitchen",
    description:
      "Laser-guided dust detection, piezo sensor that counts and sizes dust particles, and up to 60 min run time.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 1287,
    inStock: true,
    badge: "New",
  },
  {
    id: "26",
    name: "Luxury Soy Candle Set",
    price: 49.99,
    category: "Home & Kitchen",
    description:
      "Set of three hand-poured soy wax candles in relaxing scents: cedarwood, vanilla amber, and sea breeze.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 421,
    inStock: true,
  },
  {
    id: "27",
    name: "Chunky Knit Throw Blanket",
    price: 69.99,
    originalPrice: 89.99,
    category: "Home & Kitchen",
    description:
      "Handmade chunky knit throw in 100% merino wool, available in multiple colors, perfect for cozy evenings.",
    image:
      "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 658,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "28",
    name: "Modern Ceramic Plant Pot Set",
    price: 39.99,
    category: "Home & Kitchen",
    description:
      "Set of three matte ceramic pots with drainage holes and matching saucers in a minimalist design.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop&q=80",
    rating: 4.4,
    reviewCount: 293,
    inStock: true,
  },
  {
    id: "29",
    name: "Wüsthof Classic 8-inch Chef's Knife",
    price: 149.95,
    category: "Home & Kitchen",
    description:
      "Forged from a single piece of high-carbon stainless steel with a full bolster and triple-riveted handle.",
    image:
      "https://images.unsplash.com/photo-1583743814966-8d4d0ec64c67?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 1109,
    inStock: true,
    badge: "Top Rated",
  },
  {
    id: "30",
    name: "Fellow Stagg EKG Kettle",
    price: 165.0,
    category: "Home & Kitchen",
    description:
      "Pour-over electric kettle with precision pour spout, PID temperature control, and 1-hour hold mode.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 788,
    inStock: true,
  },

  // ── Sports ────────────────────────────────────────────────────
  {
    id: "31",
    name: "Manduka PRO Yoga Mat",
    price: 135.0,
    originalPrice: 150.0,
    category: "Sports",
    description:
      "6mm thick eco-friendly yoga mat with a closed-cell surface, lifetime guarantee, and superior joint cushioning.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 2109,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "32",
    name: "Bowflex SelectTech Dumbbells",
    price: 429.0,
    originalPrice: 499.0,
    category: "Sports",
    description:
      "Adjustable dumbbell set that replaces 15 sets of weights, ranging from 5 to 52.5 lbs with dial-to-change weight.",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 3421,
    inStock: true,
  },
  {
    id: "33",
    name: "ASICS Gel-Kayano Running Shoes",
    price: 139.95,
    category: "Sports",
    description:
      "Maximum stability running shoe with GEL cushioning technology, engineered mesh upper, and TRUSSTIC System.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 1876,
    inStock: true,
  },
  {
    id: "34",
    name: "Trek Marlin 5 Mountain Bike",
    price: 599.99,
    originalPrice: 679.99,
    category: "Sports",
    description:
      "Lightweight aluminum frame, 21-speed drivetrain, hydraulic disc brakes, and durable 29-inch wheels.",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=600&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 342,
    inStock: true,
  },
  {
    id: "35",
    name: "Wilson Pro Staff Tennis Racket",
    price: 229.0,
    category: "Sports",
    description:
      "Professional 97-square-inch head with Countervail technology that dampens fatigue-causing vibration by 50%.",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 512,
    inStock: true,
  },

  // ── Beauty ────────────────────────────────────────────────────
  {
    id: "36",
    name: "La Mer Skincare Collection",
    price: 320.0,
    originalPrice: 380.0,
    category: "Beauty",
    description:
      "Luxurious skincare set featuring the iconic Crème de la Mer, Renewal Oil, and Soft Fluid Sun Protect SPF 50.",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 923,
    inStock: true,
    badge: "Luxury",
  },
  {
    id: "37",
    name: "Chanel N°5 Eau de Parfum",
    price: 175.0,
    category: "Beauty",
    description:
      "The world's most iconic fragrance, a timeless floral aldehyde with notes of ylang-ylang and sandalwood.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 4521,
    inStock: true,
    badge: "Iconic",
  },
  {
    id: "38",
    name: "Urban Decay Naked Eyeshadow Palette",
    price: 54.0,
    originalPrice: 65.0,
    category: "Beauty",
    description:
      "12 on-trend neutrals in a mix of matte and shimmer finishes — the ultimate everyday eyeshadow palette.",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 6234,
    inStock: true,
  },
  {
    id: "39",
    name: "Dyson Supersonic Hair Dryer",
    price: 429.99,
    category: "Beauty",
    description:
      "Fast drying with intelligent heat control, digital motor V9 with 13 billion-spinning impeller blades.",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 2876,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "40",
    name: "Tatcha The Water Cream Moisturizer",
    price: 70.0,
    category: "Beauty",
    description:
      "Oil-free moisturizer with Japanese botanicals that releases a burst of skin-enhancing minerals and antioxidants.",
    image:
      "https://images.unsplash.com/photo-1571781418606-70265b9cce90?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 1432,
    inStock: true,
  },

  // ── Books ─────────────────────────────────────────────────────
  {
    id: "41",
    name: "Atomic Habits",
    price: 18.99,
    originalPrice: 27.0,
    category: "Books",
    description:
      "James Clear's #1 New York Times bestseller about building good habits, breaking bad ones, and getting 1% better every day.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 18432,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "42",
    name: "Salt Fat Acid Heat Cookbook",
    price: 35.0,
    originalPrice: 40.0,
    category: "Books",
    description:
      "Samin Nosrat's award-winning guide to the four elements that make food taste good — beautifully illustrated.",
    image:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&h=600&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 5621,
    inStock: true,
  },
  {
    id: "43",
    name: "The Art of Colour",
    price: 55.0,
    category: "Books",
    description:
      "Johannes Itten's legendary treatise on color theory, extensively illustrated with examples from fine art.",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 1234,
    inStock: true,
  },
  {
    id: "44",
    name: "Zero to One",
    price: 14.99,
    originalPrice: 18.0,
    category: "Books",
    description:
      "Peter Thiel's essential guide on how to build the future and create companies that go from 0 to 1.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 9823,
    inStock: true,
    badge: "Popular",
  },
  {
    id: "45",
    name: "Dune (Definitive Edition)",
    price: 22.99,
    category: "Books",
    description:
      "Frank Herbert's masterpiece of science fiction — an epic tale of politics, religion, and survival on the desert planet Arrakis.",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop&q=80",
    rating: 4.9,
    reviewCount: 24531,
    inStock: true,
    badge: "Classic",
  },

  // ── Furniture ─────────────────────────────────────────────────
  {
    id: "46",
    name: "Mid-Century Modern Sofa",
    price: 1299.0,
    originalPrice: 1599.0,
    category: "Furniture",
    description:
      "Three-seater sofa with solid walnut legs, kiln-dried hardwood frame, and high-density foam cushions upholstered in fabric.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 432,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "47",
    name: "Marble Top Coffee Table",
    price: 549.0,
    originalPrice: 699.0,
    category: "Furniture",
    description:
      "White Carrara marble top with a solid brass-finished steel base — a timeless statement piece for any living room.",
    image:
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&h=600&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 287,
    inStock: true,
  },
  {
    id: "48",
    name: "Ergonomic Mesh Office Chair",
    price: 449.0,
    originalPrice: 549.0,
    category: "Furniture",
    description:
      "Lumbar support, adjustable armrests, headrest, and breathable mesh back for all-day seated comfort.",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 1543,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "49",
    name: "5-Shelf Industrial Bookcase",
    price: 249.0,
    category: "Furniture",
    description:
      "Rustic industrial bookshelf with powder-coated steel frame, solid pine shelves, and anti-tip safety strap.",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=600&fit=crop&q=80",
    rating: 4.4,
    reviewCount: 678,
    inStock: true,
  },
  {
    id: "50",
    name: "Queen Upholstered Platform Bed",
    price: 899.0,
    originalPrice: 1099.0,
    category: "Furniture",
    description:
      "Low-profile platform bed with a button-tufted velvet headboard, solid slat base, and no box spring required.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 321,
    inStock: true,
    badge: "Sale",
  },
];
