import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { obtenerDestinos, obtenertours } from "../api/api";
import CarritoReservas from "../pages/carrito";
import { toast } from "sonner";

/* ══════════════════════════════════════════
   ESTILOS INLINE
══════════════════════════════════════════ */
const S = {
  page: {
    minHeight: "100vh",
    background: "#0d1117",
    padding: "2rem 1.25rem 4rem",
    color: "#e2e8f0",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  /* Glow de fondo */
  glowLeft: {
    position: "fixed",
    top: "-120px",
    left: "-120px",
    width: "380px",
    height: "380px",
    background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  glowRight: {
    position: "fixed",
    bottom: "-100px",
    right: "-100px",
    width: "340px",
    height: "340px",
    background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  inner: {
    maxWidth: "1000px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  /* ── Header ── */
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.3)",
    marginBottom: "8px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "white",
    margin: 0,
  },
  titleQuery: {
    color: "#60a5fa",
  },
  meta: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    marginTop: "6px",
  },

  /* ── Grid ── */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
    gap: "14px",
  },

  /* ── Card ── */
  card: {
    background: "#151b27",
    border: "0.5px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "border-color 0.22s, transform 0.22s, box-shadow 0.22s",
    cursor: "default",
  },
  cardHover: {
    borderColor: "rgba(99,102,241,0.35)",
    transform: "translateY(-3px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
  },

  imgWrap: {
    position: "relative",
    width: "100%",
    height: "148px",
    background: "#111827",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  imgHover: {
    transform: "scale(1.06)",
  },

  /* Precio badge sobre imagen */
  priceBadge: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    background: "rgba(10,12,22,0.75)",
    backdropFilter: "blur(6px)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "4px 9px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#60a5fa",
  },

  body: {
    padding: "12px 14px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  name: {
    fontSize: "14px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    lineHeight: "1.35",
    margin: 0,
  },
  desc: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
    lineHeight: "1.55",
    margin: 0,
    flex: 1,
  },

  /* ── Botón reservar ── */
  footer: {
    padding: "0 14px 14px",
  },
  btnReservar: {
    width: "100%",
    padding: "9px",
    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    border: "none",
    borderRadius: "9px",
    color: "white",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.2s",
    textAlign: "center",
    display: "block",
    textDecoration: "none",
  },

  /* ── Empty state ── */
  empty: {
    textAlign: "center",
    padding: "5rem 1rem",
  },
  emptyIcon: {
    fontSize: "2.8rem",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "8px",
  },
  emptyText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
  },
  emptyQuery: {
    color: "rgba(255,255,255,0.65)",
    fontWeight: "600",
  },
};

/* ══════════════════════════════════════════
   COMPONENTE
══════════════════════════════════════════ */
const Busqueda = () => {
  const [resultados,    setResultados]    = useState([]);
  const [cartItems,     setCartItems]     = useState([]);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hoveredCard,   setHoveredCard]   = useState(null);
  const [hoveredBtn,    setHoveredBtn]    = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase().trim();

  /* Cargar carrito y auth */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    if (localStorage.getItem("user")) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const agregarAlCarrito = (destino) => {
    const existe = cartItems.some(i => i.nombre === destino.nombre);
    if (existe) {
      toast.info(`${destino.nombre} ya está en el carrito.`);
    } else {
      setCartItems(prev => [...prev, { nombre: destino.nombre, precio: destino.precio }]);
      setCartOpen(true);
      toast.success(`${destino.nombre} agregado al carrito!`);
    }
  };

  const eliminarDelCarrito = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast.success("Elemento eliminado del carrito.");
  };

  /* Búsqueda */
  useEffect(() => {
    if (!query) return;
    const buscar = async () => {
      try {
        const [destinos, tours] = await Promise.all([obtenerDestinos(), obtenertours()]);
        const palabras = query.split(" ");
        const filtrados = [...destinos, ...tours].filter(({ nombre, descripcion }) => {
          const texto = `${nombre} ${descripcion}`.toLowerCase();
          return palabras.every(p => texto.includes(p));
        });
        setResultados(filtrados);
      } catch (err) {
        console.error("Error al buscar:", err);
      }
    };
    buscar();
  }, [query]);

  return (
    <div style={S.page}>
      {/* Glows decorativos */}
      <div style={S.glowLeft}  aria-hidden="true" />
      <div style={S.glowRight} aria-hidden="true" />

      <div style={S.inner}>

        {/* ── HEADER ── */}
        <div style={S.header}>
          <span style={S.eyebrow}>Resultados de búsqueda</span>
          <h1 style={S.title}>
            Encontramos{" "}
            <span style={S.titleQuery}>
              {resultados.length} resultado{resultados.length !== 1 ? "s" : ""}
            </span>
          </h1>
          <p style={S.meta}>para &ldquo;{query}&rdquo;</p>
        </div>

        {/* ── RESULTADOS ── */}
        {resultados.length > 0 ? (
          <div style={S.grid}>
            {resultados.map((r, i) => (
              <div
                key={i}
                style={{
                  ...S.card,
                  ...(hoveredCard === i ? S.cardHover : {}),
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Imagen */}
                <div style={S.imgWrap}>
                  <img
                    src={r.urlimg}
                    alt={r.nombre}
                    style={{
                      ...S.img,
                      ...(hoveredCard === i ? S.imgHover : {}),
                    }}
                  />
                  <span style={S.priceBadge}>S/ {r.precio}</span>
                </div>

                {/* Info */}
                <div style={S.body}>
                  <p style={S.name}>{r.nombre}</p>
                  <p style={S.desc}>
                    {r.descripcion?.substring(0, 72)}
                    {r.descripcion?.length > 72 ? "…" : ""}
                  </p>
                </div>

                {/* Botón */}
                <div style={S.footer}>
                  {isAuthenticated ? (
                    <button
                      style={{
                        ...S.btnReservar,
                        opacity: hoveredBtn === i ? 0.88 : 1,
                      }}
                      onMouseEnter={() => setHoveredBtn(i)}
                      onMouseLeave={() => setHoveredBtn(null)}
                      onClick={() => agregarAlCarrito(r)}
                    >
                      Reservar
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      style={{
                        ...S.btnReservar,
                        opacity: hoveredBtn === i ? 0.88 : 1,
                      }}
                      onMouseEnter={() => setHoveredBtn(i)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      Reservar
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <div style={S.empty}>
            <div style={S.emptyIcon}>🔍</div>
            <p style={S.emptyTitle}>Sin resultados</p>
            <p style={S.emptyText}>
              No encontramos coincidencias para{" "}
              <span style={S.emptyQuery}>&ldquo;{query}&rdquo;</span>.
              <br />Intenta con términos diferentes.
            </p>
          </div>
        )}
      </div>

      {/* Carrito */}
      <CarritoReservas
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        eliminarDelCarrito={eliminarDelCarrito}
      />
    </div>
  );
};

export default Busqueda;