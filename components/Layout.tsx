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
    <div className={`min-h-screen bg-bg text-fg technical-grid noise-texture ${lang === 'ar' ? 'font-sans' : ''} flex flex-col`}>
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

      {/* Reassurance Bar - Trust Indicators */}
      <div className="reassurance-bar">
        {lang === 'ar'
          ? 'توصيل آمن 58 ولاية // ضمان 30 يوم // دعم متخصص'
          : 'LIVRAISON SÉCURISÉE 58 WILAYAS // GARANTIE 30 JOURS // SUPPORT EXPERT'
        }
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer Ultra Premium */}
      <footer className="bg-fg text-bg pt-16 pb-8 relative overflow-hidden">
        {/* Algeria Map Watermark - Architectural Signature */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" className="w-full h-full">
            {/* Accurate Algeria Silhouette */}
            <path
              d="M15 10 L20 8 L35 6 L50 5 L65 6 L80 8 L88 12 L90 18 L92 30 L90 45 L88 55 L85 65 L80 75 L72 82 L65 88 L55 95 L45 100 L35 102 L25 100 L18 95 L12 85 L8 70 L6 55 L8 40 L10 25 L12 15 L15 10 Z"
              strokeWidth="0.5"
              className="opacity-60"
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Brand Header */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-display leading-none tracking-tight mb-3">{BRAND_NAME}</h2>
            <p className="font-mono text-xs uppercase opacity-50 tracking-widest">
              {lang === 'ar' ? 'معدات الأداء للهيكل البشري الحديث' : 'PERFORMANCE EQUIPMENT FOR THE MODERN HUMAN STRUCTURE'}
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-t border-bg/10 pt-12">
            {/* Column 1: Navigation */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">NAVIGATION</h4>
              <ul className="space-y-3">
                <li><a href="/#products" className="text-sm font-medium hover:opacity-60 transition-opacity">{lang === 'ar' ? 'الترسانة' : "L'Arsenal"}</a></li>
                <li><a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">{lang === 'ar' ? 'المهمة' : 'La Mission'}</a></li>
                <li><a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">Contact</a></li>
              </ul>
            </div>

            {/* Column 2: Legal & Security */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">{lang === 'ar' ? 'القانون والأمان' : 'LÉGAL & SÉCURITÉ'}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">{lang === 'ar' ? 'الشروط العامة للبيع' : 'CGV'}</a></li>
                <li><a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">{lang === 'ar' ? 'سياسة الخصوصية' : 'Politique de Confidentialité'}</a></li>
                <li><a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">{lang === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la Livraison Sécurisé'}</a></li>
              </ul>
            </div>

            {/* Column 3: AXIS HQ */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">AXIS HQ</h4>
              <div className="space-y-2">
                <p className="text-sm font-medium">{lang === 'ar' ? 'الجزائر العاصمة، الجزائر' : 'Alger, Algérie'}</p>
                <p className="font-mono text-[10px] opacity-50 tracking-wide">
                  {lang === 'ar' ? '"مهندسو الجسم منذ 2023"' : '"Architectes du Corps depuis 2023"'}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">58 WILAYAS COVERED</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-bg/10 pt-6 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-widest opacity-50">
            <p>AXIS CORP © 2026. {lang === 'ar' ? 'الجزائر' : 'ALGIERS HQ'}.</p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
              {lang === 'ar' ? 'حالة النظام: متصل' : 'SYSTEM STATUS: ONLINE'}
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer t={t} lang={lang} />
    </div>
  );
};

export default Layout;