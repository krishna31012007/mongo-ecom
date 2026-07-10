"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window === "undefined") return;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-white">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Mumbai Society Market
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-200">
          <Link href="/" className="transition hover:text-purple-300">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-purple-300">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-purple-300">
            Contact
          </Link>
          <Link href="/checkout" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition hover:shadow-lg hover:shadow-purple-500/30">
            Checkout
          </Link>
          <Link href="/cart" className="rounded-full border border-purple-400/30 bg-white/10 px-4 py-2 text-white transition hover:bg-white/20">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}
