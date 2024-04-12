import axios from "axios";
import { useState, useEffect } from "react";
let apiUsuarios = "http://localhost:5174/usuarios";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const getUsuarios = async () => {
    let resultado = await axios.get(apiUsuarios);
    setUsuarios(resultado.data);
  };

  useEffect(() => {
    getUsuarios()
  }, []);




  console.log(usuarios);
  return (
    <div class="cards">
      {/*<button onClick={getUsuarios} type="button">
        Listar Usuario
  </button>*/}
      {usuarios.map((usuario) => (
        <section>
          <p>Usuario: {usuario.usuario}</p>
          <p>Contraseña: {usuario.contrasena}</p>
          <p>Correo:{usuario.correo}</p>
          <div>
            <button>eliminar</button>
            <button>editar</button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ListarUsuarios;
