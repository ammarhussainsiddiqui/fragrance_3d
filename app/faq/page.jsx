'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FinalSection } from '../../components/FinalSection';
import Footer from '../../components/Footer';
import { useGetService } from '../../lib/getService';
import Loader from '../../components/Loader';
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const { data: pageData, loading } = useGetService(
    "/pages/11?depth=2&draft=false&locale=undefined&trash=false"
  );

  const { layout = [] } = pageData || {};

  // ✅ Defaults (same as your commented array)
  const DEFAULT_FAQS = [
    {
      question: "What is the difference between an Eau de Parfum and an Extrait?",
      answer:
        "Concentration. Our eaux de parfum sit at 18–20% fragrance oil; the extraits at 28–30%, for a deeper, slower and longer-lasting trail.",
    },
    {
      question: "Do you compose bespoke fragrances?",
      answer:
        "Yes. A bespoke signature begins with a conversation in the atelier and takes between six and twelve months, including materials, maturation and refinement. You leave with a composition that is yours alone.",
    },
    {
      question: "Are your fragrances natural, vegan and cruelty-free?",
      answer:
        "Every edition is built around rare naturals, supported where necessary by safe, well-studied synthetics. The house is vegan and cruelty-free, and never tests on animals.",
    },
    {
      question: "How long does a flacon last?",
      answer:
        "A 50 ml flacon offers roughly five hundred sprays. Stored away from light and heat, an unopened edition keeps for three to five years; once opened, we suggest enjoying it within two.",
    },
    {
      question: "Can I refill my flacon?",
      answer:
        "Yes. Every flacon is refillable. Return it to the atelier or to a stockist and we will refill and re-seal it at a reduced price — glass and metal, kept for life.",
    },
  ];

  // Map the columns to the required FAQ structure (keep logic, just add safe fallbacks)
  const faqsFromApi = layout
    .map((section) => {
      return (section?.columns || []).map((column) => {
        const headingNode = column?.richText?.root?.children?.find(
          (child) =>
            child?.tag === "h1" ||
            child?.tag === "h2" ||
            child?.tag === "h3" ||
            child?.tag === "h4"
        );

        const question =
          headingNode?.children?.find((child) => child?.type === "text")?.text ||
          "No Question";

        const answer =
          column?.richText?.root?.children?.find((child) => child.type === "paragraph")
            ?.children?.[0]?.text || "No Answer";

        return { question, answer };
      });
    })
    .flat()
    // ✅ optional cleanup: remove completely empty items
    .filter((f) => (f?.question && f.question !== "No Question") || (f?.answer && f.answer !== "No Answer"));

  // ✅ final fallback
  const faqs = faqsFromApi.length ? faqsFromApi : DEFAULT_FAQS;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-ink overflow-x-hidden h-screen overflow-scroll no-scrollbar pt-8 min-h-screen">


      <div className="flex-grow bg-ink text-ivory flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-3xl w-full py-8">
          <p className="eyebrow text-center mb-5">The Atelier</p>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-center mb-12 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
            Frequently Asked Questions
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-ivory/15 rounded-2xl overflow-hidden transition-all duration-300 hover:border-ivory/35"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-6 text-left transition-all duration-300"
                >
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    <span className={`font-display italic text-3xl sm:text-4xl flex-shrink-0 ${openIndex === index ? 'text-champagne' : 'text-ivory/50'}`}>
                      {index + 1}
                    </span>
                    <div className="flex-1 pt-1 sm:pt-2">
                      <h3 className={`font-display text-base sm:text-lg lg:text-xl leading-snug transition-colors duration-300 ${openIndex === index ? 'text-champagne' : 'text-ivory'}`}>
                        {faq.question}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${openIndex === index
                          ? 'max-h-80 opacity-100 mt-3'
                          : 'max-h-0 opacity-0'
                          }`}
                      >
                        <p className="text-taupe font-light text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 pt-1">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'border-champagne' : 'border-ivory/50'}`}>
                      {openIndex === index ? (
                        <Minus strokeWidth={1.5} className="w-4 h-4 sm:w-5 sm:h-5 text-champagne" />
                      ) : (
                        <Plus strokeWidth={1.5} className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ))}

          </div>

        </div>

      </div>

      <FinalSection />
      <Footer />
    </div>
  )
}
