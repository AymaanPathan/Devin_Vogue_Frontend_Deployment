import FaqCard from "./FaqCard";
import "./Faq.css";

const items = [
  {
    title: "How long does shipping take?",
    content:
      "Our standard shipping typically takes 3-5 business days within the contiguous United States. International shipping times may vary based on the destination country and customs processing times. We also offer expedited shipping options for customers who need their orders to arrive more quickly.",
  },
  {
    title: "Can I return or exchange items?",
    content:
      "Yes, we offer a 30-day return and exchange policy. Items must be returned in their original condition with all tags attached. Please contact our customer service team to initiate a return or exchange. Note that some items, such as final sale items, may not be eligible for returns or exchanges.",
  },
  {
    title: "What sizes do you offer?",
    content:
      "We offer a wide range of sizes to accommodate different body types. Our sizes typically range from XS to XXL for clothing, and we also offer specific measurements for items like shoes and accessories. Please refer to our size guide for detailed measurements and fitting advice.",
  },
  {
    title: "Are your products sustainable?",
    content:
      "Yes, we are committed to sustainability. Our products are made from eco-friendly materials and are produced using environmentally responsible practices. We aim to reduce our carbon footprint and promote sustainable fashion. For more information, please visit our sustainability page.",
  },
];

export default function Faq() {
  return (
    <div className="faq_main mt-24  p-8 bg-[#FFFFFF]">
      <div className="text-center grid gap-3">
        <span className="text-gray-500 font-bold text-lg">FAQ</span>
        <span className="text-2xl font-semibold">Have Queries? Refer Here</span>
      </div>
      <FaqCard items={items} />
    </div>
  );
}
