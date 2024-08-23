// Import Components
import MainCheckout from "../components/Checkout/MainCheckout";
import Header from "../UI/Header";

export default function Checkout() {
  return (
    <>
      <Header title="Checkout" linkBack="Home" linkCurrent="Checkout" />
      <MainCheckout />
    </>
  );
}
