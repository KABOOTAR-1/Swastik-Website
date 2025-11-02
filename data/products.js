import { FaBox, FaCog, FaWater, FaLeaf, FaTools } from 'react-icons/fa';

export const products = [
  {
    id: 1,
    name: 'Lift Type C Mixer',
    icon: <FaBox />,
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
    icon: <FaCog />,
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
    icon: <FaWater />,
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
    icon: <FaLeaf />,
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
    icon: <FaWater />,
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
    icon: <FaTools />,
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