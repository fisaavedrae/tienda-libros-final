import React, { useState, useContext } from 'react';
import { MyContext } from "../componentes/context/MyContext";
import '../assets/css/admin.css'
import autores from './Autores';
import generos from './Generos';
import editoriales from './Editoriales';
const AdmAddLibro = () => {

  const {
    productos,
    setProductos
  } = useContext(MyContext);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [editorial, setEditorial] = useState('');
  const [resena, setResena] = useState('');
  const [urlimg, setUrlimg] = useState('');
  const [precio, setPrecio] = useState();
  const [stock, setStock] = useState();

  const crearLibro = (e) => {      
    e.preventDefault();

    const newId = productos.length + 10;        

    const nuevoLibro = {
      id: newId,
      titulo:`${titulo}`,
      autor:`${autor}`,
      resenia:`${resena}`,
      editorial:`${editorial}`,      
      genero:`${genero}`,
      urlimg: `${urlimg}`,
      precio: Number(precio),
      stock: Number(stock)
    };
    //console.log(nuevoLibro);

    setProductos([...productos, nuevoLibro]);
    //console.log(productos);
    
    setTitulo('');
    setAutor('');
    setGenero('');
    setEditorial('');
    setResena('');
    setUrlimg('');
    setPrecio(0);
    setStock(0);

    //alert("Libro agregado exitosamente");

  };

  return (
    <div className="container">
      {/* ----- disparador */}
      <button type="button" className="btn btn-filtros" data-bs-toggle="modal" data-bs-target="#addModal">
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
                        <select id="" className="form-select form-select-sm"
                          onChange={(e) => setAutor(e.target.value)}
                          value={autor}
                          required>
                            <option selected></option>
                            {autores.map((autor, index) => (
                              <option key={index} value={autor}>{autor}</option>
                            ))}                
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label col-form-label-sm">Genero</label>
                      <div className="col-sm-10">
                        <select id="" className="form-select form-select-sm"
                          onChange={(e) => setGenero(e.target.value)}
                          value={genero}
                          required >
                            <option selected></option>
                            {generos.map((genero, index) => (
                              <option key={index} value={genero}>{genero}</option>
                            ))} 
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label col-form-label-sm">Editorial</label>
                      <div className="col-sm-10">
                        <select id="" className="form-select form-select-sm"
                          onChange={(e) => setEditorial(e.target.value)}
                          value={editorial}
                          required >
                            <option selected></option>
                            {editoriales.map((editorial, index) => (
                              <option key={index} value={editorial}>{editorial}</option>
                            ))}
                        </select>
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
                            onChange={(e) => setUrlimg(e.target.value)}
                            value={urlimg}
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
                      <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Destacado</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-filtros mb-5">Agregar</button>
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