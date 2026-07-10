import OpenAI from "openai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

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
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

    const maxKeywords = 10000;

    const aiRes = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            `Generate up to ${maxKeywords} short product keywords from the user's search query. Return them as a comma-separated list only, with no extra text.`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0,
    });

    const keywordText = aiRes.choices[0].message.content || "";
    const keywords = keywordText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, maxKeywords);

    const fallbackKeywords = query
      .split(/\s+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, maxKeywords);

    const finalKeywords = keywords.length > 0 ? keywords : fallbackKeywords;

    await connectDB();

    const searchConditions = finalKeywords.map((keyword) => ({
      $or: [
        { title: { $regex: escapeRegex(keyword), $options: "i" } },
        { desc: { $regex: escapeRegex(keyword), $options: "i" } },
        { category: { $regex: escapeRegex(keyword), $options: "i" } },
      ],
    }));

    const products = await Product.find({
      $or: searchConditions,
    }).lean();

    return Response.json(products);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}