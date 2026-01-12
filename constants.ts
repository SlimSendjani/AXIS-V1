import { Product, Wilaya, Translation, Language } from './types';

import imageShapewear from './1e999d18-4d8d-4dc0-8b96-a8ec1e41df17.png';
import imageShapewear2 from './3a16206c-2971-40da-9972-6bba3e835300.png';
import imagePosture from './91155762-e3ed-4cd3-967b-94d45382b4f6.png';
import imageKnee from './aebef839-045c-41b6-be23-609edac91b3d.png';
import imageInsoles from './86d18a90-aaab-4a27-90bf-01668154280b.png';

export const BRAND_NAME = "AXIS";
export const PHONE_NUMBER_WHATSAPP = "213555123456";
export const ADMIN_EMAIL = "slim.sendjani@gmail.com";

// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: "1h3i6DMdTGhBXHNDbekCFBKZ4xMOT8KbqgGI3ghPWg4g",
  sheetName: "Commandes",
  // API Key (public) - remplacer si nécessaire
  apiKey: "AIzaSyBDjIe60p8mnxtutJzHhayrQ9crViCSMts"
};

// Formspree Configuration
export const FORMSPREE_ID = "mqzeeaqk";

// Product images
const PRODUCT_IMGS = {
  shapewear: imageShapewear,
  shapewear2: imageShapewear2,
  posture: imagePosture,
  posture2: imagePosture,
  knee: imageKnee,
  knee2: imageKnee,
  insoles: imageInsoles,
  insoles2: imageInsoles
};

// Frais de livraison intelligents par zone (en DA)
export const SHIPPING_ZONES = {
  zone1: { name: "Alger & Proximité", price: 500, wilayas: ["16", "09", "35", "42"] },
  zone2: { name: "Nord Algérie", price: 800, wilayas: ["01", "02", "15", "18", "21", "23", "24", "25", "36", "37", "38", "39", "40", "41", "43", "44", "51", "56", "57"] },
  zone3: { name: "Centre Algérie", price: 1000, wilayas: ["03", "05", "06", "07", "17", "19", "26", "27", "28", "29", "30", "47", "49", "50", "52", "53", "54", "55", "58"] },
  zone4: { name: "Est Algérie", price: 1200, wilayas: ["04", "08", "12", "13", "14", "20", "22", "31", "32", "33", "45", "46", "48"] },
  zone5: { name: "Ouest Algérie", price: 1200, wilayas: ["10", "11", "34"] },
};

// Alias for backward compatibility
export const SHIPPING_RATES = SHIPPING_ZONES;

export const getShippingPrice = (wilayaCode: string): number => {
  for (const zone of Object.values(SHIPPING_ZONES)) {
    if (zone.wilayas.includes(wilayaCode)) {
      return zone.price;
    }
  }
  return 1500;
};

export const getShippingZone = (wilayaCode: string): string => {
  for (const zone of Object.values(SHIPPING_ZONES)) {
    if (zone.wilayas.includes(wilayaCode)) {
      return zone.name;
    }
  }
  return "Livraison Standard";
};

export const calculateShipping = (wilayaCode: string, subtotal: number, deliveryType: 'home' | 'pickup'): number => {
  const zonePrice = getShippingPrice(wilayaCode);
  // Example logic: Pickup is cheaper? Or same? Assuming same for now to be safe, or -200DA if generic.
  // Actually, let's just return zonePrice to match getShippingPrice behavior for now.
  return zonePrice;
};

export const FREE_SHIPPING_THRESHOLD = 8000; // Free shipping over 8000 DA

// Alias for backward compatibility
export const getShippingRate = getShippingPrice;

export const getWilayaName = (wilayaCode: string): string => {
  const wilaya = WILAYAS.find(w => w.code === wilayaCode);
  return wilaya ? wilaya.name : wilayaCode;
};

