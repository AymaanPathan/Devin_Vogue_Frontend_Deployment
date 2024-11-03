/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ModalContext = createContext(null);

const ModalContextProvider = (props) => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleBackgroundClickNav = (e) => {
    if (e.target.classList.contains("main")) {
      setNavOpen(false);
    }
  };

  const handleBackgroundDropDown = (e) => {
    if (e.target.classList.contains("main")) {
      setDropdownOpen(false);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        navOpen,
        toggleNav,
        handleBackgroundClickNav,
        dropdownOpen,
        toggleDropdown,
        handleBackgroundDropDown,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
