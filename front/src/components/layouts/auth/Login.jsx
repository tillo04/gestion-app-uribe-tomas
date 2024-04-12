import userLogo from "../../../assets/user.avif";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
let apiUsuarios = "http://localhost:5174/usuarios";
import './Login.css'

const Login = () => {
  const [getUsuario, setUsuario] = useState("");
  const [getContrasena, setContrasena] = useState("");
  const [getCorreo, setCorreo] = useState("");
  let redireccion = useNavigate()

  const [usuarios, setUsuarios] = useState([]);
  const getUsuarios = async () => {
    let resultado = await axios.get(apiUsuarios);
    console.log(usuarios)
    setUsuarios(resultado.data);
  };

  useEffect(() => {
    getUsuarios()
  }, []);

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
  const iniciarSesion = () => {
    if (buscarUsuario()) {
      Swal.fire({
        title: "Bienvenido",
        text: "Será redireccionado a la página principal",
        icon: "success",
      });
      redireccion('/home')
    } else {
      Swal.fire({
        title: "Error de credenciales",
        text: "Usuario y/o contraseña no existe o errados",
        icon: "error",
      });
    }
  };
  return (
    <form className="login-form">
      <img src={userLogo} alt="Usuario" />
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
      <button onClick={iniciarSesion} type="button">
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
