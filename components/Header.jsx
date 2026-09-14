"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import BlogSearchPopup from './BlogSearchPopup';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGetService } from '../lib/getService';

const Header = () => {
  // ✅ Default nav items (same as your commented object)
  const DEFAULT_NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ's" },
    // { href: "/contact", label: "Contact" }
  ];

  // ✅ Default CTA (since your API expects last navItem as CTA)
  const DEFAULT_CTA = { href: "/faq", label: "FAQ's", newTab: false };

  const router = useRouter();

  const { data, loading } = useGetService(
    "/globals/header?depth=2&draft=false&locale=undefined&trash=false"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const handleNavigation = (href) => {
    if (href == "/") {
      if (typeof window !== 'undefined' && window.location.pathname === "/") {
        window.location.reload();
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  // ✅ keep your logic, just add fallback to defaults if missing/empty
  const apiNavLinks = (data?.navItems ?? [])
    .slice(0, -1)
    .map((item) => ({
      id: item?.id,
      href: item?.link?.url ?? "#",
      label: item?.link?.label ?? "",
      newTab: item?.link?.newTab ?? false,
    }))
    .filter((l) => l?.label); // optional safety (avoid empty labels)

  const navLinks = apiNavLinks.length
    ? apiNavLinks
    : DEFAULT_NAV_LINKS.map((l, idx) => ({ id: `default-${idx + 1}`, ...l, newTab: false }));

  // ✅ CTA link: from API last item, else from defaults (same behavior)
  const ctaLink = data?.navItems?.length
    ? {
      href: data?.navItems.at(-1)?.link?.url ?? DEFAULT_CTA.href,
      label: data?.navItems.at(-1)?.link?.label ?? DEFAULT_CTA.label,
      newTab: data?.navItems.at(-1)?.link?.newTab ?? DEFAULT_CTA.newTab,
    }
    : DEFAULT_CTA;

  if (loading) return null; // ya skeleton

  // ...rest of your component render

  return (
    <header
     style={{zIndex:'1000'}}
     className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? 'bg-ink/85 border-b border-ivory/10 py-3' : 'bg-ink/40 py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition z-50"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/");
          }}
        >
          <Logo className={`transition-transform duration-300 origin-left ${isScrolled ? 'scale-90' : 'scale-100'}`} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-9 text-ivory/70 font-sans text-[12px] uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-champagne transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.href);
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ">
          < div className="hidden md:flex">
            {ctaLink &&
              <button
                onClick={() => {
                  router.push(ctaLink?.href);
                }}
                className="btn-primary group px-6 py-3"
              >
                <span>{ctaLink?.label}</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </button>}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden text-ivory/80 hover:text-ivory focus:outline-none ${isMenuOpen ? 'z-50' : ''}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-ink/90 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden pt-24`}
      >
        <nav className="flex flex-col space-y-6 text-center mt-16 font-display text-3xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ivory/80 hover:text-champagne transition-colors duration-300"
              onClick={() => {
                handleNavigation(link.href);
                setIsMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              {link.label}
            </Link>
          ))}
          {/* <div className="pt-4">
            <BlogSearchPopup />
          </div> */}
          <div className="mx-8 pt-6">
            <button
              onClick={() => {
                router.push('/contact');
              }}
              className="btn-primary w-full"
            >
              <span>Contact</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </button>
          </div>
        </nav>
      </div>
    </header >
  );
};

export default Header;
