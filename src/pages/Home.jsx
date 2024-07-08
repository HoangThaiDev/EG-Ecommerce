// Import Modules
import { APIContext } from "../storeContext/APIContext";
import { useContext } from "react";

// Import Components
import BestSellerProducts from "../components/Home/BestSellerProducts";
import Header from "../components/Home/Header";
import ItemCategories from "../components/Home/ItemCategories";
import RatedProducts from "../components/Home/RatedProducts";
import PromotionalBanners from "../components/Home/PromotionalBanners";
import SpecialNews from "../components/Home/SpecialNews";

const Home = () => {
  // Create + use Hooks
  const { products } = useContext(APIContext);

  return (
    <>
      <Header />
      <ItemCategories />
      <RatedProducts products={products} />
      <PromotionalBanners />
      <BestSellerProducts products={products} />
      <SpecialNews />
    </>
  );
};

export default Home;
