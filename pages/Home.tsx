import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, CheckCircle, Shield, TrendingUp, AlertTriangle, Hexagon, Star } from 'lucide-react';
import { Translation, Product } from '../types';
import ImageWithFallback from '../components/ImageWithFallback';

interface HomeProps {
  t: Translation;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ t, products }) => {
  const heroLocal = "lifestyle.jpg";
  const heroFallback = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1920&auto=format&fit=crop";

  return (
    <>
      {/* 1. HERO SECTION - DOMINANCE & LEGACY */}
      <header className="relative w-full h-[90vh] border-b-2 border-fg overflow-hidden bg-concrete">
        <div className="absolute inset-0 grayscale contrast-125">
          <ImageWithFallback
            src={heroLocal}
            fallbackSrc={heroFallback}
            alt="AXIS Performance"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
           <div className="bg-bg/95 backdrop-blur-sm p-8 md:p-12 max-w-3xl border-2 border-fg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 transition-transform">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-3 h-3 bg-error animate-pulse"></div>
                 <span className="font-mono text-xs font-bold uppercase tracking-widest">{t.certified}</span>
                 <div className="h-px bg-fg flex-grow"></div>
                 <span className="font-mono text-xs font-bold">{t.edition}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.85] mb-6 tracking-tighter rtl:leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-sm md:text-lg font-mono font-medium text-fg/80 mb-8 max-w-lg uppercase tracking-wide leading-relaxed rtl:font-sans">
                {t.heroSubtitle}
              </p>
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}
                className="btn-axis w-full md:w-auto px-10 py-5 flex items-center justify-center gap-4 text-sm tracking-widest"
              >
                {t.heroCta}
                <ArrowRight size={18} className="rtl:rotate-180" />
              </button>
           </div>
        </div>
      </header>

      {/* 2. AUTHORITY SECTION - SOCIAL PROOF */}
      <section className="bg-fg text-bg py-12 border-b-2 border-fg overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-bg/20 rtl:divide-x-reverse">
               <div className="flex flex-col items-center p-4">
                  <span className="text-5xl font-display font-bold tracking-tighter mb-2">{t.stat1}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-concrete/70 font-sans">{t.stat1Label}</span>
               </div>
               <div className="flex flex-col items-center p-4">
                  <span className="text-5xl font-display font-bold tracking-tighter mb-2 text-error">{t.stat2}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-concrete/70 font-sans">{t.stat2Label}</span>
               </div>
               <div className="flex flex-col items-center p-4">
                  <span className="text-5xl font-display font-bold tracking-tighter mb-2">{t.stat3}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-concrete/70 font-sans">{t.stat3Label}</span>
               </div>
            </div>
         </div>
      </section>

      {/* 3. THE PROBLEM - BIOLOGICAL DECAY */}
      <section className="bg-concrete py-20 px-6 border-b-2 border-fg">
         <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/2">
                  <div className="bg-error/10 border-2 border-error p-6 inline-block mb-6">
                     <AlertTriangle size={48} className="text-error" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-none mb-6 rtl:leading-tight">{t.problemTitle}</h2>
                  <p className="font-sans font-bold text-lg leading-relaxed uppercase opacity-80">{t.problemText}</p>
               </div>
               <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                  <div className="bg-bg border-2 border-fg p-6 aspect-square flex flex-col justify-between hover:bg-fg hover:text-bg transition-colors group">
                     <TrendingUp className="group-hover:text-error transition-colors" size={32} />
                     <span className="font-display font-bold uppercase text-xl rtl:font-sans">{t.problem1}</span>
                  </div>
                  <div className="bg-bg border-2 border-fg p-6 aspect-square flex flex-col justify-between hover:bg-fg hover:text-bg transition-colors group">
                     <Hexagon className="group-hover:text-error transition-colors" size={32} />
                     <span className="font-display font-bold uppercase text-xl rtl:font-sans">{t.problem2}</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. THE ARSENAL (SOLUTION) */}
      <section id="shop" className="py-24 px-4 md:px-8 bg-bg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-fg pb-4 gap-4">
             <h2 className="text-5xl md:text-8xl font-display font-bold text-fg uppercase tracking-tighter leading-none rtl:leading-tight">{t.productsTitle}</h2>
             <span className="font-mono text-xs uppercase bg-fg text-bg px-2 py-1 font-sans">{t.productsSubtitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {products.map((product, index) => {
               // Layout Logic
               const colSpan = index < 2 ? "md:col-span-3" : "md:col-span-2";
               const aspectRatio = index < 2 ? "aspect-[4/3]" : "aspect-[3/4]";
               
               return (
               <Link to={`/product/${product.id}`} key={product.id} className={`group flex flex-col h-full bg-concrete border-2 border-fg transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${colSpan}`}>
                  <div className={`relative ${aspectRatio} overflow-hidden border-b-2 border-fg`}>
                     <div className="absolute top-0 left-0 bg-fg text-bg px-3 py-2 text-xs font-mono font-bold uppercase z-10 flex items-center gap-2 ltr:left-0 rtl:right-0">
                        <span>0{index + 1}</span>
                        {index === 1 && <span className="bg-error w-2 h-2 rounded-full animate-pulse"></span>}
                     </div>
                     <ImageWithFallback 
                        src={product.image}
                        fallbackSrc={product.gallery?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                     />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="mb-4">
                        <h3 className="text-3xl font-display font-bold uppercase leading-none mb-2">{product.name}</h3>
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest font-sans">{product.tagline}</p>
                     </div>
                     <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-300">
                        <div className="flex flex-col">
                           <span className="font-mono font-bold text-xl">{product.price} DA</span>
                           {product.oldPrice > 0 && <span className="text-xs line-through text-gray-400">{product.oldPrice} DA</span>}
                        </div>
                        <div className="px-4 py-2 bg-fg text-bg flex items-center justify-center rounded-none group-hover:bg-error transition-colors gap-2 text-xs font-bold uppercase">
                           <span>{t.viewProduct}</span>
                           <ArrowRight size={14} className="rtl:rotate-180" />
                        </div>
                     </div>
                  </div>
               </Link>
            )})}
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURE / ENGINEERING */}
      <section className="bg-fg text-bg py-24 px-6 border-b-2 border-fg relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-10 font-display text-9xl font-bold rotate-90 hidden md:block select-none">AXIS</div>
         <div className="container mx-auto">
            <div className="max-w-4xl">
               <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-error mb-4 font-sans">{t.techSub}</h2>
               <h3 className="text-4xl md:text-7xl font-display font-bold uppercase mb-12 rtl:leading-tight">{t.techTitle}</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm border-l-2 border-bg/20 pl-6 md:pl-12 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6 md:rtl:pr-12">
                  <div className="space-y-2">
                     <h4 className="font-bold text-lg mb-2 text-concrete font-sans">{t.tech1Title}</h4>
                     <p className="opacity-70 uppercase leading-relaxed font-sans">{t.tech1Desc}</p>
                  </div>
                  <div className="space-y-2">
                     <h4 className="font-bold text-lg mb-2 text-concrete font-sans">{t.tech2Title}</h4>
                     <p className="opacity-70 uppercase leading-relaxed font-sans">{t.tech2Desc}</p>
                  </div>
                  <div className="space-y-2">
                     <h4 className="font-bold text-lg mb-2 text-concrete font-sans">{t.tech3Title}</h4>
                     <p className="opacity-70 uppercase leading-relaxed font-sans">{t.tech3Desc}</p>
                  </div>
                  <div className="space-y-2">
                     <h4 className="font-bold text-lg mb-2 text-concrete font-sans">{t.tech4Title}</h4>
                     <p className="opacity-70 uppercase leading-relaxed font-sans">{t.tech4Desc}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. REVIEWS / FIELD REPORTS */}
      <section className="bg-concrete py-24 border-b-2 border-fg">
         <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-display font-bold uppercase mb-16">{t.reviewsTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[t.review1, t.review2, t.review3].map((review, i) => (
                  <div key={i} className="bg-bg border-2 border-fg p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
                     <div className="flex gap-1 mb-4 text-error">
                        <Star fill="currentColor" size={16} />
                        <Star fill="currentColor" size={16} />
                        <Star fill="currentColor" size={16} />
                        <Star fill="currentColor" size={16} />
                        <Star fill="currentColor" size={16} />
                     </div>
                     <p className="font-sans font-bold text-sm uppercase mb-6 leading-relaxed flex-grow">
                        "{review}"
                     </p>
                     <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                        <div className="w-10 h-10 bg-gray-300 border border-fg overflow-hidden relative">
                           <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-500">{i+1}</div>
                        </div>
                        <div>
                           <p className="font-display font-bold uppercase text-sm">{t.verifiedClient}</p>
                           <p className="font-mono text-[10px] text-gray-500 uppercase">ALGERIA</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-bg py-20 px-6">
         <div className="container mx-auto text-center max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest mb-6 font-sans">{t.finalCtaTitle}</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-8 rtl:leading-tight">{t.finalCtaSub}</h2>
            <button 
               onClick={() => document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}
               className="btn-axis px-12 py-6 text-xl mx-auto flex items-center gap-4"
            >
               {t.heroCta}
               <ArrowRight size={24} className="rtl:rotate-180" />
            </button>
         </div>
      </section>
    </>
  );
};

export default Home;