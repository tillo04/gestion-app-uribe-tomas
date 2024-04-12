import { useState } from "react";
import { usuarios } from "../../../database/dataBase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './Login.css'
import axios from "axios";
let apiUsuarios = "http://localhost:5174/usuarios";

const registro = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [getUsuario, setUsuario] = useState("");
    const [getContrasena, setContrasena] = useState("");
    const [getCorreo, setCorreo] = useState("");
    let redireccion = useNavigate()

    const buscarUsuario = () => {
        let estado = usuarios.some((usuario) => {
            if (
                getUsuario === usuario.usuario
                // &&
                // getContrasena === usuario.contrasena &&
                // getCorreo === usuario.correo
            ) {
                return true;
            }
        });
        return estado;
    };

    const agregarUsuario = async () => {
        let usuarioNuevo = {
            id: Math.round(Math.random() * 100).toFixed(0),
            usuario: getUsuario,
            contrasena: getContrasena,
            correo: getCorreo,
        }
        await axios.post(apiUsuarios, usuarioNuevo)
    }

    const registrarUsuario = () => {
        if (buscarUsuario()) {
            Swal.fire({
                title: "El usuario ya existe",
                text: "Será redireccionado a la página principal",
                icon: "Error",
            });
        } else {
            agregarUsuario()
            Swal.fire({
                title: "Error de credenciales",
                text: "Usuario y/o contraseña no existe o errados",
                icon: "success...",
            });
            redireccion('/')
        }
    };
    return (
        <form className="login-form">
            <h2>Iniciar sesión</h2>
            <div className="input-group">
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsuario(e.target.value);
                    }}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    onChange={(e) => {
                        setContrasena(e.target.value);
                    }}
                    type="text"
                    name=""
                    id=""
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    onChange={(e) => {
                        setCorreo(e.target.value);
                    }}
                    type="text"
                    name=""
                    id=""
                />
            </div>
            <button onClick={registrarUsuario} type="button">
                Registrar usuario.
            </button>
        </form>
    );
};

export default registro;
