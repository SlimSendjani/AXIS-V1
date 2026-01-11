import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShoppingBag } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import { Translation, Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  t: Translation;
  lang: Language;
  toggleLang: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, t, lang, toggleLang }) => {
  return (
    <div className={`min-h-screen bg-bg text-fg ${lang === 'ar' ? 'font-sans' : ''} flex flex-col`}>
      {/* Brutalist Ticker */}
      <div className="bg-fg text-bg py-2 overflow-hidden whitespace-nowrap sticky top-0 z-50 border-b border-fg">
        <div className="animate-marquee inline-block text-xs font-mono font-bold uppercase tracking-widest">
          {t.ticker} &nbsp; /// &nbsp; {t.ticker} &nbsp; /// &nbsp; {t.ticker}
        </div>
      </div>

      {/* Navbar Industriel */}
      <nav className="bg-bg/90 backdrop-blur-md sticky top-8 z-40 border-b-2 border-fg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-2">
             <Link to="/" className="text-4xl font-display font-bold tracking-tighter hover:scale-105 transition-transform">
               {BRAND_NAME}
             </Link>
             <div className="hidden md:block w-2 h-2 bg-error rounded-full animate-pulse-fast ml-2"></div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hidden md:block text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">{t.navShop}</Link>
            <button 
              onClick={toggleLang}
              className="text-xs font-mono font-bold uppercase border border-fg px-2 py-1 hover:bg-fg hover:text-bg transition-colors"
            >
              {lang}
            </button>
            <div className="relative cursor-pointer">
              <ShoppingBag size={20} strokeWidth={2} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-fg text-bg text-[8px] flex items-center justify-center font-bold rounded-full">0</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer Massif */}
      <footer className="bg-fg text-bg pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
             <div>
                <h2 className="text-6xl md:text-9xl font-display leading-none tracking-tighter mb-4">{BRAND_NAME}</h2>
                <p className="font-mono text-xs max-w-sm uppercase opacity-70">
                  Performance equipment for the modern human structure.
                </p>
             </div>
             <div className="flex flex-col justify-end md:items-end gap-4">
                <a href="#" className="text-xl font-bold uppercase hover:text-concrete transition-colors">Instagram</a>
                <a href="#" className="text-xl font-bold uppercase hover:text-concrete transition-colors">Support</a>
                <a href="#" className="text-xl font-bold uppercase hover:text-concrete transition-colors">Legal</a>
             </div>
          </div>
          
          <div className="border-t border-bg/20 pt-8 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase">
            <p>AXIS CORP © 2026. ALGIERS HQ.</p>
            <p>SYSTEM STATUS: ONLINE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;