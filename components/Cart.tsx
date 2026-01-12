import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Send, Loader } from 'lucide-react';
import { Translation, Language, CartItem, Order } from '../types';
import { WILAYAS, calculateShipping } from '../constants';
import { syncOrderComplete } from '../utils/googleSheetsSync';

interface CartProps {
  t: Translation;
  lang: Language;
  products: any[];
}

const Cart: React.FC<CartProps> = ({ t, lang, products }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home' | 'pickup'>('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('axis_cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('axis_cart', JSON.stringify(items));
  };

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cartItems.find(item => item.productId === productId);
    if (existing) {
      const updated = cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, {
        productId,
        quantity: 1,
        productName: product.name,
        price: product.price
      }]);
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(cartItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = selectedWilaya ? calculateShipping(selectedWilaya, subtotal, deliveryType) : 0;
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    if (!formData.name || !formData.email || !formData.phone || !selectedWilaya || !formData.address) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    const order: Order = {
      id: `AXIS-${Date.now()}`,
      timestamp: new Date().toISOString(),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        wilaya: selectedWilaya,
        address: formData.address
      },
      items: cartItems,
      subtotal,
      shippingCost,
      total,
      status: 'pending'
    };

    try {
      // Synchroniser la commande (email + Google Sheets)
      const synced = await syncOrderComplete(order, selectedWilaya);

      if (synced) {
        // Sauvegarder localement
        const orders = JSON.parse(localStorage.getItem('axis_orders') || '[]');
        orders.push(order);
        localStorage.setItem('axis_orders', JSON.stringify(orders));

        setOrderPlaced(true);
        saveCart([]);
        setShowCheckout(false);

        setTimeout(() => {
          setOrderPlaced(false);
          setFormData({ name: '', email: '', phone: '', address: '' });
          setSelectedWilaya('');
        }, 5000);
      } else {
        alert(lang === 'ar' ? 'خطأ في المزامنة. يرجى المحاولة مرة أخرى.' : 'Erreur lors de la synchronisation. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(lang === 'ar' ? 'خطأ في الطلب' : 'Erreur lors de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Bouton panier flottant */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="relative w-14 h-14 bg-fg text-bg rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-bg"
      >
        <ShoppingBag size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-error text-bg text-xs font-bold flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Modal panier */}
      {showCart && (
        <div className="absolute bottom-16 right-0 bg-bg border-2 border-fg w-80 max-h-96 overflow-y-auto shadow-xl rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold uppercase">{t.cart}</h3>
            <button onClick={() => setShowCart(false)} className="text-fg hover:text-error">
              <X size={20} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-fg opacity-70">{t.cartEmpty}</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.productId} className="border-b border-fg pb-3 mb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{item.productName}</p>
                      <p className="text-xs opacity-70">{item.price} DA x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-error hover:text-fg ml-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                    className="w-full mt-2 px-2 py-1 border border-fg text-xs rounded"
                  />
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-fg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t.subtotal}:</span>
                  <span className="font-bold">{subtotal} DA</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full mt-4 bg-fg text-bg py-2 font-bold uppercase text-sm hover:opacity-90 transition-opacity"
              >
                {t.proceedCheckout}
              </button>
            </>
          )}
        </div>
      )}

      {/* Modal checkout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-bg border-2 border-fg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 uppercase">{t.secureCheckout}</h2>

            {orderPlaced ? (
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-success mb-2">✅ {t.orderPlaced}</p>
                <p className="text-sm opacity-70 mb-2">{t.orderConfirmEmail} {formData.email}</p>
                <p className="text-xs opacity-60">{t.trackingInfo}</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder={t.identity}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-fg rounded text-sm disabled:opacity-50"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-fg rounded text-sm disabled:opacity-50"
                  />
                  <input
                    type="tel"
                    placeholder={t.contact}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-fg rounded text-sm disabled:opacity-50"
                  />
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-fg rounded text-sm disabled:opacity-50"
                  >
                    <option value="">{t.zone}</option>
                    {WILAYAS.map(wilaya => (
                      <option key={wilaya.code} value={wilaya.code}>
                        {lang === 'ar' ? wilaya.arName : wilaya.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="delivery"
                        value="home"
                        checked={deliveryType === 'home'}
                        onChange={() => setDeliveryType('home')}
                        disabled={isSubmitting}
                      />
                      {lang === 'ar' ? 'المنزل' : 'À domicile'}
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={deliveryType === 'pickup'}
                        onChange={() => setDeliveryType('pickup')}
                        disabled={isSubmitting}
                      />
                      {lang === 'ar' ? 'نقطة استلام' : 'Point relais'}
                    </label>
                  </div>
                  <textarea
                    placeholder={t.sector}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-fg rounded text-sm h-20 disabled:opacity-50"
                  />
                </div>

                <div className="border-t border-fg pt-3 mb-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{t.subtotal}:</span>
                    <span>{subtotal} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.shippingCost}:</span>
                    <span>{shippingCost} DA</span>
                  </div>
                  <div className="flex justify-between font-bold text-base">
                    <span>{t.total}:</span>
                    <span>{total} DA</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCheckout(false)}
                    disabled={isSubmitting}
                    className="flex-1 border-2 border-fg py-2 font-bold uppercase text-sm hover:bg-fg hover:text-bg transition-colors disabled:opacity-50"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="flex-1 bg-fg text-bg py-2 font-bold uppercase text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        {t.syncingOrder}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t.confirmOrder}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
