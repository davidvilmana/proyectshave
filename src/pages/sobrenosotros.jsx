import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa6";
import { GiSupersonicArrow } from "react-icons/gi";
import Footer from "../components/Footer";
import "../style/sobrenosotros.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Datos ── */
const STATS = [
  { value: "4+",   label: "Años de experiencia"   },
  { value: "100+", label: "Clientes satisfechos"   },
  { value: "98%",  label: "Puntualidad"            },
  { value: "2",    label: "Líneas de negocio"      },
];

const SERVICES = [
  {
 
    title: "E-Commerce",
    desc:  "Tienda en línea para la venta de repuestos, accesorios y productos relacionados al transporte. Compra segura, seguimiento de pedidos y entrega a domicilio.",
    tags:  ["Repuestos", "Accesorios", "Envíos"],
    accent: "#818cf8",
    glow:   "rgba(99,102,241,0.12)",
  },
  {
  
    title: "Software Empresarial",
    desc:  "Desarrollamos sistemas de inventario, facturación, control de flota y gestión de personal adaptados a las necesidades de tu negocio.",
    tags:  ["Inventario", "Facturación", "Flota"],
    accent: "#34d399",
    glow:   "rgba(16,185,129,0.1)",
  },
  {
   
    title: "Inteligencia Artificial",
    desc:  "Soluciones de IA para optimizar rutas, predecir mantenimientos, analizar datos de operación y automatizar procesos administrativos.",
    tags:  ["Rutas", "Predicción", "Automatización"],
    accent: "#f59e0b",
    glow:   "rgba(245,158,11,0.1)",
  },
  {
    title: "Transporte Público",
    desc:  "Servicio de transporte premium con unidades modernas, climatización, entretenimiento a bordo y seguimiento GPS en tiempo real.",
    tags:  ["Premium", "GPS", "Entretenimiento"],
    accent: "#60a5fa",
    glow:   "rgba(96,165,250,0.1)",
  },
  {
  
    title: "Soporte Técnico",
    desc:  "Mantenimiento preventivo y correctivo para vehículos Changan y Chevrolet. Técnicos certificados y repuestos originales disponibles.",
    tags:  ["Changan", "Chevrolet", "Certificado"],
    accent: "#f472b6",
    glow:   "rgba(244,114,182,0.1)",
  },
  {
  
    title: "Consultoría Digital",
    desc:  "Asesoramos empresas de transporte en su transformación digital: digitalización de procesos, implementación de software y capacitación.",
    tags:  ["Digitalización", "Capacitación", "Procesos"],
    accent: "#a78bfa",
    glow:   "rgba(167,139,250,0.1)",
  },
];

const TEAM = [
  { initials: "DV", name: "David Vilmana",   role: "CEO & Fundador",       color: "#1e3a8a", text: "#93c5fd" },
  { initials: "CV", name: "Cesar Vilcabana",      role: "CEO & Fundador", color: "#14532d", text: "#86efac" },
  { initials: "MR", name: "Marcos Rios",     role: "Jefe de Tecnología",    color: "#4c1d95", text: "#c4b5fd" },
];

const VALUES = [
  {  title: "Enfoque",     desc: "Nos centramos en resolver el problema real de cada cliente con soluciones precisas y efectivas."   },
  {  title: "Compromiso",  desc: "Cumplimos lo que prometemos. Cada entrega, cada servicio, cada interacción refleja nuestra responsabilidad." },
  { title: "Innovación",  desc: "Adoptamos tecnología de punta para mantenernos a la vanguardia del sector transporte y tecnología." },
  { title: "Confianza",  desc: "Construimos relaciones de largo plazo basadas en transparencia, calidad y honestidad con nuestros clientes." },
];

