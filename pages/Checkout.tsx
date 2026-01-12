import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { Translation, Product, Language } from '../types';
import { Lock, ArrowLeft } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

interface CheckoutProps {
  t: Translation;
  products: Product[];
  lang: Language;
}

const Checkout: React.FC<CheckoutProps> = ({ t, products, lang }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('product');
  
  const initialProduct = products.find(p => p.id === productId) || products[0];

  return (
    <div className="min-h-screen bg-concrete font-sans">
       {/* Header */}
       <div className="bg-bg border-b-2 border-fg p-4 sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between">
             <Link to="/" className="text-xs uppercase font-bold hover:underline flex items-center gap-2">
                <ArrowLeft size={16} /> {t.back}
             </Link>
             <div className="flex items-center gap-2 text-fg text-xs font-mono font-bold uppercase border border-fg px-2 py-1">
                <Lock size={12} />
                SSL_SECURED
             </div>
          </div>
       </div>

       <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
             
             {/* Left: Product Recap (Ticket style) */}
             <div className="hidden md:block md:col-span-5 sticky top-24">
                <div className="bg-bg border-2 border-fg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                   <div className="border-b-2 border-dashed border-gray-300 pb-6 mb-6">
                      <h2 className="text-2xl font-display font-bold uppercase mb-4">{t.orderSummary}</h2>
                      <div className="flex gap-4">
                         <div className="w-20 h-24 bg-gray-200 border border-fg overflow-hidden">
                            <ImageWithFallback src={initialProduct.image} className="w-full h-full object-cover grayscale" />
                         </div>
                         <div>
                            <h3 className="font-bold uppercase">{initialProduct.name}</h3>
                            <p className="text-xs font-mono text-gray-500 mb-2">{t.qty}: 01</p>
                            <p className="font-mono font-bold">{initialProduct.price} DA</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-2 font-mono text-sm uppercase">
                      <div className="flex justify-between">
                         <span>{t.subtotal}</span>
                         <span>{initialProduct.price} DA</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                         <span>{t.shipping}</span>
                         <span>0.00 DA</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                         <span>{t.tax}</span>
                         <span>{t.included}</span>
                      </div>
                      <div className="border-t-2 border-fg pt-4 mt-4 flex justify-between text-lg font-bold">
                         <span>{t.total}</span>
                         <span>{initialProduct.price} DA</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right: Form */}
             <div className="md:col-span-7">
                {/* Mobile Header */}
                <div className="md:hidden mb-8 bg-bg border-2 border-fg p-4 flex items-center gap-4">
                   <div className="w-16 h-16 bg-gray-200 border border-fg overflow-hidden">
                      <ImageWithFallback src={initialProduct.image} className="w-full h-full object-cover grayscale" />
                   </div>
                   <div>
                      <p className="font-display font-bold uppercase">{initialProduct.name}</p>
                      <p className="font-mono font-bold">{initialProduct.price} DA</p>
                   </div>
                </div>

                <OrderForm 
                   initialProduct={initialProduct.name}
                   t={t}
                   products={products}
                   lang={lang}
                />
             </div>

          </div>
       </div>
    </div>
  );
};

export default Checkout;