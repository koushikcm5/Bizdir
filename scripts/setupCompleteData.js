// scripts/setupCompleteData.js
// Complete setup script: Categories + Locations + Dummy Businesses

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCCCyrXEamEQBIOMAJuSZ69TQwgoUPR2Jc",
  authDomain: "bizdir-dbe57.web.app",
  projectId: "bizdir-dbe57",
  storageBucket: "bizdir-dbe57.firebasestorage.app",
  messagingSenderId: "910104954583",
  appId: "1:910104954583:web:d533d4bac7c6a83be4d292",
  measurementId: "G-PPNKK37GZT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Categories to add
const categories = [
  { name: 'Restaurants', icon: 'UtensilsCrossed', color: '#f97316' },
  { name: 'Hotels', icon: 'Hotel', color: '#3b82f6' },
  { name: 'Hospitals', icon: 'Stethoscope', color: '#ef4444' },
  { name: 'Schools', icon: 'School', color: '#8b5cf6' },
  { name: 'Shopping', icon: 'ShoppingBag', color: '#ec4899' },
  { name: 'Salons', icon: 'Scissors', color: '#f59e0b' },
  { name: 'Gyms', icon: 'Dumbbell', color: '#10b981' },
  { name: 'Electronics', icon: 'Smartphone', color: '#6366f1' },
  { name: 'Automobiles', icon: 'Car', color: '#14b8a6' },
  { name: 'Real Estate', icon: 'Home', color: '#f43f5e' },
];

