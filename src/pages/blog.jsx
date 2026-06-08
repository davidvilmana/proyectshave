import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import "../style/blog.css";

const posts = [
  {
    id: 1,
    title: "Guía completa de desarrollo web moderno",
    href: "#",
    description:
      "Aprende a construir aplicaciones modernas utilizando React, Tailwind CSS, Node.js y bases de datos escalables. Una guía práctica enfocada en desarrollo full-stack y arquitectura web profesional.",
    date: "12 Abr, 2026",
    datetime: "2026-04-12",
    readTime: "8 min",
    category: { title: "Full-Stack", href: "#" },
    author: {
      name: "David Vilmana",
      role: "Desarrollador Full Stack",
      href: "#",
      imageUrl:
        "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/475140891_1152031816472309_4427069288644325981_n.jpg",
    },
  },



  {
    id: 2,
    title: "IA aplicada al transporte inteligente",
    href: "#",
    description:
      "Desarrollo de sistemas de inteligencia artificial para reconocimiento automático de placas vehiculares en Perú y detección de sueño o fatiga en conductores para mejorar la seguridad vial.",
    date: "10 Jun, 2026",
    datetime: "2026-06-10",
    readTime: "6 min",
    category: { title: "IA", href: "#" },
    author: {
      name: "David Vilmana",
      role: "Desarrollador Full Stack & IA",
      href: "#",
      imageUrl:
        "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/475140891_1152031816472309_4427069288644325981_n.jpg",
    },
  },
    {
    id: 3,
    title: "Optimización y mantenimiento de maquinaria pesada",
    href: "#",
    description:
      "Buenas prácticas para el mantenimiento preventivo y correctivo de tractores y maquinaria de línea amarilla. Experiencia aplicada en operaciones mineras y maquinaria pesada.",
    date: "28 May, 2026",
    datetime: "2026-05-28",
    readTime: "5 min",
    category: { title: "Operaciones", href: "#" },
    author: {
      name: "Cesar Vilcabana",
      role: "Especialista en Maquinaria Pesada - Dercomaq",
      href: "#",
      imageUrl:
        "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/475140891_1152031816472309_4427069288644325981_n.jpg",
    },
  },
];

const CATEGORY_COLORS = {
  "Full-Stack": {
    bg: "rgba(99,102,241,0.12)",
    color: "#a5b4fc",
    border: "rgba(99,102,241,0.25)",
  },

  "Operaciones": {
    bg: "rgba(16,185,129,0.10)",
    color: "#6ee7b7",
    border: "rgba(16,185,129,0.20)",
  },

  "IA": {
    bg: "rgba(245,158,11,0.10)",
    color: "#fcd34d",
    border: "rgba(245,158,11,0.20)",
  },
};

export default function Blog() {
  return (
    <div className="blog-page">

      {/* ── HERO ── */}
      <section className="blog-hero">
        <div className="blog-hero-glow" />
        <div className="blog-hero-inner">
          <span className="blog-eyebrow">✦ Nuestro blog</span>
          <h1 className="blog-title">
            Ideas que impulsan<br />
            <span className="blog-title-accent">tu negocio</span>
          </h1>
          <p className="blog-subtitle">
            Consejos de expertos en tecnología y operaciones.
          </p>
        </div>
      </section>

      {/* Divisor */}
      <div className="blog-divider-row">
        <div className="blog-divider-line" />
        <div className="blog-divider-logo">
          <svg viewBox="0 0 3387 3387" aria-hidden="true">
            <path fill="white" d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218
              16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163
              47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409
              -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402
              l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
              -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"/>
          </svg>
        </div>
        <div className="blog-divider-line" />
      </div>

      {/* ── GRID ── */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {posts.map((post, i) => {
            const cat = CATEGORY_COLORS[post.category.title] || CATEGORY_COLORS["IA"];
            return (
              <article key={post.id} className="blog-card" style={{ animationDelay: `${i * 0.1}s` }}>

                {/* Top meta */}
                <div className="blog-card-meta">
                  <span
                    className="blog-cat-badge"
                    style={{ background: cat.bg, color: cat.color, borderColor: cat.border }}
                  >
                    {post.category.title}
                  </span>
                  <div className="blog-card-dates">
                    <time dateTime={post.datetime} className="blog-date">{post.date}</time>
                    <span className="blog-read-time">· {post.readTime} lectura</span>
                  </div>
                </div>

                {/* Título */}
                <h2 className="blog-card-title">
                  <a href={post.href}>{post.title}</a>
                </h2>

                {/* Descripción */}
                <p className="blog-card-desc">{post.description}</p>

                {/* Footer autor */}
                <div className="blog-card-footer">
                  <div className="blog-author">
                    <img
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      className="blog-author-img"
                    />
                    <div className="blog-author-info">
                      <p className="blog-author-name">{post.author.name}</p>
                      <p className="blog-author-role">{post.author.role}</p>
                    </div>
                  </div>
                  <a href={post.href} className="blog-read-btn" aria-label={`Leer ${post.title}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>

              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}