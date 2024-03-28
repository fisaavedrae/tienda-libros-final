import '../assets/css/admin.css'
import jsonLibros from "../assets/libros.json";
import autores from './Autores';
import generos from './Generos';
import editoriales from './Editoriales';
import React, { useState, useContext } from 'react';
import { MyContext } from "../componentes/context/MyContext";

const AdmVisor = () => {

  

  const {
    productos,
    setProductos
  } = useContext(MyContext);
  console.log(productos);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [editorial, setEditorial] = useState('');
  const [resena, setResena] = useState('');
  const [urlimg, setUrlimg] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [id,setId] = useState();

  // carga libro al modal
  const cargaLibro = (libro) => {
    setId(libro.id)   
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setGenero(libro.genero);
    setEditorial(libro.editorial);
    setResena(libro.resenia);
    setUrlimg(libro.urlimg);
    setPrecio(libro.precio);
    setStock(libro.stock);
  };

  const modificarLibro = (e) => {
    e.preventDefault();

    const libroModificado = {
      id: id,
      titulo:`${titulo}`,
      autor:`${autor}`,
      resenia:`${resena}`,
      editorial:`${editorial}`,      
      genero:`${genero}`,
      urlimg: `${urlimg}`,
      precio: Number(precio),
      stock: Number(stock)
    };
    //console.log(Number(libroModificado.id));

    setProductos(productos.map(item => {
      if (item.id === Number(libroModificado.id)) {
        return {...item, ...libroModificado}
      }
      return item
    }));

    //alert("Libro modificado");    
  };

  const borrarLibro = (id) => {    
    setProductos(productos.filter(item => item.id !== id));
    //alert("Libro eliminado");
  };


  return (
    <div className="container">
      <table className="table table-striped table-hover table-sm mt-5">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Titulo</th>
            <th scope="col">Autor</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
            <th scope="col"></th>            
          </tr>
        </thead>
        <tbody>
          {productos.map(libro => (
            <tr key={libro.id}>
            <th scope="row">{libro.id}</th>
            <td>{libro.titulo}</td>
            <td>{libro.autor}</td>
            <td>{libro.stock}</td>
            <td>
              <i className="fa fa-edit" 
                data-bs-toggle="modal" 
                data-bs-target="#editModal"
                onClick={()=>cargaLibro(libro)}></i>
            </td>
            <td>
              <i className="fa fa-trash-can" 
                onClick={()=>borrarLibro(libro.id)}></i>              
            </td>
          </tr>
          ))}                    
        </tbody>
      </table>

      {/* -----modal de edicion de libro*/}
      <div className="modal fade" id="editModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* -----cabecera */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modificar Libro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {/* -----cuerpo */}
            <div className="modal-body">              
              <div className="container boxadd">    
                <form className="row" onSubmit={modificarLibro}>            
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
                      rows="3"
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
                    <button type="submit" className="btn btn-filtros mb-5" data-bs-dismiss="modal">Modificar</button>
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

export default AdmVisor;