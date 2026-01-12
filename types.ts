export type Language = 'fr' | 'en' | 'ar';

export interface Feature {
  title: string;
  desc: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice: number;
  description: string;
  shortDesc: string;
  image: string;
  gallery?: string[];
  features: Feature[];
  specs: string[];
  painPoint: string;
  solution: string;
  benefit: string;
}

export interface Wilaya {
  code: string;
  name: string;
  arName?: string;
}

export interface Translation {
  // Navigation
  navShop: string;
  navAbout: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  certified: string;
  edition: string;
  
  // Stats
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
  stat3: string;
  stat3Label: string;
  
  // Problem Section
  problemTitle: string;
  problemText: string;
  problem1: string;
  problem2: string;
  
  // Products
  productsTitle: string;
  productsSubtitle: string;
  addToCart: string;
  buyNow: string;
  viewProduct: string;
  
  // Tech Section
  techTitle: string;
  techSub: string;
  tech1Title: string;
  tech1Desc: string;
  tech2Title: string;
  tech2Desc: string;
  tech3Title: string;
  tech3Desc: string;
  tech4Title: string;
  tech4Desc: string;
  
  // Reviews
  reviewsTitle: string;
  review1: string;
  review2: string;
  review3: string;
  verifiedClient: string;
  
  // Checkout & Footer
  shipping: string;
  whyUsTitle1: string;
  whyUsDesc1: string;
  whyUsTitle2: string;
  whyUsDesc2: string;
  whyUsTitle3: string;
  whyUsDesc3: string;
  secureCheckout: string;
  orderSummary: string;
  identity: string;
  contact: string;
  zone: string;
  sector: string;
  confirmOrder: string;
  orderBumpTitle: string;
  orderBumpDesc: string;
  paymentNotice: string;
  loading: string;
  ticker: string;
  back: string;
  details: string;
  selectLoadout: string;
  finalCtaTitle: string;
  finalCtaSub: string;

  // New translations for missing parts
  subtotal: string;
  tax: string;
  total: string;
  included: string;
  qty: string;
  errName: string;
  errPhone: string;
  errWilaya: string;
  bumpText: string; // "+ Maintenance Kit" text in message
}