export const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    navShop: "ARSENAL",
    navAbout: "VISION",
    heroTitle: "BÂTISSEZ\nVOTRE HÉRITAGE.",
    heroSubtitle: "Ne laissez pas la gravité écraser votre structure. Redressez-vous. Dominez. Équipements de correction anatomique de haute précision.",
    heroCta: "REJOINDRE L'ÉLITE",
    certified: "INGÉNIERIE AXIS",
    edition: "SÉRIE GEN-1",
    stat1: "50,000+",
    stat1Label: "CORPS TRANSFORMÉS",
    stat2: "98.4%",
    stat2Label: "TAUX DE RÉUSSITE",
    stat3: "58",
    stat3Label: "ZONES COUVERTES",
    problemTitle: "EFFONDREMENT STRUCTUREL",
    problemText: "La sédentarité est un poison lent. Votre dos se voûte. Vos articulations s'usent prématurément. Votre présence s'efface. C'est inacceptable.",
    problem1: "DÉGRADATION PHYSIQUE",
    problem2: "PERTE DE PUISSANCE",
    productsTitle: "L'ARSENAL",
    productsSubtitle: "QUANTITÉ LIMITÉE / LOT 04",
    addToCart: "AJOUTER",
    buyNow: "ACHETER",
    viewProduct: "ANALYSER",
    techTitle: "ARCHITECTURE CORPORELLE",
    techSub: "MATÉRIAUX DE POINTE",
    tech1Title: "COMPRESSION THERMIQUE",
    tech1Desc: "Active la circulation sanguine et prépare le muscle à l'effort.",
    tech2Title: "STRUCTURE À MÉMOIRE",
    tech2Desc: "Polymère flexible qui force l'alignement naturel sans contrainte.",
    tech3Title: "ABSORPTION D'IMPACT",
    tech3Desc: "Gel matriciel dissipant 40% de l'énergie cinétique à chaque pas.",
    tech4Title: "DESIGN ANATOMIQUE",
    tech4Desc: "Moulé sur des athlètes d'élite pour une fusion totale avec le corps.",
    reviewsTitle: "RAPPORTS DE TERRAIN",
    review1: "Une transformation radicale. Ma posture impose le respect dès que j'entre dans une pièce. AXIS n'est pas un accessoire, c'est une nécessité.",
    review2: "Après 12h debout, mes jambes sont fraîches. C'est comme avoir une nouvelle paire de jambes chaque matin.",
    review3: "La douleur au dos a disparu en 3 jours. Je peux enfin me concentrer sur mes objectifs.",
    verifiedClient: "MEMBRE VÉRIFIÉ",
    shipping: "LIVRAISON",
    whyUsTitle1: "LIVRAISON NATIONALE",
    whyUsDesc1: "58 Wilayas couvertes.",
    whyUsTitle2: "DESIGN FURTIF",
    whyUsDesc2: "Invisible et puissant.",
    whyUsTitle3: "GARANTIE TOTALE",
    whyUsDesc3: "Satisfait ou remboursé.",
    secureCheckout: "COMMANDE SÉCURISÉE",
    orderSummary: "VOTRE SÉLECTION",
    identity: "IDENTITÉ",
    contact: "LIGNE DIRECTE",
    zone: "WILAYA",
    sector: "ADRESSE EXACTE",
    confirmOrder: "VALIDER L'ACQUISITION",
    orderBumpTitle: "KIT DE MAINTENANCE (+1500 DA)",
    orderBumpDesc: "Prolongez la durée de vie de votre équipement.",
    paymentNotice: "PAIEMENT À LA LIVRAISON • AUCUN RISQUE",
    loading: "PRÉPARATION...",
    ticker: "LIVRAISON OFFERTE DÈS 8000 DA /// RETOUR GRATUIT /// SUPPORT 24/7",
    back: "RETOUR",
    details: "DÉTAILS TECHNIQUES",
    selectLoadout: "SÉLECTIONNEZ VOTRE MODÈLE",
    finalCtaTitle: "N'ATTENDEZ PAS LE DÉCLIN",
    finalCtaSub: "PRENEZ LE CONTRÔLE",
    subtotal: "SOUS-TOTAL",
    shippingCost: "FRAIS DE LIVRAISON",
    tax: "TAXES",
    total: "TOTAL",
    included: "INCLUS",
    qty: "QTÉ",
    errName: "ERREUR: NOM INVALIDE",
    errPhone: "ERREUR: FORMAT MOBILE INCORRECT",
    errWilaya: "ERREUR: WILAYA REQUISE",
    bumpText: "+ KIT MAINTENANCE",
    cart: "PANIER",
    cartEmpty: "Votre panier est vide",
    remove: "RETIRER",
    updateCart: "METTRE À JOUR",
    proceedCheckout: "PROCÉDER AU PAIEMENT",
    orderPlaced: "COMMANDE CONFIRMÉE",
    orderConfirmEmail: "Un email de confirmation a été envoyé à",
    trackingInfo: "Nous vous recontacterons sous 24h pour confirmer votre livraison",
    syncingOrder: "Synchronisation avec Google Sheets..."
  },
  en: {
    navShop: "ARSENAL",
    navAbout: "VISION",
    heroTitle: "BUILD YOUR\nLEGACY.",
    heroSubtitle: "Don't let gravity crush your structure. Stand tall. Dominate. High-precision anatomical correction gear.",
    heroCta: "JOIN THE ELITE",
    certified: "AXIS ENGINEERING",
    edition: "GEN-1 SERIES",
    stat1: "50,000+",
    stat1Label: "BODIES TRANSFORMED",
    stat2: "98.4%",
    stat2Label: "SUCCESS RATE",
    stat3: "58",
    stat3Label: "ZONES DEPLOYED",
    problemTitle: "STRUCTURAL COLLAPSE",
    problemText: "Sedentary life is a slow poison. Your back hunches. Your joints wear out prematurely. Your presence fades. This is unacceptable.",
    problem1: "PHYSICAL DECAY",
    problem2: "POWER LOSS",
    productsTitle: "THE ARSENAL",
    productsSubtitle: "LIMITED BATCH / 04",
    addToCart: "ADD",
    buyNow: "ACQUIRE",
    viewProduct: "ANALYZE",
    techTitle: "BODY ARCHITECTURE",
    techSub: "ADVANCED MATERIALS",
    tech1Title: "THERMAL COMPRESSION",
    tech1Desc: "Activates blood flow and primes muscles for action.",
    tech2Title: "MEMORY STRUCTURE",
    tech2Desc: "Flexible polymer forces natural alignment without restriction.",
    tech3Title: "IMPACT ABSORPTION",
    tech3Desc: "Matrix gel dissipates 40% of kinetic energy with every step.",
    tech4Title: "ANATOMICAL DESIGN",
    tech4Desc: "Molded on elite athletes for total fusion with the body.",
    reviewsTitle: "FIELD REPORTS",
    review1: "Radical transformation. My posture commands respect the moment I walk into a room. AXIS is not an accessory, it's a necessity.",
    review2: "After 12 hours standing, my legs feel fresh. It's like having a new pair of legs every morning.",
    review3: "Back pain vanished in 3 days. I can finally focus on my goals.",
    verifiedClient: "VERIFIED MEMBER",
    shipping: "SHIPPING",
    whyUsTitle1: "NATIONWIDE DELIVERY",
    whyUsDesc1: "All 58 Wilayas.",
    whyUsTitle2: "STEALTH DESIGN",
    whyUsDesc2: "Invisible power.",
    whyUsTitle3: "TOTAL WARRANTY",
    whyUsDesc3: "Satisfaction guaranteed.",
    secureCheckout: "SECURE ORDER",
    orderSummary: "YOUR SELECTION",
    identity: "IDENTITY",
    contact: "DIRECT LINE",
    zone: "REGION",
    sector: "EXACT ADDRESS",
    confirmOrder: "CONFIRM ACQUISITION",
    orderBumpTitle: "MAINTENANCE KIT (+1500 DA)",
    orderBumpDesc: "Extend the lifespan of your gear.",
    paymentNotice: "PAYMENT ON DELIVERY • ZERO RISK",
    loading: "PREPARING...",
    ticker: "FREE SHIPPING OVER 8000 DA /// FREE RETURNS /// 24/7 SUPPORT",
    back: "BACK",
    details: "TECHNICAL SPECS",
    selectLoadout: "SELECT YOUR MODEL",
    finalCtaTitle: "DON'T WAIT FOR DECLINE",
    finalCtaSub: "TAKE CONTROL",
    subtotal: "SUBTOTAL",
    shippingCost: "SHIPPING COST",
    tax: "TAX",
    total: "TOTAL",
    included: "INC.",
    qty: "QTY",
    errName: "ERROR: INVALID NAME",
    errPhone: "ERROR: INVALID MOBILE FORMAT",
    errWilaya: "ERROR: REGION REQUIRED",
    bumpText: "+ MAINTENANCE KIT",
    cart: "CART",
    cartEmpty: "Your cart is empty",
    remove: "REMOVE",
    updateCart: "UPDATE CART",
    proceedCheckout: "PROCEED TO CHECKOUT",
    orderPlaced: "ORDER CONFIRMED",
    orderConfirmEmail: "A confirmation email has been sent to",
    trackingInfo: "We will contact you within 24h to confirm your delivery",
    syncingOrder: "Syncing with Google Sheets..."
  },
  ar: {
    navShop: "الترسانة",
    navAbout: "الرؤية",
    heroTitle: "اصنع\nهيبتك.",
    heroSubtitle: "لا تدع الجاذبية تحطم قامتك. قف بشموخ. وسيطر. معدات تصحيح تشريحية عالية الدقة للنخبة.",
    heroCta: "انضم للنخبة",
    certified: "هندسة AXIS",
    edition: "الإصدار الأول GEN-1",
    stat1: "+50,000",
    stat1Label: "جسم تم تحويله",
    stat2: "%98.4",
    stat2Label: "نسبة نجاح",
    stat3: "58",
    stat3Label: "ولاية مغطاة",
    problemTitle: "الانهيار الهيكلي",
    problemText: "نمط الحياة الخامل سم بطيء. ظهرك ينحني. مفاصلك تتآكل قبل الأوان. وهيبتك تتلاشى. هذا أمر مرفوض.",
    problem1: "التدهور الجسدي",
    problem2: "فقدان القوة",
    productsTitle: "الترسانة",
    productsSubtitle: "كمية محدودة / الدفعة 04",
    addToCart: "إضافة",
    buyNow: "امتلك الآن",
    viewProduct: "تحليل المنتج",
    techTitle: "هندسة الجسد",
    techSub: "مواد متطورة",
    tech1Title: "الضغط الحراري",
    tech1Desc: "ينشط الدورة الدموية ويهيئ العضلات للأداء العالي.",
    tech2Title: "هيكل بذاكرة",
    tech2Desc: "بوليمر مرن يفرض الاستقامة الطبيعية دون تقييد الحركة.",
    tech3Title: "امتصاص الصدمات",
    tech3Desc: "جل متطور يشتت 40% من الطاقة الحركية مع كل خطوة.",
    tech4Title: "تصميم تشريحي",
    tech4Desc: "مصمم بناءً على مقاييس رياضيين عالميين للاندماج التام مع الجسم.",
    reviewsTitle: "تقارير الميدان",
    review1: "تحول جذري. وقفتي تفرض الاحترام فور دخولي أي مكان. AXIS ليس مجرد إكسسوار، إنه ضرورة.",
    review2: "بعد 12 ساعة من الوقوف، ساقاي تشعران بالنشاط. كأنني أملك ساقين جديدتين كل صباح.",
    review3: "اختفى ألم الظهر في 3 أيام. أخيراً يمكنني التركيز على أهدافي.",
    verifiedClient: "عضو موثق",
    shipping: "الشحن",
    whyUsTitle1: "توصيل وطني",
    whyUsDesc1: "تغطية شاملة لـ 58 ولاية.",
    whyUsTitle2: "تصميم خفي",
    whyUsDesc2: "قوة غير مرئية.",
    whyUsTitle3: "ضمان شامل",
    whyUsDesc3: "استرداد كامل للمبلغ.",
    secureCheckout: "طلب آمن",
    orderSummary: "مختاراتك",
    identity: "الهوية",
    contact: "رقم الهاتف",
    zone: "الولاية",
    sector: "العنوان الدقيق",
    confirmOrder: "تأكيد الامتلاك",
    orderBumpTitle: "طقم العناية الكاملة (+1500 دج)",
    orderBumpDesc: "للحفاظ على كفاءة معداتك لأطول فترة.",
    paymentNotice: "الدفع عند الاستلام • بدون مخاطرة",
    loading: "جاري التجهيز...",
    ticker: "شحن مجاني فوق 8000 دج /// إرجاع مجاني /// دعم متواصل 24/7",
    back: "عودة",
    details: "المواصفات التقنية",
    selectLoadout: "اختر نسختك",
    finalCtaTitle: "لا تنتظر الانهيار",
    finalCtaSub: "استعد السيطرة",
    subtotal: "المجموع الفرعي",
    shippingCost: "تكاليف الشحن",
    tax: "الضرائب",
    total: "الإجمالي",
    included: "شامل",
    qty: "الكمية",
    errName: "خطأ: الاسم غير صالح",
    errPhone: "خطأ: صيغة الهاتف غير صحيحة",
    errWilaya: "خطأ: يرجى تحديد الولاية",
    bumpText: "+ طقم صيانة",
    cart: "سلة التسوق",
    cartEmpty: "سلتك فارغة",
    remove: "إزالة",
    updateCart: "تحديث السلة",
    proceedCheckout: "المتابعة للدفع",
    orderPlaced: "تم تأكيد الطلب",
    orderConfirmEmail: "تم إرسال بريد تأكيد إلى",
    trackingInfo: "سنتصل بك خلال 24 ساعة لتأكيد التسليم",
    syncingOrder: "جاري المزامنة مع Google Sheets..."
  }
};

