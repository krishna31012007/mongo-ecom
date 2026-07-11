import OpenAI from "openai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { GoogleGenAI } from "@google/genai";



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings[0].values;
}

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query?.trim()) {
      return Response.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

     const maxKeywords = 10000;
    // using groq api to generate keywords from the query
    // const aiRes = await groq.chat.completions.create({
    //   model: "llama-3.1-8b-instant",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         `Generate up to ${maxKeywords} short product keywords from the user's search query. Return them as a comma-separated list only, with no extra text.`,
    //     },
    //     {
    //       role: "user",
    //       content: query,
    //     },
    //   ],
    //   temperature: 0,
    // });

    // const keywordText = aiRes.choices[0].message.content || "";
    // const keywords = keywordText
    //   .split(",")
    //   .map((item) => item.trim())
    //   .filter(Boolean)
    //   .slice(0, maxKeywords);

    // const fallbackKeywords = query
    //   .split(/\s+/)
    //   .map((item) => item.trim())
    //   .filter(Boolean)
    //   .slice(0, maxKeywords);

    // const finalKeywords = keywords.length > 0 ? keywords : fallbackKeywords;


    const queryEmbedding = await generateEmbedding(query);

    await connectDB();

    // apporach 1 using embedding similarity
    const allProducts = await Product.find({}).lean();

    // Calculate once
    const queryMagnitude = Math.sqrt(
      queryEmbedding.reduce(
        (sum, value) => sum + value * value,
        0
      )
    );

    const productsWithSimilarity = allProducts.map((product) => {
      const dotProduct = product.embedding.reduce(
        (sum, value, index) =>
          sum + value * queryEmbedding[index],
        0
      );

      const productMagnitude = Math.sqrt(
        product.embedding.reduce(
          (sum, value) => sum + value * value,
          0
        )
      );

      const similarity =
        dotProduct / (productMagnitude * queryMagnitude);

      return {
        ...product,
        similarity,
      };
    });

    const topProducts = productsWithSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    // Appoarch 2 using mongoose vector search
//     const result = await Product.aggregate([
//   {
//     $vectorSearch: {
//       index: "autoembed_index",
//       path: "embedding",
//       queryVector: queryEmbedding,
//       numCandidates: 100,
//       limit: 10,
//     },
//   },
//   {
//     $project: {
//       title: 1,
//       desc: 1,
//       price: 1,
//       category: 1,
//       image: 1,
//       score: { $meta: "vectorSearchScore" },
//     },
//   },
// ]);

return Response.json(topProducts, { status: 200 });
  } catch (error) {
    console.error("Error in AI search:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

