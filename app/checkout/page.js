"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not available"));
      return;
    }

    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Unable to load Razorpay"));
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    society: "",
    phone: "",
    address: "",
  });
  const [paymentData, setPaymentData] = useState({
    keyId: "",
    keySecret: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(storedCart);
    }
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.society || !formData.phone || !formData.address) {
      alert("Please fill in all required delivery details.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.name,
          society: formData.society,
          phone: formData.phone,
          address: formData.address,
          items: cartItems.map((item) => ({
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: item.quantity || 1,
          })),
          totalAmount,
          razorpayKeyId: paymentData.keyId,
          razorpayKeySecret: paymentData.keySecret,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.razorpayOrderId) {
        alert("Unable to place order right now.");
        return;
      }

      const keyId = paymentData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "";
      if (!keyId) {
        alert("Please enter a Razorpay key ID or use the default config.");
        return;
      }

      await loadRazorpayScript();

      const options = {
        key: keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Mumbai Society Market",
        description: "Order payment",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          const verifyResponse = await fetch("/api/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
              razorpayKeySecret: paymentData.keySecret,
            }),
          });

          const verifyResult = await verifyResponse.json();
          if (verifyResult.success) {
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Order placed successfully!");
            window.location.href = "/";
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Unable to place order right now.");
    }
  };

  const updateQuantity = (productId, delta) => {
    if (typeof window === "undefined") return;

    const updatedCart = cartItems
      .map((item) => {
        if (item._id !== productId) return item;
        const nextQuantity = (item.quantity || 1) + delta;
        return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
      })
      .filter(Boolean);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-purple-500/30 bg-black/30 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-md">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
            Secure Checkout
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Checkout for your society essentials
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Finish your order quickly and safely for groceries, home items, and neighborhood services.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-xl border border-purple-500/20 bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold text-white">Delivery details</h2>
            <div className="space-y-4">
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-purple-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none"
                placeholder="Full name"
              />
              <input
                name="society"
                required
                value={formData.society}
                onChange={handleChange}
                className="w-full rounded-lg border border-purple-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none"
                placeholder="Flat / Society name"
              />
              <input
                name="phone"
                required
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-purple-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none"
                placeholder="Phone number"
              />
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="min-h-28 w-full rounded-lg border border-purple-500/20 bg-slate-900/70 px-4 py-3 text-white outline-none"
                placeholder="Delivery address"
              />

              <div className="rounded-lg border border-purple-500/20 bg-slate-900/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-purple-200">Razorpay credentials</h3>
                <p className="mb-3 text-sm text-gray-400">Enter your Razorpay key ID and secret here before payment. Leave blank to use the default setup.</p>
                <div className="space-y-3">
                  <input
                    name="keyId"
                    value={paymentData.keyId}
                    onChange={handlePaymentChange}
                    className="w-full rounded-lg border border-purple-500/20 bg-slate-950/70 px-4 py-3 text-white outline-none"
                    placeholder="Razorpay Key ID"
                  />
                  <input
                    name="keySecret"
                    type="password"
                    value={paymentData.keySecret}
                    onChange={handlePaymentChange}
                    className="w-full rounded-lg border border-purple-500/20 bg-slate-950/70 px-4 py-3 text-white outline-none"
                    placeholder="Razorpay Key Secret"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-purple-500/30"
              >
                Place order
              </button>
            </div>
          </form>

          <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Order summary</h2>
              <Link href="/cart" className="text-sm font-semibold text-purple-200 hover:text-white">
                Edit cart
              </Link>
            </div>
            <div className="space-y-3 text-gray-200">
              {cartItems.length === 0 ? (
                <p className="text-gray-300">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-900/30 p-2">
                    <div className="flex items-center gap-2">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-6 w-6 rounded object-cover" />
                      ) : (
                        <div className="h-6 w-6 rounded bg-slate-800" />
                      )}
                      <div>
                        <div className="line-clamp-1 text-sm text-white">{item.title}</div>
                        <div className="text-xs text-gray-300">₹{Number(item.price || 0).toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="h-7 w-7 rounded-full bg-white/10 text-lg text-white transition hover:bg-white/20"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm text-white">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="h-7 w-7 rounded-full bg-white/10 text-lg text-white transition hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-xl font-semibold text-white">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
