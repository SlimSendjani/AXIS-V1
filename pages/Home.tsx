import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Translation, Product } from '../types';
import { useCart } from '../contexts/CartContext';


interface HomeProps {
  t: Translation;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ t, products }) => {
  const { addToCart } = useCart();


  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-bg via-bg to-bg/90 pt-20 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-7xl md:text-9xl font-display leading-none tracking-tighter mb-8">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 leading-relaxed opacity-90">
            {t.heroSubtitle}
          </p>
          <button className="inline-flex items-center gap-3 bg-fg text-bg px-8 py-4 font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform">
            {t.heroCta}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-fg text-bg py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-5xl md:text-7xl font-display mb-2">{t.stat1}</p>
              <p className="text-sm uppercase tracking-widest opacity-80">{t.stat1Label}</p>
            </div>
            <div>
              <p className="text-5xl md:text-7xl font-display mb-2">{t.stat2}</p>
              <p className="text-sm uppercase tracking-widest opacity-80">{t.stat2Label}</p>
            </div>
            <div>
              <p className="text-5xl md:text-7xl font-display mb-2">{t.stat3}</p>
              <p className="text-sm uppercase tracking-widest opacity-80">{t.stat3Label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-8">{t.problemTitle}</h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed">{t.problemText}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-fg p-8">
              <p className="text-3xl font-display mb-3">{t.problem1}</p>
              <p className="opacity-70">Votre structure se dégrade.</p>
            </div>
            <div className="border-2 border-fg p-8">
              <p className="text-3xl font-display mb-3">{t.problem2}</p>
              <p className="opacity-70">Votre influence s'efface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6 bg-bg/50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-3">{t.productsTitle}</h2>
            <p className="text-sm uppercase tracking-widest opacity-60">{t.productsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="bg-white aspect-square mb-4 overflow-hidden border-2 border-fg group-hover:border-fg transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-1">{product.tagline}</p>
                  <h3 className="text-3xl font-display mb-2">{product.name}</h3>
                  <p className="text-sm opacity-70 mb-4">{product.shortDesc}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{product.price} DA</p>
                    <p className="text-sm opacity-50 line-through">{product.oldPrice} DA</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="w-full border-2 border-fg py-3 font-bold uppercase text-sm hover:bg-fg hover:text-bg transition-colors"
                >
                  {t.addToCart}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-3">{t.techTitle}</h2>
          <p className="text-sm uppercase tracking-widest opacity-60 mb-16">{t.techSub}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-fg p-8 hover:bg-fg hover:text-bg transition-colors cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">{t.tech1Title}</h3>
              <p className="opacity-70">{t.tech1Desc}</p>
            </div>
            <div className="border-2 border-fg p-8 hover:bg-fg hover:text-bg transition-colors cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">{t.tech2Title}</h3>
              <p className="opacity-70">{t.tech2Desc}</p>
            </div>
            <div className="border-2 border-fg p-8 hover:bg-fg hover:text-bg transition-colors cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">{t.tech3Title}</h3>
              <p className="opacity-70">{t.tech3Desc}</p>
            </div>
            <div className="border-2 border-fg p-8 hover:bg-fg hover:text-bg transition-colors cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">{t.tech4Title}</h3>
              <p className="opacity-70">{t.tech4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-6 bg-fg text-bg">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-16">{t.reviewsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[t.review1, t.review2, t.review3].map((review, idx) => (
              <div key={idx} className="border-2 border-bg p-8">
                <p className="mb-4 leading-relaxed">"{review}"</p>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <p className="text-xs uppercase font-bold">{t.verifiedClient}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-3 uppercase">{t.whyUsTitle1}</h3>
              <p className="opacity-70">{t.whyUsDesc1}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 uppercase">{t.whyUsTitle2}</h3>
              <p className="opacity-70">{t.whyUsDesc2}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 uppercase">{t.whyUsTitle3}</h3>
              <p className="opacity-70">{t.whyUsDesc3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 bg-fg text-bg">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-7xl md:text-9xl font-display tracking-tighter mb-6 leading-none">
            {t.finalCtaTitle}
          </h2>
          <p className="text-2xl mb-8 opacity-90">{t.finalCtaSub}</p>
          <button className="inline-flex items-center gap-3 bg-bg text-fg px-8 py-4 font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform">
            {t.heroCta}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
