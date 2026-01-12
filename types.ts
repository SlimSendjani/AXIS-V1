export type Language = 'fr' | 'en' | 'ar';

export interface Translation {
  navShop: string;
  navAbout: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  certified: string;
  edition: string;
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
  stat3: string;
  stat3Label: string;
  problemTitle: string;
  problemText: string;
  problem1: string;
  problem2: string;
  productsTitle: string;
  productsSubtitle: string;
  addToCart: string;
  buyNow: string;
  viewProduct: string;
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
  reviewsTitle: string;
  review1: string;
  review2: string;
  review3: string;
  verifiedClient: string;
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
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
  included: string;
  qty: string;
  errName: string;
  errPhone: string;
  errWilaya: string;
  bumpText: string;
  cart: string;
  cartEmpty: string;
  remove: string;
  updateCart: string;
  proceedCheckout: string;
  orderPlaced: string;
  orderConfirmEmail: string;
  trackingInfo: string;
  syncingOrder: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice: number;
  shortDesc: string;
  description: string;
  image: string;
  gallery: string[];
  features: { title: string; desc: string }[];
  specs: string[];
  painPoint: string;
  solution: string;
  benefit: string;
}

export interface Wilaya {
  code: string;
  name: string;
  arName: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  productName: string;
  price: number;
}

export interface Order {
  id: string;
  timestamp: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    wilaya: string;
    address: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}
