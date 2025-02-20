import React, { useState } from "react";
import "../styles/NavBar.css";
import { TaskPage } from "./taskPage";
import logo from '../assets/logo.png';
import { NotificationService } from "../services/notificationService";
import 'font-awesome/css/font-awesome.min.css';


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

  const handleGetToken = () => {
    NotificationService.success('Tarefa criada com sucesso!');
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
          <img src={logo} alt="Logo" width="150" />
        </div>
      </nav>
      <div className={menuClass}>
        <button className="btn btn-modern" onClick={handleGetToken}>
          <i className="fa fa-key"></i>
          Obter Token
        </button>

        <button
          className="btn btn-modern"
          onClick={() => window.open('http://localhost:3000/api-docs', '_blank')}
        >
          <i className="fa fa-folder"></i> {/* Ícone de pasta */}
          API Swagger
        </button>
      </div>

      <div className="content">
        <TaskPage isMenuOpen={isMenuClicked} />
      </div>
    </div>
  );
};

export default Navbar;
