import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../style/notfound.css";

export default function NotFound() {
  return (
    <main className="nf-page">
      {/* Glows de fondo */}
      <div className="nf-glow-left"  aria-hidden="true" />
      <div className="nf-glow-right" aria-hidden="true" />

      <div className="nf-inner">

        {/* Logo animado */}
        <motion.div
          className="nf-logo"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 3387 3387" className="nf-logo-svg">
            <path
              fill="white"
              d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218
                 16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163
                 47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409
                 -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402
                 l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
                 -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"
            />
          </svg>
        </motion.div>

        {/* 404 */}
        <motion.p
          className="nf-code"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.p>

        {/* Línea decorativa */}
        <motion.div
          className="nf-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        {/* Título */}
        <motion.h1
          className="nf-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Página no encontrada
        </motion.h1>

        {/* Descripción */}
        <motion.p
          className="nf-desc"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          Lo sentimos, no pudimos encontrar la página que estás buscando.
          <br />Puede que haya sido movida o ya no exista.
        </motion.p>

        {/* Acciones */}
        <motion.div
          className="nf-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/" className="nf-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Volver al inicio
          </Link>
          <Link to="/store" className="nf-btn-ghost">
            Ver la tienda
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link to="/software" className="nf-btn-ghost">
            Sistema de inventario
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        {/* Sugerencias */}
        <motion.div
          className="nf-suggestions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <p className="nf-suggestions-label">Quizás buscabas</p>
          <div className="nf-suggestions-links">
            {[
              { to: "/",         label: "Inicio"        },
              { to: "/software",label: "Sistema de inventario"     },
              { to: "/store",    label: "SHAVE Store"   },
              { to: "/blog",     label: "Blog"          },
              { to: "/sobrenosotros",     label: "Quienes somos"          },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="nf-suggestion-chip">{label}</Link>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}