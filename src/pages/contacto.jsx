import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FiMail, FiClock, FiSend } from "react-icons/fi";
import Footer from "../components/Footer";
import "../style/contacto.css";

/* ══ Animación ══ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ══ Datos ══ */
const CONTACT_INFO = [
  {
    icon: <FiMail size={18} />,
    label: "Correo",
    value: "contacto@shave.pe",
    href: "mailto:contacto@shave.pe",
  },
  {
    icon: <FaWhatsapp size={18} />,
    label: "WhatsApp",
    value: "+51 931 506 520",
    href: "https://wa.me/51931506520",
  },
  {
    icon: <FiClock size={18} />,
    label: "Horario",
    value: "Lun – Sáb · 8am – 10pm",
    href: null,
  },
];

const SOCIAL = [
  {
    icon: <FaFacebookF size={16} />,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100064188960596",
    color: "#1877f2",
  },
  {
    icon: <FaWhatsapp size={16} />,
    label: "WhatsApp",
    href: "https://chat.whatsapp.com/LmpU4x82QhLH5RAOYgTJEZ",
    color: "#25d366",
  },
  {
    icon: <FaTiktok size={16} />,
    label: "TikTok",
    href: "https://www.tiktok.com/@shave250",
    color: "#e2e8f0",
  },
];

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */


/**
 * Abre WhatsApp con el mensaje formateado usando la sintaxis oficial:
 * *negrita*  _cursiva_  ~tachado~
 * https://faq.whatsapp.com/539178204879377
 */
