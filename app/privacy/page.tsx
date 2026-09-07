import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Leylak Tech | Custom Software & AI Studio",
  description:
    "Learn how Leylak Tech collects, uses, and safeguards your personal information when you visit our website or use our software and consulting services.",
  keywords: [
    "privacy policy",
    "leylak tech privacy",
    "data protection",
    "cookie policy",
    "gdpr compliance",
  ],
  openGraph: {
    title: "Privacy Policy | Leylak Tech",
    description:
      "Learn how Leylak Tech collects, uses, and protects your personal data across our digital solutions and services.",
    type: "website",
    url: "https://leylak.tech/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 7, 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `Leylak Tech ("we", "our", or "us") is dedicated to respecting and protecting the privacy of our website visitors, clients, and partners. This Privacy Policy outlines the types of information we collect, how we process and protect that information, and your individual rights regarding your data when you visit our website (leylak.tech) or engage with our services.`,
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: `We collect information that you voluntarily provide to us as well as data gathered automatically when you interact with our website:`,
      subsections: [
        {
          subtitle: "Information You Provide Voluntarily",
          details: [
            "Contact Form & Inquiries: Name, email address, company name, phone number, and any details or specifications you include in your project messages.",
            "Newsletter Subscription: Email address and optional first name when you subscribe to receive our studio updates and announcements.",
            "Client Engagements: Billing details, contract information, technical project requirements, and communication history necessary to deliver our custom software and development solutions.",
          ],
        },
        {
          subtitle: "Information Collected Automatically",
          details: [
            "Technical & Device Information: IP address, browser type, operating system version, device identifiers, and preferred language.",
            "Usage Data: Pages visited, session duration, referrers, and interaction events to help us improve performance and navigation flow.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Your Information",
      content: `We process your data strictly for legitimate business purposes, including:`,
      bullets: [
        "Responding promptly to your inquiries, consultation requests, and project briefs.",
        "Designing, developing, deploying, and maintaining custom software, web, and mobile applications.",
        "Sending periodic newsletters and project insights (only with your explicit consent, with an unsubscribe option in every email).",
        "Ensuring the operational security, integrity, and performance of our digital infrastructure.",
        "Complying with applicable legal, fiscal, and regulatory obligations.",
      ],
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing & Third-Party Services",
      content: `We do not sell, rent, or trade your personal information to third parties. We may share data only with trusted service providers who adhere to strict data security and confidentiality standards:`,
      bullets: [
        "Email Delivery: We use Resend to deliver transactional notification emails and newsletter communications reliably.",
        "Database & Cloud Infrastructure: We utilize Supabase and cloud hosting providers for secure data storage and encrypted operational backups.",
        "Legal Requirements: We may disclose your information if mandated by law, court order, or governmental regulation to protect our rights and property.",
      ],
    },
    {
      id: "data-security",
      title: "5. Data Security & Storage",
      content: `We take technical and organizational measures to safeguard your information against unauthorized access, alteration, disclosure, or destruction. All web traffic is encrypted using modern TLS/HTTPS protocols, database connections utilize secure SSL, and access to internal databases is restricted to authorized personnel under least-privilege principles. While no transmission method is 100% immune, we regularly review and upgrade our security defenses.`,
    },
    {
      id: "your-rights",
      title: "6. Your Data Protection Rights",
      content: `Depending on your location (including rights recognized under GDPR, the Mauritius Data Protection Act 2017, and international privacy standards), you have the right to:`,
      bullets: [
        "Request access to any personal data we hold about you.",
        "Request correction or rectification of incomplete or inaccurate data.",
        "Request the deletion ('right to be forgotten') of your personal data.",
        "Object to or restrict our processing of your personal information.",
        "Withdraw consent at any time where processing was based on your prior consent.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies & Tracking Technologies",
      content: `Our website may use essential cookies and session tokens to ensure website functionality, retain preferences, and analyze anonymized traffic. You can adjust your browser settings at any time to block or notify you about cookies, although some website features may not operate as intended without essential cookies.`,
    },
    {
      id: "policy-updates",
      title: "8. Changes to This Privacy Policy",
      content: `We may revise this Privacy Policy periodically to reflect changes in our legal obligations, business practices, or service enhancements. The revised date at the top of this page will indicate when changes take effect. We encourage you to review this policy periodically.`,
    },
    {
      id: "contact-us",
      title: "9. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact our team:`,
      bullets: [
        `Email: ${SITE_CONFIG.email}`,
        `Phone / WhatsApp: +230 57904684`,
        `Address: ${SITE_CONFIG.location}`,
      ],
    },
  ];

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 lg:px-12 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6 group"
          >
            <span aria-hidden="true" className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Home</span>
          </Link>

          <div className="inline-block px-4 py-1.5 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Legal & Transparency
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4">
            Privacy <span className="text-red-500">Policy</span>
          </h1>

          <p className="text-white/60 text-sm md:text-base">
            Last Updated: <span className="text-white/90 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12 text-white/80 leading-relaxed">
          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight border-b border-white/10 pb-3">
                {sec.title}
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                {sec.content}
              </p>

              {sec.bullets && (
                <ul className="list-disc list-inside space-y-2.5 text-white/70 pl-2">
                  {sec.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-base leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {sec.subsections && (
                <div className="space-y-6 pt-2">
                  {sec.subsections.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-2.5 pl-2 border-l-2 border-red-500/40">
                      <h3 className="text-base md:text-lg font-semibold text-white pl-2">
                        {sub.subtitle}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/70 pl-4">
                        {sub.details.map((item, dIdx) => (
                          <li key={dIdx} className="text-sm md:text-base leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Contact Box Callout */}
          <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Have questions about your data?</h3>
              <p className="text-sm text-white/60">
                Reach out directly to our Data Protection team at <a href={`mailto:${SITE_CONFIG.email}`} className="text-red-400 hover:underline">{SITE_CONFIG.email}</a>.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all shrink-0"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
