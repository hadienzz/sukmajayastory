import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import AboutHero from "@/components/about/about-hero";
import AboutStory from "@/components/about/about-story";
import AboutServices from "@/components/about/about-services";
import AboutStats from "@/components/about/about-stats";
import AboutValues from "@/components/about/about-values";
import AboutProcess from "@/components/about/about-process";
import AboutCTA from "@/components/about/about-cta";

const AboutPage = () => {
  return (
    <main className="relative">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutServices />
      <AboutValues />
      <AboutProcess />
      <AboutCTA />
      <Footer />
    </main>
  );
};

export default AboutPage;
