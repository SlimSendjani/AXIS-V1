import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin, User, Phone, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { Translation, Product, Language } from '../types';
import { useCart } from '../contexts/CartContext';
import { WILAYAS, getShippingPrice, calculateShipping, FREE_SHIPPING_THRESHOLD, getWilayaName } from '../constants';
import { submitOrder, generateOrderNumber, OrderData } from '../services/orderService';
import { getProducts, TRANSLATIONS } from '../constants';
import { prepareTrackingData, firePixelPurchaseEvent, FacebookTrackingData } from '../utils/facebookTracking';


interface CheckoutProps {
  t: Translation;
  products: Product[];
  lang: Language;
}

const BRAND_NAME = 'AXIS';

const Checkout: React.FC<CheckoutProps> = ({ t, products, lang }) => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const isAr = lang === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    wilayaCode: '',
    address: '',
    deliveryType: 'home' as 'home' | 'pickup',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = getTotal();
  const shippingCost = formData.wilayaCode ? calculateShipping(formData.wilayaCode, subtotal, formData.deliveryType) : 0;
  const total = subtotal + shippingCost;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // Rediriger si panier vide
  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      navigate('/');
    }
  }, [items, navigate, orderSuccess]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = t.errName;
    }

    const phoneRegex = /^(0)(5|6|7)[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t.errPhone;
    }

    if (!formData.wilayaCode) {
      newErrors.wilaya = t.errWilaya;
    }

    if (!formData.address.trim() || formData.address.length < 10) {
      newErrors.address = isAr ? 'العنوان قصير جداً' : 'Adresse trop courte';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const newOrderNumber = generateOrderNumber();
    const wilayaName = getWilayaName(formData.wilayaCode);

    // Prepare Facebook tracking data for CAPI
    const trackingData: FacebookTrackingData = prepareTrackingData({
      email: formData.email || undefined,
      phone: formData.phone,
      fullName: formData.fullName,
      wilayaName: wilayaName,
      wilayaCode: formData.wilayaCode,
      items: items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      total,
    });

    const orderData: OrderData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      wilayaCode: formData.wilayaCode,
      wilayaName: wilayaName,
      address: formData.address,
      deliveryType: formData.deliveryType,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal,
      shippingCost,
      total,
      orderDate: new Date().toLocaleString('fr-DZ'),
      orderNumber: newOrderNumber,
      notes: formData.notes,
      trackingData, // Include Facebook tracking data
    };

    try {
      // Fire client-side Pixel event (for deduplication with server CAPI)
      firePixelPurchaseEvent(trackingData);

      await submitOrder(orderData);
      setOrderNumber(newOrderNumber);
      setOrderSuccess(true);
      clearCart();
      // Order confirmed - no redirect needed
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Page de succès
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-success" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">
            {isAr ? 'تم تأكيد طلبك!' : 'Commande Confirmée!'}
          </h1>
          <p className="font-mono text-sm mb-2">
            {isAr ? 'رقم الطلب:' : 'N° Commande:'}
          </p>
          <p className="text-2xl font-bold text-gold mb-6">{orderNumber}</p>
          <p className="text-sm opacity-70 mb-8">
            {isAr
              ? 'سنتصل بك قريباً لتأكيد الطلب. شكراً لثقتك في AXIS!'
              : 'Nous vous contacterons bientôt pour confirmer. Merci de votre confiance!'}
          </p>
          <Link
            to="/"
            className="inline-block bg-fg text-bg px-8 py-4 font-bold uppercase tracking-wider hover:bg-gold hover:text-fg transition-colors"
          >
            {isAr ? 'العودة للمتجر' : 'Retour à la boutique'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-bg text-fg ${isAr ? 'font-sans' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-fg text-bg py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={20} className={isAr ? 'rotate-180' : ''} />
            <span className="font-mono text-sm uppercase">{t.back}</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">{BRAND_NAME}</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Formulaire */}
          <div>
            <h2 className="text-3xl font-display font-bold mb-8 uppercase">{t.secureCheckout}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                  <User size={14} className="inline mr-2" />
                  {t.identity} *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full bg-transparent border-2 ${errors.fullName ? 'border-error' : 'border-fg'} px-4 py-3 font-mono focus:outline-none focus:border-gold transition-colors`}
                  placeholder={isAr ? 'الاسم الكامل' : 'Nom complet'}
                />
                {errors.fullName && <p className="text-error text-xs mt-1 font-mono">{errors.fullName}</p>}
              </div>

              {/* Email (optionnel - améliore le tracking) */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                  <Mail size={14} className="inline mr-2" />
                  {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optionnel)'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-2 border-fg/50 px-4 py-3 font-mono focus:outline-none focus:border-gold transition-colors"
                  placeholder={isAr ? 'example@email.com' : 'example@email.com'}
                  dir="ltr"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                  <Phone size={14} className="inline mr-2" />
                  {t.contact} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-transparent border-2 ${errors.phone ? 'border-error' : 'border-fg'} px-4 py-3 font-mono focus:outline-none focus:border-gold transition-colors`}
                  placeholder="0555 XX XX XX"
                  dir="ltr"
                />
                {errors.phone && <p className="text-error text-xs mt-1 font-mono">{errors.phone}</p>}
              </div>

              {/* Wilaya */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                  <MapPin size={14} className="inline mr-2" />
                  {t.zone} *
                </label>
                <select
                  value={formData.wilayaCode}
                  onChange={(e) => setFormData({ ...formData, wilayaCode: e.target.value })}
                  className={`w-full bg-bg border-2 ${errors.wilaya ? 'border-error' : 'border-fg'} px-4 py-3 font-mono focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">{isAr ? '-- اختر الولاية --' : '-- Sélectionner --'}</option>
                  {WILAYAS.sort((a, b) => a.name.localeCompare(b.name)).map(wilaya => {
                    const price = getShippingPrice(wilaya.code);
                    return (
                      <option key={wilaya.code} value={wilaya.code}>
                        {wilaya.code} - {isAr ? wilaya.arName : wilaya.name} ({price} DA)
                      </option>
                    );
                  })}
                </select>
                {errors.wilaya && <p className="text-error text-xs mt-1 font-mono">{errors.wilaya}</p>}
              </div>

              {/* Adresse */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                  {t.sector} *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className={`w-full bg-transparent border-2 ${errors.address ? 'border-error' : 'border-fg'} px-4 py-3 font-mono focus:outline-none focus:border-gold transition-colors resize-none`}
                  placeholder={isAr ? 'العنوان الكامل (الحي, الشارع, رقم البناية...)' : 'Adresse complète (quartier, rue, n° bâtiment...)'}
                />
                {errors.address && <p className="text-error text-xs mt-1 font-mono">{errors.address}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                  {isAr ? 'ملاحظات (اختياري)' : 'Notes (optionnel)'}
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-transparent border-2 border-fg/50 px-4 py-3 font-mono focus:outline-none focus:border-gold transition-colors"
                  placeholder={isAr ? 'تعليمات خاصة للتوصيل...' : 'Instructions spéciales...'}
                />
              </div>

              {/* Paiement notice */}
              <div className="bg-fg/5 border-2 border-dashed border-fg/30 p-4">
                <p className="font-mono text-sm text-center">
                  💵 {t.paymentNotice}
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-fg text-bg py-5 text-lg font-bold uppercase tracking-wider hover:bg-gold hover:text-fg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? (isAr ? 'جاري المعالجة...' : 'Traitement...')
                  : `${t.confirmOrder} - ${total.toLocaleString()} DA`
                }
              </button>
            </form>
          </div>

          {/* Récapitulatif */}
          <div>
            <div className="bg-fg/5 border-2 border-fg p-6 sticky top-24">
              <h3 className="text-xl font-display font-bold mb-6 uppercase">{t.orderSummary}</h3>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover bg-concrete"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.product.name}</h4>
                      <p className="text-xs font-mono opacity-70">{t.qty}: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{(item.product.price * item.quantity).toLocaleString()} DA</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-fg/20 pt-4 space-y-3">
                <div className="flex justify-between font-mono text-sm">
                  <span>{t.subtotal}</span>
                  <span>{subtotal.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span>{t.shipping}</span>
                  <span className={shippingCost === 0 && subtotal > 0 ? 'text-success font-bold' : ''}>
                    {shippingCost === 0 && subtotal >= FREE_SHIPPING_THRESHOLD
                      ? (isAr ? 'مجاني' : 'GRATUIT')
                      : shippingCost > 0
                        ? `${shippingCost.toLocaleString()} DA`
                        : '--'
                    }
                  </span>
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                  <p className="text-xs text-gold font-mono">
                    🚚 {isAr
                      ? `أضف ${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} DA للشحن المجاني`
                      : `Ajoutez ${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} DA pour la livraison gratuite`
                    }
                  </p>
                )}
                <div className="flex justify-between text-xl font-bold border-t border-fg pt-4">
                  <span>{t.total}</span>
                  <span>{total.toLocaleString()} DA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
