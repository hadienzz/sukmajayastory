import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ContactHero from "@/components/contact/contact-hero";
import ContactContent from "@/components/contact/contact-content";
import ContactFAQ from "@/components/contact/contact-faq";
import ContactMap from "@/components/contact/contact-map";

const ContactPage = () => {
  return (
    <main className="relative">
      <Navbar />
      <ContactHero />
      <ContactContent />
      <ContactFAQ />
      <ContactMap />
      <Footer />
    </main>
  );
};

export default ContactPage;