export const getProducts = (lang: Language): Product[] => {
  const isAr = lang === 'ar';

  return [
    {
      id: "shapewear",
      name: "SCULPT-X1",
      tagline: isAr ? "غين امنحفة متطورة" : "GAINE AMINCISSANTE",
      price: 5900,
      oldPrice: 8500,
      shortDesc: isAr ? "يخفي العيوب فوراً ويعيد رسم القوام." : "Efface les imperfections instantanément. Redéfinit la silhouette.",
      description: isAr
        ? "درعك اليومي ضد الترهل. قماش ضاغط متطور يعمل كبشرة ثانية، يشد البطن، يرفع الصدر، وينحت الخصر في لحظة ارتدائه. ثقة مطلقة تحت أي ملابس."
        : "Votre armure quotidienne contre le relâchement. Textile compressif avancé agissant comme une seconde peau : gaine le ventre, remonte le buste et sculpte la taille dès l'enfilage. Confiance absolue sous n'importe quelle tenue.",
      image: PRODUCT_IMGS.shapewear,
      gallery: [PRODUCT_IMGS.shapewear, PRODUCT_IMGS.shapewear2],
      features: [
        { title: isAr ? "شد فوري" : "INSTANT LIFT", desc: isAr ? "نتيجة مرئية في ثوان" : "Résultat visible en secondes." },
        { title: isAr ? "إخفاء تام" : "INVISIBLE", desc: isAr ? "لا يظهر تحت الملابس" : "Indétectable sous les vêtements." }
      ],
      specs: ["Microfibre 4-Way", "Sans Coutures", "Anti-Transpirant"],
      painPoint: "Forme",
      solution: "Sculpt",
      benefit: "Impact"
    },
    {
      id: "posture",
      name: "POSTURE RIG",
      tagline: isAr ? "مصحح الوضعية" : "CORRECTEUR DE POSTURE",
      price: 3500,
      oldPrice: 5500,
      shortDesc: isAr ? "افرض حضورك بقامة مستقيمة." : "Imposez votre présence avec une posture droite.",
      description: isAr
        ? "لغة الجسد هي كل شيء. هذا الهيكل يجبر كتفيك على العودة للخلف وصدرك للأمام. يعيد برمجة عضلات ظهرك لتقف بشموخ وتتنفس بعمق. استعد هيبتك."
        : "Le langage corporel est tout. Ce rig force vos épaules vers l'arrière et votre torse vers l'avant. Il reprogramme vos muscles dorsaux pour vous tenir droit et respirer profondément. Réclamez votre espace.",
      image: PRODUCT_IMGS.posture,
      gallery: [PRODUCT_IMGS.posture, PRODUCT_IMGS.posture2],
      features: [
        { title: isAr ? "تصحيح المسار" : "CORRECTION", desc: isAr ? "استقامة فورية" : "Alignement immédiat." },
        { title: isAr ? "ذاكرة عضلية" : "MUSCLE MEMORY", desc: isAr ? "نتائج دائمة" : "Résultats permanents." }
      ],
      specs: ["Structure Rigide", "Respirant", "Unisexe"],
      painPoint: "Dos",
      solution: "Alignement",
      benefit: "Dominance"
    },
    {
      id: "knee",
      name: "KINETIC GUARD",
      tagline: isAr ? "جنوييير برييوم" : "GENOUILLÈRE PREMIUM",
      price: 2900,
      oldPrice: 4200,
      shortDesc: isAr ? "حول ركبتك إلى حصن منيع." : "Transformez votre genou en forteresse.",
      description: isAr
        ? "الألم يجعلك ضعيفاً. هذه الدعامة توفر ثباتاً ميكانيكياً وحرارياً للركبة، مما يسمح لك بالحركة، الجري، والعمل دون خوف من الإصابة أو الألم."
        : "La douleur vous affaiblit. Cette genouillère offre une stabilité mécanique et thermique, vous permettant de bouger, courir et travailler sans la peur de la blessure ou de la douleur.",
      image: PRODUCT_IMGS.knee,
      gallery: [PRODUCT_IMGS.knee, PRODUCT_IMGS.knee2],
      features: [
        { title: isAr ? "تثبيت كامل" : "LOCKDOWN", desc: isAr ? "أشرطة مانعة للانزلاق" : "Sangles anti-glisse." },
        { title: isAr ? "تنشيط حراري" : "THERMAL ACT", desc: isAr ? "تسريع الاستشفاء" : "Accélère la récupération." }
      ],
      specs: ["Néoprène 3mm", "Ressorts Latéraux", "Ajustable"],
      painPoint: "Douleur",
      solution: "Support",
      benefit: "Puissance"
    },
    {
      id: "insoles",
      name: "PLANTAR RELIEF",
      tagline: isAr ? "سمال لالتهاب اللفافة الأخمصية" : "SEMELLES FASCIITE PLANTAIRE",
      price: 2500,
      oldPrice: 3800,
      shortDesc: isAr ? "وداعاً لآلام القدم. امشِ براحة تامة." : "Adieu les douleurs plantaires. Marchez avec un confort total.",
      description: isAr
        ? "سمال مصممة خصيصاً لعلاج التهاب اللفافة الأخمصية. دعم مثالي للقوس، توزيع متساوي للضغط، وامتصاص الصدمات. راحة فورية من أول خطوة."
        : "Semelles conçues spécifiquement pour la fasciite plantaire. Support optimal de la voûte, répartition uniforme de la pression et absorption des chocs. Soulagement immédiat dès le premier pas.",
      image: PRODUCT_IMGS.insoles,
      gallery: [PRODUCT_IMGS.insoles, PRODUCT_IMGS.insoles2],
      features: [
        { title: isAr ? "دعم القوس" : "ARCH SUPPORT", desc: isAr ? "تخفيف الضغط على اللفافة" : "Soulage la fasciite." },
        { title: isAr ? "راحة قصوى" : "MAX COMFORT", desc: isAr ? "للاستخدام اليومي" : "Usage intensif." }
      ],
      specs: ["Gel Silice", "Support Voûte", "Anti-Fatigue"],
      painPoint: "Pieds",
      solution: "Amorti",
      benefit: "Endurance"
    }
  ];
};

