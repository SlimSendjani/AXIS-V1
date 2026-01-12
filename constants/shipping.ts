// Tarifs de livraison 58 Wilayas d'Algérie (basés sur Yalidine/ZR Express 2025)
// Zone 0: Alger et environs proches
// Zone 1: Nord-Centre
// Zone 2: Nord-Est/Ouest
// Zone 3: Hauts Plateaux
// Zone 4: Sud proche
// Zone 5: Grand Sud

export interface ShippingRate {
  code: string;
  name: string;
  arName: string;
  homeDelivery: number;  // Livraison à domicile
  pickupPoint: number;   // Point relais
  zone: number;
  estimatedDays: string;
}

export const SHIPPING_RATES: ShippingRate[] = [
  // Zone 0 - Alger et environs
  { code: "16", name: "Alger", arName: "الجزائر", homeDelivery: 400, pickupPoint: 250, zone: 0, estimatedDays: "24-48h" },
  { code: "35", name: "Boumerdès", arName: "بومرداس", homeDelivery: 500, pickupPoint: 300, zone: 0, estimatedDays: "24-48h" },
  { code: "09", name: "Blida", arName: "البليدة", homeDelivery: 500, pickupPoint: 300, zone: 0, estimatedDays: "24-48h" },
  { code: "42", name: "Tipaza", arName: "تيبازة", homeDelivery: 550, pickupPoint: 350, zone: 0, estimatedDays: "24-48h" },
  
  // Zone 1 - Nord Centre
  { code: "10", name: "Bouira", arName: "البويرة", homeDelivery: 600, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  { code: "26", name: "Médéa", arName: "المدية", homeDelivery: 650, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  { code: "44", name: "Aïn Defla", arName: "عين الدفلى", homeDelivery: 650, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  { code: "15", name: "Tizi Ouzou", arName: "تيزي وزو", homeDelivery: 600, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  { code: "06", name: "Béjaïa", arName: "بجاية", homeDelivery: 650, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  { code: "18", name: "Jijel", arName: "جيجل", homeDelivery: 650, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  { code: "02", name: "Chlef", arName: "الشلف", homeDelivery: 650, pickupPoint: 400, zone: 1, estimatedDays: "1-2 jours" },
  
  // Zone 2 - Nord Est/Ouest
  { code: "19", name: "Sétif", arName: "سطيف", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "25", name: "Constantine", arName: "قسنطينة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "23", name: "Annaba", arName: "عنابة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "31", name: "Oran", arName: "وهران", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "13", name: "Tlemcen", arName: "تلمسان", homeDelivery: 750, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "27", name: "Mostaganem", arName: "مستغانم", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "22", name: "Sidi Bel Abbès", arName: "سيدي بلعباس", homeDelivery: 750, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "05", name: "Batna", arName: "باتنة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "04", name: "Oum El Bouaghi", arName: "أم البواقي", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "24", name: "Guelma", arName: "قالمة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "21", name: "Skikda", arName: "سكيكدة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "36", name: "El Tarf", arName: "الطرف", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "41", name: "Souk Ahras", arName: "سوق أهراس", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "12", name: "Tébessa", arName: "تبسة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "43", name: "Mila", arName: "ميلة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "34", name: "Bordj Bou Arreridj", arName: "برج بوعريريج", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "40", name: "Khenchela", arName: "خنشلة", homeDelivery: 700, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "46", name: "Aïn Témouchent", arName: "عين تموشنت", homeDelivery: 750, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "48", name: "Relizane", arName: "غليزان", homeDelivery: 750, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  { code: "29", name: "Mascara", arName: "معسكر", homeDelivery: 750, pickupPoint: 400, zone: 2, estimatedDays: "1-3 jours" },
  
  // Zone 3 - Hauts Plateaux
  { code: "14", name: "Tiaret", arName: "تيارت", homeDelivery: 800, pickupPoint: 450, zone: 3, estimatedDays: "2-3 jours" },
  { code: "20", name: "Saïda", arName: "سعيدة", homeDelivery: 850, pickupPoint: 450, zone: 3, estimatedDays: "2-3 jours" },
  { code: "28", name: "M'Sila", arName: "المسيلة", homeDelivery: 750, pickupPoint: 400, zone: 3, estimatedDays: "2-3 jours" },
  { code: "38", name: "Tissemsilt", arName: "تيسمسيلت", homeDelivery: 800, pickupPoint: 450, zone: 3, estimatedDays: "2-3 jours" },
  { code: "07", name: "Biskra", arName: "بسكرة", homeDelivery: 750, pickupPoint: 400, zone: 3, estimatedDays: "2-3 jours" },
  
  // Zone 4 - Sud proche
  { code: "03", name: "Laghouat", arName: "الأغواط", homeDelivery: 1000, pickupPoint: 600, zone: 4, estimatedDays: "3-5 jours" },
  { code: "17", name: "Djelfa", arName: "الجلفة", homeDelivery: 1000, pickupPoint: 600, zone: 4, estimatedDays: "3-5 jours" },
  { code: "39", name: "El Oued", arName: "الوادي", homeDelivery: 900, pickupPoint: 550, zone: 4, estimatedDays: "3-5 jours" },
  { code: "30", name: "Ouargla", arName: "ورقلة", homeDelivery: 1000, pickupPoint: 600, zone: 4, estimatedDays: "3-5 jours" },
  { code: "47", name: "Ghardaïa", arName: "غرداية", homeDelivery: 1000, pickupPoint: 600, zone: 4, estimatedDays: "3-5 jours" },
  { code: "32", name: "El Bayadh", arName: "البيض", homeDelivery: 1200, pickupPoint: 700, zone: 4, estimatedDays: "3-5 jours" },
  { code: "45", name: "Naâma", arName: "النعامة", homeDelivery: 1200, pickupPoint: 700, zone: 4, estimatedDays: "3-5 jours" },
  { code: "51", name: "Ouled Djellal", arName: "أولاد جلال", homeDelivery: 900, pickupPoint: 550, zone: 4, estimatedDays: "3-5 jours" },
  { code: "55", name: "Touggourt", arName: "تقرت", homeDelivery: 950, pickupPoint: 550, zone: 4, estimatedDays: "3-5 jours" },
  { code: "57", name: "El M'Ghair", arName: "المغير", homeDelivery: 950, pickupPoint: 550, zone: 4, estimatedDays: "3-5 jours" },
  { code: "58", name: "El Meniaa", arName: "المنيعة", homeDelivery: 1100, pickupPoint: 650, zone: 4, estimatedDays: "3-5 jours" },
  
  // Zone 5 - Grand Sud
  { code: "01", name: "Adrar", arName: "أدرار", homeDelivery: 1400, pickupPoint: 800, zone: 5, estimatedDays: "5-7 jours" },
  { code: "08", name: "Béchar", arName: "بشار", homeDelivery: 1300, pickupPoint: 750, zone: 5, estimatedDays: "5-7 jours" },
  { code: "11", name: "Tamanrasset", arName: "تمنراست", homeDelivery: 1500, pickupPoint: 900, zone: 5, estimatedDays: "5-7 jours" },
  { code: "33", name: "Illizi", arName: "إليزي", homeDelivery: 1600, pickupPoint: 1000, zone: 5, estimatedDays: "5-7 jours" },
  { code: "37", name: "Tindouf", arName: "تندوف", homeDelivery: 1500, pickupPoint: 900, zone: 5, estimatedDays: "5-7 jours" },
  { code: "49", name: "Timimoun", arName: "تيميمون", homeDelivery: 1400, pickupPoint: 800, zone: 5, estimatedDays: "5-7 jours" },
  { code: "50", name: "Bordj Badji Mokhtar", arName: "برج باجي مختار", homeDelivery: 1600, pickupPoint: 1000, zone: 5, estimatedDays: "7-10 jours" },
  { code: "52", name: "Béni Abbès", arName: "بني عباس", homeDelivery: 1400, pickupPoint: 800, zone: 5, estimatedDays: "5-7 jours" },
  { code: "53", name: "In Salah", arName: "عين صالح", homeDelivery: 1500, pickupPoint: 900, zone: 5, estimatedDays: "5-7 jours" },
  { code: "54", name: "In Guezzam", arName: "عين قزام", homeDelivery: 1700, pickupPoint: 1100, zone: 5, estimatedDays: "7-10 jours" },
  { code: "56", name: "Djanet", arName: "جانت", homeDelivery: 1600, pickupPoint: 1000, zone: 5, estimatedDays: "5-7 jours" },
];

// Livraison gratuite à partir de ce montant
export const FREE_SHIPPING_THRESHOLD = 12000;

// Obtenir le tarif par code wilaya
export const getShippingRate = (wilayaCode: string): ShippingRate | undefined => {
  return SHIPPING_RATES.find(rate => rate.code === wilayaCode);
};

// Calculer les frais de livraison
export const calculateShipping = (wilayaCode: string, cartTotal: number, deliveryType: 'home' | 'pickup' = 'home'): number => {
  if (cartTotal >= FREE_SHIPPING_THRESHOLD) return 0;
  const rate = getShippingRate(wilayaCode);
  if (!rate) return 0;
  return deliveryType === 'home' ? rate.homeDelivery : rate.pickupPoint;
};
