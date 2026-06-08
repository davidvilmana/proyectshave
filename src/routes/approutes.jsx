import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../components/login";
import Registrar from "../components/registrar";
import Navbar from "../components/navbar";
import Pelicula from "../pages/peliculas";
import VerPelicula from "../pages/verpelicula";
import Modelo from "../components/modelo";
import NotFound from "../components/notfound";
import Blog from "../pages/blog";
import Admin from "../admin/admin";
import Store from "../pages/store";
import StoreDetalles from "../pages/detalles";;
import Contacto from "../pages/contacto";
import Sobrenosotros from "../pages/sobrenosotros";
import Software from "../pages/software";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/peliculas" element={<Pelicula />} />
          <Route path="/ver-pelicula/:id" element={<VerPelicula />} />
           <Route path="/modelo" element={<Modelo />} /> 
          <Route path="/store" element={<Store />} />
          <Route path="/store-detalles/:id" element={<StoreDetalles />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/software" element={<Software />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/sobrenosotros" element={<Sobrenosotros />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registrar" element={<Registrar />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
