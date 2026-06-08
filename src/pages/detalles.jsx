import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CiStar } from "react-icons/ci";
import { FiShoppingCart, FiChevronDown, FiCopy, FiCheck } from "react-icons/fi";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import ModalDireccion from "../components/modaldireccion";
import Img4 from "../assets/pastilla_van_turismo.webp";
import Img5 from "../assets/zapata_van_turismo.webp";
import Img6 from "../assets/espejo_van_turismo.webp";
import Img7 from "../assets/faro_van_turismo.webp";
import "../style/detalle.css";

/* ─── Datos ─── */
const PRODUCTS = [
  { id: 1, img: Img4, price: 60.50, name: "Pastillas de Changan Gran Van Turismo", stock: false, discount: "-30%" },
  { id: 2, img: Img5, price: 120.29, name: "Zapatas de Changan Gran Van Turismo", stock: true, discount: "-20%" },
  { id: 3, img: Img6, price: 150.29, name: "Espejo de Changan Gran Van Turismo", stock: true, discount: "-10%" },
  { id: 4, img: Img7, price: 280.29, name: "Faro posterior de Changan Gran Van Turismo", stock: false, discount: "-5%" },
];

const REVIEWS = [
  {
    initials: "DH", name: "Diego Huascar", date: "Hace 2 semanas", stars: 5,
    text: "Muy buen producto, frenado suave y seguro. Lo instalé hace un mes y va perfecto.", color: "#1e3a8a", textColor: "#93c5fd"
  },
  {
    initials: "DV", name: "David Vilcabana", date: "Hace 1 mes", stars: 5,
    text: "El repuesto es original y llegó bien embalado. Volveré a comprar sin dudarlo.", color: "#14532d", textColor: "#86efac"
  },
  {
    initials: "MR", name: "Marco Ríos", date: "Hace 2 meses", stars: 4,
    text: "Buen repuesto, compatible con mi unidad. La entrega fue puntual.", color: "#4c1d95", textColor: "#c4b5fd"
  },
];

const SCORE_BARS = [["5", "80%"], ["4", "12%"], ["3", "5%"], ["2", "2%"], ["1", "1%"]];

/* ─── Info de métodos de pago ─── */
const PAYMENT_METHODS = {
  yape: {
    id: "yape",
    label: "Yape",
    number: "931 506 520",
    holder: "SHAVE Store",
    color: "#6c2bd9",
    gradient: "linear-gradient(135deg, #4f1d96 0%, #7c3aed 100%)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.12" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fontSize="28" fontWeight="800" fill="white">Y</text>
      </svg>
    ),
  },
  bcp: {
    id: "bcp",
    label: "BCP",
    number: "215-12345678-0-12",
    cci: "002-215-001234567800-12",
    holder: "SHAVE E.I.R.L.",
    color: "#1e40af",                                             
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", 
   
    icon: (
      <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.12" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
          fontSize="18" fontWeight="800" fill="white">BCP</text>
      </svg>
    ),
  },
};

/* ─── Helper precio original ─── */
function calcOriginalPrice(price, discountStr) {
  if (!discountStr) return null;
  const pct = Math.abs(parseFloat(discountStr));
  return (price / (1 - pct / 100)).toFixed(2);
}

