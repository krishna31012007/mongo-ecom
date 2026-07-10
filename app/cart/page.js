"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    if (typeof window === "undefined") return;
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleRemove = (productId) => {
    if (typeof window === "undefined") return;
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-purple-500/30 bg-black/30 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-md">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
              Your Cart
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Items you added for your society order
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-purple-400/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-purple-500/20 bg-white/10 p-8 text-center text-gray-300">
            <p className="text-xl font-semibold text-white">Your cart is empty</p>
            <p className="mt-2">Add a few products to see them here.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-xl border border-purple-500/20 bg-white/10 p-4 sm:flex-row sm:items-center"
                >
                  <div className="h-24 w-full overflow-hidden rounded-lg bg-slate-950/70 sm:w-24">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    <p className="text-sm text-gray-300">{item.category || "Featured product"}</p>
                    <p className="mt-2 text-pink-300">₹{Number(item.price || 0).toLocaleString()}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="rounded-full border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6">
              <h2 className="mb-4 text-2xl font-semibold text-white">Cart summary</h2>
              <div className="space-y-3 text-gray-200">
                {cartItems.map((item) => (
                  <div key={`${item._id}-summary`} className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <span>₹{Number(item.price || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-xl font-semibold text-white">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-center font-semibold text-white transition hover:shadow-lg hover:shadow-purple-500/30"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
