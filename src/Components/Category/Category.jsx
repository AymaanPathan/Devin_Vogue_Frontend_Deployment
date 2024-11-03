import { useContext } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import "./category.css";
import men from "./men.png";
import women from "./women.png";
import { Productcontext } from "../../Context/Product";

export default function Category() {
  const { handleSmoothScroll } = useContext(Productcontext);
  return (
    <div className="category-grid flex justify-center mt-24">
      <Link onClick={handleSmoothScroll} to={"/shop/women"}>
        <CategoryCard img={women} name="Women" />
      </Link>
      <Link onClick={handleSmoothScroll} to={"/shop/men"}>
        <CategoryCard img={men} name="Men" />
      </Link>
    </div>
  );
}
