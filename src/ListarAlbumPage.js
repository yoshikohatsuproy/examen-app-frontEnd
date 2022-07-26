import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const ListarAlbumPage = () => {
  const [lista, setLista] = useState([]);
  const API_URL = "http://localhost:4000";

  const listar = () => {
    axios.get(API_URL + "/api/album").then((res) => {
      const {data} = res
 
      setLista(data);
    });
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div>
      <h1> Registro de Album y Canciones </h1>

      <Link className="btn btn-primary" to="/AddAlbum" > Nuevo Album</Link>
      <Link className="btn btn-primary" to="/reporte" > Ver reporte</Link>
      
      
      <table className="table">
        <thead>
          <tr>
            <th>ID ALBUM</th>
            <th>ARTISTA</th>
            <th>PAIS</th>
            <th>ALBUM</th>
            <th>AÑO</th>
            <th></th>
            <th>Canciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((elem) => (
            <tr key={elem.alb_codigo}>
              <td>{elem.alb_codigo}</td>
              <td>{elem.art_nombre}</td>
              <td>{elem.pai_nombre}</td>
              <td>{elem.alb_nombre}</td>
              <td>{elem.alb_anioPublicacion}</td>
              <td>{elem.alb_nroCanciones}</td>

              <td>
              <Link class="btn btn-success" to={`/AddCancion/${elem.alb_codigo}`} > Agregar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
