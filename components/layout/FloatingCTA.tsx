"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { menuState } from "@/lib/store";

export default function FloatingCTA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(menuState.open);
    const unsub = menuState.subscribe((open) => setMenuOpen(open));
    return () => { unsub(); };
  }, []);

  if (pathname?.startsWith('/mail')) {
    return null;
  }

  const isContactPage = pathname === "/contact";

  return (
    <AnimatePresence>
      {!menuOpen && (
        <motion.div
          key="floating-cta"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {/* WhatsApp Floating Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a
              href="https://wa.me/23057904684"
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative"
              aria-label="Chat on WhatsApp (+230 57904684)"
            >
              {/* Tooltip on hover */}
              <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900/95 text-white text-xs font-medium rounded-lg shadow-xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none backdrop-blur-md">
                Chat on WhatsApp
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-900 rotate-45 border-t border-r border-white/10" />
              </div>

              <motion.div
                className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-green-500/50 flex items-center justify-center transition-all overflow-hidden"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Subtle ping ring animation */}
                <span className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none duration-1000" />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 md:w-7 md:h-7 relative z-10"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.div>
            </a>
          </motion.div>

          {/* Start Your Project Button (hidden on /contact) */}
          {!isContactPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/contact" className="block group">
                <motion.div
                  className="relative bg-red-600 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all overflow-hidden flex items-center h-12 w-12 md:h-14 md:w-14 group-hover:w-44 md:group-hover:w-48"
                  style={{ transitionProperty: "width, box-shadow" }}
                >
                  <div className="absolute left-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0 pointer-events-none">
                    {/* Spark / Idea Icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="absolute left-11 md:left-12 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold pointer-events-none text-xs md:text-sm">
                    Start Project
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
