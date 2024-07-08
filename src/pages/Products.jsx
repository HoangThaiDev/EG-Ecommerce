// Import Components
import Header from "../UI/Header";
import SidebarProduct from "../components/Products/SidebarProduct";

const Products = () => {
  return (
    <>
      <Header title="Products" linkBack="Home" linkCurrent="Products" />
      <SidebarProduct />
    </>
  );
};

export default Products;
