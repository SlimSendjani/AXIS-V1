import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Translation, Language } from '../types';

interface CartDrawerProps {
  t: Translation;
  lang: Language;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ t, lang }) => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();

  if (!isCartOpen) return null;

  const isAr = lang === 'ar';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 ${isAr ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-bg border-l-2 border-fg z-50 flex flex-col shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-fg">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-display font-bold uppercase">
              {isAr ? 'سلة التسوق' : 'PANIER'}
            </h2>
            <span className="bg-fg text-bg text-xs font-bold px-2 py-1">{getItemCount()}</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-fg hover:text-bg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingBag size={64} className="opacity-20 mb-4" />
              <p className="font-mono text-sm uppercase opacity-50">
                {isAr ? 'سلتك فارغة' : 'Votre panier est vide'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 border-b border-fg/20 pb-6">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-24 h-24 object-cover bg-concrete"
                  />
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg">{item.product.name}</h3>
                    <p className="text-xs font-mono opacity-70 mb-2">{item.product.tagline}</p>
                    <p className="font-bold text-lg">{item.product.price.toLocaleString()} DA</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-fg">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-fg hover:text-bg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-mono font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-fg hover:text-bg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-error hover:bg-error hover:text-bg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-2 border-fg p-6 bg-bg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm uppercase">{t.subtotal}</span>
              <span className="font-display font-bold text-2xl">{getTotal().toLocaleString()} DA</span>
            </div>
            <p className="text-xs font-mono opacity-50 mb-4 text-center">
              {isAr ? 'الشحن يُحسب عند الدفع' : 'Frais de livraison calculés au checkout'}
            </p>
            <Link 
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-fg text-bg text-center py-4 font-bold uppercase tracking-wider hover:bg-gold hover:text-fg transition-colors"
            >
              {t.confirmOrder}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
