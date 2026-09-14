'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { FinalSection } from "../../../components/FinalSection";
import Footer from "../../../components/Footer";
import Loader from '../../../components/Loader';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URI || "";

// --- Helper Functions ---
const getLexicalNodeText = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  if (Array.isArray(node.children)) return node.children.map(getLexicalNodeText).join("");
  return "";
};

const extractSectionsFromLexical = (root) => {
  const children = root?.children || [];
  const sections = [];
  let current = null;

  for (const node of children) {
    if (node.type === "heading") {
      if (current) sections.push(current);
      current = {
        tag: node.tag || "h2",
        heading: getLexicalNodeText(node).trim(),
        paragraphs: [],
      };
      continue;
    }
    if (node.type === "paragraph") {
      const text = getLexicalNodeText(node).trim();
      if (!text) continue;
      if (!current) {
        current = { tag: "intro", heading: "", paragraphs: [] };
      }
      current.paragraphs.push(text);
      continue;
    }
  }
  if (current) sections.push(current);
  return sections.filter((s) => s.heading || s.paragraphs.length);
};

const withBase = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
};

const normalizePost = (post) => {
  if (!post) return null;
  const hero = post.heroImage || post.meta?.image;
  const imageUrl =
    hero?.sizes?.xlarge?.url ||
    hero?.sizes?.large?.url ||
    hero?.url;

  return {
    title: post.title,
    imageUrl: imageUrl ? withBase(imageUrl).replace('/api', '') : '/images/bottle-amber-dark.png',
    publishedAt: post.publishedAt || post.createdAt,
    sections: extractSectionsFromLexical(post.content?.root),
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function BlogPostPage() {
  const params = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const slug = params?.slug;

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/posts/${slug}?depth=2`);
        setPageData(res.data);
      } catch (err) {
        console.error("Fetch blog error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const post = useMemo(() => normalizePost(pageData), [pageData]);

  if (loading) {
    return (
      <div className="bg-ink min-h-screen flex items-center justify-center">
        <Loader text={'Loading Story'} />
      </div>
    );
  }

  if (!post) return null;

  const { title, sections, imageUrl, publishedAt } = post;

  return (
    <div className="w-full bg-ink overflow-x-hidden h-screen overflow-scroll no-scrollbar text-ivory font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>

        <div className="relative  container mx-auto px-6 pb-12 md:pb-20 max-w-5xl">
          <div className="flex  items-center space-x-3 mb-5 text-champagne font-sans tracking-[0.25em] uppercase text-[11px]">
            <span>Journal</span>
            <span className="w-1 h-1 bg-taupe rounded-full"></span>
            <span>{formatDate(publishedAt)}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight mb-4">
            {title}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Sidebar: Share (Desktop) */}
          <aside className="hidden lg:block w-16">
            <div className="sticky top-24 flex flex-col space-y-6 items-center border-r border-ivory/10 pr-6">
              <a
                href="https://www.facebook.com/cosmeticchemistlabs"
                target="_blank"
                className="text-ivory hover:text-champagne"
              >
                <button className="text-taupe hover:text-champagne transition-colors"><FaFacebookF size={18} /></button>
              </a>
              <a
                href="https://x.com/COSMETICLABSx"
                target="_blank"
                className="text-ivory hover:text-champagne"
              >
                <button className="text-taupe hover:text-champagne transition-colors"><FaXTwitter size={18} /></button>
              </a>
              <a
                href="https://www.linkedin.com/company/cosmetic-chemist-labs/"
                target="_blank"
                className="text-ivory hover:text-champagne"
              >
                <button className="text-taupe hover:text-champagne transition-colors"><FaLinkedinIn size={18} /></button>
              </a>
              <button className="text-taupe hover:text-champagne transition-colors"><FaRegBookmark size={18} /></button>
            </div>
          </aside>

          {/* Article Body */}
          <article className="flex-1">
            <div className={`relative transition-all duration-700 ease-in-out overflow-hidden ${!isExpanded ? 'max-h-[600px]' : 'max-h-[5000px]'}`}>

              {sections.map((sec, i) => (
                <section key={i} className="mb-10 group">
                  {sec.heading && (
                    <h2 className="font-display text-2xl md:text-3xl font-normal mb-6 text-ivory group-first:mt-0 mt-12">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="text-lg md:text-xl leading-relaxed text-taupe mb-6 font-light">
                      {p}
                    </p>
                  ))}
                </section>
              ))}

              {/* Gradient overlay when collapsed */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
              )}
            </div>

            {/* Read More Toggle */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn-primary active:scale-95"
              >
                <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
                {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
            </div>

            {/* Tags & Mobile Share */}
            <div className="mt-20 pt-10 border-t border-ivory/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {['Fragrance', 'Notes', 'Ritual'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/80 border border-ivory/15 rounded-full hover:border-champagne hover:text-champagne cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-6 lg:hidden border-t border-ivory/10 pt-6 md:border-none md:pt-0">
                  <span className="text-[11px] text-taupe uppercase tracking-[0.25em]">Share</span>
                  <div className="flex space-x-4">
                    <FaFacebookF className="text-taupe hover:text-champagne" />
                    <FaTwitter className="text-taupe hover:text-champagne" />
                    <FaLinkedinIn className="text-taupe hover:text-champagne" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* <div className="mt-20"> */}
        <FinalSection />
        <Footer />
      {/* </div> */}
    </div>
  );
}
