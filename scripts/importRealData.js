// scripts/importRealData.js
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

const rawData = `
[1]
Business Name : Modern Manufacturing Mall - 1
Category      : Manufacturing
District      : Coimbatore
Area          : Railway Station Rd
Address       : 327 Railway Station Rd, Coimbatore
Phone         : +91 95443 66162
Email         : contact@modernmanufacturingmall.com
Website       : https://modernmanufacturingmall.com
Website Status: Has Website
Rating        : 3.9
Review Count  : 353
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[2]
Business Name : Royal Hardware Mall - 2
Category      : Hardware
District      : Ranipet
Area          : Town Hall
Address       : 361 Town Hall, Ranipet
Phone         : +91 86692 14364
Email         : contact@royalhardwaremall.com
Website       : https://royalhardwaremall.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 323
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[3]
Business Name : Arul Hardware Exports - 3
Category      : Hardware
District      : Theni
Area          : Main Road
Address       : 179 Main Road, Theni
Phone         : +91 75954 66940
Email         : contact@arulhardwareexports.com
Website       : https://arulhardwareexports.com
Website Status: Has Website
Rating        : 3.3
Review Count  : 127
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[4]
Business Name : Balaji Medical Engineering - 4
Category      : Medical
District      : Krishnagiri
Area          : Main Road
Address       : 61 Main Road, Krishnagiri
Phone         : +91 95330 78687
Email         : contact@balajimedicalengineering.com
Website       : https://balajimedicalengineering.com
Website Status: Has Website
Rating        : 3.6
Review Count  : 139
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[5]
Business Name : Sri Textiles Engineering - 5
Category      : Textiles
District      : Erode
Area          : Main Road
Address       : 80 Main Road, Erode
Phone         : +91 79585 67488
Email         : contact@sritextilesengineering.com
Website       : https://sritextilesengineering.com
Website Status: Has Website
Rating        : 3.9
Review Count  : 364
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[6]
Business Name : Dheeran Automobile Works - 6
Category      : Automobile
District      : Tirunelveli
Area          : Main Road
Address       : 266 Main Road, Tirunelveli
Phone         : +91 94244 82705
Email         : contact@dheeranautomobileworks.com
Website       : https://dheeranautomobileworks.com
Website Status: Has Website
Rating        : 4.7
Review Count  : 491
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[7]
Business Name : Balaji Hardware Hub - 7
Category      : Hardware
District      : Salem
Area          : Main Road
Address       : 380 Main Road, Salem
Phone         : +91 74724 93558
Email         : contact@balajihardwarehub.com
Website       : https://balajihardwarehub.com
Website Status: Has Website
Rating        : 3.5
Review Count  : 70
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[8]
Business Name : Cauvery Electronics Store - 8
Category      : Electronics
District      : Tenkasi
Area          : Railway Station Rd
Address       : 183 Railway Station Rd, Tenkasi
Phone         : +91 98815 60681
Email         : contact@cauveryelectronicsstore.com
Website       : https://cauveryelectronicsstore.com
Website Status: Has Website
Rating        : 3.5
Review Count  : 445
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[9]
Business Name : Arul Education Center - 9
Category      : Education
District      : Nagapattinam
Area          : Industrial Estate
Address       : 387 Industrial Estate, Nagapattinam
Phone         : +91 70221 69565
Email         : contact@aruleducationcenter.com
Website       : https://aruleducationcenter.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 464
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[10]
Business Name : Universal Furniture Store - 10
Category      : Furniture
District      : Coimbatore
Area          : Industrial Estate
Address       : 1 Industrial Estate, Coimbatore
Phone         : +91 94190 73598
Email         : contact@universalfurniturestore.com
Website       : https://universalfurniturestore.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 108
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[11]
Business Name : Royal Hotels Point - 11
Category      : Hotels
District      : Perambalur
Area          : Civil Lines
Address       : 110 Civil Lines, Perambalur
Phone         : +91 75364 23051
Email         : contact@royalhotelspoint.com
Website       : https://royalhotelspoint.com
Website Status: Has Website
Rating        : 3.1
Review Count  : 351
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[12]
Business Name : Selvam Textiles Group - 12
Category      : Textiles
District      : Ranipet
Area          : Bazaar St
Address       : 168 Bazaar St, Ranipet
Phone         : +91 74635 12243
Email         : contact@selvamtextilesgroup.com
Website       : https://selvamtextilesgroup.com
Website Status: Has Website
Rating        : 4.6
Review Count  : 203
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[13]
Business Name : Classic Hardware Point - 13
Category      : Hardware
District      : Vellore
Area          : Town Hall
Address       : 351 Town Hall, Vellore
Phone         : +91 78481 98531
Email         : contact@classichardwarepoint.com
Website       : https://classichardwarepoint.com
Website Status: Has Website
Rating        : 3.9
Review Count  : 336
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[14]
Business Name : Vetri Hardware Works - 14
Category      : Hardware
District      : Tiruppur
Area          : Civil Lines
Address       : 318 Civil Lines, Tiruppur
Phone         : +91 94056 99666
Email         : contact@vetrihardwareworks.com
Website       : https://vetrihardwareworks.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 482
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[15]
Business Name : Universal Agriculture Plaza - 15
Category      : Agriculture
District      : Namakkal
Area          : Civil Lines
Address       : 360 Civil Lines, Namakkal
Phone         : +91 82066 27239
Email         : contact@universalagricultureplaza.com
Website       : https://universalagricultureplaza.com
Website Status: Has Website
Rating        : 3
Review Count  : 494
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[16]
Business Name : Royal Textiles Store - 16
Category      : Textiles
District      : Mayiladuthurai
Area          : Industrial Estate
Address       : 26 Industrial Estate, Mayiladuthurai
Phone         : +91 78392 63307
Email         : contact@royaltextilesstore.com
Website       : https://royaltextilesstore.com
Website Status: Has Website
Rating        : 4.7
Review Count  : 99
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[17]
Business Name : Supreme Construction Solutions - 17
Category      : Construction
District      : Tiruvarur
Area          : Railway Station Rd
Address       : 405 Railway Station Rd, Tiruvarur
Phone         : +91 99592 72834
Email         : contact@supremeconstructionsolutions.com
Website       : https://supremeconstructionsolutions.com
Website Status: Has Website
Rating        : 3.1
Review Count  : 355
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[18]
Business Name : Dheeran Retail Exports - 18
Category      : Retail
District      : Coimbatore
Area          : Railway Station Rd
Address       : 339 Railway Station Rd, Coimbatore
Phone         : +91 97448 76946
Email         : contact@dheeranretailexports.com
Website       : https://dheeranretailexports.com
Website Status: Has Website
Rating        : 3.3
Review Count  : 70
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[19]
Business Name : Elite Automobile Exports - 19
Category      : Automobile
District      : Nilgiris
Area          : Railway Station Rd
Address       : 396 Railway Station Rd, Nilgiris
Phone         : +91 88324 90311
Email         : contact@eliteautomobileexports.com
Website       : https://eliteautomobileexports.com
Website Status: Has Website
Rating        : 5
Review Count  : 237
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[20]
Business Name : Amman Retail Agencies - 20
Category      : Retail
District      : Tiruvannamalai
Area          : Industrial Estate
Address       : 451 Industrial Estate, Tiruvannamalai
Phone         : +91 87322 40336
Email         : contact@ammanretailagencies.com
Website       : https://ammanretailagencies.com
Website Status: Has Website
Rating        : 3.9
Review Count  : 165
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[21]
Business Name : Amman Manufacturing Engineering - 21
Category      : Manufacturing
District      : Thanjavur
Area          : Town Hall
Address       : 1 Town Hall, Thanjavur
Phone         : +91 72147 37539
Email         : contact@ammanmanufacturingengineering.com
Website       : https://ammanmanufacturingengineering.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 167
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[22]
Business Name : Global Hardware Works - 22
Category      : Hardware
District      : Erode
Area          : Main Road
Address       : 8 Main Road, Erode
Phone         : +91 90756 16938
Email         : contact@globalhardwareworks.com
Website       : https://globalhardwareworks.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 465
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[23]
Business Name : Kalingarayan Furniture Industries - 23
Category      : Furniture
District      : Tirupathur
Area          : Railway Station Rd
Address       : 357 Railway Station Rd, Tirupathur
Phone         : +91 95007 51752
Email         : contact@kalingarayanfurnitureindustries.com
Website       : https://kalingarayanfurnitureindustries.com
Website Status: Has Website
Rating        : 4.6
Review Count  : 407
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[24]
Business Name : Arul Furniture Engineering - 24
Category      : Furniture
District      : Krishnagiri
Area          : Railway Station Rd
Address       : 236 Railway Station Rd, Krishnagiri
Phone         : +91 96557 62784
Email         : contact@arulfurnitureengineering.com
Website       : https://arulfurnitureengineering.com
Website Status: Has Website
Rating        : 4.9
Review Count  : 316
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[25]
Business Name : Modern Manufacturing Solutions - 25
Category      : Manufacturing
District      : Karur
Area          : Civil Lines
Address       : 395 Civil Lines, Karur
Phone         : +91 86991 19350
Email         : contact@modernmanufacturingsolutions.com
Website       : https://modernmanufacturingsolutions.com
Website Status: Has Website
Rating        : 4.7
Review Count  : 387
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[26]
Business Name : Vetri Hardware Works - 26
Category      : Hardware
District      : Coimbatore
Area          : Railway Station Rd
Address       : 157 Railway Station Rd, Coimbatore
Phone         : +91 78837 63158
Email         : contact@vetrihardwareworks.com
Website       : https://vetrihardwareworks.com
Website Status: Has Website
Rating        : 4.2
Review Count  : 265
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[27]
Business Name : Elite Manufacturing Group - 27
Category      : Manufacturing
District      : Salem
Area          : Railway Station Rd
Address       : 500 Railway Station Rd, Salem
Phone         : +91 80265 67341
Email         : contact@elitemanufacturinggroup.com
Website       : https://elitemanufacturinggroup.com
Website Status: Has Website
Rating        : 4.4
Review Count  : 122
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[28]
Business Name : Jaya Textiles Store - 28
Category      : Textiles
District      : Viluppuram
Area          : Civil Lines
Address       : 488 Civil Lines, Viluppuram
Phone         : +91 72027 67045
Email         : contact@jayatextilesstore.com
Website       : https://jayatextilesstore.com
Website Status: Has Website
Rating        : 3
Review Count  : 300
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[29]
Business Name : Cauvery Manufacturing Plaza - 29
Category      : Manufacturing
District      : Tirupathur
Area          : Railway Station Rd
Address       : 43 Railway Station Rd, Tirupathur
Phone         : +91 81017 66275
Email         : contact@cauverymanufacturingplaza.com
Website       : https://cauverymanufacturingplaza.com
Website Status: Has Website
Rating        : 3.3
Review Count  : 463
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[30]
Business Name : Kalingarayan Automobile Engineering - 30
Category      : Automobile
District      : Viluppuram
Area          : Civil Lines
Address       : 384 Civil Lines, Viluppuram
Phone         : +91 98217 22008
Email         : contact@kalingarayanautomobileengineering.com
Website       : https://kalingarayanautomobileengineering.com
Website Status: Has Website
Rating        : 4.8
Review Count  : 228
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[31]
Business Name : Kongu Automobile Solutions - 31
Category      : Automobile
District      : Viluppuram
Area          : Railway Station Rd
Address       : 300 Railway Station Rd, Viluppuram
Phone         : +91 80360 70324
Email         : contact@konguautomobilesolutions.com
Website       : https://konguautomobilesolutions.com
Website Status: Has Website
Rating        : 4.2
Review Count  : 358
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[32]
Business Name : Global Education Group - 32
Category      : Education
District      : Madurai
Area          : Town Hall
Address       : 200 Town Hall, Madurai
Phone         : +91 98195 54150
Email         : contact@globaleducationgroup.com
Website       : https://globaleducationgroup.com
Website Status: Has Website
Rating        : 3.5
Review Count  : 338
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[33]
Business Name : National Retail Works - 33
Category      : Retail
District      : Cuddalore
Area          : Railway Station Rd
Address       : 164 Railway Station Rd, Cuddalore
Phone         : +91 73928 75952
Email         : contact@nationalretailworks.com
Website       : https://nationalretailworks.com
Website Status: Has Website
Rating        : 4.8
Review Count  : 434
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[34]
Business Name : Dheeran Agriculture Plaza - 34
Category      : Agriculture
District      : Nilgiris
Area          : Civil Lines
Address       : 89 Civil Lines, Nilgiris
Phone         : +91 79241 17478
Email         : contact@dheeranagricultureplaza.com
Website       : https://dheeranagricultureplaza.com
Website Status: Has Website
Rating        : 3
Review Count  : 426
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[35]
Business Name : Kalingarayan Agriculture Hub - 35
Category      : Agriculture
District      : Thanjavur
Area          : Civil Lines
Address       : 261 Civil Lines, Thanjavur
Phone         : +91 75878 92613
Email         : contact@kalingarayanagriculturehub.com
Website       : https://kalingarayanagriculturehub.com
Website Status: Has Website
Rating        : 4.1
Review Count  : 200
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[36]
Business Name : Elite Furniture Group - 36
Category      : Furniture
District      : Theni
Area          : Town Hall
Address       : 181 Town Hall, Theni
Phone         : +91 80665 55221
Email         : contact@elitefurnituregroup.com
Website       : https://elitefurnituregroup.com
Website Status: Has Website
Rating        : 3.4
Review Count  : 283
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[37]
Business Name : Vetri Electronics Point - 37
Category      : Electronics
District      : Ramanathapuram
Area          : Town Hall
Address       : 491 Town Hall, Ramanathapuram
Phone         : +91 83202 86975
Email         : contact@vetrielectronicspoint.com
Website       : https://vetrielectronicspoint.com
Website Status: Has Website
Rating        : 3.5
Review Count  : 128
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[38]
Business Name : Selvam Hotels Traders - 38
Category      : Hotels
District      : Dindigul
Area          : Main Road
Address       : 260 Main Road, Dindigul
Phone         : +91 94096 34960
Email         : contact@selvamhotelstraders.com
Website       : https://selvamhotelstraders.com
Website Status: Has Website
Rating        : 4.4
Review Count  : 76
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[39]
Business Name : Kalingarayan Construction Enterprises - 39
Category      : Construction
District      : Vellore
Area          : Industrial Estate
Address       : 477 Industrial Estate, Vellore
Phone         : +91 78568 81987
Email         : contact@kalingarayanconstructionenterprises.com
Website       : https://kalingarayanconstructionenterprises.com
Website Status: Has Website
Rating        : 4.5
Review Count  : 393
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[40]
Business Name : Sri Hardware Point - 40
Category      : Hardware
District      : Dindigul
Area          : Bazaar St
Address       : 278 Bazaar St, Dindigul
Phone         : +91 75810 30433
Email         : contact@srihardwarepoint.com
Website       : https://srihardwarepoint.com
Website Status: Has Website
Rating        : 3.1
Review Count  : 437
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[41]
Business Name : Universal Textiles Works - 41
Category      : Textiles
District      : Tenkasi
Area          : Bazaar St
Address       : 220 Bazaar St, Tenkasi
Phone         : +91 85182 81221
Email         : contact@universaltextilesworks.com
Website       : https://universaltextilesworks.com
Website Status: Has Website
Rating        : 3.5
Review Count  : 481
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[42]
Business Name : Balaji Electronics Solutions - 42
Category      : Electronics
District      : Chennai
Area          : Industrial Estate
Address       : 339 Industrial Estate, Chennai
Phone         : +91 76139 75107
Email         : contact@balajielectronicssolutions.com
Website       : https://balajielectronicssolutions.com
Website Status: Has Website
Rating        : 4.5
Review Count  : 201
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[43]
Business Name : Universal Automobile Group - 43
Category      : Automobile
District      : Kallakurichi
Area          : Bazaar St
Address       : 110 Bazaar St, Kallakurichi
Phone         : +91 86830 15417
Email         : contact@universalautomobilegroup.com
Website       : https://universalautomobilegroup.com
Website Status: Has Website
Rating        : 3.8
Review Count  : 321
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[44]
Business Name : Amman Electronics Mall - 44
Category      : Electronics
District      : Namakkal
Area          : Town Hall
Address       : 490 Town Hall, Namakkal
Phone         : +91 71281 28820
Email         : contact@ammanelectronicsmall.com
Website       : https://ammanelectronicsmall.com
Website Status: Has Website
Rating        : 3.3
Review Count  : 125
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[45]
Business Name : Universal Automobile Store - 45
Category      : Automobile
District      : Karur
Area          : Bazaar St
Address       : 117 Bazaar St, Karur
Phone         : +91 88672 78345
Email         : contact@universalautomobilestore.com
Website       : https://universalautomobilestore.com
Website Status: Has Website
Rating        : 4.2
Review Count  : 217
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[46]
Business Name : Annai Education Point - 46
Category      : Education
District      : Thoothukudi
Area          : Main Road
Address       : 71 Main Road, Thoothukudi
Phone         : +91 89126 65247
Email         : contact@annaieducationpoint.com
Website       : https://annaieducationpoint.com
Website Status: Has Website
Rating        : 3.1
Review Count  : 332
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[47]
Business Name : National Medical Traders - 47
Category      : Medical
District      : Tiruvallur
Area          : Main Road
Address       : 212 Main Road, Tiruvallur
Phone         : +91 86354 36647
Email         : contact@nationalmedicaltraders.com
Website       : https://nationalmedicaltraders.com
Website Status: Has Website
Rating        : 3.7
Review Count  : 223
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[48]
Business Name : Cauvery Agriculture Group - 48
Category      : Agriculture
District      : Tiruvallur
Area          : Bazaar St
Address       : 496 Bazaar St, Tiruvallur
Phone         : +91 86686 56964
Email         : contact@cauveryagriculturegroup.com
Website       : https://cauveryagriculturegroup.com
Website Status: Has Website
Rating        : 3.5
Review Count  : 191
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[49]
Business Name : Annai Hotels Group - 49
Category      : Hotels
District      : Dindigul
Area          : Civil Lines
Address       : 142 Civil Lines, Dindigul
Phone         : +91 87132 94125
Email         : contact@annaihotelsgroup.com
Website       : https://annaihotelsgroup.com
Website Status: Has Website
Rating        : 4.1
Review Count  : 45
Status        : approved
------------------------------------------------------------------------------------------------------------------------
[50]
Business Name : Universal Textiles Group - 50
Category      : Textiles
District      : Coimbatore
Area          : Industrial Estate
Address       : 77 Industrial Estate, Coimbatore
Phone         : +91 81931 10970
Email         : contact@universaltextilesgroup.com
Website       : https://universaltextilesgroup.com
Website Status: Has Website
Rating        : 4.1
Review Count  : 138
Status        : approved
`;