export default function SobreNosotros() {
  return (
    <div className="sn-page">
      {/* Glows ambientales */}
      <div className="sn-glow-a" aria-hidden="true" />
      <div className="sn-glow-b" aria-hidden="true" />

      {/* ══ HERO ══ */}
      <section className="sn-hero">
        <motion.span className="sn-eyebrow" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          Sobre nosotros
        </motion.span>
        <motion.h1 className="sn-title" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          Más que transporte,<br />
          <span className="sn-accent">una plataforma de servicios</span>
        </motion.h1>
        <motion.p className="sn-subtitle" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          Somos una empresa peruana que combina transporte público de calidad
          con tecnología, software y soluciones digitales para el sector empresarial.
        </motion.p>
        <motion.div className="sn-hero-cta" variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <Link to="/contacto" className="sn-btn-primary">Trabaja con nosotros</Link>
          <Link to="/store"    className="sn-btn-ghost">Ver tienda →</Link>
        </motion.div>
      </section>

      {/* Divisor */}
      <div className="sn-divider-row">
        <div className="sn-divider-line" />
        <div className="sn-divider-logo" aria-hidden="true">
          <svg viewBox="0 0 3387 3387">
            <path fill="white" d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218
              16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163
              47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409
              -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402
              l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
              -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"/>
          </svg>
        </div>
        <div className="sn-divider-line" />
      </div>

      {/* ══ STATS ══ */}
      <section className="sn-stats-section">
        <div className="sn-stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label} className="sn-stat-item"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            >
              <span className="sn-stat-value">{s.value}</span>
              <span className="sn-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ MISIÓN Y VISIÓN ══ */}
      <section className="sn-section">
        <div className="sn-mv-grid">
          <motion.div
            className="sn-mv-card mision"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
          >
            <div className="sn-mv-icon"><FaLightbulb /></div>
            <div className="sn-mv-tag">Misión</div>
            <h2 className="sn-mv-title">¿Por qué existimos?</h2>
            <p className="sn-mv-desc">
              Conectar personas y empresas a través de un ecosistema integrado de transporte,
              tecnología y comercio digital, ofreciendo soluciones accesibles, confiables e innovadoras
              que impulsen el crecimiento de nuestros clientes y mejoren su calidad de vida.
            </p>
          </motion.div>

          <motion.div
            className="sn-mv-card vision"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
          >
            <div className="sn-mv-icon"><GiSupersonicArrow /></div>
            <div className="sn-mv-tag">Visión</div>
            <h2 className="sn-mv-title">¿Hacia dónde vamos?</h2>
            <p className="sn-mv-desc">
              Ser la empresa peruana de referencia en la integración de transporte y tecnología,
              expandiendo nuestro ecosistema de servicios digitales a nivel nacional y posicionándonos
              como líderes en innovación para el sector movilidad y empresas en crecimiento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ SERVICIOS ══ */}
      <section className="sn-section">
        <div className="sn-section-header">
          <span className="sn-section-eyebrow">Lo que hacemos</span>
          <h2 className="sn-section-title">Nuestros servicios</h2>
          <p className="sn-section-sub">
            Un ecosistema completo pensado para el transporte, los negocios y la tecnología.
          </p>
        </div>

        <div className="sn-services-grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="sn-service-card"
              style={{ "--accent": s.accent, "--glow": s.glow }}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i % 3}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              <div className="sn-service-emoji">{s.emoji}</div>
              <h3 className="sn-service-title">{s.title}</h3>
              <p className="sn-service-desc">{s.desc}</p>
              <div className="sn-service-tags">
                {s.tags.map(t => (
                  <span key={t} className="sn-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ VALORES ══ */}
      <section className="sn-section">
        <div className="sn-section-header">
          <span className="sn-section-eyebrow">Nuestros pilares</span>
          <h2 className="sn-section-title">Valores que nos definen</h2>
        </div>
        <div className="sn-values-grid">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title} className="sn-value-card"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            >
              <span className="sn-value-icon">{v.icon}</span>
              <h3 className="sn-value-title">{v.title}</h3>
              <p className="sn-value-desc">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ EQUIPO ══ */}
      <section className="sn-section">
        <div className="sn-section-header">
          <span className="sn-section-eyebrow">Las personas detrás</span>
          <h2 className="sn-section-title">Nuestro equipo</h2>
        </div>
        <div className="sn-team-grid">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name} className="sn-team-card"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            >
              <div className="sn-team-avatar" style={{ background: m.color, color: m.text }}>
                {m.initials}
              </div>
              <h3 className="sn-team-name">{m.name}</h3>
              <p className="sn-team-role">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="sn-cta-section">
        <motion.div
          className="sn-cta-card"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <div className="sn-cta-glow" aria-hidden="true" />
          <span className="sn-cta-tag">¿Listo para empezar?</span>
          <h2 className="sn-cta-title">Hablemos de tu proyecto</h2>
          <p className="sn-cta-sub">
            Ya sea que necesites un sistema de inventario, una tienda online o una consultoría,
            estamos listos para ayudarte.
          </p>
          <div className="sn-cta-btns">
            <Link to="/contacto" className="sn-btn-primary">Contactar ahora</Link>
            <Link to="/store"    className="sn-btn-ghost">Ver tienda →</Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}