function abrirWhatsApp(form) {
  const fecha = new Date().toLocaleString("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const texto =
`*SHAVE — Nuevo mensaje*
_${fecha}_

➤ *Nombre:*  ${form.nombre}
➤ *Correo:*  ${form.correo}
➤ *Asunto:*  ${form.asunto}

📝 *Mensaje:*
${form.mensaje}

_Enviado desde shave.pe_`;

  window.open(
    `https://wa.me/51931506520?text=${encodeURIComponent(texto)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/* ══════════════════════════════════════════
   COMPONENTE
══════════════════════════════════════════ */
export default function Contacto() {
  const [form,    setForm]    = useState({ nombre: "", correo: "", asunto: "", mensaje: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [waBlocked, setWaBlocked] = useState(false); // fallback si el popup fue bloqueado

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* ── Tu llamada real a la API va aquí ── */
    await new Promise(r => setTimeout(r, 900));


    /* 2. Abre WhatsApp con el mensaje formateado
          Si el navegador bloquea el popup, mostramos botón manual */
    const popup = window.open(
      `https://wa.me/51931506520?text=${encodeURIComponent(
        `*SHAVE — Nuevo mensaje*\n_${new Date().toLocaleString("es-PE", { dateStyle: "long", timeStyle: "short" })}_\n\n➤ *Nombre:*  ${form.nombre}\n➤ *Correo:*  ${form.correo}\n➤ *Asunto:*  ${form.asunto}\n\n📝 *Mensaje:*\n${form.mensaje}\n\n_Enviado desde shave.pe_`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );

    if (!popup) setWaBlocked(true); // navegador bloqueó el popup

    setLoading(false);
    setSent(true);
  };

  const resetForm = () => {
    setSent(false);
    setWaBlocked(false);
    setForm({ nombre: "", correo: "", asunto: "", mensaje: "" });
  };

  return (
    <div className="ct-page">
      {/* Glows decorativos */}
      <div className="ct-glow-left"  aria-hidden="true" />
      <div className="ct-glow-right" aria-hidden="true" />

      {/* ── HERO ── */}
      <section className="ct-hero">
        <motion.span
          className="ct-eyebrow"
          variants={fadeUp} initial="hidden" animate="show" custom={0}
        >
          Estamos para ayudarte
        </motion.span>
        <motion.h1
          className="ct-title"
          variants={fadeUp} initial="hidden" animate="show" custom={1}
        >
          Contáctanos
        </motion.h1>
        <motion.p
          className="ct-subtitle"
          variants={fadeUp} initial="hidden" animate="show" custom={2}
        >
          Cuéntanos en qué podemos ayudarte y te responderemos a la brevedad.
        </motion.p>
      </section>

      <div className="ct-container">
        <div className="ct-grid">

          {/* ── COLUMNA IZQUIERDA ── */}
          <motion.aside
            className="ct-sidebar"
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} custom={0}
          >
            {/* Info de contacto */}
            <div className="ct-info-card">
              <p className="ct-card-label">Información de contacto</p>
              <div className="ct-info-list">
                {CONTACT_INFO.map(({ icon, label, value, href }) => (
                  <div key={label} className="ct-info-item">
                    <div className="ct-info-icon">{icon}</div>
                    <div>
                      <p className="ct-info-label">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="ct-info-value link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="ct-info-value">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="ct-social-card">
              <p className="ct-card-label">Síguenos</p>
              <div className="ct-social-row">
                {SOCIAL.map(({ icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="ct-social-btn"
                    style={{ "--hc": color }}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* ── FORMULARIO ── */}
          <motion.div
            className="ct-form-card"
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} custom={1}
          >
            {sent ? (
              /* ── ÉXITO ── */
              <motion.div
                className="ct-success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              >
                {/* Ícono check */}
                <div className="ct-success-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>

                <h2 className="ct-success-title">¡Mensaje enviado!</h2>
                <p className="ct-success-sub">
                  Gracias, <strong>{form.nombre}</strong>. Tu mensaje fue enviado por
                  WhatsApp.
                </p>

                {/* Fallback si el popup fue bloqueado */}
                {waBlocked && (
                  <div className="ct-wa-fallback">
                    <p className="ct-wa-fallback-text">
                      ⚠️ Tu navegador bloqueó WhatsApp. Ábrelo manualmente:
                    </p>
                    <button
                      className="ct-btn-wa"
                      onClick={() => abrirWhatsApp(form)}
                    >
                      <FaWhatsapp size={16} />
                      Abrir WhatsApp
                    </button>
                  </div>
                )}

                <button className="ct-btn-primary" onClick={resetForm}>
                  Enviar otro mensaje
                </button>
              </motion.div>

            ) : (
              /* ── FORMULARIO ── */
              <>
                <p className="ct-card-label">Envíanos un mensaje</p>

                <form className="ct-form" onSubmit={handleSubmit}>

                  <div className="ct-form-row">
                    <div className="ct-field">
                      <label htmlFor="ct-nombre" className="ct-label">Nombre</label>
                      <input
                        id="ct-nombre" name="nombre" type="text"
                        placeholder="Tu nombre"
                        value={form.nombre} onChange={handleChange}
                        className="ct-input" required
                      />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="ct-correo" className="ct-label">Correo</label>
                      <input
                        id="ct-correo" name="correo" type="email"
                        placeholder="tu@correo.com"
                        value={form.correo} onChange={handleChange}
                        className="ct-input" required
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-asunto" className="ct-label">Asunto</label>
                    <input
                      id="ct-asunto" name="asunto" type="text"
                      placeholder="¿En qué podemos ayudarte?"
                      value={form.asunto} onChange={handleChange}
                      className="ct-input" required
                    />
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-mensaje" className="ct-label">Mensaje</label>
                    <textarea
                      id="ct-mensaje" name="mensaje"
                      placeholder="Escribe tu mensaje aquí..."
                      value={form.mensaje} onChange={handleChange}
                      className="ct-textarea" rows={5} required
                    />
                  </div>

                

                  <button
                    type="submit"
                    className={`ct-btn-primary ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="ct-spinner" aria-label="Enviando" />
                    ) : (
                      <>
                        <FiSend size={15} />
                        Enviar por WhatsApp
                      </>
                    )}
                  </button>

                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
}