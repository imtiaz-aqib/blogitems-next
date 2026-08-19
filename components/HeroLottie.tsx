"use client";

import { useIsClient } from "@/lib/useIsClient";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HeroLottie() {
  const isClient = useIsClient();

  return (
    <div className="w-full max-w-[520px] aspect-[946/892] relative flex items-center justify-center">
      {isClient ? (
        <DotLottieReact
          src="/hero.lottie"
          loop
          autoplay
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin opacity-40" />
        </div>
      )}
    </div>
  );
}
