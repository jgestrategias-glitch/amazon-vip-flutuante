export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B4D3E] text-white py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌿</span>
              <div>
                <h3 className="font-serif font-bold text-lg">Amazon VIP</h3>
                <p className="text-sm text-white/80">Flutuante</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Luxo sofisticado integrado à natureza da Amazônia. Uma experiência única onde o tempo desacelera.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/5592984535475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2"
                >
                  <span>📱</span>
                  <span>+55 (92) 98453-5475</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/amazonvipflutuante"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2"
                >
                  <span>📸</span>
                  <span>@amazonvipflutuante</span>
                </a>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span>📍</span>
                <span>Tarumã Açu, Manaus - AM, 69022-385</span>
              </li>
            </ul>
          </div>

          {/* Assistant */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Assistência</h4>
            <div className="bg-white/10 rounded-sm p-4">
              <p className="text-sm text-white/90 mb-2">
                Converse com nossa assistente virtual
              </p>
              <p className="font-serif font-bold text-[#D4AF37]">Amanda</p>
              <p className="text-xs text-white/70 mt-2">
                Disponível 24/7 para responder suas dúvidas e ajudar com sua reserva.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>
              &copy; {currentYear} Amazon VIP Flutuante. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
