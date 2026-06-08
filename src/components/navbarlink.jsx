import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { FiChevronDown, FiLogOut, FiLogIn } from "react-icons/fi";
import { MdDevices } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { SlArrowRight } from "react-icons/sl";
import { IoStorefrontOutline } from "react-icons/io5";
import "../style/navbarlink.css";

const NAV_LINKS = [
 
  { to: "/video",    label: "Compartidos"    },
  { to: "/modelo",   label: "AI"        },
  { to: "/peliculas", label: "Películas" },
];

const NavbarLink = ({ isOpen, onClose }) => {
  const [isDropdownOpen,  setIsDropdownOpen]  = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData,        setUserData]        = useState({ nombre: "", apellido: "", correo: "" });

  useEffect(() => {
    const user   = localStorage.getItem("user");
    const correo = localStorage.getItem("correo");
    if (user) {
      const parsed = JSON.parse(user);
      setUserData({
        nombre:  parsed.nombre  || "Usuario",
        apellido: parsed.apellido || "",
        correo:  correo || "correo@example.com",
      });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isOpen]);

  /* Cerrar con Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Bloquear scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("correo");
    setIsAuthenticated(false);
    setUserData({ nombre: "", apellido: "", correo: "" });
    onClose();
  };

  const initials = userData.nombre && userData.apellido
    ? `${userData.nombre[0]}${userData.apellido[0]}`.toUpperCase()
    : "U";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur */}
          <motion.div
            className="nl-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel lateral */}
          <motion.aside
            className="nl-panel"
            role="navigation"
            aria-label="Menú móvil"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div className="nl-header">
              <button className="nl-close" onClick={onClose} aria-label="Cerrar menú">
                <SlArrowRight size={18} />
              </button>
            </div>

            {/* Divider */}
            <div className="nl-divider" />

            <div className="nl-body">

              {/* Perfil de usuario */}
              {isAuthenticated && (
                <div className="nl-user-card">
                  <div className="nl-avatar">{initials}</div>
                  <div className="nl-user-info">
                    <p className="nl-user-name">{userData.nombre} {userData.apellido}</p>
                    <p className="nl-user-email">{userData.correo}</p>
                  </div>
                </div>
              )}

              {/* Navegación */}
              <nav className="nl-nav">
                <Link to="/" onClick={onClose} className="nl-link">
                  <span className="nl-link-icon"><CiHome size={18} /></span>
                  Inicio
                </Link>

                {/* Contenido con dropdown */}
                <div className="nl-dropdown-wrap">
                  <button
                    className={`nl-link nl-dropdown-btn ${isDropdownOpen ? "open" : ""}`}
                    onClick={() => setIsDropdownOpen(v => !v)}
                    aria-expanded={isDropdownOpen}
                  >
                    <span className="nl-link-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="2" y="3" width="7" height="7" rx="1"/>
                        <rect x="15" y="3" width="7" height="7" rx="1"/>
                        <rect x="2" y="14" width="7" height="7" rx="1"/>
                        <rect x="15" y="14" width="7" height="7" rx="1"/>
                      </svg>
                    </span>
                    Contenido
                    <FiChevronDown
                      size={15}
                      className={`nl-chevron ${isDropdownOpen ? "open" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="nl-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {NAV_LINKS.map(({ to, label }) => (
                          <Link key={to} to={to} onClick={onClose} className="nl-sublink">
                            <span className="nl-sublink-dot" />
                            {label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/store" onClick={onClose} className="nl-link">
                  <span className="nl-link-icon"><IoStorefrontOutline size={18} /></span>
                  SHAVE Store
                </Link>
                <Link to="/software" onClick={onClose} className="nl-link">
                  <span className="nl-link-icon"><MdDevices size={18} /></span>
                  Sotfware
                </Link>
              </nav>

              {/* Separador antes de acciones */}
              <div className="nl-divider" style={{ margin: "auto 0 0" }} />

              {/* Acciones de sesión */}
              <div className="nl-session">
                {isAuthenticated ? (
                  <>
                    <Link to="/perfil" onClick={onClose} className="nl-link">
                      <span className="nl-link-icon"><FaUser size={15} /></span>
                      Mis datos
                    </Link>
                    <button className="nl-logout-btn" onClick={handleLogout}>
                      <FiLogOut size={16} />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={onClose} className="nl-login-btn">
                    <FiLogIn size={16} />
                    Iniciar sesión
                  </Link>
                )}
              </div>

            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavbarLink;