export default function BlogHeader() {
  return (
    <section className="relative ui-header-pattern pt-[120px] pb-12 text-white">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Copy */}
        <div className="max-w-[640px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            The BlogItems Journal
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed">
            Deep dives, tutorials, and field notes on modern web engineering, Next.js 16, and headless CMS solutions from the BlogItems team.
          </p>
        </div>

        {/* Clean Web Technology Vector Graphic */}
        <div className="w-[180px] md:w-[240px] flex-shrink-0">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
            {/* Outer Container / Screen */}
            <rect x="25" y="30" width="150" height="130" rx="16" fill="#FFFFFF" stroke="#232141" strokeWidth="4" />
            <rect x="25" y="30" width="150" height="28" rx="16" fill="#E4E3FD" stroke="#232141" strokeWidth="4" />
            
            {/* Header Dots */}
            <circle cx="45" cy="44" r="4" fill="#FFCB7D" stroke="#232141" strokeWidth="1.5" />
            <circle cx="60" cy="44" r="4" fill="#756DF3" stroke="#232141" strokeWidth="1.5" />
            <circle cx="75" cy="44" r="4" fill="#5F58D6" stroke="#232141" strokeWidth="1.5" />

            {/* Code & Content Layers */}
            <rect x="40" y="72" width="70" height="10" rx="3" fill="#756DF3" />
            <rect x="40" y="90" width="120" height="6" rx="2" fill="#E4E3FD" />
            <rect x="40" y="102" width="105" height="6" rx="2" fill="#E4E3FD" />
            <rect x="40" y="114" width="85" height="6" rx="2" fill="#E4E3FD" />

            {/* Accent Floating Badge */}
            <rect x="125" y="68" width="35" height="35" rx="8" fill="#FFCB7D" stroke="#232141" strokeWidth="3" />
            <path d="M136 85L141 90L150 81" stroke="#232141" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Base Stand */}
            <path d="M75 160L65 180H135L125 160" fill="#232141" stroke="#232141" strokeWidth="3" />
            <rect x="55" y="180" width="90" height="6" rx="3" fill="#756DF3" stroke="#232141" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
