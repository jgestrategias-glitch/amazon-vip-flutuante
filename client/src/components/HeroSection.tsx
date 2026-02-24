import { useEffect, useState } from "react";

interface HeroSectionProps {
  onReserveClick: () => void;
}

export default function HeroSection({ onReserveClick }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/Cjv82bBpVuEOyvV5DoOvEi/sandbox/ZWEE8t8HpKo5gEZ4ZZzvhW-img-1_1771945950000_na1fn_aGVyby1mbHV0dWFudGU.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQ2p2ODJiQnBWdUVPeXZWNURvT3ZFaS9zYW5kYm94L1pXRUU4dDhIcEtvNWdFWjRaWnp2aFctaW1nLTFfMTc3MTk0NTk1MDAwMF9uYTFmbl9hR1Z5YnkxbWJIVjBkV0Z1ZEdVLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=u9MhL9edqT-r4Jt38~ZRa-AaHe47QLvAzY3h6WsNqIEPbmA~wyCcHJ9QP~HfFsQUIMgzpD7mWcQZfZO9Q5N3G6Y1UMlNQANz0SDsYlboZFlrFt~tetD7uldYqwd576jbhRHrmBBca0e501nRT741QeLsn9kFLxRkx974j3lPowfjM5CSilJhwTcNmFZHCZMz8e8hTyUP0lmopT6KgaMUVzCBhEiW0dfJuID87~RIdf7gD45X8h78GqrCFmgRKf~DktkdtOWbXEKjn3VMZesA0E12~8qkl7uG8jWb4Kqu2FTS~jx013g1DflcGoYKCy4e-i-fOw888ROFJl7aDw1m9w__')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center justify-center text-center px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Bem-vindo ao seu espaço exclusivo de luxo
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Onde o tempo desacelera e a paisagem assume o protagonismo. Viva uma experiência única no coração da Amazônia.
          </p>

          <button
            onClick={onReserveClick}
            className="inline-block px-10 py-4 bg-white text-[#1B4D3E] font-serif font-bold text-lg rounded-sm hover:bg-[#E8D5B7] transition-all duration-600 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Explorar Agora
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
