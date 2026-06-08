import React from 'react';

const Boton = ({ 
    onClick, 
    children = 'Continuar', 
    className = '', 
    disabled = false, 
    loading = false, 
    type = 'button' 
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${className} ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
};

export default Boton;
