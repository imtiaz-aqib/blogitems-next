"use client";

import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundLottie() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full max-w-[460px] aspect-square relative flex items-center justify-center">
      {mounted ? (
        <DotLottieReact
          src="https://lottie.host/a3435449-6708-42b7-8e5c-80e45e3cc3b2/Tvbt0mxQK5.lottie"
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
