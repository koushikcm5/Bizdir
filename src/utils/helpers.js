// src/utils/helpers.js
import {
  UtensilsCrossed, Hotel, Stethoscope, School, ShoppingBag,
  Scissors, Dumbbell, Smartphone, Car, Home, Plane,
  Scale, Coins, Monitor, HeartPulse, BookOpen, Building2,
  Drama, Gamepad2, Leaf,
} from 'lucide-react';

export const formatDate = (ts) => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const truncate = (str, n = 120) =>
  str?.length > n ? str.slice(0, n) + '...' : str;

export const getInitials = (name) =>
  name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '--';

export const statusColor = (status) => ({
  approved: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
}[status] || 'bg-gray-100 text-gray-700');

export const roleColor = (role) => ({
  super_admin: 'bg-purple-100 text-purple-700',
  admin: 'bg-blue-100 text-blue-700',
  user: 'bg-gray-100 text-gray-600',
}[role] || 'bg-gray-100 text-gray-700');

// Map category names to lucide-react icon components
export const CATEGORY_ICON_MAP = {
  'Restaurants': UtensilsCrossed,
  'Hotels': Hotel,
  'Hospitals': Stethoscope,
  'Schools': School,
  'Shopping': ShoppingBag,
  'Salons': Scissors,
  'Gyms': Dumbbell,
  'Electronics': Smartphone,
  'Automobiles': Car,
  'Real Estate': Home,
  'Travel': Plane,
  'Legal': Scale,
  'Finance': Coins,
  'IT Services': Monitor,
  'Healthcare': HeartPulse,
  'Education': BookOpen,
  'Other': Building2,
  'Entertainment': Drama,
  'Gaming': Gamepad2,
  'Nature': Leaf,
};

// Legacy string map (kept for DB compat – returns icon component)
export const CATEGORY_ICONS = CATEGORY_ICON_MAP;

export const MOCK_CATEGORIES = [
  { id: '1', name: 'Restaurants', Icon: UtensilsCrossed, color: '#FF6B6B' },
  { id: '2', name: 'Hotels', Icon: Hotel, color: '#4ECDC4' },
  { id: '3', name: 'Hospitals', Icon: Stethoscope, color: '#45B7D1' },
  { id: '4', name: 'Schools', Icon: School, color: '#96CEB4' },
  { id: '5', name: 'Shopping', Icon: ShoppingBag, color: '#FFEAA7' },
  { id: '6', name: 'Salons', Icon: Scissors, color: '#DDA0DD' },
  { id: '7', name: 'Gyms', Icon: Dumbbell, color: '#98D8C8' },
  { id: '8', name: 'IT Services', Icon: Monitor, color: '#F7DC6F' },
];

