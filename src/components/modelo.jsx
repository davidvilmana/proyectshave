import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { PrediccionMananza } from "../api/ApiIA";
import { Toaster, toast } from "sonner";
import "../style/modelo.css";

const Modelo = () => {
  const webcamRef          = useRef(null);
  const [devices,          setDevices]          = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [result,           setResult]           = useState(null);
  const [error,            setError]            = useState(null);
  const [loading,          setLoading]          = useState(false);
  const [isLive,           setIsLive]           = useState(false);
  const [frameCount,       setFrameCount]       = useState(0);
  const [history,          setHistory]          = useState([]);

  /* ── Detectar cámaras ── */
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devs) => {
        const vids = devs.filter((d) => d.kind === "videoinput");
        setDevices(vids);
        if (vids.length > 0) setSelectedDeviceId(vids[0].deviceId);
      })
      .catch(console.error);
  }, []);

  /* ── Loop de predicción ── */
  useEffect(() => {
    let id;
    if (isLive) {
      id = setInterval(() => {
        captureImage();
        setFrameCount((n) => n + 1);
      }, 1200);
    }
    return () => clearInterval(id);
  }, [isLive, selectedDeviceId]);

  const captureImage = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      setLoading(true);
      const blob = await fetch(imageSrc).then((r) => r.blob());
      const data = await PrediccionMananza(blob);
      setResult(data);
      setHistory((prev) => [
        { ...data, ts: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4),
      ]);
    } catch (err) {
      setError(err.message);
      toast.error("Error en la predicción", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const isFresh  = result?.prediccion?.toLowerCase().includes("fresc");
  const isRotten = result?.prediccion?.toLowerCase().includes("podr");
  const confidence = result?.valor ? (result.valor * 100).toFixed(1) : null;

  const handleStop = () => {
    setIsLive(false);
    setFrameCount(0);
  };

  return (
    <div className="ml-page">
      <Toaster position="top-right" richColors />

      {/* Fondo */}
      <div className="ml-bg-grid"    aria-hidden="true" />
      <div className="ml-glow-top"   aria-hidden="true" />
      <div className="ml-glow-right" aria-hidden="true" />

      {/* ── HEADER ── */}
      <header className="ml-header">
        <div className="ml-header-inner">
          <div className="ml-header-left">
            <div className="ml-header-icon" aria-hidden="true">🍎</div>
            <div>
              <h1 className="ml-title">Shave AI|Prototipo de Detección de Frescura Manzana</h1>
              <p className="ml-subtitle">Detección de frescura · OpenCV + CNN + Flask</p>
            </div>
          </div>
          <div className="ml-tech-badges">
            {["Python","OpenCV","CNN","Flask"].map(t => (
              <span key={t} className="ml-tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="ml-main">

        {/* ── COLUMNA CÁMARA ── */}
        <div className="ml-camera-col">

          {/* Selector cámara */}
          {devices.length > 1 && (
            <div className="ml-cam-selector">
              <label className="ml-cam-label" htmlFor="ml-cam-select">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M23 7 16 12 23 17V7z"/>
                  <rect x="1" y="5" width="15" height="14" rx="2"/>
                </svg>
                Cámara
              </label>
              <select
                id="ml-cam-select"
                className="ml-cam-select"
                value={selectedDeviceId}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
              >
                {devices.map((d, i) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Cámara ${i + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Visor */}
          <div className="ml-webcam-wrap">
            {/* Esquinas decorativas */}
            <div className="ml-corner tl" aria-hidden="true" />
            <div className="ml-corner tr" aria-hidden="true" />
            <div className="ml-corner bl" aria-hidden="true" />
            <div className="ml-corner br" aria-hidden="true" />

            {/* Línea de scan */}
            {isLive && <div className="ml-scan-line" aria-hidden="true" />}

            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }}
              className="ml-webcam"
            />

            {/* Status overlay */}
            <div className="ml-cam-status">
              <span className={`ml-status-dot ${isLive ? "live" : "idle"}`} aria-hidden="true" />
              <span className="ml-status-text">{isLive ? "ANALIZANDO" : "EN ESPERA"}</span>
              {isLive && <span className="ml-frame-count">frame #{frameCount}</span>}
            </div>

            {/* Loading pulse */}
            {loading && (
              <div className="ml-loading-overlay" aria-label="Procesando">
                <div className="ml-pulse-ring" />
                <span className="ml-loading-text">Procesando...</span>
              </div>
            )}
          </div>

          {/* Controles */}
          <div className="ml-controls">
            <motion.button
              className={`ml-btn-start ${isLive ? "disabled" : ""}`}
              onClick={() => !isLive && setIsLive(true)}
              disabled={isLive}
              whileTap={{ scale: 0.96 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              Iniciar análisis
            </motion.button>

            <motion.button
              className="ml-btn-stop"
              onClick={handleStop}
              disabled={!isLive}
              whileTap={{ scale: 0.96 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
              </svg>
              Detener
            </motion.button>

            <motion.button
              className="ml-btn-capture"
              onClick={captureImage}
              disabled={isLive || loading}
              whileTap={{ scale: 0.96 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              Captura manual
            </motion.button>
          </div>
        </div>

        {/* ── COLUMNA RESULTADOS ── */}
        <div className="ml-results-col">

          {/* Resultado principal */}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.prediccion}
                className={`ml-result-card ${isFresh ? "fresh" : isRotten ? "rotten" : "neutral"}`}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.94, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
              >
                <div className="ml-result-icon" aria-hidden="true">
                  {isFresh ? "✅" : isRotten ? "⚠️" : "🔍"}
                </div>
                <div className="ml-result-label">
                  {isFresh ? "Manzana FRESCA" : isRotten ? "Manzana PODRIDA" : result.prediccion}
                </div>
                <div className="ml-result-raw">{result.prediccion}</div>

                {/* Barra de confianza */}
                {confidence && (
                  <div className="ml-confidence">
                    <div className="ml-confidence-header">
                      <span>Confianza del modelo</span>
                      <span className="ml-confidence-pct">{confidence}%</span>
                    </div>
                    <div className="ml-confidence-track">
                      <motion.div
                        className={`ml-confidence-fill ${isFresh ? "fresh" : "rotten"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                      />
                    </div>
                  </div>
                )}

                {/* Valores técnicos */}
                <div className="ml-tech-vals">
                  <div className="ml-tech-val-item">
                    <span className="ml-tech-val-label">Valor raw</span>
                    <span className="ml-tech-val-num">{result.valor?.toFixed(4)}</span>
                  </div>
                  <div className="ml-tech-val-item">
                    <span className="ml-tech-val-label">Estado</span>
                    <span className={`ml-status-badge ${isFresh ? "fresh" : "rotten"}`}>
                      {isFresh ? "Apto" : "No apto"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="ml-result-card neutral empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="ml-empty-icon" aria-hidden="true">🍎</div>
                <p className="ml-empty-title">Sin resultado aún</p>
                <p className="ml-empty-sub">Inicia el análisis o captura manualmente para ver el diagnóstico.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info del modelo */}
          <div className="ml-model-info">
            <p className="ml-info-label">Acerca del modelo</p>
            <div className="ml-info-grid">
              {[
                { k: "Arquitectura", v: "CNN"           },
                { k: "Framework",    v: "TensorFlow"    },
                { k: "Backend",      v: "Flask + OpenCV"},
                { k: "Clases",       v: "Fresca / Podrida"},
                { k: "Intervalo",    v: "1.2 seg"       },
                { k: "Formato",      v: "JPEG → Base64" },
              ].map(({ k, v }) => (
                <div key={k} className="ml-info-item">
                  <span className="ml-info-k">{k}</span>
                  <span className="ml-info-v">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historial */}
          {history.length > 0 && (
            <div className="ml-history">
              <p className="ml-info-label">Historial reciente</p>
              <div className="ml-history-list">
                {history.map((h, i) => (
                  <div key={i} className="ml-history-item">
                    <span className={`ml-h-dot ${h.prediccion?.toLowerCase().includes("fresc") ? "fresh" : "rotten"}`} />
                    <span className="ml-h-pred">{h.prediccion}</span>
                    <span className="ml-h-val">{h.valor?.toFixed(3)}</span>
                    <span className="ml-h-ts">{h.ts}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="ml-error-banner">
              <span>⚠ {error}</span>
              <button onClick={() => setError(null)} aria-label="Cerrar error">✕</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Modelo;