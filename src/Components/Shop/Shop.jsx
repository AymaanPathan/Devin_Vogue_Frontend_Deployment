import { useContext } from "react";
import Hero from "../Hero/Hero";
import Category from "../Category/Category";
import Offer from "../Offers/Offer";
// import Deal from "../Deal/Deal";
import Blog from "../Blogs/Blog";
import Faq from "../Faq/Faq";
import NewsLetter from "../NewsLetter/NewsLetter";
import Footer from "../Footer/Footer";
import Best from "../Best/Best";
import Deal from "../Deal/Deal";
import { ModalContext } from "../../Context/Modal";

function Shop() {
  const { handleBackgroundClickNav } = useContext(ModalContext);
  return (
    <main className="main" onClick={handleBackgroundClickNav}>
      <div className="overflow-hidden main">
        <Hero />
        <Category />
        <Best />
        <Offer />
        <Deal />
        <Blog />
        <Faq />
        <NewsLetter />
        <Footer />
      </div>
    </main>
  );
}

export default Shop;
