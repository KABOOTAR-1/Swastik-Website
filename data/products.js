import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Cache for Firebase products
let productsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Fallback products (used when Firebase data is less than 6)
export const fallbackProducts = [
  {
    id: 1,
    name: 'Lift Type C Mixer',
    iconName: 'FaBox',
    description: 'Heavy-duty construction mixer for concrete floor slabs in multistory buildings.',
    specs: [
      { label: 'Type', value: 'Diesel/Electric' },
      { label: 'Capacity', value: '200-300L' },
      { label: 'Power', value: '5-6.5 HP' },
      { label: 'Weight', value: '800-950kg' },
    ],
    features: [
      'Heavy-duty construction for multistory buildings',
      'Advanced safety mechanisms',
      'Ergonomic control panel',
      'Fuel-efficient diesel engine',
      'Easy maintenance access',
      'Weather-resistant design'
    ],
    applications: [
      'Concrete floor slabs',
      'Foundation work',
      'Large construction projects',
      'Commercial buildings',
      'Infrastructure development'
    ]
  },
  {
    id: 2,
    name: 'Cement Concrete Mixer',
    iconName: 'FaCog',
    description: 'Robust and compact mixer for small to medium-scale construction projects.',
    specs: [
      { label: 'Capacity', value: '100-200L' },
      { label: 'Motor Type', value: 'Diesel/Electric' },
      { label: 'Speed', value: '18-20 RPM' },
      { label: 'Dimensions', value: 'Compact Design' },
    ],
    features: [
      'Compact and portable design',
      'Multiple motor options',
      'Easy loading and unloading',
      'Durable mixing drum',
      'Low maintenance requirements',
      'Cost-effective operation'
    ],
    applications: [
      'Residential construction',
      'Small commercial projects',
      'Pathways and driveways',
      'Garden structures',
      'Repair and renovation work'
    ]
  },
  {
    id: 3,
    name: 'Hopper Type Mixer',
    iconName: 'FaWater',
    description: 'Mechanical mixer with mobility features for on-site concrete mixing.',
    specs: [
      { label: 'Capacity', value: '150-250L' },
      { label: 'Hopper', value: '30" Drum' },
      { label: 'Wheels', value: 'Pneumatic' },
      { label: 'Portability', value: 'High Mobility' },
    ],
    features: [
      'Excellent mobility with pneumatic wheels',
      'Large capacity hopper',
      'Quick setup and operation',
      'Stable platform design',
      'Easy transportation',
      'Versatile mixing capabilities'
    ],
    applications: [
      'On-site construction',
      'Remote project locations',
      'Temporary construction sites',
      'Emergency repair work',
      'Mobile construction teams'
    ]
  },
  {
    id: 4,
    name: 'Agricultural Equipment',
    iconName: 'FaLeaf',
    description: 'Wide range of farming machinery for soil preparation and harvesting.',
    specs: [
      { label: 'Types', value: '20+ Models' },
      { label: 'Application', value: 'Multi-purpose' },
      { label: 'Durability', value: 'High-Grade' },
      { label: 'Support', value: '24/7 Service' },
    ],
    features: [
      'Multiple agricultural implements',
      'High-grade durability',
      '24/7 technical support',
      'Fuel-efficient engines',
      'Easy maintenance',
      'Operator-friendly design'
    ],
    applications: [
      'Soil preparation',
      'Seed sowing',
      'Crop harvesting',
      'Land cultivation',
      'Farm mechanization'
    ]
  },
  {
    id: 5,
    name: 'Pumps & Lifting Equipment',
    iconName: 'FaWater',
    description: 'High-capacity pumps and lifting systems for construction and water management.',
    specs: [
      { label: 'Types', value: 'Submersible/Centrifugal' },
      { label: 'Capacity', value: '500-5000 LPH' },
      { label: 'Material', value: 'Cast Iron' },
      { label: 'Efficiency', value: 'High Performance' },
    ],
    features: [
      'High-efficiency performance',
      'Durable cast iron construction',
      'Multiple pump types available',
      'Easy installation and maintenance',
      'Energy-efficient operation',
      'Corrosion-resistant materials'
    ],
    applications: [
      'Water supply systems',
      'Construction dewatering',
      'Irrigation systems',
      'Industrial fluid transfer',
      'Material lifting operations'
    ]
  },
  {
    id: 6,
    name: 'Custom Solutions',
    iconName: 'FaTools',
    description: 'Tailored machinery solutions designed to meet specific industrial needs.',
    specs: [
      { label: 'Design', value: 'Customizable' },
      { label: 'Timeline', value: 'Quick Turnaround' },
      { label: 'Quality', value: 'Premium Grade' },
      { label: 'Support', value: 'Full Warranty' },
    ],
    features: [
      'Fully customizable designs',
      'Expert consultation process',
      'Rapid prototyping and development',
      'Premium quality materials',
      'Comprehensive testing',
      'Extended warranty coverage'
    ],
    applications: [
      'Specialized industrial needs',
      'Unique operational requirements',
      'Research and development',
      'Prototype manufacturing',
      'Bespoke machinery solutions'
    ]
  },
];

// Default icon mapping based on category (returns icon name as string)
const getCategoryIconName = (category) => {
  const categoryLower = category?.toLowerCase() || '';
  if (categoryLower.includes('mixer') || categoryLower.includes('concrete')) return 'FaBox';
  if (categoryLower.includes('agricultural') || categoryLower.includes('farm')) return 'FaLeaf';
  if (categoryLower.includes('pump') || categoryLower.includes('water')) return 'FaWater';
  if (categoryLower.includes('custom') || categoryLower.includes('solution')) return 'FaTools';
  return 'FaCog';
};

// Function to fetch products from Firebase with caching
export const fetchProducts = async () => {
  // Check if we have valid cached data
  if (productsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    console.log('🔄 [Products Cache] Serving cached products data');
    return productsCache;
  }

  try {
    console.log('📡 [Products Cache] Fetching fresh data from Firebase');
    const db = getFirestore();
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'), limit(6));
    const querySnapshot = await getDocs(q);

    const firebaseProducts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Transform Firebase data to match our product structure
      firebaseProducts.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        image: data.image,
        category: data.category,
        price: data.price,
        iconName: getCategoryIconName(data.category),
        // Transform models array to specs array (use first model's specs)
        specs: data.models && data.models.length > 0 && data.models[0].specs
          ? data.models[0].specs
          : [{ label: 'Category', value: data.category || 'N/A' }],
        features: data.features || [],
        applications: data.applications || [],
        models: data.models || [], // Keep models for detail page
        fromFirebase: true // Flag to identify Firebase products
      });
    });

    // If we have less than 6 products from Firebase, fill with fallback
    const productsNeeded = 6 - firebaseProducts.length;
    let finalProducts;
    if (productsNeeded > 0) {
      const fallbackToUse = fallbackProducts.slice(0, productsNeeded);
      finalProducts = [...firebaseProducts, ...fallbackToUse];
    } else {
      finalProducts = firebaseProducts;
    }

    // Cache the results
    productsCache = finalProducts;
    cacheTimestamp = Date.now();
    console.log('💾 [Products Cache] Data cached for 10 minutes');

    return finalProducts;
  } catch (error) {
    console.error('Error fetching products from Firebase:', error);
    // Return fallback products if Firebase fails
    return fallbackProducts;
  }
};

// Export for backward compatibility (using fallback by default for SSR)
export const products = fallbackProducts;