import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getProducts, TRANSLATIONS } from './constants';
import { Language } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SalesNotification from './components/SalesNotification';

// Scroll to top on route change
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

  const t = TRANSLATIONS[lang];
  const products = getProducts(lang);

  // Update direction for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleLang = () => {
    if (lang === 'fr') setLang('ar');
    else if (lang === 'ar') setLang('en');
    else setLang('fr');
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#F2F0EB] flex flex-col items-center justify-center z-50">
        <div className="text-5xl font-display text-ink animate-pulse tracking-tighter">{t.loading}</div>
        <div className="mt-4 w-24 h-0.5 bg-gold"></div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <SalesNotification />
      <Routes>
        <Route path="/" element={
          <Layout t={t} lang={lang} toggleLang={toggleLang}>
            <Home t={t} products={products} />
          </Layout>
        } />
        <Route path="/product/:id" element={
          <Layout t={t} lang={lang} toggleLang={toggleLang}>
            <ProductDetail t={t} products={products} />
          </Layout>
        } />
        <Route path="/checkout" element={
          // Checkout has its own specific layout inside, usually cleaner
          <Checkout t={t} products={products} lang={lang} />
        } />
      </Routes>
    </Router>
  );
}

export default App;