import React, { useState } from "react";
import "../styles/NavBar.css";
import { TaskPage } from "./taskPage";
import logo from '../assets/logo.png'

const Navbar = () => {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="navbar-container">
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px" }}>
        <div className="burger-menu" onClick={updateMenu} style={{ cursor: "pointer" }}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
        <div className="logo" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <img src={logo} alt="Logo" width="100" />
        </div>
      </nav>
      <div className={menuClass}>
        <h1 style={{ color: "white" }}>Menu Aberto</h1>
      </div>

      <div className="content">
        <TaskPage />
      </div>
    </div>
  );
};

export default Navbar;
