import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingFormDialog from "@/components/BookingFormDialog";
import { BookingProvider, useBooking } from "@/contexts/BookingContext";

const IndexContent = () => {
  const { isBookingOpen, setBookingOpen } = useBooking();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Process />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BookingFormDialog open={isBookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

const Index = () => {
  return (
    <BookingProvider>
      <IndexContent />
    </BookingProvider>
  );
};

export default Index;
