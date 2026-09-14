import React from 'react';
import Logo from './Logo';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { brand } from '../lib/brand';

const Footer = () => {
  return (

    <footer style={{zIndex:'100'}} className="w-full bg-ink text-ivory py-16 relative border-t border-ivory/10">
      {/* Central gradient circle effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent  -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-1/4">
          <Logo className="mb-5" />
          <p className="text-sm text-center md:text-left max-w-md mb-6 font-light text-taupe leading-relaxed">
            {brand.tagline} Numbered eaux de parfum, composed in small editions.
          </p>
          <div className="flex justify-center md:justify-start gap-6">
            <a
              href="https://www.facebook.com/cosmeticchemistlabs"
              target="_blank"
              className="text-ivory/70 hover:text-champagne transition-colors duration-300"
            >
              <FaFacebookF  size={18} />
            </a>
            <a
              href="https://x.com/COSMETICLABSx"
              target="_blank"
              className="text-ivory/70 hover:text-champagne transition-colors duration-300"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/cosmetic-chemist-labs/"
              target="_blank"
              className="text-ivory/70 hover:text-champagne transition-colors duration-300"
            >
              <FaLinkedinIn size={18} />
            </a>
            {/* <a
              href="https://x.com/COSMETICLABSx"
              target="_blank"
              className="text-ivory/70 hover:text-champagne"
            >
              <FaInstagram size={18} />
            </a> */}
          </div>
        </div>

        {/* Middle Section (Quick Links) */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="eyebrow mb-5">Quick Links</h4>
          <ul className="space-y-3 font-light text-sm">
            <li><a href="/" className="text-ivory/80 hover:text-champagne transition-colors duration-300">Home</a></li>
            <li><a href="/about" className="text-ivory/80 hover:text-champagne transition-colors duration-300">About Us</a></li>
            <li><a href="/services" className="text-ivory/80 hover:text-champagne transition-colors duration-300">Services</a></li>
          </ul>
        </div>

        {/* Right Section (Info Links) */}
        <div className="w-full md:w-1/4">
          <h4 className="eyebrow mb-5">Info Links</h4>
          <ul className="space-y-3 font-light text-sm">
            <li><a href="/blog" className="text-ivory/80 hover:text-champagne transition-colors duration-300">Blog</a></li>
            <li><a href="/contact" className="text-ivory/80 hover:text-champagne transition-colors duration-300">Contact</a></li>
            <li><a href="/faq" className="text-ivory/80 hover:text-champagne transition-colors duration-300">FAQ</a></li>
          </ul>
        </div>
{/*  */}
        {/* Contact Section */}
        <div className="w-full md:w-1/4">
          <h4 className="eyebrow mb-5">Contact</h4>
          <p className="mb-3 font-light text-sm">
            <a
              href={`mailto:${brand.email}`}
              className="text-ivory/80 hover:text-champagne transition-colors duration-300 flex items-center gap-3"
            >
              <FaEnvelope size={15} className="text-champagne" /> {brand.email}
            </a>
          </p>
          <p className="mb-3 font-light text-sm">
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`}
              className="text-ivory/80 hover:text-champagne transition-colors duration-300 flex items-center gap-3"
            >
             <FaPhoneAlt size={15} className="text-champagne" /> {brand.phone}
            </a>
          </p>
          <p className="mb-3 font-light text-sm flex items-center gap-3 text-ivory/80">
            <FaMapMarkerAlt size={15} className="text-champagne" /> {brand.address}
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-8 border-t border-ivory/10 text-ivory/40 pt-6 mt-12">
        <p className="text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} {brand.name}. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <a href="/privacy-policy" className="hover:text-champagne transition text-xs font-light tracking-wide">Privacy Policy</a>
          <a href="/term-service" className="hover:text-champagne transition text-xs font-light tracking-wide">Terms of Service</a>
          <a href="/cookie-policy" className="hover:text-champagne transition text-xs font-light tracking-wide">Cookie Policy</a>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
