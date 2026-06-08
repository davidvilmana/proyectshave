import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";
import { FiCalendar, FiTag } from "react-icons/fi";
import { obtenerPeliculasPorID, obtenerPeliculas } from "../api/api";
import ReactPlayer from "react-player";
import Footer from "../components/Footer";
import "../style/verpelicula.css";

const BASE = "http://192.168.1.121:5000/videos/";

/* ── Skeleton del player ── */
const PlayerSkeleton = () => (
  <div className="vp-player-skeleton">
    <div className="vp-player-shimmer" />
    <div className="vp-play-icon-ghost" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.15)">
        <polygon points="5,3 19,12 5,21"/>
      </svg>
    </div>
  </div>
);

const VerPelicula = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const [pelicula,   setPelicula]   = useState(null);
  const [similares,  setSimilares]  = useState([]);
  const [isLoading,  setIsLoading]  = useState(true);
  const [error,      setError]      = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setPlayerReady(false);
    try {
      const [peliculaData, todasData] = await Promise.all([
        obtenerPeliculasPorID(id),
        obtenerPeliculas().catch(() => []),
      ]);
      setPelicula(peliculaData);
      setSimilares(todasData.filter(p => p.id_pelicula !== parseInt(id)).slice(0, 6));
    } catch {
      setError("Error al obtener la película. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  /* ── ERROR ── */
  if (error) return (
    <div className="vp-page">
      <div className="vp-error-wrap">
        <div className="vp-error-icon">⚠</div>
        <p className="vp-error-msg">{error}</p>
        <button className="vp-retry-btn" onClick={fetchData}>
          <VscDebugRestart size={16} /> Reintentar
        </button>
      </div>
    </div>
  );

  return (
    <div className="vp-page">
      <div className="vp-container">

        {/* ── PLAYER ── */}
        <motion.div
          className="vp-player-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {(isLoading || !playerReady) && <PlayerSkeleton />}
          {!isLoading && pelicula && (
            <div className={`vp-player-inner ${playerReady ? "ready" : "hidden"}`}>
              <ReactPlayer
                url={`${BASE}${pelicula.ruta_video}`}
                controls
                width="100%"
                height="100%"
                playing={false}
                onReady={() => setPlayerReady(true)}
              />
            </div>
          )}
        </motion.div>

        {isLoading ? (
          /* ── INFO SKELETON ── */
          <div className="vp-info-skeleton">
            <div className="vp-sk-line" style={{ width: "65%", height: 20 }} />
            <div className="vp-sk-line" style={{ width: "40%", height: 14 }} />
            <div className="vp-sk-line" style={{ width: "90%", height: 12 }} />
            <div className="vp-sk-line" style={{ width: "80%", height: 12 }} />
            <div className="vp-sk-line" style={{ width: "70%", height: 12 }} />
          </div>
        ) : pelicula && (
          <motion.div
            className="vp-info"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {/* Título */}
            <h1 className="vp-title">{pelicula.nombre_pelicula}</h1>

            {/* Meta */}
            <div className="vp-meta">
              {pelicula.fech_estreno && (
                <span className="vp-meta-item">
                  <FiCalendar size={13} />
                  {pelicula.fech_estreno.slice(0, 4)}
                </span>
              )}
              {pelicula.generos && (
                <span className="vp-meta-item">
                  <FiTag size={13} />
                  {pelicula.generos}
                </span>
              )}
            </div>

            {/* Sinopsis */}
            {pelicula.sinopsis && (
              <div className="vp-synopsis-wrap">
                <h2 className="vp-section-label">Sinopsis</h2>
                <p className="vp-synopsis">{pelicula.sinopsis}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── VER MÁS ── */}
        <div className="vp-more-section">
          <div className="vp-more-header">
            <h2 className="vp-section-label">Ver más</h2>
            <div className="vp-divider-line" />
          </div>

          <div className="vp-more-grid">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="vp-more-skeleton" />
                ))
              : similares.length > 0
                ? similares.map((p, i) => (
                    <motion.div
                      key={p.id_pelicula}
                      className="vp-more-card"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      onClick={() => navigate(`/ver-pelicula/${p.id_pelicula}`)}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="vp-more-img-wrap">
                        <img
                          src={`${BASE}${p.ruta_portada}`}
                          alt={p.nombre_pelicula}
                          className="vp-more-img"
                          loading="lazy"
                        />
                        <div className="vp-more-overlay">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                            <polygon points="5,3 19,12 5,21"/>
                          </svg>
                        </div>
                      </div>
                      <p className="vp-more-name">{p.nombre_pelicula || "Película"}</p>
                    </motion.div>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="vp-more-skeleton" />
                  ))
            }
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default VerPelicula;