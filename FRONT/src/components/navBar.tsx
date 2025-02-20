import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { TaskPage } from "./taskPage";
import logo from "../assets/logo.png";
import { NotificationService } from "../services/notificationService";
import "font-awesome/css/font-awesome.min.css";
import { AuthService } from "../api/authService";

const Navbar = () => {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(sessionStorage.getItem("authToken"));
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = sessionStorage.getItem("authToken");

      if (token) {
        const tokenExpiration = parseInt(sessionStorage.getItem("tokenExpiration") || "0");
        const currentTime = new Date().getTime();

        if (currentTime < tokenExpiration) {
          setIsTokenValid(true);
        } else {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("tokenExpiration");
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    };

    const interval = setInterval(checkTokenValidity, 60000);

    checkTokenValidity();

    return () => clearInterval(interval);
  }, []);

  const updateMenu = () => {
    setBurgerClass(isMenuClicked ? "burger-bar unclicked" : "burger-bar clicked");
    setMenuClass(isMenuClicked ? "menu hidden" : "menu visible");
    setIsMenuClicked(!isMenuClicked);
  };

  const handleGetToken = async () => {
    try {
      const token = await AuthService.getToken();
      sessionStorage.setItem("authToken", token);
      const tokenExpirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;
      sessionStorage.setItem("tokenExpiration", tokenExpirationTime.toString());

      setAuthToken(token);
      setIsTokenValid(true);

      NotificationService.success("Token obtido com sucesso! \n\n" + token);
    } catch (error) {
      NotificationService.error("Erro ao se comunicar com a API");
    }
  };

  const handleTokenClick = () => {
    if (!authToken) {
      NotificationService.warning("Não há um token disponível.");
    } else {
      NotificationService.success(`${authToken}`);
    }
  };

  return (
    <div className="navbar-container">
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px",
        }}
      >
        <div className="burger-menu" onClick={updateMenu} style={{ cursor: "pointer" }}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
        <div className="logo" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <img src={logo} alt="Logo" width="150" />
        </div>
        <div
          className="auth-status"
          style={{ position: "absolute", right: "20px", fontSize: "24px", color: "#fff", cursor: "pointer" }}
          onClick={handleTokenClick}
        >
          {isTokenValid ? (
            <i className="fa fa-unlock" title="Token ativo" style={{ color: 'green' }}></i>
          ) : (
            <i className="fa fa-lock" title="Token expirado ou ausente" style={{ color: 'red' }}></i>
          )}
        </div>
      </nav>

      <div className={menuClass}>
        <button className="btn btn-modern" onClick={handleGetToken}>
          <i className="fa fa-key"></i>
          Obter Token
        </button>

        <button className="btn btn-modern" onClick={() => window.open("http://localhost:3000/api-docs", "_blank")}>
          <i className="fa fa-folder"></i> API Swagger
        </button>
      </div>

      <div className="content">
        <TaskPage isMenuOpen={isMenuClicked} authToken={authToken} />
      </div>
    </div>
  );
};

export default Navbar;
