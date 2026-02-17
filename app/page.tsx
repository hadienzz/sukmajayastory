import HeroSlider from "@/components/index/hero-section";
import FeaturedStories from "@/components/index/featured-stories";
import CategoriesGrid from "@/components/index/categories-grid";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <HeroSlider />
      <FeaturedStories />
      <CategoriesGrid />
      <Footer />
    </div>
  );
};

export default Home;
