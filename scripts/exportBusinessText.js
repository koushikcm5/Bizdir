// scripts/exportBusinessText.js
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

let output = "--- DEEP ANALYSIS OF BUSINESS SECTORS IN TAMIL NADU ---\n";
output += "Tamil Nadu is one of India's most industrialized states, with a highly diversified service and manufacturing sector.\n";
output += "1. Automobiles: Known as the 'Detroit of Asia', Chennai leads in production and services.\n";
output += "2. Electronics: High growth in mobile manufacturing and retail across urban centers like Coimbatore and Kancheepuram.\n";
output += "3. Healthcare: Chennai and Madurai serve as medical hubs for South India.\n";
output += "4. Education: Strong presence of private and international schools throughout the state.\n";
output += "5. Hospitality & Tourism: Driven by cultural heritage sites in Thanjavur, Madurai, and hill stations like Ooty.\n\n";
output += "==================================================\n\n";

for (let i = 0; i < 1000; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const district = districts[Math.floor(Math.random() * districts.length)];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[category.name][Math.floor(Math.random() * suffixes[category.name].length)];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const name = `${prefix} ${category.name} ${suffix} ${i + 1}`;

  output += `address\n"${Math.floor(Math.random() * 999) + 1} ${area}, ${district}"\n(string)\n`;
  output += `area\n"${area}"\n(string)\n`;
  output += `category\n"${category.name}"\n(string)\n`;
  output += `categoryIcon\n"${category.icon}"\n(string)\n`;
  output += `createdAt\nMay 15, 2026 at 12:51:52 PM UTC+5:30\n(timestamp)\n`;
  output += `createdBy\n"admin"\n(string)\n`;
  output += `description\n"Professional ${category.name.toLowerCase()} services in ${district}. Quality service and customer satisfaction guaranteed with over ${Math.floor(Math.random() * 15) + 5} years of experience."\n(string)\n`;
  output += `district\n"${district}"\n(string)\n`;
  output += `email\n"contact@${name.toLowerCase().replace(/\s+/g, '')}.com"\n(string)\n`;
  output += `featured\n${Math.random() > 0.8}\n(boolean)\n`;
  output += `images\n(array)\n0\n"https://example.com/images/${i+1}_1.jpg"\n(string)\n`;
  output += `lat\n${(10.8 + (Math.random() - 0.5) * 2).toFixed(4)}\n(double)\n`;
  output += `lng\n${(78.5 + (Math.random() - 0.5) * 2).toFixed(4)}\n(double)\n`;
  output += `name\n"${name}"\n(string)\n`;
  output += `phone\n"+91 ${Math.floor(Math.random() * 30000) + 70000} ${Math.floor(Math.random() * 90000) + 10000}"\n(string)\n`;
  output += `rating\n${(Math.random() * 2 + 3).toFixed(1)}\n(double)\n`;
  output += `reviewCount\n${Math.floor(Math.random() * 500) + 5}\n(int64)\n`;
  output += `status\n"approved"\n(string)\n`;
  output += `tags\n(array)\n0\n"${category.name.toLowerCase()}"\n(string)\n1\n"service"\n(string)\n2\n"professional"\n(string)\n3\n"tamilnadu"\n(string)\n4\n"${district.toLowerCase()}"\n(string)\n`;
  output += `updatedAt\nMay 15, 2026 at 12:51:52 PM UTC+5:30\n(timestamp)\n`;
  output += `website\n"https://${name.toLowerCase().replace(/\s+/g, '')}.com"\n(string)\n\n`;
  output += `------------------------------\n`;
}

fs.writeFileSync('Tamil_Nadu_Business_Data_1000.txt', output);
console.log('✅ Exported 1000 records to Tamil_Nadu_Business_Data_1000.txt');
