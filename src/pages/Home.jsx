// Import Components
import Header from "../components/Home/Header";
import ItemCategories from "../components/Home/ItemCategories";
import SpecialProduct from "../components/Home/SpecialProduct";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <ItemCategories />
      <SpecialProduct />
    </div>
  );
};

export default Home;
