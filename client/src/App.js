import "./_app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Error404 from "./pages/Error404";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/publicar" element={<Create />} />
        <Route path="/producto/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
