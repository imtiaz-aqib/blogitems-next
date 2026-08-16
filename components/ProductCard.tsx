import Image from "next/image";
import { Product } from "@/lib/woocommerce";

export default function ProductCard({ product }: { product: Product }) {
  const imageSrc =
    product.images?.[0]?.src ||
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80";
  const imageAlt = product.images?.[0]?.alt || product.name;
  const categoryName = product.categories?.[0]?.name || "Products";

  return (
    <div className="bg-white border-2 border-[#000000] rounded-2xl overflow-hidden ui-card-shadow flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200">
      {/* Product Image Container */}
      <div className="relative w-full aspect-video bg-[#e4e3fd] border-b-2 border-[#000000] overflow-hidden">
        {product.on_sale && (
          <span className="absolute top-3 left-3 z-10 bg-[#ffcb7d] text-[#232141] font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#000000] shadow-[2px_2px_#000]">
            Sale!
          </span>
        )}

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#756df3] bg-[#e4e3fd] px-2.5 py-1 rounded-md inline-block mb-3 border border-[#756df3]/30">
            {categoryName}
          </span>

          <h3 className="font-[var(--font-display)] text-lg font-bold text-[#000000] group-hover:text-[#756df3] transition-colors leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>

          {product.short_description && (
            <p className="text-xs text-[#333344] line-clamp-2 mb-4 leading-relaxed">
              {product.short_description.replace(/<[^>]+>/g, "")}
            </p>
          )}
        </div>

        {/* Price & Buy Button Row */}
        <div className="pt-4 border-t border-[#e4e3fd] flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[#000000]">${product.price}</span>
            {product.regular_price && product.regular_price !== product.price && (
              <span className="text-xs text-[#888899] line-through">${product.regular_price}</span>
            )}
          </div>

          <button className="bg-[#756df3] text-white border border-[#232141] font-bold text-xs px-4 py-2 rounded-xl shadow-[2px_2px_#000] hover:bg-[#ffcb7d] hover:text-[#232141] transition-all flex items-center gap-1.5 cursor-pointer">
            <span>🛒</span> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
