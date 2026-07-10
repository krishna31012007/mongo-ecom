"use client";

import {useState , useEffect} from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [query, setquery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const normalizedProducts = Array.isArray(data) ? data : [];
        setProducts(normalizedProducts);
        setAllProducts(normalizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); 
  }, []);

  const handlesubmit = async () => {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
      setIsSearched(true);
  };

  const handleBackToHome = () => {
    setProducts(allProducts);
    setquery("");
    setIsSearched(false);
  };

  const handleAddToCart = (product) => {
    if (typeof window === "undefined") return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyExists = existingCart.some((item) => item._id === product._id);

    if (!alreadyExists) {
      const updatedCart = [...existingCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="mb-6 text-4xl font-bold text-white text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Exclusive Products
            </span>
          </h1>
          
          {/* Search Bar */}
          <div className="flex max-w-md mx-auto items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input onChange={(e)=>setquery(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-purple-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
            <button onClick={handlesubmit}
              type="button"
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
            >
              Search
            </button> 
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isSearched && (
          <div className="flex justify-start mb-6">
            <button
              onClick={handleBackToHome}
              type="button"
              className="px-4 py-2 rounded-lg bg-white/10 border border-purple-400/30 text-white hover:bg-white/20 transition-all duration-300"
            >
              ← Back to Home
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            <p className="text-white mt-4">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg">No products available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-black overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <span>No Image</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-semibold text-xs shadow-lg uppercase">
                    {product.category || "N/A"}
                  </div>
                  
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.desc || "No description available"}
                  </p>

                  <div className="text-lg font-bold text-pink-300 mb-4">
                    ₹{product.price?.toLocaleString() || "N/A"}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/product/${product._id}`}
                      className="flex-1 rounded-lg border border-purple-400/30 bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
