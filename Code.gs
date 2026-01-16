/**
 * ============================================
 * FACEBOOK CONVERSION API (CAPI) - GOOGLE APPS SCRIPT
 * ============================================
 * 
 * Ce code doit être ajouté à votre fichier Code.gs dans Google Apps Script.
 * Il s'intègre avec votre fonction doPost existante.
 * 
 * IMPORTANT: Ne pas supprimer le code existant!
 * Ajoutez ces fonctions et modifiez doPost pour appeler sendToFacebookCAPI.
 */

// ========================================
// CONFIGURATION FACEBOOK
// ========================================
const FB_PIXEL_ID = '868778116069009';
const FB_ACCESS_TOKEN = 'EAAKalEbEnGQBQQ1kjJTJtU3wrD5qvAEhG3V51tYtx6xsxbaEbJnnbzSlg7jDXqnr1dZA4rRiXySk8ROG7oeek5KcFzPzciQhI6tUDtrNG9xFcFUVkg0UeHDaMvl8UR5JBg6hKrKVmZBBh13MpyrAreN3m2L34vJeuErwDrh3SGD91IrY73mCOSWB9nSrYLKAZDZD';
const FB_API_VERSION = 'v18.0';

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

/**
 * Calcule le hash SHA-256 d'une chaîne
 * Facebook requiert que les données utilisateur soient hashées
 */
function sha256Hash(value) {
  if (!value || typeof value !== 'string') return null;
  
  // Normaliser: minuscules, trim
  var normalized = value.toLowerCase().trim();
  if (!normalized) return null;
  
  // Calculer le hash SHA-256
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, normalized);
  
  // Convertir en chaîne hexadécimale
  var hash = '';
  for (var i = 0; i < digest.length; i++) {
    var byte = digest[i];
    if (byte < 0) byte += 256;
    var hex = byte.toString(16);
    if (hex.length < 2) hex = '0' + hex;
    hash += hex;
  }
  
  return hash;
}

/**
 * Normalise un numéro de téléphone algérien pour Facebook
 * Ex: 0555123456 -> 213555123456
 */
function normalizeAlgerianPhone(phone) {
  if (!phone) return null;
  
  // Nettoyer le numéro (garder seulement les chiffres)
  var cleaned = phone.replace(/\D/g, '');
  
  // Si commence par 0, remplacer par 213 (indicatif Algérie)
  if (cleaned.startsWith('0')) {
    cleaned = '213' + cleaned.substring(1);
  }
  
  // Si ne commence pas par 213, ajouter
  if (!cleaned.startsWith('213')) {
    cleaned = '213' + cleaned;
  }
  
  return cleaned;
}

// ========================================
// FONCTION PRINCIPALE FACEBOOK CAPI
// ========================================

/**
 * Envoie un événement Purchase à Facebook via Conversion API
 * IMPORTANT: Enveloppé dans try/catch - ne bloque jamais la commande
 * 
 * @param {Object} orderData - Données de la commande incluant trackingData
 */
