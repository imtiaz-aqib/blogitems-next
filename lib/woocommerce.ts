const API_URL = process.env.WORDPRESS_API_URL || "https://aqib-xyz.stackstaging.com/wp-json/wp/v2";
const WC_STORE_URL = API_URL.replace("/wp/v2", "/wc/store/v1");

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink?: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  on_sale?: boolean;
  short_description?: string;
  description?: string;
  images: { id: number; src: string; alt: string }[];
  categories?: { id: number; name: string; slug: string }[];
  average_rating?: string;
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1001,
    name: "Enterprise Headless WordPress & Next.js Architecture Blueprint",
    slug: "headless-wordpress-blueprint",
    price: "49.00",
    regular_price: "99.00",
    sale_price: "49.00",
    on_sale: true,
    short_description: "Complete technical architectural guide, boilerplate code, and ISR caching pipelines for enterprise web platforms.",
    images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        alt: "Headless Architecture Blueprint",
      },
    ],
    categories: [{ id: 1, name: "Developer Kits", slug: "developer-kits" }],
  },
  {
    id: 1002,
    name: "Core Web Vitals Speed & Performance Optimization Suite",
    slug: "web-vitals-speed-suite",
    price: "79.00",
    regular_price: "79.00",
    on_sale: false,
    short_description: "Automated LCP image optimizer, CLS layout lock scripts, and TBT reduction tools for React & Next.js.",
    images: [
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        alt: "Performance Optimization Suite",
      },
    ],
    categories: [{ id: 2, name: "Performance Tools", slug: "performance-tools" }],
  },
  {
    id: 1003,
    name: "Tailwind CSS v4 & React Design System UI Kit",
    slug: "tailwind-react-design-system",
    price: "39.00",
    regular_price: "59.00",
    sale_price: "39.00",
    on_sale: true,
    short_description: "Over 50+ accessible, fully responsive neo-brutalist React components tuned for sub-second web apps.",
    images: [
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        alt: "Tailwind React UI Kit",
      },
    ],
    categories: [{ id: 3, name: "UI Kits", slug: "ui-kits" }],
  },
  {
    id: 1004,
    name: "ShopLentor & WooCommerce Store Integration Starter",
    slug: "shoplentor-woocommerce-starter",
    price: "69.00",
    regular_price: "69.00",
    on_sale: false,
    short_description: "Turnkey Headless WooCommerce store template powered by Next.js 16 App Router, ShopLentor, and Tailwind v4.",
    images: [
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
        alt: "ShopLentor WooCommerce Starter",
      },
    ],
    categories: [{ id: 4, name: "eCommerce", slug: "ecommerce" }],
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${WC_STORE_URL}/products?per_page=50`, {
      signal: controller.signal,
      next: { revalidate: 60, tags: ["products"] },
      headers: {
        "User-Agent": "BlogItems-NextJS-Client/1.0",
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return FALLBACK_PRODUCTS;
    }

    const products = await res.json();
    return Array.isArray(products) && products.length > 0
      ? products
      : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}
