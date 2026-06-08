import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { CiHome } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import Navbarlink from "./navbarlink";
import "../style/logo.css";

const Navbar = () => {
  const [isNavbarlinkOpen, setIsNavbarlink] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ nombre: "", apellido: "" });

  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsSearchDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    // const correo = localStorage.getItem("correo");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData({
        nombre: parsedUser.nombre || "Usuario",
        apellido: parsedUser.apellido || "Apellido",
        // correo: correo || "correo@example.com",
      });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/busqueda?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setIsSearchDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("correo");
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav className={`navbar fixed top-0 left-0 right-0 z-50 px-6 py-3 flex justify-between items-center transition-all duration-400 ${isScrolled
          ? "bg-gray-900/55 backdrop-blur-xl border-b border-white/8 shadow-lg"
          : "bg-transparent border-b border-transparent"
        }`}>
        <div className="navbar-start flex items-center gap-4">
          <Link to="/" aria-label="Ir a la página principal" className="logo-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3387 3387"
              className="shave-logo animate-logo"
            >
              <path
                fill="white"
                d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218 16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163 47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409 -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241 -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"
              />
            </svg>
          </Link>
          <Link to="/" >
            <h1 className="shave">SHAVE</h1>
          </Link>
        </div>

        {/* Elementos centrales - ocultos en móvil */}
        <div className="navbar-center hidden md:flex items-center gap-6">
          <ul className="menu menu-horizontal p-0 gap-6 flex items-center">
            <li>
              <Link to="/" className="flex items-center gap-2 hover:text-white">
                <CiHome className="text-lg text-white" /> Inicio
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 bg-gray-900 text-gray-200 hover:text-white focus:outline-none"
                aria-label="Abrir menú de Contenido"
              >
              Ver mas<SlArrowDown />
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full left-0 mt-2 w-48 bg-gray-800 text-gray-200 shadow-lg rounded-lg overflow-hidden">
                  <li>
                   
                    <Link to="/video" className="block px-4 py-2 hover:bg-gray-700 transition">
                      Compartidos
                    </Link>
                     <Link to="/peliculas" className="block px-4 py-2 hover:bg-gray-700 transition">
                      Película
                    </Link>
                    <Link to="/modelo" className="block px-4 py-2 hover:bg-gray-700 transition">
                      Shave AI
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/store" className="flex items-center gap-2 hover:text-white">
                <IoStorefrontOutline
                  className="text-lg" /> SHAVE Store
              </Link>

            </li>

            <li>
              <Link to="/software" className="flex items-center gap-2 hover:text-white">
               
                  <MdDevices className="text-lg" size={18} /> SHAVE Soft
              </Link>

            </li>
          </ul>
        </div>

        {/* Elementos del lado derecho - ocultos en móvil */}
        <div className="navbar-end hidden md:flex items-center gap-4 relative">
          <button
            onClick={toggleSearchDropdown}
            className="p-2 bg-gray-900"
            aria-label="Abrir búsqueda"
          >
            <FiSearch className="text-white text-xl" />
          </button>
          {isSearchDropdownOpen && (
            <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-75 z-50 py-7">
              <div className="w-96 bg-gray-800 text-gray-200 shadow-lg rounded-md p-6">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar pelis o series..."
                    className="flex-grow bg-gray-800 text-white px-2 py-2 rounded-md focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    className="px-3 py-3 bg-gray-800 text-white text-lg"
                  >
                    <FiSearch className="text-white text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchDropdownOpen(false)}
                    className="px-3 py-3 bg-gray-800 text-white text-lg"
                  >
                    <IoIosCloseCircleOutline className="text-white text-xl" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className="relative user-dropdown-container">
              <button
                className="flex items-center gap-2 bg-gray-900"
                onClick={toggleUserDropdown}
                aria-label="Abrir/Cerrar menú de usuario"
              >
                <FaUser className="text-white text-xl" />
                <span>{userData.nombre} {userData.apellido}</span>
              </button>

              {isUserDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 w-60 bg-gray-800 text-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
                  <li className="flex items-center gap-3 p-4 border-b border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <FaUser className="text-white text-xl" />
                    </div>
                    <div>
                      <h6 className="text-gray-100 font-semibold">
                        {userData.nombre} {userData.apellido}
                      </h6>
                      <p className="text-gray-400 text-sm">{userData.correo}</p>
                    </div>
                  </li>
                  <li>
                    <button className="hover:bg-gray-700 w-full text-left p-4">
                      <Link to="/perfil">Mis datos</Link>
                    </button>
                  </li>
                  <li>
                    <button className="hover:bg-gray-700 w-full text-left p-4" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* Botón del menú hamburguesa - solo visible en móvil */}

        <button className="md:hidden p-2 bg-gray-900 text-gray-200 hover:text-white focus:outline-none" onClick={() => setIsNavbarlink(true)}>
          <IoMenu size={30} />
        </button>
        <Navbarlink isOpen={isNavbarlinkOpen} onClose={() => setIsNavbarlink(false)} />
      </nav>
     
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;