// Locations to add (Tamil Nadu districts with areas)
// Locations to add (All 38 Tamil Nadu districts)
const locations = [
  { name: 'Ariyalur', areas: ['Ariyalur Town', 'Jayankondam', 'Sendurai'] },
  { name: 'Chengalpattu', areas: ['Chengalpattu Town', 'Tambaram', 'Pallavaram', 'Chromepet', 'Vandalur'] },
  { name: 'Chennai', areas: ['T. Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'Mylapore', 'Nungambakkam', 'OMR', 'Guindy'] },
  { name: 'Coimbatore', areas: ['Gandhipuram', 'RS Puram', 'Peelamedu', 'Saravanampatti', 'Race Course', 'Pollachi'] },
  { name: 'Cuddalore', areas: ['Cuddalore Town', 'Chidambaram', 'Panruti', 'Neyveli'] },
  { name: 'Dharmapuri', areas: ['Dharmapuri Town', 'Palacode', 'Harur', 'Pappireddipatti'] },
  { name: 'Dindigul', areas: ['Dindigul Town', 'Palani', 'Kodaikanal', 'Oddanchatram'] },
  { name: 'Erode', areas: ['Erode City', 'Perundurai', 'Bhavani', 'Gobichettipalayam'] },
  { name: 'Kallakurichi', areas: ['Kallakurichi Town', 'Sankarapuram', 'Tirukkoyilur'] },
  { name: 'Kancheepuram', areas: ['Kancheepuram Town', 'Sriperumbudur', 'Walajabad'] },
  { name: 'Karur', areas: ['Karur Town', 'Kulithalai', 'Aravakurichi'] },
  { name: 'Krishnagiri', areas: ['Krishnagiri Town', 'Hosur', 'Denkanikottai', 'Bargur'] },
  { name: 'Madurai', areas: ['Anna Nagar', 'K.K. Nagar', 'Simmakkal', 'Tallakulam', 'Ellis Nagar', 'Thirumangalam'] },
  { name: 'Mayiladuthurai', areas: ['Mayiladuthurai Town', 'Sirkazhi', 'Poompuhar'] },
  { name: 'Nagapattinam', areas: ['Nagapattinam Town', 'Velankanni', 'Vedaranyam'] },
  { name: 'Namakkal', areas: ['Namakkal Town', 'Rasipuram', 'Tiruchengode', 'Komarapalayam'] },
  { name: 'Nilgiris', areas: ['Ooty', 'Coonoor', 'Gudalur', 'Kotagiri'] },
  { name: 'Perambalur', areas: ['Perambalur Town', 'Veppanthattai', 'Kunnam'] },
  { name: 'Pudukkottai', areas: ['Pudukkottai Town', 'Aranthangi', 'Illuppur'] },
  { name: 'Ramanathapuram', areas: ['Ramanathapuram Town', 'Rameswaram', 'Paramakudi', 'Keezhakarai'] },
  { name: 'Ranipet', areas: ['Ranipet Town', 'Arcot', 'Walajapet', 'Arakkonam'] },
  { name: 'Salem', areas: ['Fairlands', 'Hasthampatti', 'Shevapet', 'Suramangalam', 'Mettur', 'Attur'] },
  { name: 'Sivaganga', areas: ['Sivaganga Town', 'Karaikudi', 'Devakottai', 'Manamadurai'] },
  { name: 'Tenkasi', areas: ['Tenkasi Town', 'Sankarankovil', 'Courtallam', 'Kadayanallur'] },
  { name: 'Thanjavur', areas: ['Thanjavur City', 'Kumbakonam', 'Pattukkottai', 'Tiruvaiyaru'] },
  { name: 'Theni', areas: ['Theni Town', 'Periyakulam', 'Bodinayakanur', 'Cumbum'] },
  { name: 'Thoothukudi', areas: ['Thoothukudi City', 'Tiruchendur', 'Kovilpatti', 'Ettayapuram'] },
  { name: 'Tiruchirappalli', areas: ['Thillai Nagar', 'Cantonment', 'Srirangam', 'Woraiyur', 'KK Nagar', 'Lalgudi'] },
  { name: 'Tirunelveli', areas: ['Tirunelveli City', 'Palayamkottai', 'Ambasamudram', 'Valliyur'] },
  { name: 'Tirupathur', areas: ['Tirupathur Town', 'Vaniyambadi', 'Ambur'] },
  { name: 'Tiruppur', areas: ['Tiruppur City', 'Avinashi', 'Dharapuram', 'Udumalaipettai'] },
  { name: 'Tiruvallur', areas: ['Tiruvallur Town', 'Avadi', 'Poonamallee', 'Ambattur', 'Gummidipoondi'] },
  { name: 'Tiruvannamalai', areas: ['Tiruvannamalai Town', 'Arani', 'Chengam', 'Polur'] },
  { name: 'Tiruvarur', areas: ['Tiruvarur Town', 'Mannargudi', 'Thiruthuraipoondi'] },
  { name: 'Vellore', areas: ['Vellore City', 'Katpadi', 'Gudiyatham'] },
  { name: 'Viluppuram', areas: ['Viluppuram Town', 'Tindivanam', 'Gingee'] },
  { name: 'Virudhunagar', areas: ['Virudhunagar Town', 'Sivakasi', 'Rajapalayam', 'Aruppukkottai'] }
].sort((a, b) => a.name.localeCompare(b.name));

// Dummy business data templates
const businessTemplates = {
  'Restaurants': [
    {
      name: 'Chennai Spice Garden',
      description: 'Authentic Tamil Nadu cuisine with traditional recipes. Specializing in Chettinad dishes and vegetarian meals.',
      phone: '+91 98765 43210',
      email: 'contact@chennaispice.com',
      website: 'https://chennaispice.com',
      address: 'Mount Road, Near Anna Salai',
      tags: ['tamil cuisine', 'chettinad', 'vegetarian', 'family dining'],
      lat: 13.0827,
      lng: 80.2707
    },
    {
      name: 'The Madurai Biryani House',
      description: 'Famous for authentic Dindigul style biryani and Madurai special mutton varieties.',
      phone: '+91 98765 43211',
      email: 'info@maduraibiryani.com',
      website: 'https://maduraibiryani.com',
      address: 'Goripalayam, Market Area',
      tags: ['biryani', 'madurai special', 'non-veg', 'chettinad'],
      lat: 9.9252,
      lng: 78.1198
    },
    {
      name: 'Marina Coastal Delights',
      description: 'Fresh seafood restaurant near the coast. Daily catch prepared with local spices and coconut oil.',
      phone: '+91 98765 43212',
      email: 'hello@marinacoastal.com',
      website: 'https://marinacoastal.com',
      address: 'Beach Road, Waterfront',
      tags: ['seafood', 'marina beach', 'fish', 'prawns'],
      lat: 13.0475,
      lng: 80.2824
    },
    {
      name: 'Saravana Style Vegetarian',
      description: 'Pure vegetarian restaurant offering high-quality South Indian meals and tiffin items.',
      phone: '+91 98765 43213',
      email: 'contact@saravanastyle.com',
      website: 'https://saravanastyle.com',
      address: 'T. Nagar, Usman Road',
      tags: ['vegetarian', 'south indian', 'tiffin', 'meals'],
      lat: 13.0405,
      lng: 80.2337
    },
    {
      name: 'Kovai Pizza Palace',
      description: 'Wood-fired pizzas with fresh ingredients. International flavors with a local Coimbatore twist.',
      phone: '+91 98765 43214',
      email: 'orders@kovaipizza.com',
      website: 'https://kovaipizza.com',
      address: 'RS Puram, Shopping District',
      tags: ['pizza', 'italian', 'fast food', 'kovai'],
      lat: 11.0168,
      lng: 76.9558
    },
    {
      name: 'Filter Kaapi & Murukku Corner',
      description: 'Famous Kumbakonam degree coffee and traditional Tamil snacks like Murukku and Athirasam.',
      phone: '+91 98765 43215',
      email: 'info@kaapicorner.com',
      website: '',
      address: 'Mylapore, Near Temple',
      tags: ['filter coffee', 'snacks', 'traditional', 'mylapore'],
      lat: 13.0333,
      lng: 80.2667
    }
  ],
  'Hotels': [
    {
      name: 'Grand Palace Hotel',
      description: 'Luxury 5-star hotel with world-class amenities. Conference halls, swimming pool, spa, and fine dining restaurants.',
      phone: '+91 98765 44210',
      email: 'reservations@grandpalace.com',
      website: 'https://grandpalace.com',
      address: 'Airport Road, Business District',
      tags: ['luxury', '5-star', 'conference', 'spa'],
      lat: 11.2648,
      lng: 75.7864
    },
    {
      name: 'Comfort Inn',
      description: 'Budget-friendly hotel with comfortable rooms and modern amenities. Perfect for business travelers and families.',
      phone: '+91 98765 44211',
      email: 'booking@comfortinn.com',
      website: 'https://comfortinn.com',
      address: 'Main Road, City Center',
      tags: ['budget', 'family', 'business', 'wifi'],
      lat: 11.2658,
      lng: 75.7874
    },
    {
      name: 'Heritage Residency',
      description: 'Boutique hotel in a restored heritage building. Combines traditional architecture with modern comfort.',
      phone: '+91 98765 44212',
      email: 'stay@heritageresidency.com',
      website: 'https://heritageresidency.com',
      address: 'Heritage Street, Old Quarter',
      tags: ['heritage', 'boutique', 'traditional', 'cultural'],
      lat: 11.2668,
      lng: 75.7884
    },
    {
      name: 'Seaside Resort',
      description: 'Beach resort with private beach access. Water sports, beach activities, and stunning sunset views.',
      phone: '+91 98765 44213',
      email: 'info@seasideresort.com',
      website: 'https://seasideresort.com',
      address: 'Coastal Highway, Beach Area',
      tags: ['resort', 'beach', 'water sports', 'vacation'],
      lat: 11.2678,
      lng: 75.7894
    },
    {
      name: 'Business Hub Hotel',
      description: 'Modern hotel catering to business travelers. Meeting rooms, high-speed internet, and 24/7 services.',
      phone: '+91 98765 44214',
      email: 'contact@businesshub.com',
      website: 'https://businesshub.com',
      address: 'IT Park Road, Tech Zone',
      tags: ['business', 'corporate', 'meetings', 'wifi'],
      lat: 11.2688,
      lng: 75.7904
    }
  ],
  'Hospitals': [
    {
      name: 'City General Hospital',
      description: 'Multi-specialty hospital with 24/7 emergency services. Expert doctors and state-of-the-art medical equipment.',
      phone: '+91 98765 45210',
      email: 'info@citygeneralhospital.com',
      website: 'https://citygeneralhospital.com',
      address: 'Hospital Road, Medical District',
      tags: ['multi-specialty', 'emergency', '24/7', 'surgery'],
      lat: 11.2698,
      lng: 75.7914
    },
    {
      name: 'Heart Care Center',
      description: 'Specialized cardiac care hospital. Advanced cardiac surgery, angioplasty, and preventive cardiology services.',
      phone: '+91 98765 45211',
      email: 'care@heartcarecenter.com',
      website: 'https://heartcarecenter.com',
      address: 'Medical College Road',
      tags: ['cardiology', 'heart', 'surgery', 'specialist'],
      lat: 11.2708,
      lng: 75.7924
    },
    {
      name: 'Mother & Child Hospital',
      description: 'Dedicated maternity and pediatric hospital. Expert gynecologists, neonatologists, and child specialists.',
      phone: '+91 98765 45212',
      email: 'contact@motherchild.com',
      website: 'https://motherchild.com',
      address: 'Women\'s Hospital Lane',
      tags: ['maternity', 'pediatric', 'gynecology', 'neonatal'],
      lat: 11.2718,
      lng: 75.7934
    },
    {
      name: 'Orthopedic & Trauma Center',
      description: 'Specialized orthopedic hospital with advanced trauma care. Joint replacement and sports injury treatment.',
      phone: '+91 98765 45213',
      email: 'info@orthotrauma.com',
      website: 'https://orthotrauma.com',
      address: 'Bypass Road, Medical Hub',
      tags: ['orthopedic', 'trauma', 'joint replacement', 'sports injury'],
      lat: 11.2728,
      lng: 75.7944
    },
    {
      name: 'Eye Care Hospital',
      description: 'Comprehensive eye care services. Cataract surgery, LASIK, retina treatment, and pediatric ophthalmology.',
      phone: '+91 98765 45214',
      email: 'vision@eyecare.com',
      website: 'https://eyecare.com',
      address: 'Vision Tower, Central Area',
      tags: ['eye care', 'cataract', 'lasik', 'ophthalmology'],
      lat: 11.2738,
      lng: 75.7954
    }
  ],
  'Schools': [
    {
      name: 'Bright Future International School',
      description: 'CBSE affiliated school with modern infrastructure. Focus on holistic development and academic excellence.',
      phone: '+91 98765 46210',
      email: 'admissions@brightfuture.edu',
      website: 'https://brightfuture.edu',
      address: 'Education Lane, School District',
      tags: ['cbse', 'international', 'k-12', 'sports'],
      lat: 11.2748,
      lng: 75.7964
    },
    {
      name: 'Little Angels Kindergarten',
      description: 'Montessori and play-based learning for young children. Safe and nurturing environment for early education.',
      phone: '+91 98765 46211',
      email: 'info@littleangels.edu',
      website: 'https://littleangels.edu',
      address: 'Children\'s Park Road',
      tags: ['kindergarten', 'montessori', 'preschool', 'daycare'],
      lat: 11.2758,
      lng: 75.7974
    },
    {
      name: 'State Public School',
      description: 'Government recognized school with affordable quality education. Strong focus on science and mathematics.',
      phone: '+91 98765 46212',
      email: 'contact@statepublic.edu',
      website: 'https://statepublic.edu',
      address: 'Government School Road',
      tags: ['state board', 'affordable', 'science', 'mathematics'],
      lat: 11.2768,
      lng: 75.7984
    },
    {
      name: 'Cambridge Academy',
      description: 'ICSE and ISC curriculum with emphasis on English and liberal arts. Excellent sports and cultural facilities.',
      phone: '+91 98765 46213',
      email: 'admissions@cambridge.edu',
      website: 'https://cambridge.edu',
      address: 'Academy Road, Education Hub',
      tags: ['icse', 'isc', 'english medium', 'arts'],
      lat: 11.2778,
      lng: 75.7994
    },
    {
      name: 'Tech Valley High School',
      description: 'Modern school with focus on STEM education. Robotics lab, coding classes, and innovation center.',
      phone: '+91 98765 46214',
      email: 'info@techvalley.edu',
      website: 'https://techvalley.edu',
      address: 'Innovation Park, Tech City',
      tags: ['stem', 'robotics', 'coding', 'technology'],
      lat: 11.2788,
      lng: 75.8004
    }
  ],
  'Shopping': [
    {
      name: 'City Mall',
      description: 'Largest shopping mall with 200+ brands. Fashion, electronics, food court, and entertainment zone.',
      phone: '+91 98765 47210',
      email: 'info@citymall.com',
      website: 'https://citymall.com',
      address: 'Mall Road, Shopping District',
      tags: ['mall', 'shopping', 'fashion', 'entertainment'],
      lat: 11.2798,
      lng: 75.8014
    },
    {
      name: 'Fashion Hub',
      description: 'Trendy clothing and accessories store. Latest fashion trends for men, women, and kids.',
      phone: '+91 98765 47211',
      email: 'style@fashionhub.com',
      website: 'https://fashionhub.com',
      address: 'Fashion Street, Market Area',
      tags: ['fashion', 'clothing', 'accessories', 'trends'],
      lat: 11.2808,
      lng: 75.8024
    },
    {
      name: 'Electronics World',
      description: 'Complete electronics and home appliances store. Latest gadgets, smartphones, laptops, and TVs.',
      phone: '+91 98765 47212',
      email: 'sales@electronicsworld.com',
      website: 'https://electronicsworld.com',
      address: 'Electronics Plaza, Tech Market',
      tags: ['electronics', 'gadgets', 'appliances', 'smartphones'],
      lat: 11.2818,
      lng: 75.8034
    },
    {
      name: 'Home Decor Paradise',
      description: 'Beautiful home furnishings and decor items. Furniture, curtains, lighting, and interior accessories.',
      phone: '+91 98765 47213',
      email: 'contact@homedecor.com',
      website: 'https://homedecor.com',
      address: 'Furniture Street, Home Zone',
      tags: ['home decor', 'furniture', 'interior', 'furnishing'],
      lat: 11.2828,
      lng: 75.8044
    },
    {
      name: 'Book Haven',
      description: 'Largest bookstore with vast collection of books, magazines, and stationery. Cozy reading corner and cafe.',
      phone: '+91 98765 47214',
      email: 'info@bookhaven.com',
      website: 'https://bookhaven.com',
      address: 'Library Road, Cultural District',
      tags: ['books', 'stationery', 'magazines', 'reading'],
      lat: 11.2838,
      lng: 75.8054
    }
  ],
  'Salons': [
    {
      name: 'Glamour Studio',
      description: 'Premium unisex salon offering haircuts, styling, coloring, and spa services. Expert stylists and beauticians.',
      phone: '+91 98765 48210',
      email: 'book@glamourstudio.com',
      website: 'https://glamourstudio.com',
      address: 'Beauty Lane, Fashion District',
      tags: ['unisex', 'haircut', 'spa', 'styling'],
      lat: 11.2848,
      lng: 75.8064
    },
    {
      name: 'Bridal Beauty Parlour',
      description: 'Specialized bridal makeup and beauty services. Complete wedding packages with pre-bridal treatments.',
      phone: '+91 98765 48211',
      email: 'bridal@beautyparlour.com',
      website: 'https://bridalbeauty.com',
      address: 'Wedding Street, Bridal Zone',
      tags: ['bridal', 'makeup', 'wedding', 'beauty'],
      lat: 11.2858,
      lng: 75.8074
    },
    {
      name: 'Men\'s Grooming Lounge',
      description: 'Exclusive men\'s salon with modern grooming services. Haircuts, beard styling, and grooming products.',
      phone: '+91 98765 48212',
      email: 'groom@menslounge.com',
      website: 'https://menslounge.com',
      address: 'Gentlemen\'s Avenue, Style Street',
      tags: ['men', 'grooming', 'haircut', 'beard'],
      lat: 11.2868,
      lng: 75.8084
    },
    {
      name: 'Nail Art Studio',
      description: 'Specialized nail art and manicure services. Creative designs and premium nail care treatments.',
      phone: '+91 98765 48213',
      email: 'nails@nailart.com',
      website: 'https://nailart.com',
      address: 'Beauty Plaza, Salon Row',
      tags: ['nail art', 'manicure', 'pedicure', 'nail care'],
      lat: 11.2878,
      lng: 75.8094
    },
    {
      name: 'Hair & Care Salon',
      description: 'Affordable family salon with quality services. Haircuts, treatments, and beauty services for all ages.',
      phone: '+91 98765 48214',
      email: 'care@haircare.com',
      website: 'https://haircare.com',
      address: 'Family Street, Residential Area',
      tags: ['family', 'affordable', 'haircut', 'treatment'],
      lat: 11.2888,
      lng: 75.8104
    }
  ],
  'Gyms': [
    {
      name: 'Fitness First Gym',
      description: 'State-of-the-art gym with modern equipment. Personal training, group classes, and nutrition counseling.',
      phone: '+91 98765 49210',
      email: 'join@fitnessfirst.com',
      website: 'https://fitnessfirst.com',
      address: 'Sports Complex Road, Fitness Zone',
      tags: ['gym', 'fitness', 'personal training', 'cardio'],
      lat: 11.2898,
      lng: 75.8114
    },
    {
      name: 'CrossFit Arena',
      description: 'High-intensity CrossFit training center. Expert coaches and community-driven fitness programs.',
      phone: '+91 98765 49211',
      email: 'train@crossfitarena.com',
      website: 'https://crossfitarena.com',
      address: 'Athletic Road, Sports District',
      tags: ['crossfit', 'hiit', 'training', 'strength'],
      lat: 11.2908,
      lng: 75.8124
    },
    {
      name: 'Yoga & Wellness Center',
      description: 'Traditional yoga and meditation classes. Holistic wellness programs for mind and body.',
      phone: '+91 98765 49212',
      email: 'namaste@yogacenter.com',
      website: 'https://yogacenter.com',
      address: 'Wellness Lane, Health District',
      tags: ['yoga', 'meditation', 'wellness', 'holistic'],
      lat: 11.2918,
      lng: 75.8134
    },
    {
      name: 'Ladies Fitness Studio',
      description: 'Exclusive women-only fitness center. Zumba, aerobics, and specialized women\'s fitness programs.',
      phone: '+91 98765 49213',
      email: 'fitness@ladiesstudio.com',
      website: 'https://ladiesstudio.com',
      address: 'Women\'s Fitness Lane',
      tags: ['women', 'zumba', 'aerobics', 'fitness'],
      lat: 11.2928,
      lng: 75.8144
    },
    {
      name: 'Power Gym',
      description: 'Hardcore bodybuilding and powerlifting gym. Heavy equipment and experienced trainers for serious athletes.',
      phone: '+91 98765 49214',
      email: 'power@powergym.com',
      website: 'https://powergym.com',
      address: 'Muscle Street, Bodybuilding Zone',
      tags: ['bodybuilding', 'powerlifting', 'strength', 'hardcore'],
      lat: 11.2938,
      lng: 75.8154
    }
  ]
};

// Generic template for categories without specific data
const generateGenericBusinesses = (category, count = 5) => {
  const businesses = [];
  const prefixes = ['Premium', 'Elite', 'Royal', 'Modern', 'Classic', 'Professional', 'Expert', 'Quality'];
  const suffixes = ['Services', 'Solutions', 'Center', 'Hub', 'Studio', 'Point', 'Zone', 'Place'];
  
  for (let i = 0; i < count; i++) {
    const prefix = prefixes[i % prefixes.length];
    const suffix = suffixes[i % suffixes.length];
    businesses.push({
      name: `${prefix} ${category} ${suffix}`,
      description: `Professional ${category.toLowerCase()} services with experienced staff. Quality service and customer satisfaction guaranteed.`,
      phone: `+91 98765 5${i}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      email: `contact@${category.toLowerCase().replace(/\s+/g, '')}${i + 1}.com`,
      website: `https://${category.toLowerCase().replace(/\s+/g, '')}${i + 1}.com`,
      address: `${i + 1} Main Street, ${category} District`,
      tags: [category.toLowerCase(), 'professional', 'quality', 'service'],
      lat: 11.25 + (i * 0.01),
      lng: 75.78 + (i * 0.01)
    });
  }
  return businesses;
};

async function setupCompleteData() {
  try {
    console.log('🚀 Starting complete data setup...\n');

    // Step 1: Add Categories
    console.log('📋 Adding categories...');
    const addedCategories = [];
    for (const category of categories) {
      try {
        const docRef = await addDoc(collection(db, 'categories'), category);
        addedCategories.push({ id: docRef.id, ...category });
        console.log(`  ✓ Added category: ${category.name}`);
      } catch (error) {
        console.error(`  ✗ Failed to add category ${category.name}:`, error.message);
      }
    }
    console.log(`✅ Added ${addedCategories.length} categories\n`);

    // Step 2: Add Locations
    console.log('📍 Adding locations...');
    const addedLocations = [];
    for (const location of locations) {
      try {
        const docRef = await addDoc(collection(db, 'locations'), location);
        addedLocations.push({ id: docRef.id, ...location });
        console.log(`  ✓ Added location: ${location.name} (${location.areas.length} areas)`);
      } catch (error) {
        console.error(`  ✗ Failed to add location ${location.name}:`, error.message);
      }
    }
    console.log(`✅ Added ${addedLocations.length} locations\n`);

    // Step 3: Add Businesses
    console.log('🏢 Adding businesses...\n');
    
    if (addedLocations.length === 0) {
      console.log('⚠️  No locations available. Cannot add businesses.');
      return;
    }

    let totalAdded = 0;
    for (const category of addedCategories) {
      console.log(`📦 Adding businesses for category: ${category.name}`);
      
      const businesses = businessTemplates[category.name] || generateGenericBusinesses(category.name, 10);
      
      for (const business of businesses) {
        try {
          const randomLoc = addedLocations[Math.floor(Math.random() * addedLocations.length)];
          const randomArea = randomLoc.areas[Math.floor(Math.random() * randomLoc.areas.length)];

          const businessData = {
            ...business,
            category: category.name,
            categoryIcon: category.icon || 'Building2',
            district: randomLoc.name,
            area: randomArea,
            status: 'approved',
            featured: Math.random() > 0.8,
            rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
            reviewCount: Math.floor(Math.random() * 100),
            images: [`/assets/dummy/${category.name.toLowerCase().replace(/\s+/g, '-')}.png`],
            createdBy: 'admin',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };

          await addDoc(collection(db, 'businesses'), businessData);
          console.log(`  ✓ Added: ${business.name}`);
          totalAdded++;
        } catch (error) {
          console.error(`  ✗ Failed to add ${business.name}:`, error.message);
        }
      }
      console.log('');
    }

    console.log(`\n🎉 Setup Complete!`);
    console.log(`   Categories: ${addedCategories.length}`);
    console.log(`   Locations: ${addedLocations.length}`);
    console.log(`   Businesses: ${totalAdded}`);
    console.log('\n✅ All data has been successfully populated!\n');
    
  } catch (error) {
    console.error('❌ Error during setup:', error);
  }
}

// Run the script
setupCompleteData()
  .then(() => {
    console.log('Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
