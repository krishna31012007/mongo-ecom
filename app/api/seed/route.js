import connectDB from "@/lib/db";

import Product from "@/models/Product";

export async function GET(req) {
    await connectDB();
  const products = await Product.find().lean();

    await Product.deleteMany();

    await Product.insertMany([
  {
    title: "blue t-shirt",
    desc: "this is a blue t-shirt",
    price: 20,
    category: "t-shirt",
    image: "https://picsum.photos/300/300?random=1"
  },
  {
    title: "red t-shirt",
    desc: "this is a red t-shirt",
    price: 30,
    category: "t-shirt",
    image: "https://picsum.photos/300/300?random=2"
  },
  {
    title: "black hoodie",
    desc: "this is a black hoodie",
    price: 45,
    category: "hoodie",
    image: "https://picsum.photos/300/300?random=3"
  },
  {
    title: "white sneakers",
    desc: "this is a pair of white sneakers",
    price: 80,
    category: "shoes",
    image: "https://picsum.photos/300/300?random=4"
  },
  {
    title: "running shoes",
    desc: "comfortable running shoes",
    price: 95,
    category: "shoes",
    image: "https://picsum.photos/300/300?random=5"
  },
  {
    title: "blue jeans",
    desc: "stylish blue denim jeans",
    price: 60,
    category: "jeans",
    image: "https://picsum.photos/300/300?random=6"
  },
  {
    title: "black jeans",
    desc: "classic black denim jeans",
    price: 65,
    category: "jeans",
    image: "https://picsum.photos/300/300?random=7"
  },
  {
    title: "sports watch",
    desc: "digital sports watch",
    price: 120,
    category: "accessories",
    image: "https://picsum.photos/300/300?random=8"
  },
  {
    title: "leather wallet",
    desc: "premium leather wallet",
    price: 40,
    category: "accessories",
    image: "https://picsum.photos/300/300?random=9"
  },
  {
    title: "cricket bat",
    desc: "this is a cricket bat",
    price: 50,
    category: "sports",
    image: "https://picsum.photos/300/300?random=10"
  },
  {
    title: "football",
    desc: "official size football",
    price: 35,
    category: "sports",
    image: "https://picsum.photos/300/300?random=11"
  },
  {
    title: "basketball",
    desc: "indoor and outdoor basketball",
    price: 45,
    category: "sports",
    image: "https://picsum.photos/300/300?random=12"
  },
  {
    title: "wireless headphones",
    desc: "bluetooth wireless headphones",
    price: 150,
    category: "electronics",
    image: "https://picsum.photos/300/300?random=13"
  },
  {
    title: "gaming mouse",
    desc: "RGB gaming mouse",
    price: 70,
    category: "electronics",
    image: "https://picsum.photos/300/300?random=14"
  },
  {
    title: "mechanical keyboard",
    desc: "RGB mechanical keyboard",
    price: 110,
    category: "electronics",
    image: "https://picsum.photos/300/300?random=15"
  },
  {
    title: "coffee mug",
    desc: "ceramic coffee mug",
    price: 15,
    category: "home",
    image: "https://picsum.photos/300/300?random=16"
  },
  {
    title: "table lamp",
    desc: "modern LED table lamp",
    price: 55,
    category: "home",
    image: "https://picsum.photos/300/300?random=17"
  },
  {
    title: "backpack",
    desc: "water-resistant travel backpack",
    price: 75,
    category: "bags",
    image: "https://picsum.photos/300/300?random=18"
  },
  {
    title: "travel bag",
    desc: "large capacity travel bag",
    price: 90,
    category: "bags",
    image: "https://picsum.photos/300/300?random=19"
  },
  {
    title: "baseball cap",
    desc: "adjustable cotton cap",
    price: 25,
    category: "accessories",
    image: "https://picsum.photos/300/300?random=20"
  }
]);

    return Response.json({ message: "Seeded successfully" }, { status: 200 });
}