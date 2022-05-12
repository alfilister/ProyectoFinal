import React, { useState } from "react";
// import {useDispatch} from 'react-redux';

// import { productoId } from "../../Redux/Actions/productoId"; (es un Ej.)

const NavBar = ({ setCurrentPage }) => {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(getByName(name));
    setCurrentPage(1);
    setName("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <input
        type="text"
        placeholder="Encontra tu articulo..."
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
};

export default NavBar;
