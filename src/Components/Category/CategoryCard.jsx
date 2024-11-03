/* eslint-disable react/prop-types */
import "./category.css";

export default function CategoryCard({ img, name }) {
  return (
    <div className="category-card relative p-4 w-full cursor-pointer h-full">
      <img className="rounded-md" src={img} alt={name} />
      <p className="font-playfair-display">{name}</p>
    </div>
  );
}
