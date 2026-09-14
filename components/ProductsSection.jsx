'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useContext, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../lib/products.js'
import { ScrollerContext } from '../lib/ScrollerContext'
import { API_URI, useGetService } from '../lib/getService.js'
import { extractPlainText, joinParagraphChildren } from '../lib/sanitizeText.js'
import { ProductModal } from './ProductModal.jsx'

export function ProductsSection() {
  const gridRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  const { data: pageData, loading } = useGetService(
    "/pages/9?depth=2&draft=false&locale=undefined&trash=false"
  );

  // ✅ Defaults (only used when API data is missing)
  const DEFAULTS = {
    heroTitle: "The Collection",
    heroDescription: "Four numbered eaux de parfum, each composed around a single rare natural. Concentrated, refillable, and finished by hand in the atelier.",
    products: [
      {
        id: "default-1",
        name: "Nº 01 — Bois d'Ambre",
        description: "Smoked cedar and labdanum over a warm amber base. Top notes of pink pepper and bergamot; a heart of iris and ambrette.",
        imagePath: "/images/bottle-amber-light.png",
      },
      {
        id: "default-2",
        name: "Nº 02 — Fleur Noire",
        description: "Night-blooming tuberose and black orchid, grounded in oud and vetiver. A floral composed for the evening.",
        imagePath: "/images/bottle-noir-light.png",
      },
      {
        id: "default-3",
        name: "Nº 03 — Sel Blanc",
        description: "Sea salt, fig leaf and white musk. A luminous citrus opening that dries down to warm, sun-bleached driftwood.",
        imagePath: "/images/bottle-clair-light.png",
      },
      {
        id: "default-4",
        name: "Nº 04 — Encens Vert",
        description: "Frankincense and green galbanum with a heart of violet leaf. Resinous, cool and quietly ceremonial.",
        imagePath: "/images/bottle-vert-light.png",
      },
    ],
  };

  useEffect(() => {
    if (typeof window === "undefined" || !scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const content = card.querySelector(".product-content");
      if (!content) return;

      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            scroller: scrollerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, [scrollerRef]);

  const heroData = pageData?.hero?.richText?.root?.children || [];

  const heroTitle =
    extractPlainText(pageData?.hero?.richText, ["heading"]) ||
    heroData?.find((child) => child.tag === "h2")?.children?.[0]?.text ||
    DEFAULTS.heroTitle;

  const heroDescription =
    extractPlainText(pageData?.hero?.richText, ["paragraph"]) ||
    heroData?.find((child) => child.type === "paragraph")?.children?.[0]?.text ||
    DEFAULTS.heroDescription;

  // Extracting products/media (keep your logic, just make it safe + add fallbacks)
  const products =
    pageData?.layout
      ?.map((item, index) => {
        const caption = item?.media?.caption;

        const name =
          item?.media?.caption?.root?.children?.[0]?.children?.[0]?.text ||
          item?.media?.alt ||
          `Product ${index + 1}` ||
          DEFAULTS.products[0].name;

        const rawDesc = extractPlainText(caption, ["paragraph"]) || "";
        const description =
          rawDesc
            ? rawDesc.split(" ").slice(1).join(" ").trim() || rawDesc.trim()
            : DEFAULTS.products[0].description;

        const imagePath = `${API_URI}${item?.media?.url.replace('/api', '')}` || DEFAULTS.products[0].imagePath;

        return {
          id: item?.id || `default-${index + 1}`,
          name,
          description,
          imagePath,
        };
      })
      ?.filter((p) => p?.name || p?.description || p?.imagePath) || [];

  // ✅ if layout is empty / no products, return default product array
  const finalProducts = products.length ? products : DEFAULTS.products;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-20 snap-start bg-ink text-ivory">
      <div className="text-center  mx-auto mb-16">
        <h2 className="font-display text-5xl md:text-6xl font-normal mb-6">
          {heroTitle}
        </h2>
        <p className="text-taupe font-light max-w-[720px] mx-auto leading-relaxed">
          {heroDescription}
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full overflow-visible"
      >
        {finalProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="product-card relative rounded-3xl p-8 text-center cursor-pointer group overflow-visible bg-ivory text-ink border border-ivory transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute inset-0 z-[1] pointer-events-none flex items-start justify-center overflow-hidden rounded-3xl">
              <div className="w-full h-[62%] bg-gradient-to-b from-cream to-transparent" />
            </div>
            {/* <Link href={`/products/${product.slug}`}> */}
            <div className="product-content relative z-[5]">
              <div className="w-full h-64 flex items-center justify-center mb-8">
                <Image
                  // src={`${API_URI}${product.imagePath.replace('/api', '')}`}
                  src={product.imagePath}
                  alt={product.name}
                  width={240}
                  height={300}
                  className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-display text-xl mb-3 text-left text-charcoal">{product.name}</h3>
              <p className="text-stone text-sm leading-relaxed line-clamp-3 text-left font-light">
                {product.description}
              </p>
            </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={closeModal}
        product={selectedProduct}
      />
    </section>
  )
}
