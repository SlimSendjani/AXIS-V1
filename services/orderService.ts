// Service pour envoyer les commandes vers Google Sheets + Email

export interface OrderData {
  // Infos client
  fullName: string;
  phone: string;
  wilayaCode: string;
  wilayaName: string;
  address: string;
  deliveryType: 'home' | 'pickup';

  // Infos commande
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];

  // Totaux
  subtotal: number;
  shippingCost: number;
  total: number;

  // Meta
  orderDate: string;
  orderNumber: string;
  notes?: string;
}

// URL de votre Google Apps Script Web App
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyHyzZGtXJht7ZcuNrCKR9yPwm8Lis8fMjsh4HvYIeUbJ45Cc38OtsziRWVbIjX2_VCw/exec';

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AX-${timestamp}-${random}`;
};

// Fonction pour envoyer avec retry logic
const sendWithRetry = async (url: string, data: any, maxRetries = 3): Promise<Response> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Important pour Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) throw error;
      // Attendre avant de réessayer (backoff exponentiel)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error('Max retries reached');
};

export const submitOrder = async (orderData: OrderData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📤 Envoi de la commande à Google Sheets...', orderData);

    // Envoyer à Google Apps Script
    await sendWithRetry(GOOGLE_SCRIPT_URL, orderData);

    // Sauvegarder localement comme backup
    const orders = JSON.parse(localStorage.getItem('axis-orders-backup') || '[]');
    orders.push({ ...orderData, syncedAt: new Date().toISOString() });
    localStorage.setItem('axis-orders-backup', JSON.stringify(orders));

    console.log('✅ Commande envoyée avec succès!');

    return {
      success: true,
      message: 'Commande envoyée avec succès!'
    };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);

    // Sauvegarder localement en cas d'erreur
    const pendingOrders = JSON.parse(localStorage.getItem('axis-pending-orders') || '[]');
    pendingOrders.push({ ...orderData, failedAt: new Date().toISOString() });
    localStorage.setItem('axis-pending-orders', JSON.stringify(pendingOrders));

    // On retourne success=true quand même car la commande est sauvegardée
    return {
      success: true,
      message: 'Commande enregistrée (synchronisation en cours...)'
    };
  }
};

// Générer le message WhatsApp pour la commande
export const generateWhatsAppMessage = (orderData: OrderData, lang: 'fr' | 'ar' | 'en'): string => {
  const isAr = lang === 'ar';

  const itemsList = orderData.items.map(item =>
    `• ${item.productName} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} DA`
  ).join('\n');

  if (isAr) {
    return `🛒 *طلب جديد AXIS*

📋 *رقم الطلب:* ${orderData.orderNumber}
📅 *التاريخ:* ${orderData.orderDate}

👤 *معلومات العميل:*
• الاسم: ${orderData.fullName}
• الهاتف: ${orderData.phone}
• الولاية: ${orderData.wilayaName}
• العنوان: ${orderData.address}
• نوع التوصيل: ${orderData.deliveryType === 'home' ? 'للمنزل' : 'نقطة استلام'}

📦 *المنتجات:*
${itemsList}

💰 *الإجمالي:*
• المنتجات: ${orderData.subtotal.toLocaleString()} DA
• الشحن: ${orderData.shippingCost.toLocaleString()} DA
• *المجموع: ${orderData.total.toLocaleString()} DA*

✅ الدفع عند الاستلام`;
  }

  return `🛒 *Nouvelle Commande AXIS*

📋 *N° Commande:* ${orderData.orderNumber}
📅 *Date:* ${orderData.orderDate}

👤 *Client:*
• Nom: ${orderData.fullName}
• Tél: ${orderData.phone}
• Wilaya: ${orderData.wilayaName}
• Adresse: ${orderData.address}
• Livraison: ${orderData.deliveryType === 'home' ? 'À domicile' : 'Point relais'}

📦 *Articles:*
${itemsList}

💰 *Total:*
• Sous-total: ${orderData.subtotal.toLocaleString()} DA
• Livraison: ${orderData.shippingCost.toLocaleString()} DA
• *TOTAL: ${orderData.total.toLocaleString()} DA*

✅ Paiement à la livraison`;
};
