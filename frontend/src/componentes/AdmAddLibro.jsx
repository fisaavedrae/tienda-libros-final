import React, { useState, useContext } from 'react';
import '../assets/css/admin.css';
import { AdminContextAPI } from "../componentes/context/AdminContextAPI";
//import { URLBASE } from "../config/index";

const AdmAddLibro = () => {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [editorial, setEditorial] = useState('');
  const [resena, setResena] = useState('');
  const [urlimagen, setUrlimagen] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [checkbox, setCheckbox] = useState(false);

  const { getData, clear, alerta, setAlerta } = useContext(AdminContextAPI);

  const estadoCheckbox = (e) => {
    setCheckbox(e.target.checked);
    //console.log(e.target.checked);
  };

  const crearLibro = async (e) => {      
    e.preventDefault();        

    const nuevoLibro = {
      titulo:`${titulo}`,
      resena:`${resena}`,
      urlimagen:`${urlimagen}`,
      precio: Number(precio),
      stock: Number(stock),
      destacado:JSON.parse(checkbox),
      autor:`${autor}`,      
      editorial:`${editorial}`,      
      genero:`${genero}`      
    };
    //console.log(nuevoLibro);    

    const token = window.sessionStorage.getItem("token");
    if (!token) {
      console.log("no hay token");
      //navigate("/home");
    } else {
      console.log(token);
      //console.log(id)
      const response = await fetch(
        import.meta.env.VITE_URLBASE + "/libros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,            
          },
          body: JSON.stringify(nuevoLibro),
        }
      );
      const data = await response.json();
      //console.log(data.message);
      if (data.status !== "Bad Request") {
        //console.log("data", data);
        setAlerta({
          class: "alert alert-success fade show text-center",
          msg: "Libro agregado con exito"
        });
      } else {
        setAlerta({
          class: "alert alert-danger fade show text-center",
          msg: data.message
        });
        console.log(data);
      };
    };


    getData();  
    
    setTitulo('');
    setAutor('');
    setGenero('');
    setEditorial('');
    setResena('');
    setUrlimagen('');
    setPrecio(0);
    setStock(0);
    setCheckbox(false);
    
  };

  return (
    <div className="container">
      {/* ----- disparador */}
      <button type="button" className="btn btn-filtros" data-bs-toggle="modal" data-bs-target="#addModal" onClick={clear}>
        Agregar Libro
      </button>
      {/* ----- modal de creacion de libro*/}
      <div className="modal fade" id="addModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* -----cabecera */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Libro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {/* -----cuerpo */}
            <div className="modal-body">              
              <div className="container boxadd">    
                <form className="row" onSubmit={crearLibro}>            
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label col-form-label-sm">Titulo</label>
                      <div className="col-sm-10">
                        <input 
                        type="text" 
                        className="form-control form-control-sm input-adm"
                        onChange={(e) => setTitulo(e.target.value)}
                        value={titulo}
                        required />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label col-form-label-sm">Autor</label>
                      <div className="col-sm-10">
                        <input 
                        type="text" 
                        className="form-control form-control-sm input-adm"
                        onChange={(e) => setAutor(e.target.value)}
                        value={autor}
                        required />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label col-form-label-sm">Genero</label>
                      <div className="col-sm-10">
                        <input 
                        type="text" 
                        className="form-control form-control-sm input-adm"
                        onChange={(e) => setGenero(e.target.value)}
                        value={genero}
                        required />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label col-form-label-sm">Editorial</label>
                      <div className="col-sm-10">
                        <input 
                        type="text" 
                        className="form-control form-control-sm input-adm"
                        onChange={(e) => setEditorial(e.target.value)}
                        value={editorial}
                        required />
                      </div>
                    </div>
                  </div>                   
                  <div className="col-md-12 mb-3">
                    <label  className="form-label col-form-label-sm">Reseña</label>
                    <textarea 
                      className="form-control form-control-sm input-adm" 
                      rows="2"
                      onChange={(e) => setResena(e.target.value)}
                      value={resena} 
                      required>
                    </textarea>
                  </div>
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label col-form-label-sm">URL imagen</label>
                      <div className="col-sm-9">
                        <input 
                            type="text" 
                            className="form-control form-control-sm input-adm"
                            onChange={(e) => setUrlimagen(e.target.value)}
                            value={urlimagen}
                            required />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label col-form-label-sm">Precio</label>
                      <div className="col-sm-9">
                      <input 
                            type="Number" 
                            className="form-control form-control-sm input-adm" 
                            onChange={(e) => setPrecio(e.target.value)}
                            value={precio}
                            required />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label col-form-label-sm">Stock</label>
                      <div className="col-sm-9">
                      <input 
                            type="Number" 
                            className="form-control form-control-sm input-adm" 
                            onChange={(e) => setStock(e.target.value)}
                            value={stock}
                            required />
                      </div>
                    </div>
                  </div>                              
                  <div className="col-6">
                    <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      role="switch" 
                      id="flexSwitchCheckChecked"
                      checked={checkbox} 
                      onChange={estadoCheckbox}/>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Destacado</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-filtros mb-5">Agregar</button>
                  </div>
                  <div className={alerta.class} role="alert">
                    {alerta.msg}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmAddLibro;