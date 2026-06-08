import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/approutes';
import SplashScreen from './components/SplashScren';

function App() {
  // Si ya vio el splash en esta sesión, arranca en false directamente
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  useEffect(() => {
    if (!loading) return; // Ya vio el splash, no hacer nada

    const timer = setTimeout(() => {
      sessionStorage.setItem('splashShown', 'true'); // Marcar como visto
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <AppRoutes />;
}

export default App;