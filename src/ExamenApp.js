import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListarAlbumPage } from "./ListarAlbumPage";
import { AddAlbumPage } from "./AddAlbumPage";
import { AddCancionesPage } from "./AddCancionesPage";
import { ListarReporte } from "./ListarReporte";

export const ExamenApp = () => {
  return (
    <BrowserRouter>
 
      <div className="container">
        <Routes>
          <Route exact path="/" element={<ListarAlbumPage />} />
          <Route exact path="/AddAlbum" element={<AddAlbumPage />} />
          <Route exact path="/AddCancion/:id" element={<AddCancionesPage />} />
          <Route exact path="/reporte" element={<ListarReporte />} />
        
        </Routes>
      </div>
       
    </BrowserRouter>
  );
};
