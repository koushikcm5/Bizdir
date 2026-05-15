# Data Setup Scripts

This directory contains scripts to populate the Bizdir application with dummy data.

## Scripts

### `setupCompleteData.js`
Complete setup script that adds:
- **10 Categories**: Restaurants, Hotels, Hospitals, Schools, Shopping, Salons, Gyms, Electronics, Automobiles, Real Estate
- **5 Locations**: Kozhikode, Malappuram, Kannur, Wayanad, Kasaragod (with multiple areas each)
- **51 Businesses**: At least 5 businesses per category with realistic details

### `addDummyBusinesses.js`
Standalone script to add businesses only (requires existing categories and locations).

## Usage

Run the complete setup script:
```bash
node scripts/setupCompleteData.js
```

## What Gets Added

### Categories (10)
Each category has an icon and color:
- Restaurants (UtensilsCrossed, Orange)
- Hotels (Hotel, Blue)
- Hospitals (Stethoscope, Red)
- Schools (School, Purple)
- Shopping (ShoppingBag, Pink)
- Salons (Scissors, Amber)
- Gyms (Dumbbell, Green)
- Electronics (Smartphone, Indigo)
- Automobiles (Car, Teal)
- Real Estate (Home, Rose)

### Locations (5 Kerala Districts)
- **Kozhikode**: 7 areas (Mavoor Road, Palazhi, Nadakkavu, Kallai, Beach Road, Medical College, Hilite City)
- **Malappuram**: 6 areas (Manjeri, Perinthalmanna, Tirur, Ponnani, Nilambur, Kottakkal)
- **Kannur**: 5 areas (Thalassery, Payyannur, Mattannur, Iritty, Taliparamba)
- **Wayanad**: 4 areas (Kalpetta, Sulthan Bathery, Mananthavady, Vythiri)
- **Kasaragod**: 4 areas (Kasaragod Town, Kanhangad, Nileshwar, Bekal)

### Businesses (51 Total)
Each business includes:
- Name
- Description
- Contact details (phone, email, website)
- Address
- Tags
- Location coordinates (lat/lng)
- Status: 'approved' (ready to display)
- Random rating (3.0-5.0)
- Random review count (0-50)
- 30% chance of being featured

#### Sample Businesses by Category:
- **Restaurants** (6): Spice Garden Restaurant, The Royal Biryani House, Coastal Delights, Green Leaf Vegetarian, Pizza Paradise, Chai & Chaat Corner
- **Hotels** (5): Grand Palace Hotel, Comfort Inn, Heritage Residency, Seaside Resort, Business Hub Hotel
- **Hospitals** (5): City General Hospital, Heart Care Center, Mother & Child Hospital, Orthopedic & Trauma Center, Eye Care Hospital
- **Schools** (5): Bright Future International School, Little Angels Kindergarten, State Public School, Cambridge Academy, Tech Valley High School
- **Shopping** (5): City Mall, Fashion Hub, Electronics World, Home Decor Paradise, Book Haven
- **Salons** (5): Glamour Studio, Bridal Beauty Parlour, Men's Grooming Lounge, Nail Art Studio, Hair & Care Salon
- **Gyms** (5): Fitness First Gym, CrossFit Arena, Yoga & Wellness Center, Ladies Fitness Studio, Power Gym
- **Electronics** (5): Generic businesses with professional names
- **Automobiles** (5): Generic businesses with professional names
- **Real Estate** (5): Generic businesses with professional names

## Notes

- All businesses are auto-approved and ready to display
- Businesses are assigned to Kozhikode district by default
- Each business has realistic contact information and descriptions
- Coordinates are set around Kozhikode area (11.25°N, 75.78°E)
- No images are added (Firebase Storage is disabled during testing)

## Firebase Collections

The script populates these Firestore collections:
- `categories` - Business categories
- `locations` - Districts and areas
- `businesses` - Business listings

## Requirements

- Node.js installed
- Firebase project configured
- Valid Firebase credentials in the script
