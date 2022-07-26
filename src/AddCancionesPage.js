import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initData = {
  art_nombre: "",
  alb_nombre: "",
  nombre: "",
  duracion: "",
  gen_codigo: 0,
  idAlbum: 0
};

export const AddCancionesPage = () => {
  let { id } = useParams();

  const [canciones, setCanciones] = useState([]);
  const [cancion, setCancion] = useState(initData);
  const [genero, setGenero] = useState([]);

  const API_URL = "http://localhost:4000";

  const listar = () => {
    axios.get(API_URL + "/api/genero").then((res) => {
      const { data } = res;
      setGenero(data);
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    let nCancion = { ...cancion, [name]: value };
    setCancion(nCancion);
  };

  const getCanciones = () => {
    axios.get(API_URL + "/api/canciones/" + id).then((res) => {
        const { data } = res;
        console.log(data)
        setCanciones(data);
    })
  }

  const getAlbum = () => {
    axios.get(API_URL + "/api/album/" + id).then((res) => {
      const { data } = res;

    

      let nCancion = {
        art_nombre: data[0].art_nombre,
        alb_nombre: data[0].alb_nombre,
        nombre: "",
        duracion:"",
        gen_codigo: 0,
        idAlbum: id
      }
      setCancion(nCancion);
       
    });
  };

  useEffect(() => {
    listar();
  }, []);

  useEffect(() => {
    getCanciones();
  }, []);

  useEffect(() => {
    getAlbum();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cancion)
    axios.post(API_URL + "/api/cancion", cancion).then((result) => {
        setCancion(initData);
      });
  };
  return (
    <div>
      <div className="col-md-4">
        <h1> Registrar Nueva Cancion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">
              Genero:
            </label>
            <select
              value={cancion.gen_codigo}
              name="gen_codigo"
              onChange={handleChange}
              className="form-select  mb-1"
              aria-label="Default select example"
            >
              <option value="0" defaultValue>
                {" "}
                Seleccionar
              </option>

              {genero.map((tipo) => (
                <option key={tipo.gen_codigo} value={tipo.gen_codigo}>
                  {tipo.gen_nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value = {cancion.nombre}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="monto" className="form-label">
              Duracion:
            </label>
            <input
              type="text"
              id="duracion"
              className="form-control"
              name="duracion"
              onChange={handleChange}
              value = {cancion.duracion}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="art_nombre" className="form-label">
              Artista:
            </label>
            <input
              type="text"
              id="art_nombre"
              className="form-control"
              name="art_nombre"
              value={cancion.art_nombre}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="alb_nombre" className="form-label">
              Album:
            </label>
            <input
              type="text"
              id="alb_nombre"
              className="form-control"
              name="alb_nombre"
              value={cancion.alb_nombre}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-8">
          <h4>Lista de Canciones</h4>
          <table className="table">
            <thead>
              <tr>
                <th>ID </th>
                <th>Cancion</th>
                <th>Duracion</th>
                <th>Genero</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {canciones.map((elem) => (
                <tr key={elem.can_codigo}>
                    <td>{elem.can_codigo}</td>
                  <td>{elem.can_nombre}</td>
                  <td>{elem.can_duracion}</td>
                  <td>{elem.gen_nombre}</td>
                  <td>
                    <button className="btn btn-danger"> Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};
