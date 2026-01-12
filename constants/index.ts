// Export all shipping-related constants
export { SHIPPING_RATES, getShippingRate, calculateShipping, FREE_SHIPPING_THRESHOLD, type ShippingRate } from './shipping';

// Admin Configuration
export const ADMIN_EMAIL = 'slimsendjani@gmail.com';
export const PHONE_NUMBER_WHATSAPP = '213794620693';

// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: '1h3i6DMdTGhBXHNDbekCFBKZ4xMOT8KbqgGI3ghPWg4g',
  sheetName: 'Commandes',
  apiKey: 'AIzaSyDjEGJM_2dz_8J_V_9Qu3c0dQhF-XqH_x0' // Remplacer par votre clé API Google
};

// Wilayas (58 wilayas d'Algérie avec codes postaux)
export const WILAYAS = [
  // Zone 0 - Alger et environs
  { code: '16', name: 'Alger', arName: 'الجزائر' },
  { code: '35', name: 'Boumerdès', arName: 'بومرداس' },
  { code: '09', name: 'Blida', arName: 'البليدة' },
  { code: '42', name: 'Tipaza', arName: 'تيبازة' },
  
  // Zone 1 - Nord Centre
  { code: '10', name: 'Bouira', arName: 'البويرة' },
  { code: '26', name: 'Médéa', arName: 'المدية' },
  { code: '44', name: 'Aïn Defla', arName: 'عين الدفلى' },
  { code: '15', name: 'Tizi Ouzou', arName: 'تيزي وزو' },
  { code: '06', name: 'Béjaïa', arName: 'بجاية' },
  { code: '18', name: 'Jijel', arName: 'جيجل' },
  { code: '02', name: 'Chlef', arName: 'الشلف' },
  
  // Zone 2 - Nord Est/Ouest
  { code: '19', name: 'Sétif', arName: 'سطيف' },
  { code: '25', name: 'Constantine', arName: 'قسنطينة' },
  { code: '23', name: 'Annaba', arName: 'عنابة' },
  { code: '31', name: 'Oran', arName: 'وهران' },
  { code: '13', name: 'Tlemcen', arName: 'تلمسان' },
  { code: '27', name: 'Mostaganem', arName: 'مستغانم' },
  { code: '22', name: 'Sidi Bel Abbès', arName: 'سيدي بلعباس' },
  { code: '05', name: 'Batna', arName: 'باتنة' },
  { code: '04', name: 'Oum El Bouaghi', arName: 'أم البواقي' },
  { code: '24', name: 'Guelma', arName: 'قالمة' },
  { code: '21', name: 'Skikda', arName: 'سكيكدة' },
  { code: '36', name: 'El Tarf', arName: 'الطرف' },
  { code: '41', name: 'Souk Ahras', arName: 'سوق أهراس' },
  { code: '12', name: 'Tébessa', arName: 'تبسة' },
  { code: '43', name: 'Mila', arName: 'ميلة' },
  { code: '34', name: 'Bordj Bou Arreridj', arName: 'برج بوعريريج' },
  { code: '40', name: 'Khenchela', arName: 'خنشلة' },
  { code: '46', name: 'Aïn Témouchent', arName: 'عين تموشنت' },
  { code: '48', name: 'Relizane', arName: 'غليزان' },
  { code: '29', name: 'Mascara', arName: 'معسكر' },
  
  // Zone 3 - Hauts Plateaux
  { code: '14', name: 'Tiaret', arName: 'تيارت' },
  { code: '20', name: 'Saïda', arName: 'سعيدة' },
  { code: '28', name: 'M\'Sila', arName: 'المسيلة' },
  { code: '38', name: 'Tissemsilt', arName: 'تيسمسيلت' },
  { code: '07', name: 'Biskra', arName: 'بسكرة' },
  
  // Zone 4 - Sud proche
  { code: '03', name: 'Laghouat', arName: 'الأغواط' },
  { code: '17', name: 'Djelfa', arName: 'الجلفة' },
  { code: '39', name: 'El Oued', arName: 'الوادي' },
  { code: '30', name: 'Ouargla', arName: 'ورقلة' },
  { code: '47', name: 'Ghardaïa', arName: 'غرداية' },
  { code: '32', name: 'El Bayadh', arName: 'البيض' },
  { code: '45', name: 'Naâma', arName: 'النعامة' },
  { code: '51', name: 'Ouled Djellal', arName: 'أولاد جلال' },
  { code: '55', name: 'Touggourt', arName: 'تقرت' },
  { code: '57', name: 'El M\'Ghair', arName: 'المغير' },
  { code: '58', name: 'El Meniaa', arName: 'المنيعة' },
  
  // Zone 5 - Grand Sud
  { code: '01', name: 'Adrar', arName: 'أدرار' },
  { code: '08', name: 'Béchar', arName: 'بشار' },
  { code: '11', name: 'Tamanrasset', arName: 'تمنراست' },
  { code: '33', name: 'Illizi', arName: 'إليزي' },
  { code: '37', name: 'Tindouf', arName: 'تندوف' },
  { code: '49', name: 'Timimoun', arName: 'تيميمون' },
  { code: '50', name: 'Bordj Badji Mokhtar', arName: 'برج باجي مختار' },
  { code: '52', name: 'Béni Abbès', arName: 'بني عباس' },
  { code: '53', name: 'In Salah', arName: 'عين صالح' },
  { code: '54', name: 'In Guezzam', arName: 'عين قزام' },
  { code: '56', name: 'Djanet', arName: 'جانت' },
];

// Fonction utilitaire pour obtenir le nom de la wilaya
export const getWilayaName = (code: string): string => {
  const wilaya = WILAYAS.find(w => w.code === code);
  return wilaya?.name || 'Inconnue';
};

// Fonction pour obtenir le nom en arabe
export const getWilayaArName = (code: string): string => {
  const wilaya = WILAYAS.find(w => w.code === code);
  return wilaya?.arName || 'غير معروف';
};
