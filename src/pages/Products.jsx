// Import Components
import Header from "../UI/Header";
import SidebarProduct from "../components/Products/SidebarProduct";

const Products = () => {
  return (
    <div className="about-us">
      <Header title="Products" linkBack="Home" linkCurrent="Products" />
      <SidebarProduct />
    </div>
  );
};

export default Products;
