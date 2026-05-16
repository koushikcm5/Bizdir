// scripts/generate10kDeepData.js
const { faker } = require('@faker-js/faker');
const XLSX = require('xlsx');
const fs = require('fs');

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
  { name: "Automotive", icon: "Car", tags: ["car, repair, service, parts"] },
  { name: "Electronics", icon: "Smartphone", tags: ["mobile, laptop, repair, gadgets"] },
  { name: "Restaurants", icon: "Utensils", tags: ["food, dining, spicy, vegetarian"] },
  { name: "Medical", icon: "Hospital", tags: ["health, doctor, clinic, emergency"] },
  { name: "Gyms", icon: "Dumbbell", tags: ["fitness, workout, weightloss, cardio"] },
  { name: "Real Estate", icon: "Home", tags: ["property, house, rent, builders"] },
  { name: "Schools", icon: "School", tags: ["education, learning, primary, secondary"] },
  { name: "Shopping", icon: "ShoppingBag", tags: ["fashion, retail, mall, bazaar"] },
  { name: "Hotels", icon: "Bed", tags: ["travel, stay, luxury, tourism"] },
  { name: "Salons", icon: "Scissors", tags: ["beauty, hair, spa, makeover"] },
  { name: "Legal", icon: "Scale", tags: ["law, advocate, notary, legal"] },
  { name: "Finance", icon: "Coins", tags: ["banking, loan, investment, tax"] },
  { name: "Tech Services", icon: "Monitor", tags: ["software, web, digital, it"] },
  { name: "Pathology", icon: "HeartPulse", tags: ["blood test, diagnostic, lab, scans"] },
  { name: "Stationery", icon: "BookOpen", tags: ["books, office, school, art"] },
  { name: "Theaters", icon: "Drama", tags: ["cinema, movie, entertainment, arts"] },
  { name: "Gaming", icon: "Gamepad2", tags: ["play, lounge, console, esports"] },
  { name: "Nurseries", icon: "Leaf", tags: ["plants, garden, seeds, flowers"] },
  { name: "Courier", icon: "Plane", tags: ["delivery, shipping, local, speed"] },
  { name: "Construction", icon: "Building2", tags: ["building, materials, cement, hardware"] }
];

const areas = ["Main Road", "Gandhi Nagar", "Anna Salai", "Thillai Nagar", "Market Street", "Railway Station Road", "Bazaar Street", "Race Course"];

// Lat/Lng bounds for Tamil Nadu
const TN_BOUNDS = {
  minLat: 8.0,
  maxLat: 13.5,
  minLng: 76.0,
  maxLng: 80.5
};

function generateRow(i) {
  const category = faker.helpers.arrayElement(categories);
  const district = faker.helpers.arrayElement(districts);
  const area = faker.helpers.arrayElement(areas);
  const name = faker.company.name() + " " + category.name;
  
  const lat = faker.number.float({ min: TN_BOUNDS.minLat, max: TN_BOUNDS.maxLat, precision: 0.0001 });
  const lng = faker.number.float({ min: TN_BOUNDS.minLng, max: TN_BOUNDS.maxLng, precision: 0.0001 });
  
  const rating = faker.number.float({ min: 1, max: 5, precision: 0.1 });
  // Weight rating towards 3.5-4.5
  const weightedRating = Math.random() > 0.3 ? faker.number.float({ min: 3.5, max: 4.5, precision: 0.1 }) : rating;

  const description = `${name} is a premier ${category.name.toLowerCase()} hub located in the heart of ${area}, ${district}. We offer top-notch services and prioritize customer satisfaction above all else.`;

  return {
    name: name,
    address: `${faker.location.streetAddress()}, ${area}, ${district}`,
    area: area,
    district: district,
    category: category.name,
    categoryIcon: category.icon,
    description: description,
    email: `contact@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    phone: `+91 ${faker.string.numeric(10)}`,
    website: `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    lat: lat,
    lng: lng,
    rating: weightedRating,
    reviewCount: faker.number.int({ min: 0, max: 1500 }),
    tags: category.tags[0],
    featured: Math.random() < 0.05,
    status: "approved",
    createdBy: "admin",
    images: `/assets/dummy/${category.name.toLowerCase().replace(/\s+/g, '-')}.png`
  };
}

async function main() {
  console.log("🚀 Generating 10,000 realistic business records for Tamil Nadu...");
  const rows = [];
  for (let i = 0; i < 10000; i++) {
    rows.push(generateRow(i));
    if ((i + 1) % 1000 === 0) console.log(`  ✓ Generated ${i + 1} records...`);
  }

  console.log("📊 Creating Excel workbook...");
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Businesses");

  const fileName = "TamilNadu_10k_Businesses.xlsx";
  XLSX.writeFile(wb, fileName);
  
  console.log(`\n🎉 Success! 10,000 records saved to ${fileName}`);
}

main();
