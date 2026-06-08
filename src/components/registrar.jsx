import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/shave.svg";
import { registrarUsuario } from "../api/api"; 


const Registrar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const { nombre, apellido, usuario, contrasena } = formData;

    if (!nombre || !apellido || !usuario|| !contrasena) {
      setError('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    const dniRegex = /^\d{8}$/;
    if (!dniRegex.test(dni)) {
      setError('El DNI debe tener 8 dígitos');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setError('El formato del correo no es válido');
      setLoading(false);
      return;
    }

    if (contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    try {
      const data = await registrarUsuario(nombre, apellido, usuario, contrasena);
      setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setFormData({
        nombre: '',
        apellido: '',
        usuario: '',
        contrasena: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="Logo" className="w-20 h-20 mb-2" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Crea tu cuenta</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Regístrate para acceder a todos los beneficios
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        {['nombre', 'apellido', 'usuario', 'contrasena'].map((field) => (
          <div key={field} className="relative w-full mb-4">
            <input
              type={field === 'contrasena' ? 'password' : 'text'}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="block pl-6 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor={field}
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-6"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}...
            </label>
          </div>
        ))}

        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Continuar'}
        </button>
      </form>

      <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Iniciar Sesión
        </Link>
      </p>
    </div>
  );
};

export default Registrar;
