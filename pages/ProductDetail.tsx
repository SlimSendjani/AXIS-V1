import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, ShieldCheck, Activity, ArrowRight, Info } from 'lucide-react';
import { Translation, Product, Language } from '../types';
import { useCart } from '../contexts/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';

interface ProductDetailProps {
   t: Translation;
   products: Product[];
   lang: Language;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ t, products, lang }) => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const { addToCart } = useCart();
   const product = products.find(p => p.id === id);

   if (!product) {
      return <div className="min-h-screen flex items-center justify-center font-mono uppercase">System Error: Product Not Found</div>;
   }

   const handleBuyNow = () => {
      // Add product to cart
      addToCart(product);
      // Navigate to checkout
      navigate('/checkout');
   };

   return (
      <div className="animate-fade-in bg-concrete min-h-screen">

         {/* Breadcrumb */}
         <div className="container mx-auto px-6 py-6">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase border-b border-transparent hover:border-fg transition-colors rtl:flex-row-reverse">
               <ArrowLeft size={14} className="rtl:rotate-180" /> {t.back} / {product.name}
            </Link>
         </div>

         <div className="container mx-auto px-4 md:px-8 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-bg border-2 border-fg p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">

               {/* Left: Gallery (Industrial) */}
               <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="aspect-square bg-gray-100 border-2 border-fg overflow-hidden relative group">
                     <ImageWithFallback
                        src={product.image}
                        fallbackSrc={product.gallery?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                     />
                     <div className="absolute bottom-4 left-4 bg-fg text-bg px-3 py-1 font-mono text-xs font-bold uppercase rtl:right-4 rtl:left-auto">
                        FIG 1.0
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square border-2 border-gray-200 hover:border-fg cursor-pointer transition-colors bg-gray-50">
                           <ImageWithFallback src={product.image} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Specs & Action */}
               <div className="lg:col-span-5 flex flex-col">
                  <div className="border-b-2 border-fg pb-6 mb-8">
                     <div className="flex justify-between items-start mb-2">
                        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase leading-none">{product.name}</h1>
                        <div className="bg-error text-white px-2 py-1 text-[10px] font-bold uppercase animate-pulse">New</div>
                     </div>
                     <p className="font-mono text-sm text-gray-500 uppercase font-sans">{product.tagline}</p>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                     <span className="text-4xl font-mono font-bold">{product.price} DA</span>
                     {product.oldPrice && (
                        <span className="text-xl text-gray-400 line-through font-mono decoration-2">{product.oldPrice} DA</span>
                     )}
                  </div>

                  <div className="mb-8">
                     <h3 className="font-bold uppercase text-sm mb-3 flex items-center gap-2 font-sans">
                        <Info size={16} /> {t.viewProduct}
                     </h3>
                     <p className="text-sm leading-relaxed text-gray-700 font-bold font-sans">
                        {product.description}
                     </p>
                  </div>

                  {/* Tech Specs Table */}
                  <div className="bg-concrete border border-fg p-4 mb-8">
                     <h3 className="font-mono text-xs font-bold uppercase mb-4 border-b border-gray-300 pb-2 font-sans">{t.details}</h3>
                     <ul className="space-y-2 font-mono text-xs font-sans">
                        {product.specs.map((spec, i) => (
                           <li key={i} className="flex justify-between">
                              <span className="text-gray-500">SPEC {i + 1}</span>
                              <span className="font-bold uppercase">{spec}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                     {product.features.map((f, i) => (
                        <div key={i} className="border border-gray-300 p-3">
                           <div className="font-display font-bold uppercase text-lg mb-1 rtl:font-sans">{f.title}</div>
                           <div className="text-[10px] uppercase text-gray-500 leading-tight font-sans">{f.desc}</div>
                        </div>
                     ))}
                  </div>

                  {/* Sticky Action */}
                  <div className="mt-auto sticky bottom-4 z-20">
                     <button
                        onClick={handleBuyNow}
                        className="btn-axis w-full py-5 flex items-center justify-center gap-4 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                     >
                        {t.buyNow}
                        <ArrowRight size={20} className="rtl:rotate-180" />
                     </button>
                     <div className="text-center mt-3 text-[10px] font-mono uppercase text-gray-500 flex justify-center gap-4 font-sans">
                        <span className="flex items-center gap-1"><Box size={10} /> STOCK: LOW</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={10} /> SECURE</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default ProductDetail;