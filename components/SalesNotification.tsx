import React, { useState, useEffect } from 'react';
import { FAKE_SALES_DATA } from '../constants';
import { ShoppingBag } from 'lucide-react';

const SalesNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState(FAKE_SALES_DATA[0]);

  useEffect(() => {
    const showNotification = () => {
      const randomSale = FAKE_SALES_DATA[Math.floor(Math.random() * FAKE_SALES_DATA.length)];
      setCurrentSale(randomSale);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    const initialTimer = setTimeout(showNotification, 5000);
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in hidden md:block">
      <div className="bg-[#F4F2ED] border border-[#E6E2D6] shadow-xl p-4 flex items-center gap-4 max-w-sm rounded">
        <div className="text-gold">
          <ShoppingBag size={16} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[9px] text-gray-500 font-sans uppercase tracking-widest mb-1">À l'instant • {currentSale.city}</p>
          <p className="text-xs font-sans text-ink">
            {currentSale.name} a choisi <span className="font-bold border-b border-gold/30">{currentSale.product}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesNotification;