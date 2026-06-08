import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";
import { obtenerPeliculas } from "../api/api";
import Footer from "../components/Footer";
import "../style/peliculas.css";

/* ── Variantes ── */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

/* ── Skeleton card ── */
const SkeletonCard = () => (
  <div className="pel-skeleton">
    <div className="pel-skeleton-img" />
    <div className="pel-skeleton-body">
      <div className="pel-skeleton-line long" />
      <div className="pel-skeleton-line short" />
    </div>
  </div>
);

const Peliculas = () => {
  const [peliculas,   setPeliculas]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [hoveredId,   setHoveredId]   = useState(null);
  const [filter,      setFilter]      = useState("Todos");
  const navigate = useNavigate();

  const fetchPeliculas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerPeliculas();
      setPeliculas(data);
    } catch (err) {
      setError("Error al obtener las películas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPeliculas(); }, []);

  const handleVerPelicula = (id) => navigate(`/ver-pelicula/${id}`);

  /* ── LOADING ── */
  if (loading) return (
    <div className="pel-page">
      <section className="pel-hero">
        <div className="pel-hero-glow" />
        <div className="pel-hero-inner">
          <span className="pel-eyebrow">✦ Contenido</span>
          <h1 className="pel-title">Películas <span className="pel-accent">recientes</span></h1>
        </div>
      </section>
      <div className="pel-grid-section">
        <div className="pel-grid">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );

  /* ── ERROR ── */
  if (error) return (
    <div className="pel-page">
      <div className="pel-error-wrap">
        <div className="pel-error-icon">⚠</div>
        <h2 className="pel-error-msg">{error}</h2>
        <button className="pel-retry-btn" onClick={fetchPeliculas}>
          <VscDebugRestart size={16} /> Reintentar
        </button>
      </div>
    </div>
  );

  return (
    <div className="pel-page">

      {/* ── HERO ── */}
      <section className="pel-hero">
        <div className="pel-hero-glow" />
        <div className="pel-hero-inner">
          <span className="pel-eyebrow">✦ Contenido</span>
          <h1 className="pel-title">Películas <span className="pel-accent">recientes</span></h1>
          <p className="pel-subtitle">Disfruta el mejor entretenimiento a bordo.</p>
        </div>
      </section>

      {/* Divisor */}
      <div className="pel-divider-row">
        <div className="pel-divider-line" />
        <div className="pel-divider-logo">
          <svg viewBox="0 0 3387 3387" aria-hidden="true">
            <path fill="white" d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218
              16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163
              47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409
              -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402
              l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
              -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"/>
          </svg>
        </div>
        <div className="pel-divider-line" />
      </div>

      {/* ── COUNT ── */}
      <div className="pel-grid-section">
        <p className="pel-count">{peliculas.length} películas disponibles</p>

        {/* ── GRID ── */}
        <motion.div
          className="pel-grid"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {peliculas.map((pelicula, i) => (
            <motion.div
              key={pelicula.id_pelicula}
              className={`pel-card ${hoveredId === pelicula.id_pelicula ? "hovered" : ""}`}
              custom={i}
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(pelicula.id_pelicula)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleVerPelicula(pelicula.id_pelicula)}
              whileTap={{ scale: 0.97 }}
            >
              {/* Imagen */}
              <div className="pel-card-img-wrap">
                <img
                  src={`http://192.168.1.121:5000/videos/${pelicula.ruta_portada}`}
                  alt={`Portada de ${pelicula.nombre_pelicula}`}
                  className="pel-card-img"
                  loading="lazy"
                />
                {/* Overlay con play */}
                <div className="pel-card-overlay">
                  <div className="pel-play-btn" aria-label="Reproducir">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  </div>
                </div>
                {/* Badge nuevo */}
                {i < 3 && <span className="pel-new-badge">Nuevo</span>}
              </div>

              {/* Info */}
              <div className="pel-card-body">
                <h3 className="pel-card-title">{pelicula.nombre_pelicula || "Película"}</h3>
                <span className="pel-card-cta">Ver ahora →</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Peliculas;