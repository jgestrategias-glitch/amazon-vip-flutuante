import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Gallery from "@/components/Gallery";
import Differentials from "@/components/Differentials";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleReserveClick = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onReserveClick={handleReserveClick} />
      <main className="flex-1">
        <HeroSection onReserveClick={handleReserveClick} />
        <Gallery />
        <Differentials />
        <Testimonials />
      </main>
      <Footer />
      <ReservationModal isOpen={isReservationOpen} onClose={handleCloseReservation} />
    </div>
  );
}
