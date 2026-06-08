import React from "react";
import { FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../style/footer.css";

const SOCIAL = [
    {
        href: "https://www.facebook.com/profile.php?id=100064188960596",
        label: "Facebook",
        icon: <FaFacebookF size={16} />,
        color: "#1877f2",
    },
    {
        href: "https://chat.whatsapp.com/LmpU4x82QhLH5RAOYgTJEZ",
        label: "WhatsApp",
        icon: <FaWhatsapp size={16} />,
        color: "#25d366",
    },
    {
        href: "https://www.tiktok.com/@shave250",
        label: "TikTok",
        icon: <FaTiktok size={16} />,
        color: "#e2e8f0",
    },
];

const COLUMNS = [
    {
        title: "Servicios",
        links: [

            { label: "SHAVE Store", to: "/store" },
            { label: "Turismo", href: "#" },
            { label: "Automatización", href: "#" },
            { label: "Software y Hardware", href: "#" },
            { label: "Inteligencia Artificial",  href: "#" },
        ],
    },
    {
        title: "Compañía",
        links: [
            { label: "Sobre nosotros", to: "/sobrenosotros" },
            { label: "Contacto", to: "/contacto" },
            { label: "Blog", to: "/blog" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Términos del servicio", href: "#" },
            { label: "Política de privacidad", href: "#" },
            { label: "Política de cookies", href: "#" },
        ],
    },
];

const Footer = () => (
    <footer className="footer">
        {/* Línea de acento superior */}
        <div className="footer-accent" />

        <div className="footer-inner">

            {/* ── Brand ── */}
            <div className="footer-brand">
                <div className="footer-logo ">
                    <svg viewBox="0 0 3387 3387" className="footer-logo-svg" aria-hidden="true">
                        <path fill="white" d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218
              16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163
              47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409
              -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402
              l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241
              -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"/>
                    </svg>
                    <span className="footer-logo-name shave-footer">SHAVE</span>
                </div>

                <p className="footer-tagline">Tu aliado en tecnología y servicios</p>

                <div className="footer-social">
                    {SOCIAL.map(({ href, label, icon, color }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="footer-social-btn"
                            style={{ "--hover-color": color }}
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* ── Columnas de links ── */}
            <div className="footer-cols">
                {COLUMNS.map((col) => (
                    <div key={col.title} className="footer-col">
                        <h3 className="footer-col-title">{col.title}</h3>
                        <ul className="footer-col-list">
                            {col.links.map(({ label, href, to }) => (
                                <li key={label}>
                                    {to ? (
                                        <Link to={to} className="footer-link">{label}</Link>
                                    ) : (
                                        <a href={href} className="footer-link">{label}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
            <span>© 2026 SHAVE. Todos los derechos reservados.</span>
            <span>
                Desarrollado por{" "}
                <a
                    href="https://www.instagram.com/davidvilmana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-dev-link"
                >
                    Davidvilmana
                </a>
            </span>
        </div>
    </footer>
);

export default Footer;