export const MOCK_LOCATIONS = [
  { id: '1',  name: 'Ariyalur',         areas: ['Ariyalur', 'Andimadam', 'Jayankondam', 'Sendurai', 'Udayarpalayam'] },
  { id: '2',  name: 'Chengalpattu',     areas: ['Chengalpattu', 'Maraimalai Nagar', 'Vandalur', 'Tambaram', 'Urapakkam', 'Guduvanchery'] },
  { id: '3',  name: 'Chennai',          areas: ['Anna Nagar', 'T. Nagar', 'Adyar', 'Velachery', 'OMR', 'Porur', 'Nungambakkam', 'Mylapore', 'Perambur', 'Chromepet'] },
  { id: '4',  name: 'Coimbatore',       areas: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saravanampatti', 'Singanallur', 'Palladam', 'Mettupalayam', 'Pollachi'] },
  { id: '5',  name: 'Cuddalore',        areas: ['Cuddalore', 'Chidambaram', 'Panruti', 'Virudhachalam', 'Neyveli'] },
  { id: '6',  name: 'Dharmapuri',       areas: ['Dharmapuri', 'Harur', 'Palacode', 'Pennagaram', 'Karimangalam'] },
  { id: '7',  name: 'Dindigul',         areas: ['Dindigul', 'Palani', 'Kodaikanal', 'Oddanchatram', 'Natham', 'Vedasandur'] },
  { id: '8',  name: 'Erode',            areas: ['Erode', 'Bhavani', 'Perundurai', 'Gobichettipalayam', 'Sathyamangalam', 'Kangeyam'] },
  { id: '9',  name: 'Kallakurichi',     areas: ['Kallakurichi', 'Ulundurpet', 'Sankarapuram', 'Tirukoilur', 'ChinnaSalem'] },
  { id: '10', name: 'Kancheepuram',     areas: ['Kancheepuram', 'Sriperumbudur', 'Uthiramerur', 'Wallajabad', 'Kundrathur'] },
  { id: '11', name: 'Karur',            areas: ['Karur', 'Kulithalai', 'Krishnarayapuram', 'Aravakurichi', 'Pugalur'] },
  { id: '12', name: 'Krishnagiri',      areas: ['Krishnagiri', 'Hosur', 'Denkanikotta', 'Uthangarai', 'Bargur'] },
  { id: '13', name: 'Madurai',          areas: ['Anna Nagar', 'Arappalayam', 'KK Nagar', 'Thirunagar', 'Palanganatham', 'Usilampatti', 'Melur'] },
  { id: '14', name: 'Mayiladuthurai',   areas: ['Mayiladuthurai', 'Sirkazhi', 'Sirkali', 'Kuthalam', 'Poompuhar'] },
  { id: '15', name: 'Nagapattinam',     areas: ['Nagapattinam', 'Vedaranyam', 'Kilvelur', 'Thalainayar', 'Thirumarugal'] },
  { id: '16', name: 'Namakkal',         areas: ['Namakkal', 'Rasipuram', 'Tiruchengode', 'Paramathi-Velur', 'Kolli Hills'] },
  { id: '17', name: 'Nilgiris',         areas: ['Ooty', 'Coonoor', 'Gudalur', 'Kotagiri', 'Mettupalayam'] },
  { id: '18', name: 'Perambalur',       areas: ['Perambalur', 'Kunnam', 'Veppanthattai', 'Alathur', 'Veppur'] },
  { id: '19', name: 'Pudukkottai',      areas: ['Pudukkottai', 'Karambakkudi', 'Thirumayam', 'Alangudi', 'Aranthangi', 'Gandarvakottai'] },
  { id: '20', name: 'Ramanathapuram',   areas: ['Ramanathapuram', 'Paramakudi', 'Rameswaram', 'Mandapam', 'Keelakarai', 'Tiruvadanai'] },
  { id: '21', name: 'Ranipet',          areas: ['Ranipet', 'Arcot', 'Walajapet', 'Sholinghur', 'Arakkonam'] },
  { id: '22', name: 'Salem',            areas: ['Salem', 'Attur', 'Omalur', 'Mettur', 'Yercaud', 'Vazhapadi', 'Sangagiri'] },
  { id: '23', name: 'Sivaganga',        areas: ['Sivaganga', 'Karaikudi', 'Devakottai', 'Manamadurai', 'Tiruppattur', 'Ilayangudi'] },
  { id: '24', name: 'Tenkasi',          areas: ['Tenkasi', 'Sankarankovil', 'Shenkottai', 'Kadayanallur', 'Alangulam'] },
  { id: '25', name: 'Thanjavur',        areas: ['Thanjavur', 'Kumbakonam', 'Pattukottai', 'Papanasam', 'Thiruvidaimarudur', 'Budalur'] },
  { id: '26', name: 'Theni',            areas: ['Theni', 'Bodi', 'Uthamapalayam', 'Periyakulam', 'Bodinayakanur'] },
  { id: '27', name: 'Thoothukudi',      areas: ['Thoothukudi', 'Kovilpatti', 'Tiruchendur', 'Kayalpatnam', 'Ettayapuram'] },
  { id: '28', name: 'Tiruchirappalli',  areas: ['Trichy', 'Srirangam', 'Thillai Nagar', 'Ariyamangalam', 'Lalgudi', 'Musiri', 'Manachanallur'] },
  { id: '29', name: 'Tirunelveli',      areas: ['Tirunelveli', 'Palayamkottai', 'Ambasamudram', 'Nanguneri', 'Radhapuram', 'Cheranmahadevi'] },
  { id: '30', name: 'Tirupathur',       areas: ['Tirupathur', 'Vaniyambadi', 'Ambur', 'Jolarpet', 'Natrampalli'] },
  { id: '31', name: 'Tiruppur',         areas: ['Tiruppur', 'Avinashi', 'Dharapuram', 'Udumalaipettai', 'Palladam', 'Kangeyam'] },
  { id: '32', name: 'Tiruvallur',       areas: ['Tiruvallur', 'Ambattur', 'Poonamallee', 'Avadi', 'Gummidipoondi', 'Tiruttani'] },
  { id: '33', name: 'Tiruvannamalai',   areas: ['Tiruvannamalai', 'Polur', 'Arni', 'Cheyyar', 'Vandavasi', 'Chengam'] },
  { id: '34', name: 'Tiruvarur',        areas: ['Tiruvarur', 'Mannargudi', 'Papanasam', 'Valangaiman', 'Nannilam'] },
  { id: '35', name: 'Vellore',          areas: ['Vellore', 'Katpadi', 'Gudiyatham', 'Anaicut', 'Pernambut'] },
  { id: '36', name: 'Villupuram',       areas: ['Villupuram', 'Gingee', 'Tindivanam', 'Vikravandi', 'Marakkanam', 'Pondicherry Border'] },
  { id: '37', name: 'Virudhunagar',     areas: ['Virudhunagar', 'Sivakasi', 'Rajapalayam', 'Srivilliputhur', 'Sattur', 'Aruppukkottai'] },
  { id: '38', name: 'Puducherry',       areas: ['Puducherry', 'Auroville', 'Oulgaret', 'Villianur', 'Ariyankuppam'] },
];
