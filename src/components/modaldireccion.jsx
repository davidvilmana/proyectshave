import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "../style/modal.css";

export default function ModalDireccion({
    isOpen,
    onClose,
    direccion,
    setDireccion,
    referencia,
    setReferencia,
    distrito,
    setDistrito,
    loading,
    error,
    handleSubmit
}) {
    /* Bloquear scroll del body cuando el modal está abierto */
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    /* Cerrar con Escape */
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">

                    {/* Panel del modal */}
                    <motion.div
                        className="modal-panel"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: 32, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0,  scale: 1    }}
                        exit={{   opacity: 0, y: 20,  scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-header-left">
                                <div className="modal-icon-wrap">
                                    <IoLocationOutline size={18} />
                                </div>
                                <div>
                                    <h2 className="modal-title">Dirección de entrega</h2>
                                    <p className="modal-subtitle">¿Dónde te enviamos tu pedido?</p>
                                </div>
                            </div>
                            <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
                               <IoClose size={18} />
                            </button>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="modal-form">
                            {error && (
                                <div className="modal-error">
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="modal-field">
                                <label htmlFor="md-direccion" className="modal-label">
                                    Dirección
                                </label>
                                <input
                                    id="md-direccion"
                                    type="text"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    placeholder="Ej: Av. Principal 123"
                                    className="modal-input"
                                    autoComplete="street-address"
                                />
                            </div>

                            <div className="modal-field">
                                <label htmlFor="md-referencia" className="modal-label">
                                    Referencia <span className="modal-optional">— opcional</span>
                                </label>
                                <input
                                    id="md-referencia"
                                    type="text"
                                    value={referencia}
                                    onChange={(e) => setReferencia(e.target.value)}
                                    placeholder="Ej: Frente al parque"
                                    className="modal-input"
                                />
                            </div>

                            <div className="modal-field">
                                <label htmlFor="md-distrito" className="modal-label">
                                    Distrito
                                </label>
                                <input
                                    id="md-distrito"
                                    type="text"
                                    value={distrito}
                                    onChange={(e) => setDistrito(e.target.value)}
                                    placeholder="Ej: Miraflores"
                                    className="modal-input"
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="modal-btn-cancel"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`modal-btn-save ${loading ? "loading" : ""}`}
                                >
                                    {loading ? (
                                        <span className="modal-spinner" aria-label="Guardando" />
                                    ) : (
                                        "Guardar dirección"
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}