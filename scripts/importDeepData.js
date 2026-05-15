// scripts/importDeepData.js
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

// Data extracted from user prompt
const rawData = `
address
"937 Race Course, Kancheepuram"
(string)
area
"Race Course"
(string)
category
"Schools"
(string)
categoryIcon
"School"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional schools services in Kancheepuram. Quality service and customer satisfaction guaranteed with over 8 years of experience."
(string)
district
"Kancheepuram"
(string)
email
"contact@royalschoolsmatriculationschool1.com"
(string)
featured
true
(boolean)
images
(array)
0
"https://example.com/images/1_1.jpg"
(string)
lat
11.065
(double)
lng
77.9436
(double)
name
"Royal Schools Matriculation School 1"
(string)
phone
"+91 74938 12484"
(string)
rating
4.2
(double)
reviewCount
432
(int64)
status
"approved"
(string)
tags
(array)
0
"schools"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"kancheepuram"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://royalschoolsmatriculationschool1.com"
(string)

------------------------------
address
"511 Main Road, Tiruchirappalli"
(string)
area
"Main Road"
(string)
category
"Hospitals"
(string)
categoryIcon
"Hospital"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional hospitals services in Tiruchirappalli. Quality service and customer satisfaction guaranteed with over 13 years of experience."
(string)
district
"Tiruchirappalli"
(string)
email
"contact@nationalhospitalscarehospital2.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/2_1.jpg"
(string)
lat
10.8645
(double)
lng
78.62
(double)
name
"National Hospitals Care Hospital 2"
(string)
phone
"+91 73362 91329"
(string)
rating
3.3
(double)
reviewCount
305
(int64)
status
"approved"
(string)
tags
(array)
0
"hospitals"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"tiruchirappalli"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://nationalhospitalscarehospital2.com"
(string)

------------------------------
address
"803 Thillai Nagar, Vellore"
(string)
area
"Thillai Nagar"
(string)
category
"Hospitals"
(string)
categoryIcon
"Hospital"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional hospitals services in Vellore. Quality service and customer satisfaction guaranteed with over 16 years of experience."
(string)
district
"Vellore"
(string)
email
"contact@globalhospitalshealthhub3.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/3_1.jpg"
(string)
lat
12.9622
(double)
lng
79.2065
(double)
name
"Global Hospitals Health Hub 3"
(string)
phone
"+91 96654 45486"
(string)
rating
4.1
(double)
reviewCount
264
(int64)
status
"approved"
(string)
tags
(array)
0
"hospitals"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"vellore"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://globalhospitalshealthhub3.com"
(string)

------------------------------
address
"475 Gandhi Nagar, Namakkal"
(string)
area
"Gandhi Nagar"
(string)
category
"Hospitals"
(string)
categoryIcon
"Hospital"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional hospitals services in Namakkal. Quality service and customer satisfaction guaranteed with over 16 years of experience."
(string)
district
"Namakkal"
(string)
email
"contact@greenhospitalshealthhub4.com"
(string)
featured
true
(boolean)
images
(array)
0
"https://example.com/images/4_1.jpg"
(string)
lat
10.9588
(double)
lng
77.9615
(double)
name
"Green Hospitals Health Hub 4"
(string)
phone
"+91 73406 96513"
(string)
rating
4.6
(double)
reviewCount
302
(int64)
status
"approved"
(string)
tags
(array)
0
"hospitals"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"namakkal"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://greenhospitalshealthhub4.com"
(string)

------------------------------
address
"166 Gandhi Nagar, Nagapattinam"
(string)
area
"Gandhi Nagar"
(string)
category
"Gyms"
(string)
categoryIcon
"Dumbbell"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional gyms services in Nagapattinam. Quality service and customer satisfaction guaranteed with over 5 years of experience."
(string)
district
"Nagapattinam"
(string)
email
"contact@royalgymswellnessclub5.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/5_1.jpg"
(string)
lat
10.9045
(double)
lng
78.0765
(double)
name
"Royal Gyms Wellness Club 5"
(string)
phone
"+91 79090 60144"
(string)
rating
4.5
(double)
reviewCount
259
(int64)
status
"approved"
(string)
tags
(array)
0
"gyms"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"nagapattinam"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://royalgymswellnessclub5.com"
(string)

------------------------------
address
"681 Anna Salai, Thanjavur"
(string)
area
"Anna Salai"
(string)
category
"Salons"
(string)
categoryIcon
"Scissors"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional salons services in Thanjavur. Quality service and customer satisfaction guaranteed with over 6 years of experience."
(string)
district
"Thanjavur"
(string)
email
"contact@premiersalonshairstudio6.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/6_1.jpg"
(string)
lat
10.9314
(double)
lng
78.0667
(double)
name
"Premier Salons Hair Studio 6"
(string)
phone
"+91 81951 82115"
(string)
rating
4.7
(double)
reviewCount
191
(int64)
status
"approved"
(string)
tags
(array)
0
"salons"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"thanjavur"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://premiersalonshairstudio6.com"
(string)

------------------------------
address
"449 Main Road, Coimbatore"
(string)
area
"Main Road"
(string)
category
"Hotels"
(string)
categoryIcon
"Bed"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional hotels services in Coimbatore. Quality service and customer satisfaction guaranteed with over 14 years of experience."
(string)
district
"Coimbatore"
(string)
email
"contact@cityhotelsresidency7.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/7_1.jpg"
(string)
lat
11.082
(double)
lng
76.9836
(double)
name
"City Hotels Residency 7"
(string)
phone
"+91 66071 81581"
(string)
rating
4.0
(double)
reviewCount
468
(int64)
status
"approved"
(string)
tags
(array)
0
"hotels"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"coimbatore"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://cityhotelsresidency7.com"
(string)

------------------------------
address
"787 Main Road, Nagapattinam"
(string)
area
"Main Road"
(string)
category
"Real Estate"
(string)
categoryIcon
"Home"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional real estate services in Nagapattinam. Quality service and customer satisfaction guaranteed with over 7 years of experience."
(string)
district
"Nagapattinam"
(string)
email
"contact@globalrealestaterealty8.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/8_1.jpg"
(string)
lat
10.9919
(double)
lng
77.9155
(double)
name
"Global Real Estate Realty 8"
(string)
phone
"+91 82413 75214"
(string)
rating
3.5
(double)
reviewCount
277
(int64)
status
"approved"
(string)
tags
(array)
0
"real estate"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"nagapattinam"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://globalrealestaterealty8.com"
(string)

------------------------------
address
"581 Gandhi Nagar, Ranipet"
(string)
area
"Gandhi Nagar"
(string)
category
"Restaurants"
(string)
categoryIcon
"Utensils"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional restaurants services in Ranipet. Quality service and customer satisfaction guaranteed with over 19 years of experience."
(string)
district
"Ranipet"
(string)
email
"contact@nationalrestaurantsbistro9.com"
(string)
featured
true
(boolean)
images
(array)
0
"https://example.com/images/9_1.jpg"
(string)
lat
10.9033
(double)
lng
77.9577
(double)
name
"National Restaurants Bistro 9"
(string)
phone
"+91 65369 94550"
(string)
rating
3.6
(double)
reviewCount
31
(int64)
status
"approved"
(string)
tags
(array)
0
"restaurants"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"ranipet"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://nationalrestaurantsbistro9.com"
(string)

------------------------------
address
"328 Market Street, Dharmapuri"
(string)
area
"Market Street"
(string)
category
"Hospitals"
(string)
categoryIcon
"Hospital"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional hospitals services in Dharmapuri. Quality service and customer satisfaction guaranteed with over 18 years of experience."
(string)
district
"Dharmapuri"
(string)
email
"contact@cauveryhospitalshealthhub10.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/10_1.jpg"
(string)
lat
11.0315
(double)
lng
78.0884
(double)
name
"Cauvery Hospitals Health Hub 10"
(string)
phone
"+91 82306 41369"
(string)
rating
5.0
(double)
reviewCount
79
(int64)
status
"approved"
(string)
tags
(array)
0
"hospitals"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"dharmapuri"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://cauveryhospitalshealthhub10.com"
(string)

------------------------------
address
"528 Thillai Nagar, Virudhunagar"
(string)
area
"Thillai Nagar"
(string)
category
"Real Estate"
(string)
categoryIcon
"Home"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional real estate services in Virudhunagar. Quality service and customer satisfaction guaranteed with over 8 years of experience."
(string)
district
"Virudhunagar"
(string)
email
"contact@globalrealestatebuilders11.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/11_1.jpg"
(string)
lat
10.9413
(double)
lng
77.9275
(double)
name
"Global Real Estate Builders 11"
(string)
phone
"+91 84329 89689"
(string)
rating
3.1
(double)
reviewCount
324
(int64)
status
"approved"
(string)
tags
(array)
0
"real estate"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"virudhunagar"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://globalrealestatebuilders11.com"
(string)

------------------------------
address
"80 Market Street, Tirupathur"
(string)
area
"Market Street"
(string)
category
"Gyms"
(string)
categoryIcon
"Dumbbell"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional gyms services in Tirupathur. Quality service and customer satisfaction guaranteed with over 8 years of experience."
(string)
district
"Tirupathur"
(string)
email
"contact@nationalgymspowerstudio12.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/12_1.jpg"
(string)
lat
10.9288
(double)
lng
77.9609
(double)
name
"National Gyms Power Studio 12"
(string)
phone
"+91 99895 73124"
(string)
rating
4.5
(double)
reviewCount
207
(int64)
status
"approved"
(string)
tags
(array)
0
"gyms"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"tirupathur"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://nationalgymspowerstudio12.com"
(string)

------------------------------
address
"570 Thillai Nagar, Thoothukudi"
(string)
area
"Thillai Nagar"
(string)
category
"Schools"
(string)
categoryIcon
"School"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional schools services in Thoothukudi. Quality service and customer satisfaction guaranteed with over 14 years of experience."
(string)
district
"Thoothukudi"
(string)
email
"contact@cityschoolspublicschool13.com"
(string)
featured
false
(boolean)
images
(array)
0
"https://example.com/images/13_1.jpg"
(string)
lat
8.6248
(double)
lng
78.2154
(double)
name
"City Schools Public School 13"
(string)
phone
"+91 80472 64236"
(string)
rating
4.2
(double)
reviewCount
468
(int64)
status
"approved"
(string)
tags
(array)
0
"schools"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"thoothukudi"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://cityschoolspublicschool13.com"
(string)

------------------------------
address
"257 Race Course, Dindigul"
(string)
area
"Race Course"
(string)
category
"Hotels"
(string)
categoryIcon
"Bed"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional hotels services in Dindigul. Quality service and customer satisfaction guaranteed with over 5 years of experience."
(string)
district
"Dindigul"
(string)
email
"contact@greenhotelsheritage14.com"
(string)
featured
true
(boolean)
images
(array)
0
"https://example.com/images/14_1.jpg"
(string)
lat
11.0166
(double)
lng
78.0614
(double)
name
"Green Hotels Heritage 14"
(string)
phone
"+91 87930 64244"
(string)
rating
4.9
(double)
reviewCount
253
(int64)
status
"approved"
(string)
tags
(array)
0
"hotels"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"dindigul"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://greenhotelsheritage14.com"
(string)

------------------------------
address
"413 Anna Salai, Tirunelveli"
(string)
area
"Anna Salai"
(string)
category
"Real Estate"
(string)
categoryIcon
"Home"
(string)
createdAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
createdBy
"admin"
(string)
description
"Professional real estate services in Tirunelveli. Quality service and customer satisfaction guaranteed with over 5 years of experience."
(string)
district
"Tirunelveli"
(string)
email
"contact@cauveryrealestatepromoters15.com"
(string)
featured
true
(boolean)
images
(array)
0
"https://example.com/images/15_1.jpg"
(string)
lat
8.7129
(double)
lng
77.8083
(double)
name
"Cauvery Real Estate Promoters 15"
(string)
phone
"+91 91820 73049"
(string)
rating
3.8
(double)
reviewCount
451
(int64)
status
"approved"
(string)
tags
(array)
0
"real estate"
(string)
1
"service"
(string)
2
"professional"
(string)
3
"tamilnadu"
(string)
4
"tirunelveli"
(string)
updatedAt
May 15, 2026 at 12:51:52 PM UTC+5:30
(timestamp)
website
"https://cauveryrealestatepromoters15.com"
(string)
`;

