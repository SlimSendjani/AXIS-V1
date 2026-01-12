import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShoppingBag, ChevronDown } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import { Translation, Language } from '../types';
import { useCart } from '../contexts/CartContext';
import CartDrawer from './CartDrawer';


interface LayoutProps {
  children: React.ReactNode;
  t: Translation;
  lang: Language;
  changeLang: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ar', label: 'العربية', flag: '🇩🇿' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

const Layout: React.FC<LayoutProps> = ({ children, t, lang, changeLang }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getItemCount, setIsCartOpen } = useCart();


  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === lang);

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

            {/* Menu déroulant des langues */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase border border-fg px-3 py-2 hover:bg-fg hover:text-bg transition-colors"
              >
                <span>{currentLang?.flag}</span>
                <span className="hidden sm:inline">{currentLang?.label}</span>
                <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full mt-1 right-0 bg-bg border-2 border-fg shadow-lg min-w-[140px] z-50">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        changeLang(language.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase hover:bg-fg hover:text-bg transition-colors ${lang === language.code ? 'bg-fg text-bg' : ''
                        }`}
                    >
                      <span>{language.flag}</span>
                      <span>{language.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:scale-110 transition-transform"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-bg text-[10px] flex items-center justify-center font-bold rounded-full">
                  {getItemCount()}
                </span>
              )}
            </button>
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
                {lang === 'ar' ? 'معدات الأداء للهيكل البشري الحديث.' : 'Performance equipment for the modern human structure.'}
              </p>
            </div>
            <div className="flex flex-col justify-end md:items-end gap-4">
              <a href="#" className="text-xl font-bold uppercase hover:text-concrete transition-colors">Instagram</a>
              <a href="#" className="text-xl font-bold uppercase hover:text-concrete transition-colors">{lang === 'ar' ? 'الدعم' : 'Support'}</a>
              <a href="#" className="text-xl font-bold uppercase hover:text-concrete transition-colors">{lang === 'ar' ? 'قانوني' : 'Legal'}</a>
            </div>
          </div>

          <div className="border-t border-bg/20 pt-8 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase">
            <p>AXIS CORP © 2026. {lang === 'ar' ? 'الجزائر' : 'ALGIERS HQ'}.</p>
            <p>{lang === 'ar' ? 'حالة النظام: متصل' : 'SYSTEM STATUS: ONLINE'}</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer t={t} lang={lang} />
    </div>
  );
};

export default Layout;