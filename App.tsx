import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getProducts, TRANSLATIONS, BRAND_NAME } from './constants';
import { Language } from './types';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SalesNotification from './components/SalesNotification';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detecter la langue du navigateur ou préférence sauvegardée
    const savedLang = localStorage.getItem('axis_lang') as Language;
    if (savedLang && ['fr', 'en', 'ar'].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('axis_lang', lang);
  }, [lang]);

  useEffect(() => {
    // Simuler un chargement initial pour l'effet "Premium"
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
  };

  const t = TRANSLATIONS[lang];
  const products = getProducts(lang);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center">
        <div className="text-4xl md:text-6xl font-display font-bold tracking-tighter animate-pulse">
          {BRAND_NAME}
        </div>
        <div className="mt-4 font-mono text-xs md:text-sm text-gray-400">
          {t.loading}
        </div>
        <div className="mt-8 w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-progress"></div>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <SalesNotification />
        <Routes>
          <Route path="/" element={
            <Layout t={t} lang={lang} changeLang={changeLang}>
              <Home t={t} products={products} />
            </Layout>
          } />
          <Route path="/product/:id" element={
            <Layout t={t} lang={lang} changeLang={changeLang}>
              <ProductDetail t={t} products={products} lang={lang} />
            </Layout>
          } />
          <Route path="/checkout" element={
            <Layout t={t} lang={lang} changeLang={changeLang}>
              <Checkout t={t} products={products} lang={lang} />
            </Layout>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;