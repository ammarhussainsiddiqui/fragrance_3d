"use client"
import { useState, useEffect } from "react";
import { FinalSection } from "../../components/FinalSection"
import Footer from "../../components/Footer"
import { useGetService } from "../../lib/getService";
import Loader from "../../components/Loader";
import { brand } from "../../lib/brand";

export default function TermService() {
    const { data: pageData, loading } = useGetService(
        "/pages/15?depth=2&draft=false&locale=undefined&trash=false"
    );

    const layoutData = pageData?.layout || [];

    // Function to extract the heading and paragraph content from the layout
    const extractSectionData = (section, fallback) => {
        const richTextData = section?.columns?.[0]?.richText?.root?.children || [];

        const title =
            richTextData?.find((child) => child.tag === "h2")?.children?.[0]?.text ||
            fallback?.title ||
            "";

        const paragraphs =
            richTextData?.filter((child) => child.type === "paragraph") || [];

        const description =
            paragraphs[0]?.children?.map((c) => c.text).join("") ||
            fallback?.description ||
            "";

        const description2 =
            paragraphs[1]?.children?.map((c) => c.text).join("") || "";

        const description3 =
            paragraphs[2]?.children?.map((c) => c.text).join("") || "";

        const description4 =
            paragraphs[3]?.children?.map((c) => c.text).join("") || "";

        const description5 =
            paragraphs[4]?.children?.map((c) => c.text).join("") || "";

        const description6 =
            paragraphs[5]?.children?.map((c) => c.text).join("") || "";



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

        return { title, description, tags: finalTags, statement, description2, description3, description4, description5, description6 };
    };

    // Extract the data dynamically for section 1 and section 2
    const sectionOneData = layoutData[0] || {};
    const sectionTwoData = layoutData[1] || {};
    const sectionThreeData = layoutData[2] || {};
    const sectionFourData = layoutData[3] || {};
    const sectionFiverData = layoutData[4] || {};
    const sectionSixData = layoutData[5] || {};

    // Extracted data (✅ fallback to defaults)
    const sectionOne = extractSectionData(sectionOneData, {});
    const sectionTwo = extractSectionData(sectionTwoData, {});
    const sectionThree = extractSectionData(sectionThreeData, {});
    const sectionFour = extractSectionData(sectionFourData, {});
    const sectionFive = extractSectionData(sectionFiverData, {});
    const sectionSix = extractSectionData(sectionSixData, {});

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="h-screen bg-ink text-ivory">
            <section className="w-full pt-24 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-4">
                            {sectionOne?.title}
                        </h1>
                        <p className="text-champagne font-sans text-xs uppercase tracking-[0.25em]">{sectionOne?.description}</p>
                    </div>

                    <div className="space-y-8 text-taupe font-light">
                        <div className="bg-ink-soft/60 border border-ivory/10 p-6 sm:p-8 rounded-2xl">
                            <h2 className="font-display text-2xl font-normal mb-4 text-ivory">{sectionTwo?.title}</h2>
                            <p className="mb-2">
                                {sectionTwo?.description}
                            </p>
                        </div>

                        <div className="bg-ink-soft/60 border border-ivory/10 p-6 sm:p-8 rounded-2xl">
                            <h2 className="font-display text-2xl font-normal mb-4 text-ivory">{sectionThree?.title}</h2>
                            <p className="mb-4">{sectionThree?.description}</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>{sectionThree?.description2}</li>
                                <li>{sectionThree?.description3}</li>
                                <li>{sectionThree?.description4}</li>
                                <li>{sectionThree?.description5}</li>
                            </ul>
                        </div>

                        <div className="bg-ink-soft/60 border border-ivory/10 p-6 sm:p-8 rounded-2xl">
                            <h2 className="font-display text-2xl font-normal mb-4 text-ivory">{sectionFour?.title}</h2>
                            <p>
                                {sectionFour?.description}
                            </p>
                        </div>

                        <div className="bg-ink-soft/60 border border-ivory/10 p-6 sm:p-8 rounded-2xl">
                            <h2 className="font-display text-2xl font-normal mb-4 text-ivory">{sectionFive?.title}</h2>
                            <p>
                                {sectionFive?.description}
                            </p>
                        </div>

                        <div className="bg-ink-soft/60 border border-ivory/10 p-6 sm:p-8 rounded-2xl">
                            <h2 className="font-display text-2xl font-normal mb-4 text-ivory">{sectionSix?.title}</h2>
                            <p className="mb-4">{sectionSix?.description}</p>
                            <div className="space-y-2">
                                <p className="flex items-center">
                                    <span className="text-champagne mr-2">Email:</span> {brand.email}
                                </p>
                                <p className="flex items-center">
                                    <span className="text-champagne mr-2">Phone:</span> {brand.phone}
                                </p>
                                <p className="flex items-center">
                                    <span className="text-champagne mr-2">Address:</span> {brand.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <FinalSection />
            <Footer />
        </div>
    )
}