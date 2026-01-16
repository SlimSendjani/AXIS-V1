/**
 * Facebook Tracking Utilities
 * Provides functions for extracting Facebook cookies and preparing tracking data
 * for Facebook Conversion API (CAPI) integration.
 */

/**
 * Extract the _fbp (Facebook Browser ID) cookie value
 * This cookie is set by the Facebook Pixel and identifies the browser
 */
export const getFbpCookie = (): string | null => {
    const match = document.cookie.match(/(^|;)\s*_fbp=([^;]+)/);
    return match ? match[2] : null;
};

/**
 * Extract the _fbc (Facebook Click ID) cookie value
 * This cookie is set when a user clicks on a Facebook ad
 * Contains the fbclid parameter from the URL
 */
export const getFbcCookie = (): string | null => {
    const match = document.cookie.match(/(^|;)\s*_fbc=([^;]+)/);
    return match ? match[2] : null;
};

/**
 * Generate a unique event ID for deduplication
 * Facebook uses this to match browser Pixel events with server CAPI events
 * Format: timestamp_randomstring
 */
export const generateEventId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `${timestamp}_${random}`;
};

/**
 * Facebook Tracking Data Structure
 * All data needed for high Event Match Quality
 */
export interface FacebookTrackingData {
    // User Data (will be hashed server-side)
    email?: string;
    phone: string;
    firstName: string;
    lastName: string;
    city: string;        // Wilaya name
    zipCode?: string;    // Wilaya code
    country: string;     // Always 'dz' for Algeria

    // Technical Data (critical for matching)
    clientUserAgent: string;
    fbp: string | null;
    fbc: string | null;
    eventId: string;
    eventSourceUrl: string;

    // Order Data
    value: number;
    currency: string;
    contentIds: string[];
    numItems: number;
}

/**
 * Prepare complete tracking data object for Facebook CAPI
 * Call this function during checkout submission
 */
export const prepareTrackingData = (params: {
    email?: string;
    phone: string;
    fullName: string;
    wilayaName: string;
    wilayaCode: string;
    items: Array<{ productId: string; quantity: number }>;
    total: number;
}): FacebookTrackingData => {
    // Split full name into first and last name
    const nameParts = params.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

    // Calculate total items
    const numItems = params.items.reduce((sum, item) => sum + item.quantity, 0);

    // Extract product IDs
    const contentIds = params.items.map(item => item.productId);

    return {
        // User Data
        email: params.email || undefined,
        phone: params.phone,
        firstName,
        lastName,
        city: params.wilayaName,
        zipCode: params.wilayaCode,
        country: 'dz',

        // Technical Data
        clientUserAgent: navigator.userAgent,
        fbp: getFbpCookie(),
        fbc: getFbcCookie(),
        eventId: generateEventId(),
        eventSourceUrl: window.location.href,

        // Order Data
        value: params.total,
        currency: 'DZD',
        contentIds,
        numItems,
    };
};

/**
 * Fire client-side Facebook Pixel Purchase event
 * This works in conjunction with server-side CAPI for deduplication
 */
export const firePixelPurchaseEvent = (data: FacebookTrackingData): void => {
    // Check if Facebook Pixel is loaded
    if (typeof (window as any).fbq !== 'function') {
        console.warn('[FB Pixel] Facebook Pixel not loaded, skipping client-side event');
        return;
    }

    try {
        (window as any).fbq('track', 'Purchase', {
            value: data.value,
            currency: data.currency,
            content_type: 'product',
            content_ids: data.contentIds,
            num_items: data.numItems,
        }, {
            eventID: data.eventId, // Same ID for deduplication with CAPI
        });
        console.log('[FB Pixel] Purchase event fired with eventID:', data.eventId);
    } catch (error) {
        console.error('[FB Pixel] Error firing Purchase event:', error);
        // Don't throw - tracking errors should never break the checkout
    }
};