function sendToFacebookCAPI(orderData) {
  try {
    Logger.log('📘 [FB CAPI] Démarrage envoi événement Purchase...');
    
    var trackingData = orderData.trackingData;
    if (!trackingData) {
      Logger.log('⚠️ [FB CAPI] Pas de trackingData, abandon');
      return { success: false, reason: 'No tracking data' };
    }
    
    // Préparer les données utilisateur hashées
    var userData = {
      // Données hashées (obligatoire pour le matching)
      em: trackingData.email ? [sha256Hash(trackingData.email)] : undefined,
      ph: trackingData.phone ? [sha256Hash(normalizeAlgerianPhone(trackingData.phone))] : undefined,
      fn: trackingData.firstName ? [sha256Hash(trackingData.firstName)] : undefined,
      ln: trackingData.lastName ? [sha256Hash(trackingData.lastName)] : undefined,
      ct: trackingData.city ? [sha256Hash(trackingData.city)] : undefined,
      zp: trackingData.zipCode ? [sha256Hash(trackingData.zipCode)] : undefined,
      country: [sha256Hash(trackingData.country || 'dz')],
      
      // Données techniques NON hashées (critiques pour le matching)
      client_user_agent: trackingData.clientUserAgent || null,
      fbp: trackingData.fbp || null,
      fbc: trackingData.fbc || null
    };
    
    // Nettoyer les valeurs undefined
    Object.keys(userData).forEach(function(key) {
      if (userData[key] === undefined || userData[key] === null) {
        delete userData[key];
      }
    });
    
    // Construire le payload de l'événement
    var eventPayload = {
      data: [{
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000), // Timestamp en secondes
        event_id: trackingData.eventId, // IMPORTANT: Même ID que le Pixel client
        event_source_url: trackingData.eventSourceUrl || '',
        action_source: 'website',
        user_data: userData,
        custom_data: {
          currency: trackingData.currency || 'DZD',
          value: trackingData.value || 0,
          content_type: 'product',
          content_ids: trackingData.contentIds || [],
          num_items: trackingData.numItems || 1
        }
      }]
    };
    
    Logger.log('📦 [FB CAPI] Payload préparé: ' + JSON.stringify(eventPayload.data[0].event_name));
    Logger.log('🔑 [FB CAPI] Event ID: ' + eventPayload.data[0].event_id);
    
    // URL de l'API Facebook Conversions
    var apiUrl = 'https://graph.facebook.com/' + FB_API_VERSION + '/' + FB_PIXEL_ID + '/events?access_token=' + FB_ACCESS_TOKEN;
    
    // Envoyer la requête
    var options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(eventPayload),
      muteHttpExceptions: true // Ne pas throw sur erreur HTTP
    };
    
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseCode = response.getResponseCode();
    var responseBody = response.getContentText();
    
    if (responseCode >= 200 && responseCode < 300) {
      Logger.log('✅ [FB CAPI] Événement envoyé avec succès!');
      Logger.log('📊 [FB CAPI] Réponse: ' + responseBody);
      return { success: true, response: JSON.parse(responseBody) };
    } else {
      Logger.log('❌ [FB CAPI] Erreur HTTP ' + responseCode + ': ' + responseBody);
      return { success: false, error: responseBody };
    }
    
  } catch (error) {
    // CRITIQUE: Ne jamais bloquer la commande à cause du tracking
    Logger.log('❌ [FB CAPI] Exception capturée (non bloquante): ' + error.message);
    return { success: false, error: error.message };
  }
}

// ========================================
// MODIFICATION DE doPost EXISTANT
// ========================================

/**
 * INSTRUCTIONS:
 * 
 * Trouvez votre fonction doPost existante et ajoutez l'appel à sendToFacebookCAPI
 * APRÈS avoir sauvegardé la commande dans la feuille, mais AVANT de retourner.
 * 
 * Exemple de modification:
 * 
 * function doPost(e) {
 *   try {
 *     var data = JSON.parse(e.postData.contents);
 *     
 *     // ... votre code existant pour sauvegarder dans Google Sheets ...
 *     
 *     // AJOUTEZ CECI APRÈS LA SAUVEGARDE:
 *     // =====================================
 *     if (data.trackingData) {
 *       sendToFacebookCAPI(data);
 *     }
 *     // =====================================
 *     
 *     return ContentService.createTextOutput(JSON.stringify({
 *       success: true,
 *       message: 'Commande enregistrée'
 *     })).setMimeType(ContentService.MimeType.JSON);
 *     
 *   } catch (error) {
 *     // ...
 *   }
 * }
 */

// ========================================
// FONCTION DE TEST (OPTIONNEL)
// ========================================

/**
 * Fonction de test pour vérifier l'intégration CAPI
 * Exécutez cette fonction depuis l'éditeur Apps Script pour tester
 */
function testFacebookCAPI() {
  var testData = {
    trackingData: {
      email: 'test@example.com',
      phone: '0555123456',
      firstName: 'Test',
      lastName: 'User',
      city: 'Alger',
      zipCode: '16',
      country: 'dz',
      clientUserAgent: 'Mozilla/5.0 (Test)',
      fbp: null,
      fbc: null,
      eventId: 'test_' + Date.now(),
      eventSourceUrl: 'https://example.com/checkout',
      value: 15000,
      currency: 'DZD',
      contentIds: ['PROD_TEST'],
      numItems: 1
    }
  };
  
  Logger.log('🧪 Test Facebook CAPI...');
  var result = sendToFacebookCAPI(testData);
  Logger.log('📊 Résultat: ' + JSON.stringify(result));
}
