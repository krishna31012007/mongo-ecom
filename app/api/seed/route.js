import connectDB from "@/lib/db";

import Product from "@/models/Product";

export async function GET(req) {
    await connectDB();
    const products = await Product.find().lean();

    await Product.deleteMany();

    await Product.insertMany([
  {
    "title": "blue t-shirt",
    "desc": "this is a blue t-shirt",
    "price": 20,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=1"
  },
  {
    "title": "red t-shirt",
    "desc": "this is a red t-shirt",
    "price": 30,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=2"
  },
  {
    "title": "black hoodie",
    "desc": "this is a black hoodie",
    "price": 45,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=3"
  },
  {
    "title": "white sneakers",
    "desc": "this is a pair of white sneakers",
    "price": 80,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=4"
  },
  {
    "title": "running shoes",
    "desc": "comfortable running shoes",
    "price": 95,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=5"
  },
  {
    "title": "blue jeans",
    "desc": "stylish blue denim jeans",
    "price": 60,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=6"
  },
  {
    "title": "black jeans",
    "desc": "classic black denim jeans",
    "price": 65,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=7"
  },
  {
    "title": "sports watch",
    "desc": "digital sports watch",
    "price": 120,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=8"
  },
  {
    "title": "leather wallet",
    "desc": "premium leather wallet",
    "price": 40,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=9"
  },
  {
    "title": "cricket bat",
    "desc": "this is a cricket bat",
    "price": 50,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=10"
  },
  {
    "title": "football",
    "desc": "official size football",
    "price": 35,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=11"
  },
  {
    "title": "basketball",
    "desc": "indoor and outdoor basketball",
    "price": 45,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=12"
  },
  {
    "title": "wireless headphones",
    "desc": "bluetooth wireless headphones",
    "price": 150,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=13"
  },
  {
    "title": "gaming mouse",
    "desc": "RGB gaming mouse",
    "price": 70,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=14"
  },
  {
    "title": "mechanical keyboard",
    "desc": "RGB mechanical keyboard",
    "price": 110,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=15"
  },
  {
    "title": "coffee mug",
    "desc": "ceramic coffee mug",
    "price": 15,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=16"
  },
  {
    "title": "table lamp",
    "desc": "modern LED table lamp",
    "price": 55,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=17"
  },
  {
    "title": "backpack",
    "desc": "water-resistant travel backpack",
    "price": 75,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=18"
  },
  {
    "title": "travel bag",
    "desc": "large capacity travel bag",
    "price": 90,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=19"
  },
  {
    "title": "baseball cap",
    "desc": "adjustable cotton cap",
    "price": 25,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=20"
  },
  {
    "title": "green t-shirt",
    "desc": "eco-friendly organic green t-shirt",
    "price": 22,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=21"
  },
  {
    "title": "grey hoodie",
    "desc": "comfortable oversized grey hoodie",
    "price": 48,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=22"
  },
  {
    "title": "slim fit chinos",
    "desc": "casual slim fit casual pants",
    "price": 55,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=23"
  },
  {
    "title": "leather boots",
    "desc": "waterproof classic leather boots",
    "price": 130,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=24"
  },
  {
    "title": "smartwatch Pro",
    "desc": "advanced health and fitness tracking smartwatch",
    "price": 249,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=25"
  },
  {
    "title": "scented candle",
    "desc": "lavender soy wax scented candle",
    "price": 18,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=26"
  },
  {
    "title": "duffel bag",
    "desc": "heavy duty gym duffel bag",
    "price": 45,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=27"
  },
  {
    "title": "tennis racket",
    "desc": "lightweight carbon fiber tennis racket",
    "price": 115,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=28"
  },
  {
    "title": "aviator sunglasses",
    "desc": "polarized classic aviator sunglasses",
    "price": 35,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=29"
  },
  {
    "title": "graphic t-shirt",
    "desc": "vintage style printed graphic t-shirt",
    "price": 28,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=30"
  },
  {
    "title": "zip-up hoodie",
    "desc": "fleece lined classic zip-up hoodie",
    "price": 50,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=31"
  },
  {
    "title": "ripped jeans",
    "desc": "distressed blue denim ripped jeans",
    "price": 70,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=32"
  },
  {
    "title": "slip-on shoes",
    "desc": "canvas casual slip-on shoes",
    "price": 40,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=33"
  },
  {
    "title": "power bank 10k",
    "desc": "fast charging 10000mAh power bank",
    "price": 29,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=34"
  },
  {
    "title": "throw pillow",
    "desc": "soft decorative velvet throw pillow",
    "price": 22,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=35"
  },
  {
    "title": "tote bag",
    "desc": "minimalist canvas everyday tote bag",
    "price": 20,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=36"
  },
  {
    "title": "yoga mat",
    "desc": "non-slip eco-friendly yoga mat",
    "price": 30,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=37"
  },
  {
    "title": "leather belt",
    "desc": "genuine full-grain leather belt",
    "price": 32,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=38"
  },
  {
    "title": "white t-shirt",
    "desc": "classic fit plain white t-shirt",
    "price": 18,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=39"
  },
  {
    "title": "oversized hoodie",
    "desc": "streetwear cozy oversized hoodie",
    "price": 55,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=40"
  },
  {
    "title": "high-waisted jeans",
    "desc": "stretch fit high-waisted jeans",
    "price": 68,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=41"
  },
  {
    "title": "skate shoes",
    "desc": "durable flat sole skate shoes",
    "price": 75,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=42"
  },
  {
    "title": "wireless mouse",
    "desc": "ergonomic silent wireless mouse",
    "price": 25,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=43"
  },
  {
    "title": "wall clock",
    "desc": "minimalist modern wooden wall clock",
    "price": 40,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=44"
  },
  {
    "title": "messenger bag",
    "desc": "waterproof canvas laptop messenger bag",
    "price": 65,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=45"
  },
  {
    "title": "dumbbells set",
    "desc": "adjustable rubber coated dumbbells set",
    "price": 85,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=46"
  },
  {
    "title": "beanie hat",
    "desc": "warm knit winter beanie hat",
    "price": 15,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=47"
  },
  {
    "title": "yellow t-shirt",
    "desc": "bright mustard yellow cotton t-shirt",
    "price": 20,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=48"
  },
  {
    "title": "cropped hoodie",
    "desc": "fleece interior casual cropped hoodie",
    "price": 42,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=49"
  },
  {
    "title": "straight leg jeans",
    "desc": "vintage wash straight leg jeans",
    "price": 62,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=50"
  },
  {
    "title": "leather loafers",
    "desc": "formal slip-on leather loafers",
    "price": 110,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=51"
  },
  {
    "title": "bluetooth speaker",
    "desc": "waterproof portable bluetooth speaker",
    "price": 59,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=52"
  },
  {
    "title": "desk organizer",
    "desc": "multi-slot mesh metal desk organizer",
    "price": 19,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=53"
  },
  {
    "title": "waist bag",
    "desc": "compact outdoor travel waist bag",
    "price": 24,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=54"
  },
  {
    "title": "swimming goggles",
    "desc": "anti-fog UV protection swimming goggles",
    "price": 18,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=55"
  },
  {
    "title": "silver ring",
    "desc": "925 sterling silver minimalist ring",
    "price": 45,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=56"
  },
  {
    "title": "striped t-shirt",
    "desc": "nautical blue and white striped t-shirt",
    "price": 24,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=57"
  },
  {
    "title": "sherpa hoodie",
    "desc": "ultra soft warm sherpa hoodie",
    "price": 65,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=58"
  },
  {
    "title": "cargo pants",
    "desc": "multi-pocket military style cargo pants",
    "price": 58,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=59"
  },
  {
    "title": "sandals",
    "desc": "comfortable leather strap summer sandals",
    "price": 48,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=60"
  },
  {
    "title": "USB-C hub",
    "desc": "6-in-1 multi-port aluminum USB-C hub",
    "price": 39,
    "category": "electronics",
    "image": "https://picsum.photos/300/300?random=61"
  },
  {
    "title": "picture frame",
    "desc": "classic matte black collage picture frame",
    "price": 25,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=62"
  },
  {
    "title": "suitcase",
    "desc": "hardshell expandable spinner suitcase",
    "price": 140,
    "category": "bags",
    "image": "https://picsum.photos/300/300?random=63"
  },
  {
    "title": "resistance bands",
    "desc": "set of 5 fitness resistance bands",
    "price": 15,
    "category": "sports",
    "image": "https://picsum.photos/300/300?random=64"
  },
  {
    "title": "silk scarf",
    "desc": "luxury floral print silk scarf",
    "price": 50,
    "category": "accessories",
    "image": "https://picsum.photos/300/300?random=65"
  },
  {
    "title": "v-neck t-shirt",
    "desc": "slim fit heather grey v-neck t-shirt",
    "price": 19,
    "category": "t-shirt",
    "image": "https://picsum.photos/300/300?random=66"
  },
  {
    "title": "sports hoodie",
    "desc": "moisture-wicking athletic sports hoodie",
    "price": 52,
    "category": "hoodie",
    "image": "https://picsum.photos/300/300?random=67"
  },
  {
    "title": "skinny jeans",
    "desc": "super stretch classic black skinny jeans",
    "price": 64,
    "category": "jeans",
    "image": "https://picsum.photos/300/300?random=68"
  },
  {
    "title": "canvas sneakers",
    "desc": "low-top vintage canvas sneakers",
    "price": 45,
    "category": "shoes",
    "image": "https://picsum.photos/300/300?random=69"
  },
  {
    "title": "desk lamp",
    "desc": "architect swing arm adjustable desk lamp",
    "price": 34,
    "category": "home",
    "image": "https://picsum.photos/300/300?random=70"
  }
]);

    return Response.json({ message: "Seeded successfully" }, { status: 200 });
}