import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import "../style/software.css";

/* ── Counter animado ── */
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (1600 / 16);
    const t = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(Math.round(start));
      if (start >= to) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

/* ── Datos ── */
const FEATURES = [
  {  title: "Control de inventario", desc: "Registra entradas, salidas y stock mínimo en tiempo real. Alertas automáticas cuando un producto está por agotarse.", color: "#818cf8" },
  {  title: "Reportes y estadísticas", desc: "Dashboard con gráficas de ventas, productos más vendidos, utilidades y comparativas por período.", color: "#34d399" },
  {  title: "Facturación integrada", desc: "Genera comprobantes de venta, notas de crédito y reportes para SUNAT con un solo clic.", color: "#f59e0b" },
  {  title: "Gestión de clientes", desc: "CRM básico para registrar clientes, historial de compras, deudas pendientes y datos de contacto.", color: "#60a5fa" },
  {  title: "Multi-sede", desc: "Administra múltiples tiendas o almacenes desde un solo panel. Transferencias entre sedes incluidas.", color: "#f472b6" },
  {  title: "Roles y permisos", desc: "Define qué puede ver y hacer cada empleado. Cajero, almacenero, administrador y más.", color: "#a78bfa" },
  { title: "Acceso desde cualquier dispositivo", desc: "Sistema web responsivo. Funciona en PC, tablet y celular sin instalar nada.", color: "#fb923c" },
  {  title: "Importación masiva", desc: "Sube tu catálogo de productos desde Excel en segundos. Migración sin complicaciones.", color: "#2dd4bf" },
];

const PLANS = [
  {
    name: "Básico",
    price: "S/ 49",
    period: "/mes",
    desc: "Ideal para tiendas pequeñas y emprendedores.",
    features: ["Hasta 500 productos", "1 usuario", "Facturación básica", "Reportes semanales", "Soporte por WhatsApp"],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    name: "Profesional",
    price: "S/ 99",
    period: "/mes",
    desc: "Para negocios en crecimiento que necesitan más control.",
    features: ["Productos ilimitados", "Hasta 5 usuarios", "Facturación + SUNAT", "Dashboard avanzado", "Multi-almacén", "Soporte prioritario 24/7"],
    cta: "Comenzar ahora",
    highlight: true,
    badge: "Más popular",
  },
  {
    name: "Empresa",
    price: "S/ 199",
    period: "/mes",
    desc: "Para empresas con múltiples sedes y equipos grandes.",
    features: ["Todo lo del plan Pro", "Usuarios ilimitados", "Multi-sede ilimitado", "API para integraciones", "Capacitación incluida", "Gerente de cuenta dedicado"],
    cta: "Contactar ventas",
    highlight: false,
  },
];

const STEPS = [
  { num: "01", title: "Regístrate", desc: "Crea tu cuenta en menos de 2 minutos. Sin tarjeta de crédito para el período de prueba." },
  { num: "02", title: "Carga tu inventario", desc: "Importa tus productos desde Excel o agrégalos manualmente. Rápido y sencillo." },
  { num: "03", title: "Empieza a vender", desc: "Genera tus primeras ventas, facturas y controla tu stock desde el primer día." },
];

const TESTIMONIALS = [
  { name: "Rosa Mamani", biz: "Farmacia San José", text: "Antes llevaba todo en Excel y me perdía. Ahora sé exactamente cuánto tengo y cuánto vendí cada día.", avatar: "RM", color: "#7c3aed" },
  { name: "Carlos Ticona", biz: "Ferretería El Maestro", text: "La alerta de stock mínimo me salvó varias veces. Excelente sistema, muy fácil de usar.", avatar: "CT", color: "#0e7490" },
  { name: "Ana Huanca", biz: "Minimarket Central", text: "Lo mejor fue migrar desde otro sistema en un día. El soporte es increíble, siempre disponibles.", avatar: "AH", color: "#b45309" },
];

const STATS = [
  { to: 100,  suffix: "+", label: "Negocios activos"    },
  { to: 100,    suffix: "+", label: "Productos registrados" },
  { to: 99,   suffix: "%", label: "Uptime garantizado"  },
  { to: 24,   suffix: "/7", label: "Soporte disponible" },
];

