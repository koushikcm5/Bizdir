// scripts/generate1000Businesses.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } = require('firebase/firestore');

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

const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
  "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", 
  "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", 
  "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", 
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", 
  "Viluppuram", "Virudhunagar"
];

const categories = [
  { name: "Automobiles", icon: "Car" },
  { name: "Electronics", icon: "Smartphone" },
  { name: "Gyms", icon: "Dumbbell" },
  { name: "Hospitals", icon: "Hospital" },
  { name: "Hotels", icon: "Bed" },
  { name: "Real Estate", icon: "Home" },
  { name: "Restaurants", icon: "Utensils" },
  { name: "Salons", icon: "Scissors" },
  { name: "Schools", icon: "School" },
  { name: "Shopping", icon: "ShoppingBag" }
];

const prefixes = ["Royal", "Global", "City", "Elite", "Premier", "National", "Cauvery", "Kongu", "Amman", "Sri"];
const suffixes = {
  "Automobiles": ["Motors", "Auto Works", "Spares", "Car Care", "Garage"],
  "Electronics": ["Digital", "Systems", "Appliances", "Gadget Hub", "Center"],
  "Gyms": ["Fitness", "Wellness Club", "Power Studio", "Gym", "Hardcore"],
  "Hospitals": ["Care Hospital", "Health Hub", "Multi-Specialty", "Clinic", "Institute"],
  "Hotels": ["Inn", "Residency", "Heritage", "Grand", "Plaza"],
  "Real Estate": ["Builders", "Promoters", "Housing", "Realty", "Properties"],
  "Restaurants": ["Bistro", "Family Restaurant", "Kitchen", "Mess", "Diner"],
  "Salons": ["Hair Studio", "Beauty Spa", "Makeover", "Unisex Salon", "Style Lounge"],
  "Schools": ["Public School", "International Academy", "Matriculation School", "Vidyalaya", "Nursery"],
  "Shopping": ["Bazaar", "Superstore", "Mall", "Mart", "Plaza"]
};

const areas = ["Main Road", "Gandhi Nagar", "Anna Salai", "Thillai Nagar", "Market Street", "Railway Station Road", "Bazaar Street", "Race Course"];

// Approximate coords for TN districts (randomized within range)
function getCoords(district) {
  const coords = {
    "Chennai": { lat: 13.0827, lng: 80.2707 },
    "Coimbatore": { lat: 11.0168, lng: 76.9558 },
    "Madurai": { lat: 9.9252, lng: 78.1198 },
    "Tiruchirappalli": { lat: 10.7905, lng: 78.7047 },
    "Salem": { lat: 11.6643, lng: 78.1460 }
  };
  const base = coords[district] || { lat: 10.8, lng: 78.5 };
  return {
    lat: base.lat + (Math.random() - 0.5) * 0.5,
    lng: base.lng + (Math.random() - 0.5) * 0.5
  };
}

function generateBusiness(index) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const district = districts[Math.floor(Math.random() * districts.length)];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[category.name][Math.floor(Math.random() * suffixes[category.name].length)];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const name = `${prefix} ${category.name} ${suffix} ${index + 1}`;
  const pos = getCoords(district);

  return {
    name,
    category: category.name,
    categoryIcon: category.icon,
    district,
    area,
    address: `${Math.floor(Math.random() * 999) + 1} ${area}, ${district}`,
    phone: `+91 ${Math.floor(Math.random() * 30000) + 70000} ${Math.floor(Math.random() * 90000) + 10000}`,
    email: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
    website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 500) + 5,
    description: `Professional ${category.name.toLowerCase()} services in ${district}. Quality service and customer satisfaction guaranteed with over ${Math.floor(Math.random() * 15) + 5} years of experience.`,
    status: "approved",
    featured: Math.random() > 0.8,
    lat: pos.lat,
    lng: pos.lng,
    images: [`/assets/dummy/${category.name.toLowerCase().replace(/\s+/g, '-')}.png`],
    tags: [category.name.toLowerCase(), "service", "professional", "tamilnadu", district.toLowerCase()],
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
}

async function clearBusinesses() {
  console.log('🧹 Clearing existing businesses...');
  const querySnapshot = await getDocs(collection(db, 'businesses'));
  for (const docSnap of querySnapshot.docs) {
    await deleteDoc(doc(db, 'businesses', docSnap.id));
  }
  console.log('✅ Collection cleared.');
}

async function main() {
  try {
    await clearBusinesses();
    console.log('🚀 Generating and inserting 1000 professional records for Tamil Nadu...');
    
    let count = 0;
    const batchSize = 100;
    
    for (let i = 0; i < 1000; i++) {
      const bus = generateBusiness(i);
      await addDoc(collection(db, 'businesses'), bus);
      count++;
      if (count % 100 === 0) {
        console.log(`  ✓ Inserted ${count} records...`);
      }
    }

    console.log('\n🎉 Successfully populated 1000 professional business records!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
