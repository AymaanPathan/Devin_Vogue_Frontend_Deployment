import { useContext } from "react";
import { FilteredItems } from "../../Context/FilteredItems";
import SelectedItem from "../SelectedItems/SelectedItem";
import Footer from "../Footer/Footer";
import { ModalContext } from "../../Context/Modal";

export default function CategoryMain() {
  const { selectedItems } = useContext(FilteredItems);
  const { handleBackgroundDropDown, handleBackgroundClickNav } =
    useContext(ModalContext);

  const handleClickDropDown = (e) => {
    handleBackgroundClickNav(e);
    handleBackgroundDropDown(e);
  };
  return (
    <>
      <div
        onClick={handleClickDropDown}
        className="p-8 flex main flex-col lg:flex-row lg:justify-between main"
      >
        <SelectedItem selectedItems={selectedItems} />
        <div className="flex-1"></div>
      </div>
      <Footer />
    </>
  );
}
