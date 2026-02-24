import { useEffect, useState } from "react";

interface DifferentialItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const differentials: DifferentialItem[] = [
  {
    id: "1",
    title: "Conforto, Natureza e Sofisticação",
    description: "Em harmonia perfeita, cada detalhe foi pensado para proporcionar uma experiência de luxo integrada ao ambiente natural.",
    icon: "🌿",
  },
  {
    id: "2",
    title: "Aqui o Tempo Desacelera",
    description: "E a alma respira. Longe do caos urbano, você encontra paz, tranquilidade e espaço para reconectar com o essencial.",
    icon: "⏰",
  },
  {
    id: "3",
    title: "Cada Pôr do Sol",
    description: "Se transforma em memória. Momentos inesquecíveis à beira das águas da Amazônia, cercado por beleza natural incomparável.",
    icon: "🌅",
  },
];

export default function Differentials() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

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

    const items = document.querySelectorAll("[data-differential-item]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const visibleItemsArray = Array.from(visibleItems);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B4D3E] mb-4">
            Nossos Diferenciais
          </h2>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {differentials.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              data-differential-item
              className={`card-minimal transition-all duration-700 ${
                visibleItemsArray.includes(item.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-serif font-bold text-[#1B4D3E] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
