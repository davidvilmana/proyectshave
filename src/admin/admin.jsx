import React from "react";
import { FaSignOutAlt, FaFilm, FaWrench, FaCar } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { FaScrewdriver } from "react-icons/fa";
import "../style/logo.css";


const Admin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
    
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3387 3387"
            className="w-16 h-16 animate-pulse"
          >
            <path
              fill="white"
              d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218 16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163 47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409 -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241 -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"
            />
          </svg>
          <h1 className="shave">SHAVE</h1>
        </div>

        {/* Navegación */}
        <nav className="flex-1">
          <ul className="space-y-2 mt-4">
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <CiHome />
              <span>Inicio</span>
            </li>
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <FaFilm />
              <span>Películas</span>
            </li>
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <FaCar />
              <span>Vehiculo</span>
            </li>
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <LuUsers />
              <span>Usuarios</span>
            </li>
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <FaScrewdriver/>
              <span>Productos</span>
            </li>
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <FaScrewdriver/>
              <span>Reportes</span>
            </li>
            <li className="px-6 py-3 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
              <FaWrench />
              <span>Mantenimiento</span>
            </li>
          </ul>
        </nav>

        {/* Cerrar sesión */}
        <div className="px-6 py-3 flex items-center space-x-3 hover:bg-red-600 cursor-pointer">
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-100">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/img/icons/user.png"
              className="h-8 w-8 rounded-full"
              alt="Usuario"
            />
            <span className="text-sm">Usuario</span>
          </div>
        </nav>

        <div className="p-6">Contenido principal aquí</div>
      </div>
    </div>
  );
};

export default Admin;
