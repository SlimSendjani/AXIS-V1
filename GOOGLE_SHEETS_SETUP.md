# 📊 Configuration Google Sheets + Email pour AXIS

## Étape 1: Créer le Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille nommée **"AXIS - Commandes"**
3. Dans la première ligne, ajoutez ces en-têtes:

```
A1: Date
B1: N° Commande
C1: Nom Client
D1: Téléphone
E1: Wilaya
F1: Adresse
G1: Type Livraison
H1: Produits
I1: Sous-total
J1: Frais Livraison
K1: Total
L1: Notes
M1: Statut
```

## Étape 2: Créer le Google Apps Script

1. Dans votre Google Sheet, allez dans **Extensions > Apps Script**
2. Supprimez le code existant et collez ce code:

```javascript
// Configuration - MODIFIEZ CES VALEURS
const NOTIFICATION_EMAIL = 'VOTRE_EMAIL@gmail.com'; // Votre email
const SHEET_NAME = 'Feuille 1'; // Nom de l'onglet (par défaut "Feuille 1" en français)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Ajouter au Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    const itemsList = data.items.map(item => 
      `${item.productName} x${item.quantity}`
    ).join(', ');
    
    sheet.appendRow([
      data.orderDate,
      data.orderNumber,
      data.fullName,
      data.phone,
      data.wilayaName,
      data.address,
      data.deliveryType === 'home' ? 'Domicile' : 'Point Relais',
      itemsList,
      data.subtotal,
      data.shippingCost,
      data.total,
      data.notes || '',
      'En attente'
    ]);
    
    // Envoyer l'email de notification
    sendNotificationEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Commande enregistrée'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(data) {
  const itemsList = data.items.map(item => 
    `• ${item.productName} x${item.quantity} = ${item.price * item.quantity} DA`
  ).join('\n');
  
  const subject = `🛒 AXIS - Nouvelle Commande ${data.orderNumber}`;
  
  const body = `
═══════════════════════════════════════
        NOUVELLE COMMANDE AXIS
═══════════════════════════════════════

📋 N° Commande: ${data.orderNumber}
📅 Date: ${data.orderDate}

───────────────────────────────────────
                CLIENT
───────────────────────────────────────
👤 Nom: ${data.fullName}
📱 Téléphone: ${data.phone}
📍 Wilaya: ${data.wilayaName}
🏠 Adresse: ${data.address}
🚚 Livraison: ${data.deliveryType === 'home' ? 'À domicile' : 'Point relais'}

───────────────────────────────────────
               PRODUITS
───────────────────────────────────────
${itemsList}

───────────────────────────────────────
                TOTAL
───────────────────────────────────────
💰 Sous-total: ${data.subtotal} DA
🚚 Livraison: ${data.shippingCost} DA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 TOTAL: ${data.total} DA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.notes ? `📝 Notes: ${data.notes}` : ''}

✅ Paiement à la livraison

═══════════════════════════════════════
`;
  
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body
  });
}

// Test function
function testEmail() {
  sendNotificationEmail({
    orderNumber: 'AX-TEST-001',
    orderDate: new Date().toLocaleString(),
    fullName: 'Test Client',
    phone: '0555123456',
    wilayaName: 'Alger',
    address: '123 Rue Test',
    deliveryType: 'home',
    items: [{ productName: 'SCULPT-X1', quantity: 1, price: 5900 }],
    subtotal: 5900,
    shippingCost: 400,
    total: 6300,
    notes: ''
  });
}
```

3. **IMPORTANT**: Modifiez `VOTRE_EMAIL@gmail.com` par votre vraie adresse email

## Étape 3: Déployer le Script

1. Cliquez sur **Déployer > Nouveau déploiement**
2. Type: **Application Web**
3. Description: "AXIS Orders API"
4. Exécuter en tant que: **Moi**
5. Qui a accès: **Tout le monde**
6. Cliquez sur **Déployer**
7. **Autorisez** l'application (important!)
8. **Copiez l'URL** du déploiement

## Étape 4: Configurer dans le code

1. Ouvrez le fichier `services/orderService.ts`
2. Remplacez `YOUR_GOOGLE_SCRIPT_URL_HERE` par l'URL copiée

## Étape 5: Tester

1. Dans Apps Script, exécutez la fonction `testEmail`
2. Vérifiez que vous recevez l'email de test
3. Faites une commande test sur votre site

## 🎉 C'est fait!

Maintenant, pour chaque commande:
- ✅ Une nouvelle ligne sera ajoutée dans Google Sheets
- ✅ Vous recevrez un email avec les détails
- ✅ Le client sera redirigé vers WhatsApp

## Dépannage

**Email non reçu?**
- Vérifiez les spams
- Assurez-vous d'avoir autorisé l'application
- Exécutez `testEmail` manuellement

**Erreur CORS?**
- C'est normal avec `no-cors`, les données sont quand même envoyées
- Les commandes sont sauvegardées localement en backup
