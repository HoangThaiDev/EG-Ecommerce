// Import Modules
import { useSelector } from "react-redux";

// Import Component
import DetailCart from "../components/Cart/DetailCart";
import ModalCart from "../components/Cart/ModalCart";
import Header from "../UI/Header";

export default function Cart() {
  // Create + use Hooks
  const { isShow: isShowModalCart } = useSelector((state) => state.modalCart);

  return (
    <>
      <Header title="Cart" linkBack="Home" linkCurrent="Cart" />
      {isShowModalCart && <ModalCart />}
      <DetailCart />
    </>
  );
}
