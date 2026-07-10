import OpenAI from "openai";
import Link from "next/link";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getProduct(id) {
  await connectDB();
  const product = await Product.findById(id).lean();
  return product;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product is not available right now.",
    };
  }

  return {
    title: product.title,
    description: product.desc || `Discover ${product.title} in Mumbai Society Market.`,
  };
}

async function getAiDescription(product) {
  const text = [product.title, product.desc, product.category]
    .filter(Boolean)
    .join(" ");

  try {
    const aiRes = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Write 4 to 6 short bullet points about this product for a marketplace page. Each bullet should be concise, helpful, and focused on the product's value. Return only the bullet points, one per line, with no intro or extra text.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
    });

    return aiRes.choices?.[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("AI description error:", error);
    return "";
  }
}

async function getRelatedProducts(product) {
  await connectDB();

  const text = [product.title, product.desc, product.category]
    .filter(Boolean)
    .join(" ");

  const aiRes = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "Generate up to 20 short product keywords from the product details. Return them as a comma-separated list only, with no extra text.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0,
  });

  const keywordText = aiRes.choices?.[0]?.message?.content || "";
  const keywords = keywordText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);

  const fallbackKeywords = [product.title, product.category, ...(product.desc?.split(/\s+/) || [])]
    .filter(Boolean)
    .slice(0, 20);

  const finalKeywords = keywords.length > 0 ? keywords : fallbackKeywords;

  const searchConditions = finalKeywords.map((keyword) => ({
    $or: [
      { title: { $regex: escapeRegex(keyword), $options: "i" } },
      { desc: { $regex: escapeRegex(keyword), $options: "i" } },
      { category: { $regex: escapeRegex(keyword), $options: "i" } },
    ],
  }));

  return Product.find({
    _id: { $ne: product._id },
    $or: searchConditions,
  })
    .limit(4)
    .lean();
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  const aiDescription = product ? await getAiDescription(product) : "";
  const relatedProducts = product ? await getRelatedProducts(product) : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-purple-500/30 bg-black/30 p-8 text-center text-white backdrop-blur-md">
          <h1 className="mb-4 text-3xl font-bold">Product not found</h1>
          <p className="mb-6 text-gray-300">The requested item is unavailable right now.</p>
          <Link href="/" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-purple-500/30 bg-black/30 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-md lg:grid-cols-2">
        <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-950/70">
          {product.image ? (
            <img src={product.image} alt={product.title} className="h-64 w-full object-cover sm:h-80" />
          ) : (
            <div className="flex h-64 items-center justify-center text-gray-400 sm:h-80">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
              {product.category || "Featured product"}
            </p>
            <h1 className="mb-4 text-4xl font-bold text-white">{product.title}</h1>
            <p className="mb-6 text-lg leading-8 text-gray-300">{product.desc || "No description available."}</p>
            {aiDescription && (
              <div className="mb-6 rounded-xl border border-purple-500/20 bg-white/10 p-4">
                <h2 className="mb-2 text-lg font-semibold text-white">Why you'll like it</h2>
                <ul className="space-y-2 text-sm leading-6 text-gray-300">
                  {aiDescription
                    .split(/\n+/)
                    .map((point) => point.replace(/^[•\-\d.\s]+/, "").trim())
                    .filter(Boolean)
                    .slice(0, 6)
                    .map((point, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1 text-purple-300">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <div className="mb-6 text-3xl font-bold text-pink-300">₹{product.price?.toLocaleString() || "N/A"}</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/checkout" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-purple-500/30">
              Buy now
            </Link>
            <Link href="/" className="rounded-full border border-purple-400/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Back to home
            </Link>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mx-auto mt-10 max-w-6xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">Related products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                href={`/product/${item._id}`}
                className="group overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 transition hover:border-purple-400/60"
              >
                <div className="relative h-48 bg-slate-950/70">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white line-clamp-2">{item.title}</h3>
                  <p className="mb-3 text-sm text-gray-300 line-clamp-2">{item.desc || "No description available"}</p>
                  <div className="text-pink-300">₹{item.price?.toLocaleString() || "N/A"}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
