"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function ProductModal({ isOpen, onClose, product }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 z-[2000]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-ink-soft border border-ivory/10 rounded-2xl shadow-2xl z-10 text-ivory"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-ivory/10 transition-colors text-ivory/70 hover:text-ivory z-20"
              aria-label="Close"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-ivory">
                  <img
                    src={product.imagePath}
                    alt={product.name}
                    className="w-full h-full object-contain p-6"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow mb-3">Eau de Parfum</p>
                    <h2 className="font-display text-2xl md:text-3xl font-normal mb-2">{product.name}</h2>
                    <div className="h-px w-16 bg-champagne/60 my-4" />
                  </div>

                  <div className="text-taupe font-light leading-relaxed">
                    {product.longDescription || product.description}
                  </div>

                  <div className="pt-4 border-t border-ivory/10">

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
