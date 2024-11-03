import { useContext } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import "./category.css";

import { Productcontext } from "../../Context/Product";

export default function Category() {
  const { handleSmoothScroll } = useContext(Productcontext);
  return (
    <div className="category-grid flex justify-center mt-24">
      <Link onClick={handleSmoothScroll} to={"/shop/women"}>
        <CategoryCard
          img={
            "https://res.cloudinary.com/daynk9uzn/image/upload/v1730624070/mahgu55sdiyfnmatbqq3.png"
          }
          name="Women"
        />
      </Link>
      <Link onClick={handleSmoothScroll} to={"/shop/men"}>
        <CategoryCard
          img={
            "https://res.cloudinary.com/daynk9uzn/image/upload/v1730623803/kxgcndfwwfklbjlnu3zz.png"
          }
          name="Men"
        />
      </Link>
    </div>
  );
}
