import { GOOGLE_SHEETS_CONFIG, getWilayaName, ADMIN_EMAIL } from '../constants';
import { Order } from '../types';

/**
 * Ajoute une commande à Google Sheets
 * Documentation: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
 */
export async function addOrderToSheet(order: Order, wilayaCode: string): Promise<boolean> {
  try {
    const wilayaName = getWilayaName(wilayaCode);

    // Format des produits pour le sheet
    const productsText = order.items
      .map(item => `${item.productName} x${item.quantity}`)
      .join('; ');

    // Format de la date
    const orderDate = new Date(order.timestamp).toLocaleString('fr-FR');

    // Structure des données pour Google Sheets (A:L)
    const values = [[
      order.id,                    // A: ID Commande
      orderDate,                    // B: Date/Heure
      order.customer.name,          // C: Nom Client
      order.customer.email,         // D: Email
      order.customer.phone,         // E: Téléphone
      wilayaName,                   // F: Wilaya
      order.customer.address,       // G: Adresse
      productsText,                 // H: Produits
      order.subtotal,               // I: Sous-total
      order.shippingCost,           // J: Livraison
      order.total,                  // K: Total
      'PENDING'                     // L: Statut
    ]];

    // Construire l'URL pour l'API Google Sheets (Append)
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:L:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_CONFIG.apiKey}`;

    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erreur Sheets API:', errorData);
      return false;
    }

    console.log('✅ Commande ajoutée à Google Sheets avec succès');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation avec Sheets:', error);
    return false;
  }
}

/**
 * Envoie un email de confirmation via Formspree
 * Déjà configuré avec le formulaire: https://formspree.io/f/mqzeeaqk
 */
export async function sendOrderEmail(order: Order, wilayaCode: string): Promise<boolean> {
  try {
    const wilayaName = getWilayaName(wilayaCode);

    const emailContent = `📋 NOUVELLE COMMANDE AXIS
════════════════════════════════════════════════════════════════

🔔 COMMANDE #${order.id}
Date/Heure: ${new Date(order.timestamp).toLocaleString('fr-FR')}

👤 INFORMATIONS CLIENT
Nom: ${order.customer.name}
Email: ${order.customer.email}
Téléphone: ${order.customer.phone}
Wilaya: ${wilayaName}
Adresse: ${order.customer.address}

📋 PRODUITS COMMANDÉS
${order.items.map(item => `  • ${item.productName} x${item.quantity} = ${item.price * item.quantity} DA`).join('\n')}

💰 RÉSUMÉ FINANCIER
  Sous-total: ${order.subtotal} DA
  Frais de Livraison: ${order.shippingCost} DA
  ─────────────────
  TOTAL: ${order.total} DA

✅ Statut: PENDING
💳 Paiement à la livraison

📋 À FAIRE
  ☐ Contacter le client dans les 24h
  ☐ Confirmer la livraison
  ☐ Mettre à jour le statut dans Google Sheets

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
      console.error('❌ Erreur Formspree:', response.statusText);
      return false;
    }

    console.log('✅ Email de confirmation envoyé avec succès');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi d\'email:', error);
    return false;
  }
}

/**
 * Synchronise complètement une commande (email + Google Sheets)
 * @returns true si les deux envois sont réussis
 */
export async function syncOrderComplete(order: Order, wilayaCode: string): Promise<boolean> {
  const emailSent = await sendOrderEmail(order, wilayaCode);
  const sheetUpdated = await addOrderToSheet(order, wilayaCode);
  
  // Les deux doivent réussir pour retourner true
  return emailSent && sheetUpdated;
}
