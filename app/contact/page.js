import Link from "next/link";

const contacts = [
  {
    label: "Email",
    value: "yourname@example.com",
    href: "mailto:yourname@example.com",
  },
  {
    label: "GitHub",
    value: "github.com/yourusername",
    href: "https://github.com/yourusername",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourprofile",
    href: "https://www.linkedin.com/in/yourprofile",
  },
  {
    label: "Instagram",
    value: "@yourhandle",
    href: "https://www.instagram.com/yourhandle",
  },
  {
    label: "Twitter",
    value: "@yourhandle",
    href: "https://twitter.com/yourhandle",
  },
  {
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-purple-500/30 bg-black/30 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-md">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
            Contact me
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Reach out anytime
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Connect through your preferred platform for questions, support, collaborations, or marketplace updates.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-purple-500/20 bg-white/10 p-5 transition hover:border-purple-400/50 hover:bg-white/20"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-medium text-white">{item.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-purple-500/30"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
