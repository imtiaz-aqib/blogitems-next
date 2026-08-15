"use client";

import { useState } from "react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    projectType: "headless-cms",
    budget: "$10k - $25k",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Details & Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
              Get in Touch
            </h2>
            <p className="text-sm md:text-base text-[#333344] leading-relaxed mb-6">
              Whether you&apos;re migrating from traditional WordPress to a decoupled Headless Next.js stack, or scaling an enterprise platform, we&apos;re here to help.
            </p>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            {/* Direct Email Card */}
            <div className="bg-white border border-[#000000] rounded-xl p-5 ui-card-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#756df3] text-white flex items-center justify-center flex-shrink-0 border border-[#232141]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6L12 13L2 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#888899] mb-1">
                  Email Us
                </h3>
                <a href="mailto:hi@blogitems.com" className="text-sm font-bold text-[#232141] hover:text-[#756df3] transition">
                  hi@blogitems.com
                </a>
                <p className="text-xs text-[#888899] mt-0.5">Response within 24 hours</p>
              </div>
            </div>

            {/* Office Location Card */}
            <div className="bg-white border border-[#000000] rounded-xl p-5 ui-card-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#ffcb7d] text-[#232141] flex items-center justify-center flex-shrink-0 border border-[#232141]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#888899] mb-1">
                  HQ &amp; Remote Operations
                </h3>
                <p className="text-sm font-bold text-[#232141]">
                  San Francisco, CA &amp; Distributed Worldwide
                </p>
                <p className="text-xs text-[#888899] mt-0.5">Serving clients globally</p>
              </div>
            </div>

            {/* Consultation Card */}
            <div className="bg-[#e4e3fd] border border-[#232141] rounded-xl p-5 ui-card-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#232141] text-white flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#232141] mb-1">
                  Fast Technical Discovery
                </h3>
                <p className="text-xs text-[#333344] leading-relaxed">
                  Book a 30-minute architectural discovery call with one of our senior Next.js engineers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#000000] rounded-2xl p-6 md:p-10 ui-card-shadow">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#ffcb7d] border-2 border-[#232141] text-[#232141] flex items-center justify-center mb-6 shadow-[4px_5px_#232141]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#000000] mb-3">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-[#333344] max-w-[420px] mb-8 leading-relaxed">
                Thank you for reaching out to BlogItems. Our engineering team has received your message and will respond to <strong>{formData.email || "your email"}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    website: "",
                    projectType: "headless-cms",
                    budget: "$10k - $25k",
                    message: "",
                  });
                }}
                className="ui-btn-primary text-xs font-semibold px-5 py-2.5 rounded-xl"
              >
                Send Another Message &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="border-b border-[#e4e3fd] pb-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#000000] mb-1">
                  Start a Conversation
                </h3>
                <p className="text-xs text-[#888899]">
                  Fill out the details below and we&apos;ll get back to you with a tailored technical proposal.
                </p>
              </div>

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#232141] mb-2">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#232141] text-sm text-[#000000] bg-[#fafafd] focus:outline-none focus:ring-2 focus:ring-[#756df3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#232141] mb-2">
                    Work Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#232141] text-sm text-[#000000] bg-[#fafafd] focus:outline-none focus:ring-2 focus:ring-[#756df3]"
                  />
                </div>
              </div>

              {/* Website / Company */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#232141] mb-2">
                  Company Website / Current Domain
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#232141] text-sm text-[#000000] bg-[#fafafd] focus:outline-none focus:ring-2 focus:ring-[#756df3]"
                />
              </div>

              {/* Project Type & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#232141] mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#232141] text-sm text-[#000000] bg-[#fafafd] focus:outline-none focus:ring-2 focus:ring-[#756df3]"
                  >
                    <option value="headless-cms">Headless WordPress &amp; Next.js</option>
                    <option value="nextjs-engineering">Next.js Web Engineering</option>
                    <option value="performance-audit">Core Web Vitals Audit</option>
                    <option value="custom-solution">Custom Full-Stack Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#232141] mb-2">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#232141] text-sm text-[#000000] bg-[#fafafd] focus:outline-none focus:ring-2 focus:ring-[#756df3]"
                  >
                    <option value="< $10k">&lt; $10,000</option>
                    <option value="$10k - $25k">$10,000 - $25,000</option>
                    <option value="$25k - $50k">$25,000 - $50,000</option>
                    <option value="$50k+">$50,000+</option>
                  </select>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#232141] mb-2">
                  Project Requirements / Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project goals, timelines, and current tech stack..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#232141] text-sm text-[#000000] bg-[#fafafd] focus:outline-none focus:ring-2 focus:ring-[#756df3]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="ui-btn-primary w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2"
              >
                Send Message &amp; Request Proposal &rarr;
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