export const WILAYAS: Wilaya[] = [
  { code: "01", name: "Adrar", arName: "أدرار" }, { code: "02", name: "Chlef", arName: "الشلف" }, { code: "03", name: "Laghouat", arName: "الأغواط" },
  { code: "04", name: "Oum El Bouaghi", arName: "أم البواقي" }, { code: "05", name: "Batna", arName: "باتنة" }, { code: "06", name: "Béjaïa", arName: "بجاية" },
  { code: "07", name: "Biskra", arName: "بسكرة" }, { code: "08", name: "Béchar", arName: "بشار" }, { code: "09", name: "Blida", arName: "البليدة" },
  { code: "10", name: "Bouira", arName: "البويرة" }, { code: "11", name: "Tamanrasset", arName: "تمنراست" }, { code: "12", name: "Tébessa", arName: "تبسة" },
  { code: "13", name: "Tlemcen", arName: "تلمسان" }, { code: "14", name: "Tiaret", arName: "تيارت" }, { code: "15", name: "Tizi Ouzou", arName: "تيزي وزو" },
  { code: "16", name: "Alger", arName: "الجزائر" }, { code: "17", name: "Djelfa", arName: "الجلفة" }, { code: "18", name: "Jijel", arName: "جيجل" },
  { code: "19", name: "Sétif", arName: "سطيف" }, { code: "20", name: "Saïda", arName: "سعيدة" }, { code: "21", name: "Skikda", arName: "سكيكدة" },
  { code: "22", name: "Sidi Bel Abbès", arName: "سيدي بلعباس" }, { code: "23", name: "Annaba", arName: "عنابة" }, { code: "24", name: "Guelma", arName: "قالمة" },
  { code: "25", name: "Constantine", arName: "قسنطينة" }, { code: "26", name: "Médéa", arName: "المدية" }, { code: "27", name: "Mostaganem", arName: "مستغانم" },
  { code: "28", name: "M'Sila", arName: "المسيلة" }, { code: "29", name: "Mascara", arName: "معسكر" }, { code: "30", name: "Ouargla", arName: "ورقلة" },
  { code: "31", name: "Oran", arName: "وهران" }, { code: "32", name: "El Bayadh", arName: "البيض" }, { code: "33", name: "Illizi", arName: "إليزي" },
  { code: "34", name: "Bordj Bou Arreridj", arName: "برج بوعريريج" }, { code: "35", name: "Boumerdès", arName: "بومرداس" }, { code: "36", name: "El Tarf", arName: "الطرف" },
  { code: "37", name: "Tindouf", arName: "تندوف" }, { code: "38", name: "Tissemsilt", arName: "تيسمسيلت" }, { code: "39", name: "El Oued", arName: "الوادي" },
  { code: "40", name: "Khenchela", arName: "خنشلة" }, { code: "41", name: "Souk Ahras", arName: "سوق أهراس" }, { code: "42", name: "Tipaza", arName: "تيبازة" },
  { code: "43", name: "Mila", arName: "ميلة" }, { code: "44", name: "Aïn Defla", arName: "عين الدفلى" }, { code: "45", name: "Naâma", arName: "النعامة" },
  { code: "46", name: "Aïn Témouchent", arName: "عين تموشنت" }, { code: "47", name: "Ghardaïa", arName: "غرداية" }, { code: "48", name: "Relizane", arName: "غليزان" },
  { code: "49", name: "Timimoun", arName: "تيميمون" }, { code: "50", name: "Bordj Badji Mokhtar", arName: "برج باجي مختار" }, { code: "51", name: "Ouled Djellal", arName: "أولاد جلال" },
  { code: "52", name: "Béni Abbès", arName: "بني عباس" }, { code: "53", name: "In Salah", arName: "عين صالح" }, { code: "54", name: "In Guezzam", arName: "عين قزام" },
  { code: "55", name: "Touggourt", arName: "تقرت" }, { code: "56", name: "Djanet", arName: "جانت" }, { code: "57", name: "El M'Ghair", arName: "المغير" },
  { code: "58", name: "El Meniaa", arName: "المنيعة" }
];

export const FAKE_SALES_DATA = [
  { name: "Sonia M.", city: "Hydra", product: "SCULPT-X1" },
  { name: "Amira K.", city: "Oran", product: "PLANTAR RELIEF" },
  { name: "Farida B.", city: "Sétif", product: "POSTURE RIG" },
  { name: "Nassim Z.", city: "Constantine", product: "KINETIC GUARD" },
  { name: "Yasmine D.", city: "Alger", product: "SCULPT-X1" },
  { name: "Karim L.", city: "Annaba", product: "POSTURE RIG" },
  { name: "Leila H.", city: "Tlemcen", product: "PLANTAR RELIEF" },
];