function parseData(text) {
  const businesses = [];
  const sections = text.split('------------------------------');
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    const lines = section.trim().split('\n');
    const bus = {};
    let currentKey = null;
    let inArray = false;
    let arrayKey = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (line === '(string)' || line === '(timestamp)' || line === '(boolean)' || line === '(double)' || line === '(int64)' || line === '(array)') {
        continue;
      }

      // Check if it's a key
      const keys = ['address', 'area', 'category', 'categoryIcon', 'createdAt', 'createdBy', 'description', 'district', 'email', 'featured', 'images', 'lat', 'lng', 'name', 'phone', 'rating', 'reviewCount', 'status', 'tags', 'updatedAt', 'website'];
      
      if (keys.includes(line)) {
        currentKey = line;
        if (currentKey === 'images' || currentKey === 'tags') {
          bus[currentKey] = [];
          inArray = true;
          arrayKey = currentKey;
        } else {
          inArray = false;
        }
        continue;
      }

      // If in array, look for values
      if (inArray) {
        // Skip index numbers
        if (/^\d+$/.test(line)) continue;
        const val = line.replace(/^"|"$/g, '');
        bus[arrayKey].push(val);
        continue;
      }

      // Otherwise it's a value for currentKey
      if (currentKey) {
        let val = line.replace(/^"|"$/g, '');
        if (currentKey === 'featured') val = val === 'true';
        if (currentKey === 'lat' || currentKey === 'lng' || currentKey === 'rating') val = parseFloat(val);
        if (currentKey === 'reviewCount') val = parseInt(val);
        if (currentKey === 'createdAt' || currentKey === 'updatedAt') {
          bus[currentKey] = serverTimestamp();
        } else {
          bus[currentKey] = val;
        }
      }
    }

    if (bus.name) {
      // Ensure premium images are used instead of example.com placeholders
      const cat = (bus.category || '').toLowerCase().replace(/\s+/g, '-');
      bus.images = [`/assets/dummy/${cat}.png`];
      businesses.push(bus);
    }
  }
  return businesses;
}

async function clearBusinesses() {
  console.log('🧹 Clearing existing businesses...');
  const querySnapshot = await getDocs(collection(db, 'businesses'));
  let deletedCount = 0;
  for (const docSnap of querySnapshot.docs) {
    await deleteDoc(doc(db, 'businesses', docSnap.id));
    deletedCount++;
  }
  console.log(`✅ Cleared ${deletedCount} businesses.\n`);
}

async function importData() {
  try {
    await clearBusinesses();
    
    const parsedBusinesses = parseData(rawData);
    console.log(`📋 Starting import of ${parsedBusinesses.length} deep-analyzed records...\n`);

    let totalAdded = 0;
    for (const bus of parsedBusinesses) {
      try {
        await addDoc(collection(db, 'businesses'), bus);
        console.log(`  ✓ Added: ${bus.name} (${bus.district})`);
        totalAdded++;
      } catch (error) {
        console.error(`  ✗ Failed to add ${bus.name}:`, error.message);
      }
    }

    console.log(`\n🎉 Import Complete! Added ${totalAdded} businesses.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during import:', error);
    process.exit(1);
  }
}

importData();
