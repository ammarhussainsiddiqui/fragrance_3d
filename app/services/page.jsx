'use client';

import SpiderDetail from "../../components/service/SpiderDetail";
import { ProductDetailSection, ProductDetailSectiontwo } from "../../components/ProductDetailSection";
import WhyProduct from "../../components/service/WhyProduct";
import { ProductsSection } from "../../components/ProductsSection";
import { FinalSection } from "../../components/FinalSection";
import Footer from "../../components/Footer";
import { useGetService } from "../../lib/getService";
import Loader from "../../components/Loader";

export default function ServicePage() {
  const { data: pageData, loading } = useGetService(
    "/pages/10?depth=2&draft=false&locale=undefined&trash=false"
  );

  // ✅ Defaults (using your commented objects)
  const DEFAULTS = {
    sectionOne: {
      title: "Eau de Parfum, Extrait, Discovery",
      description:
        "Maison Sillage is not a fragrance factory. We are a small atelier of perfumers composing with restraint — working the quiet limits of rare naturals to make eaux de parfum that do not shout, but linger. From the first sketch to the numbered flacon, every edition is built by hand.",
      tags: [
        "Eau de Parfum",
        "Extrait de Parfum",
        "Eau de Toilette",
        "Discovery Sets",
        "Bespoke Signature",
        "Private Label",
        "Woody",
        "Floral",
        "Amber",
        "Oud",
        "Citrus",
        "Musk",
        "Chypre",
        "Fougère",
        "Gourmand",
        "Home Fragrance",
        "Candles",
        "and more",
      ],
      statement:
        "The global niche fragrance market is expected to add another $10+ billion in size within the next 5 years.",
    },
    sectionTwo: {
      title: "Bespoke, Private Label, Home Fragrance",
      description:
        "Our edge? An obsession with material. We source rare naturals directly, compose in small batches and finish every flacon by hand. Have an idea for a signature scent, a boutique exclusive or a scented space? The atelier turns it into a stable, compliant, quietly unforgettable composition — top, heart and base notes balanced until the trail is right.",
      tags: [
        "Signature Scents",
        "Boutique Exclusives",
        "Wedding Editions",
        "Hotel & Ambient Scenting",
        "Candles",
        "Room Sprays",
        "Solid Perfume",
        "Hair Mist",
        "Body Oil",
        "Layering Sets",
        "Refills",
        "and more",
      ],
      statement:
        "Why settle for a trend when you can wear a signature? Partner with the atelier for bespoke composition, considered packaging and a fragrance that is yours alone.",
    },
    processSteps: [
      {
        stepNumber: "One",
        stepTitle: "Step One",
        stepDescription: "The brief — we listen for the memory, the place and the mood you want to wear.",
      },
      {
        stepNumber: "Two",
        stepTitle: "Step Two",
        stepDescription: "Materials — we select the rare naturals and accords that will carry the composition.",
      },
      {
        stepNumber: "Three",
        stepTitle: "Step Three",
        stepDescription: "Composition — modifications, rest and refinement until the sillage is exactly right.",
      },
      {
        stepNumber: "Four",
        stepTitle: "Step Four",
        stepDescription: "Maturation — the composition rests for weeks so the materials settle and marry.",
      },
      {
        stepNumber: "Five",
        stepTitle: "Step Five",
        stepDescription: "The flacon — glass, collar and label, considered as carefully as the juice itself.",
      },
      {
        stepNumber: "Six",
        stepTitle: "Step Six",
        stepDescription: "Numbering — each flacon is filled, sealed and numbered by hand in the atelier.",
      },
    ],
  };

  const layoutData = pageData?.layout || [];

  // Function to extract the heading and paragraph content from the layout
  const extractSectionData = (section, fallback) => {
    const richTextData = section?.columns?.[0]?.richText?.root?.children || [];

    const title =
      richTextData?.find((child) => child.tag === "h2")?.children?.[0]?.text ||
      fallback?.title ||
      "";

    const description =
      richTextData?.find((child) => child.type === "paragraph")?.children?.[0]
        ?.text ||
      fallback?.description ||
      "";

    // Extracting tags (assuming they're in paragraphs with format 8)
    const tags =
      richTextData?.flatMap((child) =>
        (child?.children || [])
          .filter((c) => c.format === 8)
          .map((c) => c.text)
      ) || [];

    const finalTags = tags.length ? tags : fallback?.tags || [];

    const statement =
      richTextData?.find(
        (child) => child.type === "paragraph" && child.textFormat === 2
      )?.children?.[0]?.text ||
      fallback?.statement ||
      "";

    return { title, description, tags: finalTags, statement };
  };

  // Extract the data dynamically for section 1 and section 2
  const sectionOneData = layoutData[0] || {};
  const sectionTwoData = layoutData[1] || {};
  const processSection = layoutData[2]?.columns || [];
  const whyChooseUsSection = layoutData[3] || {};

  // Extracted data (✅ fallback to defaults)
  const sectionOne = extractSectionData(sectionOneData, DEFAULTS.sectionOne);
  const sectionTwo = extractSectionData(sectionTwoData, DEFAULTS.sectionTwo);

  const processData = processSection.map((col) => col?.richText?.root?.children || []);

  // Mapping through the process steps
  const processStepsFromApi = processData?.flatMap((children) => {
    const steps = [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tag === "h3") {
        const stepNumber = child.children?.[1]?.text || "";
        const stepTitle = child.children?.[0]?.text || "";
        const stepDescription = children[i + 1]?.children?.[0]?.text || "";

        steps.push({
          stepNumber,
          stepTitle,
          stepDescription,
        });
      }
    }
    return steps;
  });

  const processSteps =
    processStepsFromApi?.length ? processStepsFromApi : DEFAULTS.processSteps;

  // Log data to check structure
  console.log("Section One Data:", whyChooseUsSection);

  if (loading) {
    return <Loader />;
  }

  // ...rest of your component render (use sectionOne, sectionTwo, processSteps)

  return (
    <main className="w-full bg-ink overflow-x-hidden h-screen overflow-scroll no-scrollbar pt-20" style={{ scrollBehavior: "smooth" }}>
      <ProductDetailSection side="right" content={sectionOne} />
      <ProductDetailSectiontwo side="left" content={sectionTwo} />
      <SpiderDetail processSteps={processSteps} />
      <WhyProduct whyChooseUsSection={whyChooseUsSection} />
      <ProductsSection />
      <FinalSection />
      <Footer />
    </main>
  );
}
