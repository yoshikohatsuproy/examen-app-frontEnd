import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const ListarReporte = () => {
  const [lista, setLista] = useState([]);
  const API_URL = "http://localhost:4000";

  const listar = () => {
    axios.get(API_URL + "/api/reporte").then((res) => {
      const { data } = res;
        console.log(data)
      setLista(data);
    });
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div>
      <h1> REPORTE</h1>

      <table className="table">
        <thead>
          <tr>
            <th>ARTISTA</th>
            <th>PAIS</th>
            <th>TotalCanciones</th>
          </tr>
        </thead>

        <tbody>
          {lista.map((elem) => (
            <tr key={elem.alb_codigo}>
              <td>{elem.art_nombre}</td>
              <td>{elem.pai_nombre}</td>
              <td>{elem.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
