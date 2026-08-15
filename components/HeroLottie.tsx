"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface HeroLottieProps {
  lottieUrl?: string;
}

export default function HeroLottie({ lottieUrl = "/hero-lottie.json" }: HeroLottieProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch(lottieUrl)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && (data.v || data.layers)) {
          setAnimationData(data);
        }
      })
      .catch((err) => {
        console.error("Lottie loading error:", err);
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [lottieUrl]);

  if (hasError || !animationData) {
    return (
      <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-8 text-center">
        <div className="animate-pulse flex flex-col items-center gap-3 text-white/80">
          <svg className="w-16 h-16 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">Loading High-Speed Animation...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[520px] aspect-square relative flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