function parseData(text) {
  const businesses = [];
  const sections = text.split(/------------------------------------------------------------------------------------------------------------------------|========================================================================================================================/);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    if (section.includes('DATABASE:')) continue;

    const lines = section.trim().split('\n');
    const bus = {};
    
    for (const line of lines) {
      if (line.includes('Business Name :')) bus.name = line.split(':')[1].trim();
      if (line.includes('Category      :')) bus.category = line.split(':')[1].trim();
      if (line.includes('District      :')) bus.district = line.split(':')[1].trim();
      if (line.includes('Area          :')) bus.area = line.split(':')[1].trim();
      if (line.includes('Address       :')) bus.address = line.split(':')[1].trim();
      if (line.includes('Phone         :')) bus.phone = line.split(':')[1].trim();
      if (line.includes('Email         :')) bus.email = line.split(':')[1].trim();
      if (line.includes('Website       :')) bus.website = line.split(':')[1].trim();
      if (line.includes('Rating        :')) bus.rating = parseFloat(line.split(':')[1].trim());
      if (line.includes('Review Count  :')) bus.reviewCount = parseInt(line.split(':')[1].trim());
      if (line.includes('Status        :')) bus.status = line.split(':')[1].trim();
    }

    if (bus.name) {
      // Add missing fields for schema
      bus.categoryIcon = 'Building2'; // Default
      bus.featured = bus.rating > 4.5;
      bus.images = [`/assets/dummy/${bus.category.toLowerCase().replace(/\s+/g, '-')}.png`];
      bus.createdBy = 'admin';
      bus.createdAt = serverTimestamp();
      bus.updatedAt = serverTimestamp();
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
    console.log(`📋 Starting import of ${parsedBusinesses.length} original records...\n`);

    let totalAdded = 0;
    for (const bus of parsedBusinesses) {
      try {
        await addDoc(collection(db, 'businesses'), bus);
        console.log(`  ✓ Added: ${bus.name}`);
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
