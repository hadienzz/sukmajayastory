import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ServicesHero from "@/components/services/services-hero";
import ServicesOverview from "@/components/services/services-overview";
import ServicesPackages from "@/components/services/services-packages";
import ServicesProcess from "@/components/services/services-process";
import ServicesFaq from "@/components/services/services-faq";
import ServicesCta from "@/components/services/services-cta";

const ServicesPage = () => {
  return (
    <main className="relative">
      <Navbar />
      <ServicesHero />
      <ServicesOverview />
      <ServicesPackages />
      <ServicesProcess />
      <ServicesFaq />
      <ServicesCta />
      <Footer />
    </main>
  );
};

export default ServicesPage;
