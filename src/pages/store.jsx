import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Footer from "../components/Footer";
import Img1 from "../assets/n400.webp";
import Img2 from "../assets/GranVanTurismo.webp";
import Img3 from "../assets/c37.webp";
import Img4 from "../assets/pastilla_van_turismo.webp";
import Img5 from "../assets/zapata_van_turismo.webp";
import Img6 from "../assets/espejo_van_turismo.webp";
import Img7 from "../assets/faro_van_turismo.webp";
import "../style/store.css";


/**
 * Recibe el precio final (string "S/ 60.50") y el descuento (string "-30%")
 * y devuelve el precio original antes del descuento.
 */
function calcOriginalPrice(finalStr, discountStr) {
  if (!discountStr) return null;
  const final = parseFloat(finalStr.replace(/[^0-9.]/g, ""));
  const pct = Math.abs(parseFloat(discountStr)); // 30
  const original = final / (1 - pct / 100);
  return `S/ ${original.toFixed(2)}`;
}

/**
 * Calcula cuánto ahorra el usuario.
 */
function calcSaving(finalStr, discountStr) {
  if (!discountStr) return null;
  const final = parseFloat(finalStr.replace(/[^0-9.]/g, ""));
  const pct = Math.abs(parseFloat(discountStr));
  const original = final / (1 - pct / 100);
  const saving = original - final;
  return `Ahorras S/ ${saving.toFixed(2)}`;
}

/* ────────────────────────────────────────
   Datos de productos
──────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, img: Img4,
    name: "Pastillas de Changan Gran Van Turismo",
    price: "S/ 60.50",
    discount: "-30%",
    stock: true,
    category: "Changan",
  },
  {
    id: 2, img: Img5,
    name: "Zapatas de Changan Gran Van Turismo",
    price: "S/ 120.29",
    discount: "-20%",
    stock: true,
    category: "Changan",
  },
  {
    id: 3, img: Img6,
    name: "Espejo de Changan Gran Van Turismo",
    price: "S/ 150.29",
    discount: "-10%",
    stock: true,
    category: "Changan",
  },
  {
    id: 4, img: Img7,
    name: "Faro posterior de Changan Gran Van Turismo",
    price: "S/ 280.29",
    discount: "-5%",
    stock: false,
    category: "Changan",
  },
];

const CATEGORIES = ["Todos", "Changan", "Chevrolet", "Accesorios", "Promociones", "Soporte técnico"];

const BANNER_IMGS = [Img1, Img2, Img3, Img1, Img2, Img3];

/* ────────────────────────────────────────
   Variantes de animación
──────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/* ────────────────────────────────────────
   KEY de localStorage
──────────────────────────────────────── */
const WISH_KEY = "shave_wished_products";

function loadWished() {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveWished(obj) {
  try {
    localStorage.setItem(WISH_KEY, JSON.stringify(obj));
  } catch { /* quota exceeded — silencioso */ }
}

/* ════════════════════════════════════════
   COMPONENTE PRINCIPAL
════════════════════════════════════════ */
const Store = () => {
  const carouselRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  /* Favoritos: cargados desde localStorage */
  const [wished, setWished] = useState(loadWished);
  /* IDs que están haciendo la animación pop */
  const [popping, setPopping] = useState({});

  /* Auto-scroll del banner */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 110, behavior: "smooth" });
      }
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  /* Toggle favorito con persistencia + animación pop */
  const toggleWish = useCallback((id, e) => {
    e.preventDefault(); // evita navegar al Link
    e.stopPropagation();

    setWished((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveWished(next);
      return next;
    });

    /* Dispara clase pop y la quita tras la animación */
    setPopping((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setPopping((prev) => ({ ...prev, [id]: false }));
    }, 380);
  }, []);

  /* Filtro de productos */
  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="store-page">
      <div className="store-container">

        {/* ── BUSCADOR ── */}
        <div className="store-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" className="search-icon" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca en SHAVE Store…"
            className="store-search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")} aria-label="Limpiar búsqueda">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── CATEGORÍAS ── */}
        <div className="store-cats">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`store-cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── BANNER / CARRUSEL ── */}
        <div className="store-banner">
          <div className="banner-text">
            <p className="banner-eyebrow">Destacados</p>
            <h2 className="banner-title">Gran Van Turismo</h2>
            <p className="banner-sub">Repuestos originales Changan</p>
          </div>
          <div className="banner-carousel" ref={carouselRef}>
            {BANNER_IMGS.map((img, i) => (
              <div key={i} className="banner-car-thumb">
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVISOR ── */}
        <div className="divider-row">
          <div className="divider-line" />
          <div className="divider-logo">
            <svg viewBox="0 0 3387 3387" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218 16,-107 116,-181 223,-165
                 107,16 181,115 165,222 -12,83 -74,146 -151,163 47,98 65,211 45,327
                 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409 -13,75 -10,149 6,218
                 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402l6 -3
                 c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
                 -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"/>
            </svg>
          </div>
          <div className="divider-line" />
        </div>

        {/* ── LABEL SECCIÓN ── */}
        <p className="store-section-label">Productos disponibles</p>

        {/* ── GRID ── */}
        {filtered.length === 0 ? (
          <div className="store-empty">
            <div className="store-empty-icon">🔍</div>
            <p>No encontramos productos para "<strong>{searchQuery}</strong>"</p>
          </div>
        ) : (
          <motion.div
            className="store-grid"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {filtered.map((p) => {
              const isWished = !!wished[p.id];
              const isPopping = !!popping[p.id];
              const originalPrice = calcOriginalPrice(p.price, p.discount);
              const saving = calcSaving(p.price, p.discount);

              return (
                <motion.div key={p.id} variants={cardVariants} className="product-card">
                  <Link to={`/store-detalles/${p.id}`} className="product-link">

                    {/* ── Imagen ── */}
                    <div className="product-img-wrap">
                      <img src={p.img} alt={p.name} className="product-img" />
                      {!p.stock && (
                        <span className="stock-badge out">Agotado</span>
                      )}

                      {/* Descuento llamativo */}
                      {p.discount && (
                        <span className="discount-badge">{p.discount}</span>
                      )}
                    </div>

                    {/* ── Info ── */}
                    <div className="product-body">
                      <h3 className="product-name">{p.name}</h3>
                      <div className="product-footer">
                        <div className="product-price-block">
                          {originalPrice && (
                            <span className="product-price-original">{originalPrice}</span>
                          )}
                          <span className="product-price">{p.price}</span>
                          {saving && (
                            <span className="product-save-tag">{saving}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* ── Botón favorito (fuera del Link) ── */}
                  <button
                    className={`wish-btn ${isWished ? "wished" : ""} ${isPopping ? "pop" : ""}`}
                    onClick={(e) => toggleWish(p.id, e)}
                    aria-label={isWished ? "Quitar de favoritos" : "Agregar a favoritos"}
                    aria-pressed={isWished}
                  >
                    {isWished
                      ? <FaHeart size={15} color="#e24b4a" />
                      : <FaRegHeart size={15} color="rgba(255,255,255,0.45)" />
                    }
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ── WHATSAPP ── */}
        <motion.a
          href="https://wa.me/51931506520"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-fab"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp size={20} />
          Contáctanos por WhatsApp
        </motion.a>

      </div>
      <Footer />
    </div>
  );
};

export default Store;