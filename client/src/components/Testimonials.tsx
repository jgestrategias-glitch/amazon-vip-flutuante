import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    text: "Experiência surreal! Todos deveriam passar alguns dias no flutuante. A natureza, o conforto e a sofisticação em perfeita harmonia.",
    author: "Giovanni Requena",
    rating: 5,
  },
  {
    id: "2",
    text: "Voltei para casa com a alma renovada. O Amazon VIP Flutuante é mais que um lugar, é uma transformação pessoal.",
    author: "Marina Silva",
    rating: 5,
  },
  {
    id: "3",
    text: "Cada detalhe foi pensado com cuidado. Desde o amanhecer até o pôr do sol, tudo é perfeito e memorável.",
    author: "Carlos Mendes",
    rating: 5,
  },
  {
    id: "4",
    text: "Impossível descrever em palavras. Você precisa viver essa experiência para entender o verdadeiro significado de luxo integrado à natureza.",
    author: "Ana Costa",
    rating: 5,
  },
];

export default function Testimonials() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(Array.from(prev).concat(entry.target.id)));
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll("[data-testimonial-item]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const visibleItemsArray = Array.from(visibleItems);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("testimonials-container");
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B4D3E] mb-4">
            Vozes que Viveram a Experiência
          </h2>
          <p className="text-lg text-gray-600">
            Depoimentos de quem já descobriu o verdadeiro significado de luxo na Amazônia.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div
            id="testimonials-container"
            className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-4 md:pb-6"
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                id={testimonial.id}
                data-testimonial-item
                className={`flex-shrink-0 w-full md:w-96 bg-white rounded-sm shadow-sm p-8 transition-all duration-700 ${
                  visibleItemsArray.includes(testimonial.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Quote Icon */}
                <div className="text-5xl text-[#D4AF37] mb-4">
                  "
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  {testimonial.text}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Author */}
                <p className="font-serif font-bold text-[#1B4D3E]">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-[#1B4D3E] text-white rounded-full p-2 md:p-3 hover:bg-[#2D6A54] transition-colors duration-300 z-10 hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-[#1B4D3E] text-white rounded-full p-2 md:p-3 hover:bg-[#2D6A54] transition-colors duration-300 z-10 hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
