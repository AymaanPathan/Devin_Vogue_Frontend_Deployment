import BlogCard from "./BlogCard";
import blog1 from "./blog_3.png";
import blog2 from "./blog_2.png";
import blog3 from "./blog_1.png";
import "./blog.css";

export default function Blog() {
  return (
    <div className="mt-24 p-8">
      <div className="grid grid-cols-1 gap-2 lg:mb-6">
        <span className="lg:text-lg text-sm text-start text-[#777C84] font-semibold">
          News & Blog
        </span>
        <span
          className="lg:text-2xl text-md text-start text-[#1B2834] font-light"
          id="OurProducts"
        >
          Our Latest News & Blogs
        </span>
      </div>
      <div className="blog-main grid grid-cols-3 gap-12 items-center mt-4">
        <BlogCard
          img={blog1}
          date="July 23, 2023"
          company="H&M"
          title="Trendy fashion"
          body="Trendy fashion represents the latest, most popular styles and trends, constantly evolving to reflect current tastes and preferences. It captures the spirit of the times."
        />
        <BlogCard
          img={blog2}
          date="July 23, 2023"
          company="H&M"
          title="New trend fo clothing"
          body="Discover the newest fashion sensations with our latest clothing collection, showcasing cutting-edge designs and captivating styles to elevate your wardrobe."
        />
        <BlogCard
          img={blog3}
          date="July 23, 2023"
          company="H&M"
          title="High selling product"
          body="Discover our top-selling product, delivering unmatched quality and style. Renowned for its innovation and durability, it's a must-have for every discerning shopper."
        />
      </div>
    </div>
  );
}
