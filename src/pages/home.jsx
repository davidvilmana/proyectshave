import { useEffect, useState, useRef, Fragment } from "react";

import { motion } from "framer-motion";
import Footer from "../components/Footer";
import "../style/home.css";
import Img1 from "../assets/post_ai_shave_3.webp";
import Img2 from "../assets/post_ai_shave_3.webp";
import Img3 from "../assets/transporte_img_shave.webp";
import Img4 from "../assets/post_ai_shave.webp";
import NavbarLink from "../components/navbarlink";

/* ── Contador animado ── */
const AnimatedNumber = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setCount(Math.round(start));
      if (start >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Datos ── */
const services = [

  {
    title: "Tienda Online",
    tag: "E-commerce",
    img: Img1,
    desc: "Compra productos de manera rápida, segura y desde cualquier lugar.",
  },

  {
    title: "Software Empresarial",
    tag: "Tecnología",
    img: Img2,
    desc: "Sistema de inventario, facturación electrónica y control financiero diseñado para optimizar la gestión y administración de tu negocio.",
  },
  {
    title: "Turismo",
    tag: "Transporte",
    img: Img3,
    desc: "Viajes cómodos con unidades modernas y atención de calidad.",
  },
];

const stats = [
  { id: 1, label: "Años de experiencia", value: 4, suffix: "+" },
  { id: 2, label: "Clientes satisfechos", value: 100, suffix: "+" },
  { id: 3, label: "Repuestos vendidos", value: 100, suffix: "+" },
  { id: 4, label: "Clientes que visitaron la página", value: 5, suffix: "k+" },
  { id: 5, label: "Puntualidad", value: 90, suffix: "%" },
];

/* ── Variantes de animación ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ════════════════════════════════════════ */
const Home = () => (
  <div className="home-page">

    {/* ── HERO ── */}
    <section className="hero-section">
      <div className="hero-noise" />
      <div className="hero-glow" />

      <motion.div
        className="hero-inner"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.span className="hero-eyebrow" variants={fadeUp}>
          ✦ Bienvenido a SHAVE
        </motion.span>

        <motion.h1 className="hero-title" variants={fadeUp}>
          Tu negocio, tu flota,<br />
          <span className="accent">todo bajo control</span>
        </motion.h1>

        <motion.p className="hero-sub" variants={fadeUp}>
          Sistemas de inventario para negocios, Accesorios, Repuestos para vehículos, Turismo y Soporte. Todo en un solo lugar.
        </motion.p>

        {/* Categorías con separadores animados */}
        <motion.div className="hero-chips" variants={fadeUp}>
          {["E-Commerce", "Software", "Turismo", "Accesorios", "Repuestos", "Soporte"].map((c, i, arr) => (
            <Fragment key={c}>
              <span className="hero-chip">{c}</span>
              {i < arr.length - 1 && (
                <motion.span
                  className="hero-chip-dot"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </motion.div>

        <motion.div className="hero-cta" variants={fadeUp}>
          <a href="/store" className="btn-primary">Ver productos</a>
          <a href="/software" className="btn-ghost">Sistema de inventario</a>
          <a href="/contacto" className="btn-ghost">Contáctanos</a>
        </motion.div>

        <motion.p className="hero-note" variants={fadeUp}>
          +100 clientes · 4 años de experiencia · Soporte 24/7
        </motion.p>
      </motion.div>
    </section>
    {/* ── DIVISOR ── */}
    <div className="divider-row">
      <div className="divider-line" />
      <div className="divider-logo">
        <svg viewBox="0 0 3387 3387" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="white"
            d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218 16,-107 116,-181 223,-165
               107,16 181,115 165,222 -12,83 -74,146 -151,163 47,98 65,211 45,327
               -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409 -13,75 -10,149 6,218
               -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402l6 -3
               c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
               -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"
          />
        </svg>
      </div>
      <div className="divider-line" />
    </div>

    {/* ── SERVICIOS ── */}
    <section className="services-section">
      <motion.p
        className="section-eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Nuestros servicios
      </motion.p>

      <div className="services-grid">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="service-card"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
          >
            <div className="card-img-wrap">
              <img src={s.img} alt={s.title} />
              <span className="card-tag">{s.tag}</span>
            </div>
            <div className="card-body">

              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── ESTADÍSTICAS ── */}
    <section className="stats-section">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.id}
            className="stat-item"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stat-num">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── FACEBOOK ── */}
    <motion.section
      className="fb-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="fb-bg-glow" />
      <div className="fb-text">
        <p className="fb-eyebrow">Comunidad SHAVE</p>
        <h2>Síguenos en Facebook</h2>
        <p className="fb-sub">Trasladando tus sueños</p>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-fb"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          Seguir página
        </a>
      </div>
      <motion.div
        className="fb-img-wrap"
        whileHover={{ scale: 1.04, rotate: 1 }}
        transition={{ duration: 0.35 }}
      >
        <img src={Img4} alt="Vehículo SHAVE" />
      </motion.div>
    </motion.section>

    <Footer />
    <NavbarLink />
  </div>
);

export default Home;
