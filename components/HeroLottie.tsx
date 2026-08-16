"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HeroLottie() {
  return (
    <div className="w-full max-w-[520px] aspect-[946/892] relative flex items-center justify-center">
      <DotLottieReact
        src="https://lottie.host/05634a56-619a-4ed7-8efc-1039b3856ce0/9NCeLk4y9n.lottie"
        loop
        autoplay
        className="w-full h-full object-contain"
      />
    </div>
  );
}
