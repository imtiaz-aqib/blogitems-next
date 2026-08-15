"use client";

import Lottie from "lottie-react";
import heroAnimation from "@/public/hero-lottie.json";

export default function HeroLottie() {
  return (
    <div className="w-full max-w-[500px] aspect-[946/892] relative flex items-center justify-center">
      <Lottie
        animationData={heroAnimation}
        loop={true}
        autoplay={true}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
