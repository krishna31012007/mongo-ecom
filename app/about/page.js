import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-purple-500/30 bg-black/30 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-md">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
          Community Marketplace
        </p>
        <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
          A trusted local marketplace for Mumbai society living
        </h1>
        <p className="mb-8 max-w-3xl text-lg leading-8 text-gray-300">
          Mumbai Society Market helps residents discover everyday essentials, home services, and local products in one convenient place. It brings convenience, trust, and neighborhood support together for every apartment block and housing society.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-purple-500/20 bg-white/10 p-6">
            <h2 className="mb-2 text-xl font-semibold text-white">Fast delivery</h2>
            <p className="text-gray-300">Quick pickup and doorstep delivery within the society for everyday needs.</p>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-white/10 p-6">
            <h2 className="mb-2 text-xl font-semibold text-white">Trusted vendors</h2>
            <p className="text-gray-300">Reliable local sellers and service providers approved by the society community.</p>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-white/10 p-6">
            <h2 className="mb-2 text-xl font-semibold text-white">Easy ordering</h2>
            <p className="text-gray-300">Simple browsing, helpful search, and a smooth checkout experience for residents.</p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-purple-500/30"
          >
            Explore marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
