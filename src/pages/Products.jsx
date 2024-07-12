// Import Components
import Header from "../UI/Header";
import SidebarProduct from "../components/Products/SidebarProduct";

const Products = () => {
  console.log("re-render");
  return (
    <>
      <Header title="Products" linkBack="Home" linkCurrent="Products" />
      <SidebarProduct />
    </>
  );
};

export default Products;
