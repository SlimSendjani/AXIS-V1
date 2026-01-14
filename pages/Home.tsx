import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
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
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 bg-fg text-bg px-8 py-4 font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform"
          >
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
      <section className="py-20 md:py-28 px-6">
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
      <section id="products" className="py-20 md:py-28 px-6 bg-bg/50 section-with-sticky-title">
        <div className="container mx-auto max-w-7xl">
          <div className="section-content-with-sticky">
            {/* Sticky Title - Only visible on desktop */}
            <div className="hidden lg:block">
              <div className="sticky-section-title">{t.productsTitle}</div>
            </div>

            <div>
              {/* Mobile/Tablet Title - Hidden on desktop */}
              <div className="mb-16 lg:hidden">
                <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-3">{t.productsTitle}</h2>
                <p className="text-sm uppercase tracking-widest opacity-60">{t.productsSubtitle}</p>
              </div>

              {/* Desktop Title - Inline */}
              <div className="mb-16 hidden lg:block">
                <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-3">{t.productsTitle}</h2>
                <p className="text-sm uppercase tracking-widest opacity-60">{t.productsSubtitle}</p>
              </div>

              {/* Asymmetric Product Grid */}
              <div className="asymmetric-grid">
                {products.map((product, idx) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group product-card">
                    {/* Product Image with Hyper-Relief 3D Effect */}
                    <div className="product-image-container bg-white aspect-square mb-4 overflow-hidden border-2 border-fg group-hover:border-fg transition-colors">
                      {/* Single grayscale image that reveals color on hover/touch */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image w-full h-full object-cover"
                      />
                      {/* Badge de certification */}
                      <span className="product-cert-badge">
                        CERTIFIED STRUCTURE // AXIS LABS
                      </span>
                    </div>
                    <div className="mb-4">
                      {/* Badge Technique */}
                      {product.techBadge && (
                        <span className="tech-badge">{product.techBadge}</span>
                      )}
                      <p className="text-xs uppercase tracking-widest opacity-60 mb-1">{product.tagline}</p>
                      <h3 className="text-3xl font-display mb-2">{product.name}</h3>
                      <p className="text-sm opacity-70 mb-4">{product.shortDesc}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{product.price} DA</p>
                        <p className="text-sm opacity-50 line-through">{product.oldPrice} DA</p>
                      </div>
                      {/* Clinical Rating */}
                      <div className="clinical-rating">
                        <ShieldCheck size={14} />
                        <span>4.9/5 | 1,240 Rapports Cliniques Vérifiés</span>
                      </div>
                    </div>
                    {/* Bouton CTA avec animation industrielle */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="btn-industrial w-full border-2 border-fg py-3 font-bold uppercase text-sm transition-colors"
                    >
                      <span className="btn-industrial-text">{t.addToCart}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section - Fiches de Spécifications */}
      <section className="py-32 md:py-40 px-6 section-with-sticky-title bg-concrete">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs opacity-50">SPEC-SHEET // REV.04</span>
            <div className="flex-1 h-px bg-fg opacity-20"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-3">{t.techTitle}</h2>
          <p className="text-sm uppercase tracking-widest opacity-60 mb-16">{t.techSub}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spec Card 1 - Compression Thermique */}
            <div className="spec-card group">
              <div className="flex items-start gap-6">
                <div className="spec-icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12">
                    <circle cx="24" cy="24" r="16" strokeDasharray="4 2" />
                    <path d="M24 8v32M8 24h32" strokeWidth="0.5" />
                    <path d="M24 16v16" strokeWidth="2" />
                    <path d="M18 20l6-4 6 4" strokeWidth="1.5" />
                    <path d="M18 28l6 4 6-4" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] opacity-40">AX-TH-01</span>
                    <div className="h-px flex-1 bg-fg opacity-10"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{t.tech1Title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{t.tech1Desc}</p>
                  <div className="mt-4 flex gap-4 font-mono text-[9px] opacity-40">
                    <span>TEMP: 37°C</span>
                    <span>FLOW: +40%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Card 2 - Structure à Mémoire */}
            <div className="spec-card group">
              <div className="flex items-start gap-6">
                <div className="spec-icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12">
                    <rect x="8" y="8" width="32" height="32" strokeDasharray="4 2" />
                    <path d="M12 24h24M24 12v24" strokeWidth="0.5" />
                    <path d="M16 16l16 16M32 16l-16 16" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="4" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] opacity-40">AX-MEM-02</span>
                    <div className="h-px flex-1 bg-fg opacity-10"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{t.tech2Title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{t.tech2Desc}</p>
                  <div className="mt-4 flex gap-4 font-mono text-[9px] opacity-40">
                    <span>FLEX: 180°</span>
                    <span>MEMORY: 98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Card 3 - Absorption d'Impact */}
            <div className="spec-card group">
              <div className="flex items-start gap-6">
                <div className="spec-icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12">
                    <circle cx="24" cy="24" r="18" strokeDasharray="4 2" />
                    <circle cx="24" cy="24" r="12" strokeWidth="0.5" />
                    <circle cx="24" cy="24" r="6" strokeWidth="2" />
                    <path d="M24 6v6M24 36v6M6 24h6M36 24h6" strokeWidth="1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] opacity-40">AX-IMP-03</span>
                    <div className="h-px flex-1 bg-fg opacity-10"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{t.tech3Title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{t.tech3Desc}</p>
                  <div className="mt-4 flex gap-4 font-mono text-[9px] opacity-40">
                    <span>ABSORB: 40%</span>
                    <span>KINETIC: -12kJ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Card 4 - Design Anatomique */}
            <div className="spec-card group">
              <div className="flex items-start gap-6">
                <div className="spec-icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12">
                    <ellipse cx="24" cy="16" rx="8" ry="10" strokeDasharray="4 2" />
                    <path d="M16 26c0 8 3 14 8 16c5-2 8-8 8-16" strokeWidth="1.5" />
                    <path d="M20 20v8M28 20v8" strokeWidth="1" />
                    <circle cx="24" cy="36" r="2" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] opacity-40">AX-BIO-04</span>
                    <div className="h-px flex-1 bg-fg opacity-10"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{t.tech4Title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{t.tech4Desc}</p>
                  <div className="mt-4 flex gap-4 font-mono text-[9px] opacity-40">
                    <span>FIT: 99.2%</span>
                    <span>GRADE: PRO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews - Rapports de Performance */}
      <section className="py-32 md:py-40 px-6 reviews-section">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs opacity-50 text-bg">FIELD-REPORTS // CLASSIFIED</span>
            <div className="flex-1 h-px bg-bg opacity-20"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-display tracking-tighter mb-16 text-bg">{t.reviewsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { review: t.review1, id: 'RPT-2026-0847', subject: 'OPERATOR-A', rating: '9.8/10' },
              { review: t.review2, id: 'RPT-2026-1293', subject: 'OPERATOR-B', rating: '9.5/10' },
              { review: t.review3, id: 'RPT-2026-0612', subject: 'OPERATOR-C', rating: '9.9/10' }
            ].map((item, idx) => (
              <div key={idx} className="performance-report">
                {/* Header du rapport */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-bg/10">
                  <span className="font-mono text-[10px] text-bg/40">{item.id}</span>
                  <div className="flex items-center gap-2">
                    <span className="status-dot"></span>
                    <span className="font-mono text-[10px] text-success font-bold">STATUS: VERIFIED</span>
                  </div>
                </div>

                {/* Contenu */}
                <p className="text-bg/90 leading-relaxed mb-6 text-sm">"{item.review}"</p>

                {/* Méta-données */}
                <div className="flex items-center justify-between pt-4 border-t border-bg/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-bg/10 rounded-full flex items-center justify-center">
                      <CheckCircle size={14} className="text-success" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-bg/40">{item.subject}</p>
                      <p className="text-xs text-bg font-bold">{t.verifiedClient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] text-bg/40">SCORE</p>
                    <p className="text-lg font-bold text-success">{item.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-32 md:py-40 px-6">
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

      {/* CTA Final avec effet Glow */}
      <section className="py-32 px-6 bg-fg text-bg">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-7xl md:text-9xl font-display tracking-tighter mb-6 leading-none">
            {t.finalCtaTitle}
          </h2>
          <p className="text-2xl mb-8 opacity-90">{t.finalCtaSub}</p>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glow inline-flex items-center gap-3 bg-bg text-fg px-10 py-5 font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform"
          >
            {t.heroCta}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
