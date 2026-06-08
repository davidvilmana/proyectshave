import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Logo from "../assets/shave.svg";
import { iniciarSesion } from "../api/api";
import { auth, googleProvider } from '../api/firebase';
import { signInWithPopup } from "firebase/auth";


const Login = ({ onLoginSuccess }) => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Aquí puedes manejar el resultado del inicio de sesión
            console.log(result.user);
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!usuario || !password) {
            setError("Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        try {
            const response = await iniciarSesion(usuario, password);
            console.log("Respuesta de la API:", response);

            if (response) {
                const { token, user } = response;
                const { nombre, apellido, usuario } = user;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ nombre, apellido }));
                localStorage.setItem('usuario', usuario);

                if (typeof onLoginSuccess === "function") {
                    onLoginSuccess({ token, nombre, apellido, usuario });
                }

                navigate('/');
            }
        } catch (error) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center mb-6">
                <img src={Logo} alt="Logo" className="w-20 h-20 mb-2" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Bienvenido a Turismo Shave</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                    Inicia sesión para continuar
                </p>
            </div>
            <div className="flex items-center my-6 w-full max-w-sm">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>

            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="relative w-full mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="block pl-6 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="usuario"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-6"
                        >
                            Usuario...
                        </label>
                    </div>
                </div>

                <div className="relative w-full mb-4">
                    <div className="relative">
                        <input
                            type="password"
                            id="contrasena"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block pl-6 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="contrasena"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-6"
                        >
                            Contraseña...
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Cargando...' : 'Continuar'}
                </button>
            </form>

            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                ¿No tienes una cuenta?{' '}
                <Link to="/Registrar" className="text-blue-600 hover:underline">
                    Regístrate
                </Link>
            </p>


            <div className="w-full max-w-sm mt-3">
                <button onClick={handleGoogleLogin}
                    disabled={loading} className="flex items-center justify-center w-full  bg-white dark:bg-gray-800 rounded-lg py-2 text-sm  dark:hover:bg-gray-700">
                    <FaGoogle className="text-xl mr-2" />
                    {loading ? 'Cargando...' : 'Continuar con Google'}
                </button>
            </div>


        </div>
    );
};

export default Login;
