import { getProducts, Product } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "BlogItems Shop | Headless WooCommerce & ShopLentor Developer Store",
  description:
    "Browse developer tools, Headless WordPress starter kits, Core Web Vitals optimization suites, and React design systems powered by Headless WooCommerce & ShopLentor.",
};

export default async function ShopPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <div>
      {/* Shop Hero Banner */}
      <section className="relative ui-header-pattern pt-[120px] pb-16 text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[640px]">
            <span className="ui-badge-yellow mb-4">HEADLESS ECOMMERCE STORE</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              BlogItems Developer Store
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              High-performance developer kits, Headless WordPress starter templates, and React UI suites powered by WooCommerce &amp; ShopLentor.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-left text-xs text-white/90 max-w-[320px]">
            <div className="flex items-center gap-2 font-bold text-[#ffcb7d] mb-2 text-sm">
              <span>🛍️</span> Powered by Headless WooCommerce
            </div>
            <p className="leading-relaxed text-white/80">
              Integrates WordPress WooCommerce REST API &amp; ShopLentor builder for sub-second checkout performance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Store Products Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#d7d7d7]">
          <div>
            <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold text-[#000000]">
              Featured Products &amp; Kits
            </h2>
            <p className="text-xs md:text-sm text-[#888899] mt-1">
              Showing {products.length} high-speed developer products
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#888899] hidden sm:inline">Engine:</span>
            <span className="text-xs font-bold bg-[#e4e3fd] text-[#232141] px-3 py-1.5 rounded-lg border border-[#232141]">
              ShopLentor + WC API
            </span>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <CtaSection />
    </div>
  );
}
