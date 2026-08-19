"use client";

import { useIsClient } from "@/lib/useIsClient";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundLottie() {
  const isClient = useIsClient();

  return (
    <div className="w-full max-w-[460px] aspect-square relative flex items-center justify-center">
      {isClient ? (
        <DotLottieReact
          src="/not-found.lottie"
          loop
          autoplay
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-32 h-32 rounded-full border-4 border-[#ffcb7d]/40 border-t-[#ffcb7d] animate-pulse" />
      )}
    </div>
  );
}
