import React from "react";

const Modal = ({ children, estado, cambiarEstado, titulo = "Alerta" }) => {
  return (
    <>
      {estado && (
        <div className="overlay">
          <div className="contenedorModal">
            <div className="encabezadoModal">
              <h3>{titulo}</h3>
            </div>

            <button
              className="botonCerrar"
              onClick={() => cambiarEstado(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
