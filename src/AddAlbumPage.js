import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const initData = {
  nombre: "",
  nrocanciones: 0,
  aniopub: 0,
  art_codigo: 0,
};

export const AddAlbumPage = () => {
  const [album, setAlbum] = useState(initData);
  const [artista, setArtista] = useState([]);
  const API_URL = "http://localhost:4000";

  const listar = () => {
    axios.get(API_URL + "/api/artista").then((res) => {
      const { data } = res;
      setArtista(data);
    });
  };

  useEffect(() => {
    listar();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    let nAlbum = { ...album, [name]: value };
    setAlbum(nAlbum);
    console.log(album)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(album)
    axios.post(API_URL + "/api/album", album).then((result) => {
      setAlbum(initData);
    });
  };
  return (
    <div>
      <div className="col-md-4">
        <h1> Registrar Nuevo Album</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">
              Artista:
            </label>
            <select
              value={artista.art_codigo}
              name="art_codigo"
              onChange={handleChange}
              className="form-select  mb-1"
              aria-label="Default select example"
            >
              <option value="0" defaultValue>
                {" "}
                Seleccionar
              </option>

              {artista.map((tipo) => (
                <option key={tipo.art_codigo} value={tipo.art_codigo}>
                  {tipo.art_nombre}
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="monto" className="form-label">
              Nro canciones:
            </label>
            <input
              type="number"
              id="nrocanciones"
              className="form-control"
              name="nrocanciones"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="aniopub" className="form-label">
              Año Publicacion:
            </label>
            <input
              type="number"
              id="aniopub"
              className="form-control"
              name="aniopub"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
