"use client";

import { useState } from "react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1140px] mx-auto px-6 py-6 md:py-10 flex flex-col gap-14">
      {/* 1. Main MetalBear Chat & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: MetalBear Copy & Bullet List */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center">
          {/* Yellow Badge Pill */}
          <span className="inline-block bg-[#ffcb7d] text-[#000000] border-2 border-[#000000] font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full mb-4 shadow-[2px_2px_#000000]">
            CONTACT
          </span>

          {/* Main Headline */}
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-[#000000] tracking-tight mb-4 leading-none">
            Let&apos;s chat!
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[#444455] leading-relaxed mb-6 font-medium">
            Whether you&apos;re evaluating BlogItems for your team, need technical help, or just want to learn more — we&apos;re here for you.
          </p>

          {/* Reach out bullet list */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#000000] mb-3">
              Reach out to us about:
            </h2>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#333344] font-medium">
              <li className="flex items-center gap-2">
                <span className="text-[#756df3] font-bold text-base">&rarr;</span>
                <span>Getting a live demo of BlogItems.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#756df3] font-bold text-base">&rarr;</span>
                <span>Questions about pricing or plans.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#756df3] font-bold text-base">&rarr;</span>
                <span>Technical questions or integration help.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#756df3] font-bold text-base">&rarr;</span>
                <span>Anything else on your mind.</span>
              </li>
            </ul>
          </div>

          {/* Async Note */}
          <p className="text-xs text-[#777788] leading-normal">
            Prefer async? Chat with us on <a href="mailto:hi@blogitems.com" className="text-[#5f58d6] font-semibold hover:underline">Slack</a>, email <a href="mailto:hi@blogitems.com" className="text-[#5f58d6] font-semibold hover:underline">hi@blogitems.com</a>, or open an issue on <a href="https://github.com/imtiaz-aqib/blogitems-next" target="_blank" rel="noopener noreferrer" className="text-[#5f58d6] font-semibold hover:underline">GitHub</a>.
          </p>
        </div>

        {/* Right Column: MetalBear Style Form Card */}
        <div className="lg:col-span-7 bg-white border-2 border-[#000000] rounded-2xl p-6 sm:p-8 shadow-[6px_8px_0px_#232141]">
          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[#ffcb7d] border-2 border-[#000000] text-[#000000] flex items-center justify-center mb-4 shadow-[3px_4px_#000000]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                Message Sent!
              </h3>
              <p className="text-xs sm:text-sm text-[#444455] max-w-[380px] mb-6 leading-relaxed">
                Thank you! Our engineering team has received your inquiry and will reply to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", company: "", role: "", message: "" });
                }}
                className="bg-[#5f58d6] text-white border-2 border-[#000000] font-bold text-xs px-6 py-2.5 rounded-xl shadow-[3px_3px_#000000] hover:bg-[#4a44b8] transition"
              >
                Send Another Message &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-[#000000] mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d1d1dd] text-xs sm:text-sm text-[#000000] bg-[#ffffff] focus:outline-none focus:border-[#5f58d6] focus:ring-1 focus:ring-[#5f58d6]"
                />
              </div>

              {/* Work email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1.5">
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d1d1dd] text-xs sm:text-sm text-[#000000] bg-[#ffffff] focus:outline-none focus:border-[#5f58d6] focus:ring-1 focus:ring-[#5f58d6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#666677] mb-1.5">
                    Phone <span className="font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 555 0100"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d1d1dd] text-xs sm:text-sm text-[#000000] bg-[#ffffff] focus:outline-none focus:border-[#5f58d6] focus:ring-1 focus:ring-[#5f58d6]"
                  />
                </div>
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d1d1dd] text-xs sm:text-sm text-[#000000] bg-[#ffffff] focus:outline-none focus:border-[#5f58d6] focus:ring-1 focus:ring-[#5f58d6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#666677] mb-1.5">
                    Role <span className="font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Platform Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d1d1dd] text-xs sm:text-sm text-[#000000] bg-[#ffffff] focus:outline-none focus:border-[#5f58d6] focus:ring-1 focus:ring-[#5f58d6]"
                  />
                </div>
              </div>

              {/* How can we help? */}
              <div>
                <label className="block text-xs font-bold text-[#000000] mb-1.5">
                  How can we help?
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="I'd like to book a demo, learn about pricing, or.."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d1d1dd] text-xs sm:text-sm text-[#000000] bg-[#ffffff] focus:outline-none focus:border-[#5f58d6] focus:ring-1 focus:ring-[#5f58d6]"
                />
              </div>

              {/* Get in touch Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#5f58d6] text-white border-2 border-[#000000] py-3 rounded-xl font-bold text-xs sm:text-sm shadow-[3px_4px_0px_#000000] hover:bg-[#4a44b8] transition-all mt-1"
              >
                Get in touch
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Info Cards Section: Email Us | Location | Technical Discovery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#e4e4ee]">
        {/* Email Us Card */}
        <div className="bg-white border-2 border-[#000000] rounded-xl p-5 shadow-[4px_4px_0px_#000000] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
          <div className="w-10 h-10 rounded-lg bg-[#756df3] text-white flex items-center justify-center flex-shrink-0 border border-[#000000]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6L12 13L2 6" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#888899] mb-1">
              Email Us
            </h3>
            <a href="mailto:hi@blogitems.com" className="text-sm font-bold text-[#000000] hover:text-[#5f58d6] transition">
              hi@blogitems.com
            </a>
            <p className="text-xs text-[#888899] mt-0.5">Response within 24 hours</p>
          </div>
        </div>

        {/* Office Location Card */}
        <div className="bg-white border-2 border-[#000000] rounded-xl p-5 shadow-[4px_4px_0px_#000000] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
          <div className="w-10 h-10 rounded-lg bg-[#ffcb7d] text-[#000000] flex items-center justify-center flex-shrink-0 border border-[#000000]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#888899] mb-1">
              HQ &amp; Remote Operations
            </h3>
            <p className="text-sm font-bold text-[#000000]">
              San Francisco, CA &amp; Distributed
            </p>
            <p className="text-xs text-[#888899] mt-0.5">Serving clients globally</p>
          </div>
        </div>

        {/* Fast Technical Discovery Card */}
        <div className="bg-[#e4e3fd] border-2 border-[#000000] rounded-xl p-5 shadow-[4px_4px_0px_#000000] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
          <div className="w-10 h-10 rounded-lg bg-[#000000] text-white flex items-center justify-center flex-shrink-0 border border-[#000000]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#000000] mb-1">
              Fast Discovery
            </h3>
            <p className="text-xs text-[#444455] leading-relaxed">
              Book a 30-min architectural discovery call with our senior engineers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
