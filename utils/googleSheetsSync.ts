import { GOOGLE_SHEETS_CONFIG, ADMIN_EMAIL, WILAYAS } from '../constants';
import { Order } from '../types';

/**
 * Ajoute une commande à Google Sheets
 * URL: https://docs.google.com/spreadsheets/d/1h3i6DMdTGhBXHNDbekCFBKZ4xMOT8KbqgGI3ghPWg4g/edit
 */
export async function addOrderToSheet(order: Order, wilayaCode: string): Promise<boolean> {
  try {
    const wilaya = WILAYAS.find(w => w.code === wilayaCode);
    const wilayaName = wilaya?.name || 'Inconnue';

    // Format des produits
    const productsText = order.items
      .map(item => `${item.productName} x${item.quantity}`)
      .join('; ');

    // Données à envoyer (format Google Sheets Append API)
    const values = [[
      order.id,                                    // A: ID Commande
      new Date(order.timestamp).toLocaleString('fr-FR'),  // B: Date/Heure
      order.customer.name,                        // C: Nom Client
      order.customer.email,                       // D: Email
      order.customer.phone,                       // E: Téléphone
      wilayaName,                                 // F: Wilaya
      order.customer.address,                     // G: Adresse
      productsText,                               // H: Produits
      order.subtotal,                             // I: Sous-total
      order.shippingCost,                         // J: Livraison
      order.total,                                // K: Total
      'PENDING'                                   // L: Statut
    ]];

    // Construire l'URL d'ajout (Sheets API v4 - Append)
    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:L:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_CONFIG.apiKey}`;

    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values
      })
    });

    if (!response.ok) {
      console.error('Erreur Sheets API:', response.statusText);
      return false;
    }

    console.log('✅ Commande ajoutée à Google Sheets');
    return true;
  } catch (error) {
    console.error('Erreur lors de la synchronisation avec Sheets:', error);
    return false;
  }
}

/**
 * Envoie un email de confirmation via Formspree
 */
export async function sendOrderEmail(order: Order, wilayaCode: string): Promise<boolean> {
  try {
    const wilaya = WILAYAS.find(w => w.code === wilayaCode);
    const wilayaName = wilaya?.name || 'Inconnue';

    const emailContent = `
📋 NOUVELLE COMMANDE AXIS
════════════════════════════════════════════════════════════════

🔔 COMMANDE #${order.id}
Date/Heure: ${new Date(order.timestamp).toLocaleString('fr-FR')}

👤 INFORMATIONS CLIENT
Nom: ${order.customer.name}
Email: ${order.customer.email}
Téléphone: ${order.customer.phone}
Wilaya: ${wilayaName}
Adresse: ${order.customer.address}

📦 PRODUITS COMMANDÉS
${order.items.map(item => `  • ${item.productName} x${item.quantity} = ${item.price * item.quantity} DA`).join('\n')}

💰 RÉSUMÉ FINANCIER
  Sous-total: ${order.subtotal} DA
  Frais de Livraison: ${order.shippingCost} DA
  ─────────────────────
  TOTAL: ${order.total} DA

✅ Statut: PENDING
💳 Paiement à la livraison

📞 À FAIRE
  □ Contacter le client dans les 24h
  □ Confirmer la livraison
  □ Mettre à jour le statut dans Google Sheets

════════════════════════════════════════════════════════════════
Cette commande a été reçue via le site AXIS
    `;

    const response = await fetch('https://formspree.io/f/mqzeeaqk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        subject: `[AXIS] Nouvelle commande #${order.id}`,
        message: emailContent
      })
    });

    if (!response.ok) {
      console.error('Erreur Formspree:', response.statusText);
      return false;
    }

    console.log('✅ Email de confirmation envoyé');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi d\'email:', error);
    return false;
  }
}

/**
 * Synchronise complètement une commande (email + Sheets)
 */
export async function syncOrderComplete(order: Order, wilayaCode: string): Promise<boolean> {
  const emailSent = await sendOrderEmail(order, wilayaCode);
  const sheetUpdated = await addOrderToSheet(order, wilayaCode);
  
  return emailSent && sheetUpdated;
}
