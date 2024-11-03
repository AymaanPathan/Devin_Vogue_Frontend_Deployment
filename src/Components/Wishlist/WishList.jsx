import { useContext } from "react";
import WishListItems from "./WishlistItems";
import { ModalContext } from "../../Context/Modal";
import Footer from "../Footer/Footer";

export default function WishList() {
  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);
  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };
  return (
    <div onClick={handleClickDropDown} className="main">
      <WishListItems />
      <Footer />
    </div>
  );
}