/* ════════════════ COMPONENTE ════════════════ */
export default function DetalleProducto() {
  const { id } = useParams();
  const p = PRODUCTS.find(x => x.id === parseInt(id));

  const [openModal, setOpenModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [openDesc, setOpenDesc] = useState(false);
  const [openDets, setOpenDets] = useState(false);
  const [openPago, setOpenPago] = useState(false);
  const [activePayment, setActivePayment] = useState("yape");
  const [copied, setCopied] = useState({});

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + cantidad } : i)
        : [...prev, { ...product, qty: cantidad }];
    });
    toast.success("Producto agregado al carrito");
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce((t, i) => t + i.price * i.qty, 0);
  const cartCount = cart.reduce((t, i) => t + i.qty, 0);

  const copyText = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 1800);
      toast.success("Copiado al portapapeles");
    });
  };

  const originalPrice = p ? calcOriginalPrice(p.price, p.discount) : null;
  const pm = PAYMENT_METHODS[activePayment];

  if (!p) return <div className="dp-page"><p style={{ padding: "2rem", color: "#e2e8f0" }}>Producto no encontrado.</p></div>;

  return (
    <div className="dp-page">
      <Toaster position="top-right" richColors />

      <div className="dp-container">

        {/* ── UBICACIÓN ── */}
        <button className="dp-location" onClick={() => setOpenModal(true)}>
          <IoLocationOutline size={16} />
          <span>¿Dónde deseas recibir tu pedido?</span>
          <CiEdit size={15} />
        </button>

        <ModalDireccion
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSave={() => { alert("Dirección guardada ✔"); setOpenModal(false); }}
        />

        {/* ── TÍTULO + BADGE ── */}
        <div className="dp-title-row">
          <h1 className="dp-title">{p.name}</h1>
          {!p.stock && <span className="dp-stock-out">Agotado</span>}
        </div>

        {/* ── IMAGEN ── */}
        <div className="dp-img-wrap">
          {p.discount && (
            <span className="dp-img-discount">{p.discount}</span>
          )}
          <img src={p.img} alt={p.name} className="dp-img" />
        </div>

        {/* ── PRECIO ── */}
        <div className="dp-price-row">
          <div className="dp-price-block">
            {originalPrice && (
              <span className="dp-price-original">S/ {originalPrice}</span>
            )}
            <span className="dp-price">S/ {p.price.toFixed(2)}</span>
          </div>
          {p.discount && (
            <span className="dp-saving-tag">
              Ahorras S/ {(parseFloat(originalPrice) - p.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* ── CANTIDAD ── */}
        <div className="dp-qty-section">
          <span className="dp-qty-label">Cantidad</span>
          <div className="dp-qty-row">
            <button className="dp-qty-btn minus" onClick={() => setCantidad(q => Math.max(1, q - 1))} aria-label="Reducir">−</button>
            <span className="dp-qty-num">{cantidad}</span>
            <button className="dp-qty-btn plus" onClick={() => setCantidad(q => q + 1)} aria-label="Aumentar">+</button>
          </div>

          <a
            href={`https://wa.me/51931506520?text=Hola, quiero pedir: ${encodeURIComponent(p.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="dp-btn-wa"
            style={{ marginLeft: "auto" }}
          >
            <FaWhatsapp size={16} /> WhatsApp
          </a>
        </div>



        <div className="dp-divider" />

        {/* ── ACORDEÓN DESCRIPCIÓN ── */}
        <Accordion
          title="Descripción"
          open={openDesc}
          onToggle={() => setOpenDesc(v => !v)}
        >
          <p className="dp-desc-text">
            Repuesto de alta calidad compatible con Changan Gran Van Turismo. Fabricado con materiales
            premium que garantizan durabilidad y un rendimiento óptimo en condiciones urbanas y de carga ligera.
            Ideal para talleres y propietarios que buscan un recambio confiable al precio justo.
          </p>
        </Accordion>

        {/* ── ACORDEÓN DETALLES ── */}
        <Accordion
          title="Detalles del producto"
          open={openDets}
          onToggle={() => setOpenDets(v => !v)}
        >
          <ul className="dp-detail-list">
            {[
              ["Tipo", "Pastillas de freno delanteras"],
              ["Compatibilidad", "Changan Gran Van Turismo"],
              ["Condición", "Nuevo"],
              ["Uso", "Urbano y carga ligera"],
              ["Instalación", "Técnico especializado"],
            ].map(([k, v]) => (
              <li key={k} className="dp-detail-row">
                <span className="dp-detail-key">{k}</span>
                <span className="dp-detail-val">{v}</span>
              </li>
            ))}
          </ul>
        </Accordion>

        {/* ══ MÉTODOS DE PAGO ══ */}
        <Accordion
          title="Métodos de pago"
          open={openPago}
          onToggle={() => setOpenPago(v => !v)}
        >
          {/* Tabs */}
          <div className="dp-pay-tabs">
            {Object.values(PAYMENT_METHODS).map(method => (
              <button
                key={method.id}
                className={`dp-pay-tab ${activePayment === method.id ? "active" : ""}`}
                style={activePayment === method.id ? { borderColor: method.color, color: method.color } : {}}
                onClick={() => setActivePayment(method.id)}
              >
                {method.label}
              </button>
            ))}
          </div>

          {/* Tarjeta del método activo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePayment}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="dp-pay-card"
              style={{ background: pm.gradient }}
            >
              {/* Header tarjeta */}
              <div className="dp-pay-card-header">
                <div className="dp-pay-logo">{pm.icon}</div>
                <div>
                  <p className="dp-pay-card-label">{pm.label}</p>
                  <p className="dp-pay-card-holder">{pm.holder}</p>
                </div>
              </div>

              {/* Número */}
              <div className="dp-pay-field">
                <span className="dp-pay-field-label">
                  {pm.id === "yape" ? "Número Yape" : "Cuenta de ahorro"}
                </span>
                <div className="dp-pay-field-row">
                  <span className="dp-pay-field-value">{pm.number}</span>
                  <button
                    className="dp-pay-copy"
                    onClick={() => copyText(`${pm.id}-num`, pm.number)}
                    aria-label="Copiar número"
                  >
                    {copied[`${pm.id}-num`] ? <FiCheck size={13} /> : <FiCopy size={13} />}
                  </button>
                </div>
              </div>

              {/* CCI solo para BCP */}
              {pm.cci && (
                <div className="dp-pay-field">
                  <span className="dp-pay-field-label">CCI</span>
                  <div className="dp-pay-field-row">
                    <span className="dp-pay-field-value" style={{ fontSize: "12px" }}>{pm.cci}</span>
                    <button
                      className="dp-pay-copy"
                      onClick={() => copyText(`${pm.id}-cci`, pm.cci)}
                      aria-label="Copiar CCI"
                    >
                      {copied[`${pm.id}-cci`] ? <FiCheck size={13} /> : <FiCopy size={13} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="dp-pay-card-divider" />

              {/* Instrucciones */}
              <p className="dp-pay-note">
                {pm.id === "yape"
                  ? "Yapea al número indicado y envía el comprobante por WhatsApp indicando tu pedido."
                  : "Realiza la transferencia y envía el voucher por WhatsApp con tu nombre y número de pedido."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Aviso */}
          <div className="dp-pay-disclaimer">
            <span>⚠️</span>
            <p>Todos los pagos son verificados manualmente. Te confirmaremos tu pedido en menos de 24 horas hábiles.</p>
          </div>
        </Accordion>

        <div className="dp-divider" />

        {/* ── COMENTARIOS ── */}
        <h2 className="dp-section-title">Comentarios</h2>

        <div className="dp-reviews-summary">
          <div className="dp-score-block">
            <span className="dp-big-score">4.8</span>
            <div className="dp-score-stars">
              {[1, 2, 3, 4, 5].map((_, i) => <CiStar key={i} size={13} className="star-icon" />)}
            </div>
            <span className="dp-score-count">45 reseñas</span>
          </div>
          <div className="dp-score-bars">
            {SCORE_BARS.map(([n, w]) => (
              <div key={n} className="dp-bar-row">
                <span className="dp-bar-num">{n}</span>
                <div className="dp-bar-track">
                  <div className="dp-bar-fill" style={{ width: w }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dp-review-list">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i} className="dp-review-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="dp-review-top">
                <div className="dp-avatar" style={{ background: r.color, color: r.textColor }}>
                  {r.initials}
                </div>
                <div className="dp-review-meta">
                  <span className="dp-review-name">{r.name}</span>
                  <div className="dp-review-stars">
                    {Array.from({ length: r.stars }).map((_, j) =>
                      <CiStar key={j} size={12} className="star-icon" />
                    )}
                  </div>
                </div>
                <span className="dp-review-date">{r.date}</span>
              </div>
              <p className="dp-review-text">{r.text}</p>
              <span className="dp-verified">✓ Compra verificada</span>
            </motion.div>
          ))}
        </div>

        <div className="dp-divider" />

        {/* ── BOTONES ── */}
        <div className="dp-actions">
          <button className="dp-btn-cart" onClick={() => addToCart(p)}>
            <FiShoppingCart size={16} /> Carrito
          </button>
          <button className="dp-btn-buy" disabled={!p.stock}>
            {p.stock ? "Comprar ahora" : "Agotado"}
          </button>

        </div>

        <div className="dp-divider" />

        {/* ── SIMILARES ── */}
        <h2 className="dp-section-title">Productos similares</h2>
        <div className="dp-similar-grid">
          {PRODUCTS.map(prod => (
            <Link to={`/store-detalles/${prod.id}`} key={prod.id} className="dp-sim-card">
              <div className="dp-sim-img">
                <img src={prod.img} alt={prod.name} />
              </div>
              <div className="dp-sim-body">
                {!prod.stock && <span className="dp-sim-badge out">Agotado</span>}
                <p className="dp-sim-name">{prod.name}</p>
                <p className="dp-sim-price">S/ {prod.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* ── FAB CARRITO ── */}
      <motion.button
        className="dp-cart-fab"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpenCart(true)}
        aria-label="Abrir carrito"
      >
        <FiShoppingCart size={20} />
        {cartCount > 0 && <span className="dp-fab-badge">{cartCount}</span>}
      </motion.button>

      {/* ── PANEL CARRITO ── */}
      <AnimatePresence>
        {openCart && (
          <>
            <motion.div className="dp-cart-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenCart(false)} />
            <motion.div className="dp-cart-panel"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="dp-cart-header">
                <button className="dp-cart-close" onClick={() => setOpenCart(false)} aria-label="Cerrar">
                  <SlArrowRight size={18} />
                </button>
                <h3>Mis pedidos</h3>
              </div>

              <div className="dp-cart-body">
                {cart.length === 0 ? (
                  <p className="dp-cart-empty">Tu carrito está vacío.</p>
                ) : (
                  <>
                    <div className="dp-cart-items">
                      {cart.map(item => (
                        <div key={item.id} className="dp-cart-item">
                          <img src={item.img} alt={item.name} className="dp-cart-item-img" />
                          <div className="dp-cart-item-info">
                            <p className="dp-cart-item-name">{item.name}</p>
                            <p className="dp-cart-item-qty">Cant: {item.qty}</p>
                            <p className="dp-cart-item-price">S/ {(item.price * item.qty).toFixed(2)}</p>
                          </div>
                          <button className="dp-cart-item-del" onClick={() => removeFromCart(item.id)} aria-label="Eliminar">
                            <MdOutlineDeleteForever size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="dp-cart-footer">
                      <div className="dp-cart-subtotal">
                        <span>Subtotal</span>
                        <span>S/ {cartTotal.toFixed(2)}</span>
                      </div>
                      <button className="dp-cart-pay">Pagar ahora</button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sub-componente Acordeón ─── */
function Accordion({ title, open, onToggle, icon, children }) {
  return (
    <div className="dp-accordion">
      <button className="dp-accordion-header" onClick={onToggle} aria-expanded={open}>
        <span className="dp-accordion-title">
          {icon && <span className="dp-accordion-icon-prefix">{icon}</span>}
          {title}
        </span>
        <FiChevronDown size={18} className={`dp-accordion-chevron ${open ? "open" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="dp-accordion-body"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}