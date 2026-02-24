import { useEffect, useState } from "react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Área Externa",
    category: "Espaços",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/Cjv82bBpVuEOyvV5DoOvEi/sandbox/ZWEE8t8HpKo5gEZ4ZZzvhW-img-2_1771945946000_na1fn_YXJlYS1leHRlcm5h.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQ2p2ODJiQnBWdUVPeXZWNURvT3ZFaS9zYW5kYm94L1pXRUU4dDhIcEtvNWdFWjRaWnp2aFctaW1nLTJfMTc3MTk0NTk0NjAwMF9uYTFmbl9ZWEpsWVMxbGVIUmxjbTVoLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TyHDAcftcRzcWD2iCNLEW3hhpjvlaY7-eri2CblbQq81gC9~oodI8M3~N-hwaFgYmM0cUsPnFj67oo5LwZBMBBP6GFak0jsN0bUMtWyp1lOm15pvuz2ibEhj2sk0zGnWbN9gtPPz7zMgrUo2PyH~gyTyqRQI9t3KhEIA67Cv24zUbM3NEkIgLiySoI~NFm-VLfYf5q4NX1Cxnei0Nq~14YJ2aOnA4p-P04~g1UFiw2D0eBLCPDGmGzo9ILR5ySygBBOQ9ORmnB4Rd3crZRb0lhsSbIJH37G2-JaWcTcTN8bVB6u5DSzwusLHrnIcvv9i3PatJju3~9E9WcpOCOPjlw__",
    description: "Redes, espreguiçadeiras e bar com vista para a floresta",
  },
  {
    id: "2",
    title: "Área Gourmet",
    category: "Espaços",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/Cjv82bBpVuEOyvV5DoOvEi/sandbox/ZWEE8t8HpKo5gEZ4ZZzvhW-img-3_1771945951000_na1fn_YXJlYS1nb3VybWV0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQ2p2ODJiQnBWdUVPeXZWNURvT3ZFaS9zYW5kYm94L1pXRUU4dDhIcEtvNWdFWjRaWnp2aFctaW1nLTNfMTc3MTk0NTk1MTAwMF9uYTFmbl9ZWEpsWVMxbmIzVnliV1YwLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tGt~gF-0sr7MwsdMPXYNoq2QjOI9uDtUMjSNGcXHVg9XuTGCvqlfjFVcTNR1v~j0v6zhC2YxQLXhrpowJZGnic2MtZi8FHfQ9ENlCbqynomasK6Ig-vNwyDu-27Bzt0tcy4v-nO~dejd1aBPWSIRFIoTL59qiEh1NgLq3B9Q7~mNCXw0JjS9g4iV~e31RWV3fW1Sq2GiaYQSbXr-D95BrVJMRgzm2lCDYL4SYF2uhxBMbFLUHqYkHo~IDkKY9kToyFsa~aoEIqi3qjAD9vKNUxFlTK63qz3A5qNIjUzN-SvD63E~eii-DTnkXcpa8EuXxYLEVeA2PXgWHJ9JgTpP1g__",
    description: "Bar sofisticado com vista panorâmica do rio",
  },
  {
    id: "3",
    title: "Suíte Aconchegante",
    category: "Acomodações",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/Cjv82bBpVuEOyvV5DoOvEi/sandbox/ZWEE8t8HpKo5gEZ4ZZzvhW-img-4_1771945945000_na1fn_c3VpdGUtYWNvbmNoZWdhbnRl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQ2p2ODJiQnBWdUVPeXZWNURvT3ZFaS9zYW5kYm94L1pXRUU4dDhIcEtvNWdFWjRaWnp2aFctaW1nLTRfMTc3MTk0NTk0NTAwMF9uYTFmbl9jM1ZwZEdVdFlXTnZibU5vWldkaGJuUmwucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vOx0Dn6FN28uYtV16VNVZr9wKwr~oigiwPnMMNBWqCxMeWJ2UeqYWNPZ7Px8CqiOfRtBkvkDh8aCU2m4oP7xxtWX2wjB5M7Jq4ozmm1Whijg69Sq0KamUN9U6sdl620sXgXq4Pxq614bVIzgk25I6dHP7U0OqhrxsKUazthLdyd3~5ZlLGzwMvSCeqo8VfRHFAHud4EmW73u-7y13hd74v4mtdLmPync3P4-p~LxFQ81ohDjHxB6DLJrQaN7L-ijnNGZ6nESA4if7Lf71ZTCeHi6Rv4vZudHrGnitq2fc1rHDd46FN8sbCEaGI2WErADIx27ncYMLV3m7-wiEvfPzg__",
    description: "Quarto de luxo com vista para a floresta",
  },
  {
    id: "4",
    title: "Banheiro Moderno",
    category: "Acomodações",
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/Cjv82bBpVuEOyvV5DoOvEi/sandbox/ZWEE8t8HpKo5gEZ4ZZzvhW-img-5_1771945946000_na1fn_YmFuaGVpcm8tbW9kZXJubw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQ2p2ODJiQnBWdUVPeXZWNURvT3ZFaS9zYW5kYm94L1pXRUU4dDhIcEtvNWdFWjRaWnp2aFctaW1nLTVfMTc3MTk0NTk0NjAwMF9uYTFmbl9ZbUZ1YUdWcGNtOHRiVzlrWlhKdWJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=J5A965IuV8rB-XWbRmRy-Hu70Er1DIYd3itxeOD-SMHdbGFW-58GDSStYRgUDmp74BKXz1AJv18JfK7HfjZzA7D64AwSI0918T-McAlY2znf~cCKIgmlnKuCx1dYzmp5-urkF2EtsKugxdoq~uBvtw7FeqZ2ZwHFHtSgA5LZ8yx~FzhCIhw~6zG6n7Xc-~BhcMxhkHBmercC9gfrZCqOQud-iQuCLacofrx8XZATg2hpxQOrFfAG-ZIamcPX7eTYfOMuzv1qwVWhT7tJ80CvfEO9ldbiAB10AKv0lJXq0ZX6WAoUGW0c-Owc-noyX-rhJes5Y1KDl9ACH1naSyDgjw__",
    description: "Banheiro spa com banheira de pedra",
  },
];

export default function Gallery() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set()); const visibleItemsArray = Array.from(visibleItems);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(Array.from(prev).concat(entry.target.id)));
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll("[data-gallery-item]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B4D3E] mb-4">
            Conheça Nossos Espaços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada ambiente foi cuidadosamente projetado para oferecer conforto, sofisticação e uma conexão profunda com a natureza.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              data-gallery-item
              className={`relative overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-all duration-600 h-64 md:h-80 group cursor-pointer ${
                index === 0 || index === 3 ? "lg:col-span-2 lg:row-span-2 h-80 md:h-96" : ""
              } ${
                visibleItemsArray.includes(item.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-white/90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
