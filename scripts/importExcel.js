// scripts/importExcel.js
const xlsx = require('xlsx');
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp 
} = require('firebase/firestore');

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

async function importExcel(filePath) {
  try {
    console.log(`\n📂 Reading file: ${filePath}...`);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(`📊 Found ${data.length} rows to process.\n`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2; // 1-indexed + header row

      // 1. Validation: Required fields
      if (!row.name || !row.category) {
        console.error(`  ✗ [Row ${rowNum}] Skip: Missing 'name' or 'category'.`);
        errors++;
        continue;
      }

      // 2. Schema Mapping & Type Conversion
      const businessData = {
        // Strings
        address: String(row.address || ''),
        area: String(row.area || ''),
        category: String(row.category || ''),
        categoryIcon: String(row.categoryIcon || 'Building2'),
        createdBy: String(row.createdBy || 'admin'),
        description: String(row.description || ''),
        district: String(row.district || ''),
        email: String(row.email || ''),
        name: String(row.name).trim(),
        phone: String(row.phone || ''),
        status: String(row.status || 'approved'),
        website: String(row.website || ''),

        // Numbers
        lat: parseFloat(row.lat) || 0,
        lng: parseFloat(row.lng) || 0,
        rating: parseFloat(row.rating) || 0,
        reviewCount: parseInt(row.reviewCount) || 0,

        // Booleans
        featured: row.featured === true || String(row.featured).toLowerCase() === 'true',

        // Arrays (Comma-separated string to Array)
        tags: row.tags ? String(row.tags).split(',').map(t => t.trim()).filter(Boolean) : [],
        images: row.images ? String(row.images).split(',').map(img => img.trim()).filter(Boolean) : [],

        // Timestamps
        updatedAt: serverTimestamp()
      };

      // 3. Upsert Logic: Check if business name exists
      const busRef = collection(db, 'businesses');
      const q = query(busRef, where('name', '==', businessData.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update existing record
        const existingDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'businesses', existingDoc.id), businessData);
        console.log(`  ✓ [Row ${rowNum}] Updated: ${businessData.name}`);
        updated++;
      } else {
        // Create new record
        businessData.createdAt = serverTimestamp();
        await addDoc(busRef, businessData);
        console.log(`  + [Row ${rowNum}] Created: ${businessData.name}`);
        imported++;
      }
    }

    console.log(`\n🎉 Import Complete!`);
    console.log(`  ✓ New records: ${imported}`);
    console.log(`  ✓ Updated records: ${updated}`);
    console.log(`  ✗ Errors: ${errors}`);
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Error during import:`, error.message);
    process.exit(1);
  }
}

// Get file path from command line argument
const filePath = process.argv[2];
if (!filePath) {
  console.log('Usage: node scripts/importExcel.js <path-to-excel-file>');
  process.exit(1);
}

importExcel(filePath);