export default function Software() {
  const [activeFaq, setActiveFaq] = useState(null);

  const FAQS = [
    { q: "¿Necesito instalar algo?",           a: "No. Es un sistema 100% web. Solo necesitas un navegador y conexión a internet. Funciona en PC, tablet y celular." },
    { q: "¿Mis datos están seguros?",          a: "Sí. Usamos cifrado SSL, backups automáticos diarios y servidores con alta disponibilidad. Tus datos nunca se pierden." },
    { q: "¿Puedo probar antes de pagar?",      a: "Absolutamente. Ofrecemos 14 días de prueba gratuita sin necesidad de tarjeta de crédito." },
    { q: "¿Funciona para cualquier tipo de negocio?", a: "Sí. Tiendas, ferreterías, farmacias, minimarkets, almacenes, distribuidoras y más. Se adapta a tu rubro." },
    { q: "¿Qué pasa si necesito ayuda?",       a: "Tienes soporte por WhatsApp, correo y videollamada. El plan Empresa incluye un gerente de cuenta dedicado." },
  ];

  return (
    <div className="si-page">

      {/* ── BG EFFECTS ── */}
      <div className="si-bg-grid"     aria-hidden="true" />
      <div className="si-glow-hero"   aria-hidden="true" />
      <div className="si-glow-bottom" aria-hidden="true" />

      {/* ══ HERO ══ */}
      <section className="si-hero">
        <motion.div className="si-hero-inner" initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}>

          <motion.div className="si-hero-badge" variants={fadeUp} custom={0}>
            <span className="si-badge-dot" />
            Sistema en vivo · +500 negocios confían en nosotros
          </motion.div>

          <motion.h1 className="si-hero-title" variants={fadeUp} custom={1}>
            Controla tu negocio<br />
            <span className="si-hero-grad">sin complicaciones</span>
          </motion.h1>

          <motion.p className="si-hero-sub" variants={fadeUp} custom={2}>
            Sistema de inventario, ventas y facturación para tiendas, minimarkets,
            ferreterías y cualquier negocio. Todo en un solo lugar, desde cualquier dispositivo.
          </motion.p>

          <motion.div className="si-hero-actions" variants={fadeUp} custom={3}>
            <Link to="/contacto" className="si-btn-cta">
              Empezar prueba gratis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href="#demo" className="si-btn-ghost">Ver demo →</a>
          </motion.div>

          <motion.p className="si-hero-note" variants={fadeUp} custom={4}>
            14 días gratis · Sin tarjeta · Cancela cuando quieras
          </motion.p>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          className="si-dashboard-preview"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          id="demo"
        >
          <div className="si-dash-bar">
            <span className="si-dash-dot red"   />
            <span className="si-dash-dot yellow"/>
            <span className="si-dash-dot green" />
            <span className="si-dash-title-bar">SHAVE Inventario · Panel principal</span>
          </div>
          <div className="si-dash-body">
            {/* Métricas ficticias */}
            <div className="si-dash-metrics">
              {[
                { label: "Ventas hoy",    val: "S/ 1,240", up: true  },
                { label: "Productos",     val: "348",       up: null  },
                { label: "Stock crítico", val: "7 items",   up: false },
                { label: "Clientes",      val: "124",       up: true  },
              ].map(m => (
                <div key={m.label} className="si-dash-metric">
                  <span className="si-dash-metric-label">{m.label}</span>
                  <span className="si-dash-metric-val">{m.val}</span>
                  {m.up !== null && (
                    <span className={`si-dash-metric-trend ${m.up ? "up" : "down"}`}>
                      {m.up ? "▲" : "▼"} {m.up ? "+12%" : "-3%"}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Barra de gráfica simulada */}
            <div className="si-dash-chart">
              <div className="si-chart-label">Ventas esta semana</div>
              <div className="si-chart-bars">
                {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                  <div key={i} className="si-chart-bar-wrap">
                    <motion.div
                      className="si-chart-bar"
                      style={{ height: `${h}%` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <span className="si-chart-day">{["L","M","Mi","J","V","S","D"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Tabla mini */}
            <div className="si-dash-table">
              <div className="si-table-head">
                <span>Producto</span><span>Stock</span><span>Estado</span>
              </div>
              {[
                { name: "Arroz 5kg",      stock: "42 und", ok: true  },
                { name: "Aceite 1L",      stock: "8 und",  ok: false },
                { name: "Azúcar 1kg",     stock: "31 und", ok: true  },
                { name: "Leche Gloria",   stock: "5 und",  ok: false },
              ].map(r => (
                <div key={r.name} className="si-table-row">
                  <span>{r.name}</span>
                  <span>{r.stock}</span>
                  <span className={`si-table-badge ${r.ok ? "ok" : "low"}`}>
                    {r.ok ? "Normal" : "Bajo"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section className="si-stats-band">
        <div className="si-stats-inner">
          {STATS.map((s, i) => (
            <motion.div key={s.label} className="si-stat"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
              <span className="si-stat-val"><Counter to={s.to} suffix={s.suffix} /></span>
              <span className="si-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="si-section">
        <div className="si-section-head">
          <span className="si-eyebrow">Funcionalidades</span>
          <h2 className="si-section-title">Todo lo que tu negocio necesita</h2>
          <p className="si-section-sub">Sin módulos extra, sin costos ocultos. Todo incluido desde el primer día.</p>
        </div>
        <div className="si-features-grid">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="si-feature-card"
              style={{ "--fc": f.color }}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i % 4}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="si-feature-icon">{f.icon}</div>
              <h3 className="si-feature-title">{f.title}</h3>
              <p className="si-feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ══ */}
      <section className="si-section">
        <div className="si-section-head">
          <span className="si-eyebrow">Proceso</span>
          <h2 className="si-section-title">Empieza en 3 pasos</h2>
        </div>
        <div className="si-steps">
          {STEPS.map((s, i) => (
            <motion.div key={s.num} className="si-step"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
              <div className="si-step-num">{s.num}</div>
              {i < STEPS.length - 1 && <div className="si-step-connector" aria-hidden="true" />}
              <h3 className="si-step-title">{s.title}</h3>
              <p className="si-step-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ PLANES ══ */}
      <section className="si-section" id="planes">
        <div className="si-section-head">
          <span className="si-eyebrow">Precios</span>
          <h2 className="si-section-title">Planes para cada negocio</h2>
          <p className="si-section-sub">Escala cuando lo necesites. Sin contratos anuales obligatorios.</p>
        </div>
        <div className="si-plans-grid">
          {PLANS.map((p, i) => (
            <motion.div key={p.name}
              className={`si-plan-card ${p.highlight ? "highlight" : ""}`}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
              {p.badge && <span className="si-plan-badge">{p.badge}</span>}
              <h3 className="si-plan-name">{p.name}</h3>
              <p className="si-plan-desc">{p.desc}</p>
              <div className="si-plan-price">
                {p.price}<span className="si-plan-period">{p.period}</span>
              </div>
              <ul className="si-plan-features">
                {p.features.map(f => (
                  <li key={f}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" className="si-check" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contacto" className={`si-plan-cta ${p.highlight ? "primary" : "ghost"}`}>
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIOS ══ */}
      <section className="si-section">
        <div className="si-section-head">
          <span className="si-eyebrow">Testimonios</span>
          <h2 className="si-section-title">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="si-testimonials">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} className="si-testimonial"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
              <div className="si-testimonial-stars" aria-label="5 estrellas">★★★★★</div>
              <p className="si-testimonial-text">"{t.text}"</p>
              <div className="si-testimonial-author">
                <div className="si-t-avatar" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <p className="si-t-name">{t.name}</p>
                  <p className="si-t-biz">{t.biz}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="si-section">
        <div className="si-section-head">
          <span className="si-eyebrow">FAQ</span>
          <h2 className="si-section-title">Preguntas frecuentes</h2>
        </div>
        <div className="si-faq-list">
          {FAQS.map((f, i) => (
            <motion.div key={i} className={`si-faq-item ${activeFaq === i ? "open" : ""}`}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
              <button className="si-faq-q" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                {f.q}
                <span className={`si-faq-icon ${activeFaq === i ? "open" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </button>
              {activeFaq === i && (
                <motion.p className="si-faq-a"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.28 }}>
                  {f.a}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="si-section">
        <motion.div className="si-final-cta"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="si-final-glow" aria-hidden="true" />
          <span className="si-eyebrow">¿Listo para empezar?</span>
          <h2 className="si-final-title">Pruébalo 14 días gratis</h2>
          <p className="si-final-sub">Sin compromiso. Sin tarjeta. Solo resultados.</p>
          <div className="si-final-actions">
            <Link to="/contacto" className="si-btn-cta large">
              Crear cuenta gratis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <p className="si-final-note">¿Tienes dudas? <Link to="/contacto" className="si-inline-link">Escríbenos por WhatsApp</Link></p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}