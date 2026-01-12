import React, { useState, useEffect } from 'react';
import { WILAYAS, PHONE_NUMBER_WHATSAPP } from '../constants';
import { Translation, Product, Language } from '../types';
import { Send, AlertTriangle, CheckSquare, Square } from 'lucide-react';

interface OrderFormProps {
  initialProduct?: string;
  t: Translation;
  products: Product[];
  lang: Language;
}

const OrderForm: React.FC<OrderFormProps> = ({ initialProduct, t, products, lang }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    commune: '',
    product: initialProduct || products[0].name,
    isOrderBumpChecked: false
  });

  useEffect(() => {
     if(initialProduct) {
        setFormData(prev => ({...prev, product: initialProduct}));
     }
  }, [initialProduct]);

  const [error, setError] = useState<string | null>(null);

  const selectedProductData = products.find(p => p.name === formData.product) || products[0];
  const orderBumpPrice = 1500; 
  const total = selectedProductData.price + (formData.isOrderBumpChecked ? orderBumpPrice : 0);

  const validatePhone = (phone: string) => {
    const re = /^(05|06|07)[0-9]{8}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.fullName.length < 3) {
      setError(t.errName);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError(t.errPhone);
      return;
    }
    if (!formData.wilaya) {
      setError(t.errWilaya);
      return;
    }

    const bumpText = formData.isOrderBumpChecked ? t.bumpText : "";
    const message = `⚡ AXIS ORDER ⚡%0A%0A👤 ${formData.fullName}%0A📱 ${formData.phone}%0A📍 ${formData.wilaya}, ${formData.commune}%0A%0A📦 ITEM: ${formData.product}%0A💰 TOTAL: ${total} DA ${bumpText}`;

    window.open(`https://wa.me/${PHONE_NUMBER_WHATSAPP}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-bg border-2 border-fg p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        <div className="mb-8 border-b-2 border-fg pb-4">
          <h2 className="text-2xl font-display font-bold uppercase">{t.identity}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
             <label className="text-xs font-mono font-bold uppercase block">{t.selectLoadout}</label>
             <div className="relative">
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full p-4 border-2 border-fg bg-concrete font-mono text-sm uppercase focus:bg-white focus:outline-none appearance-none rounded-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name} [{p.price} DA]</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-fg font-bold">
                  ▼
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase block">{t.identity}</label>
              <input
                type="text"
                className="w-full p-4 border-2 border-fg bg-bg focus:bg-concrete focus:outline-none rounded-none transition-colors"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="NOM COMPLET"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase block">{t.contact}</label>
              <input
                type="tel"
                maxLength={10}
                className="w-full p-4 border-2 border-fg bg-bg focus:bg-concrete focus:outline-none rounded-none transition-colors font-mono"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="0X XX XX XX XX"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase block">{t.zone}</label>
              <select
                className="w-full p-4 border-2 border-fg bg-bg focus:bg-concrete focus:outline-none rounded-none appearance-none"
                value={formData.wilaya}
                onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
              >
                <option value="">SELECTION...</option>
                {WILAYAS.map(w => (
                  <option key={w.code} value={`${w.code} - ${lang === 'ar' && w.arName ? w.arName : w.name}`}>
                    {w.code} - {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase block">{t.sector}</label>
              <input
                type="text"
                className="w-full p-4 border-2 border-fg bg-bg focus:bg-concrete focus:outline-none rounded-none"
                value={formData.commune}
                onChange={(e) => setFormData({...formData, commune: e.target.value})}
                placeholder="CITÉ / RUE"
              />
            </div>
          </div>

          {/* Industrial Order Bump */}
          <div 
            className="flex items-start gap-4 p-4 border-2 border-fg bg-concrete hover:bg-white cursor-pointer transition-colors"
            onClick={() => setFormData({...formData, isOrderBumpChecked: !formData.isOrderBumpChecked})}
          >
            <div className="mt-1">
              {formData.isOrderBumpChecked ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <div>
              <h4 className="font-display font-bold uppercase text-sm">{t.orderBumpTitle}</h4>
              <p className="text-xs font-mono text-gray-600 mt-1 uppercase">{t.orderBumpDesc}</p>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-xs font-bold font-mono flex items-center gap-2 p-3 bg-red-100 border border-red-500">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-axis w-full py-5 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3"
          >
            {t.confirmOrder}
            <Send size={18} className="rtl:rotate-180" />
          </button>

          <p className="text-center text-[10px] font-mono font-bold uppercase text-gray-400">{t.paymentNotice}</p>
          
        </form>
    </div>
  );
};

export default OrderForm;