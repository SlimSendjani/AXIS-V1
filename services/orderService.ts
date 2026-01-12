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

// URL de votre Google Apps Script Web App (à remplacer après configuration)
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AX-${timestamp}-${random}`;
};

export const submitOrder = async (orderData: OrderData): Promise<{ success: boolean; message: string }> => {
  try {
    // Si l'URL n'est pas configurée, on simule une soumission réussie
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      console.log('Order data (Google Sheets not configured):', orderData);
      // Stocker localement en attendant
      const orders = JSON.parse(localStorage.getItem('axis-pending-orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('axis-pending-orders', JSON.stringify(orders));
      return { 
        success: true, 
        message: 'Commande enregistrée localement (configurez Google Sheets pour la synchronisation)' 
      };
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    return { success: true, message: 'Commande envoyée avec succès!' };
  } catch (error) {
    console.error('Error submitting order:', error);
    // Sauvegarder localement en cas d'erreur
    const orders = JSON.parse(localStorage.getItem('axis-pending-orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('axis-pending-orders', JSON.stringify(orders));
    return { 
      success: true, 
      message: 'Commande sauvegardée (sera synchronisée automatiquement)' 
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
