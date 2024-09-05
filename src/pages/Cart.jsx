// Import Component
import DetailCart from "../components/Cart/DetailCart";
import Header from "../UI/Header";

export default function Cart() {
  return (
    <>
      <Header title="Cart" linkBack="Home" linkCurrent="Cart" />
      <DetailCart />
    </>
  );
}
