import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface HeaderProps {
  onReserveClick: () => void;
}

export default function Header({ onReserveClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4 md:py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className={`text-2xl md:text-3xl font-serif font-bold transition-colors duration-600 ${
            isScrolled ? "text-[#1B4D3E]" : "text-white"
          }`}>
            🌿
          </div>
          <div className={`flex flex-col transition-colors duration-600 ${
            isScrolled ? "text-[#1B4D3E]" : "text-white"
          }`}>
            <span className="font-serif font-bold text-sm md:text-base">Amazon VIP</span>
            <span className="font-sans text-xs md:text-sm">Flutuante</span>
          </div>
        </div>

        {/* Reserve Button */}
        <button
          onClick={onReserveClick}
          className={`px-6 md:px-8 py-2 md:py-3 rounded-sm font-sans font-semibold transition-all duration-600 ${
            isScrolled
              ? "bg-[#1B4D3E] text-white hover:bg-[#2D6A54]"
              : "bg-white text-[#1B4D3E] hover:bg-[#E8D5B7]"
          }`}
        >
          Reservar Agora
        </button>
      </div>
    </header>
  );
}
