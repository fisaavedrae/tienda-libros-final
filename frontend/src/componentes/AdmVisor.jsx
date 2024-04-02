import '../assets/css/admin.css';
import React, { useState, useContext } from 'react';
import { AdminContextAPI } from "../componentes/context/AdminContextAPI";
//import { URLBASE } from "../config/index";

const AdmVisor = () => {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [editorial, setEditorial] = useState('');
  const [resena, setResena] = useState('');
  const [urlimagen, setUrlimagen] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);  
  const [checkbox, setCheckbox] = useState(false);
  const [id,setId] = useState();

  const { 
    libros, autores, editoriales, generos,
    getData, clear, alerta, setAlerta 
  } = useContext(AdminContextAPI);

  const estadoCheckbox = (e) => {
    setCheckbox(e.target.checked);
    //console.log(e.target.checked);
  };
  
  // carga libro al modal
  const cargaLibro = (libro) => {
    setId(libro.id_libro)   
    setTitulo(libro.titulo);
    setAutor(libro.id_autor);
    setGenero(libro.id_genero);
    setEditorial(libro.id_editorial);
    setResena(libro.resena);
    setUrlimagen(libro.urlimagen);
    setPrecio(libro.precio);
    setStock(libro.stock);
    setCheckbox(libro.destacado);
    clear();
  };

  // *** modificar OK ***
  const modificarLibro = async (e) => {
    e.preventDefault();

    const libroModificado = {
      titulo:`${titulo}`,
      resena:`${resena}`,
      urlimagen:`${urlimagen}`,
      precio: Number(precio),
      stock: Number(stock),
      destacado:JSON.parse(checkbox),
      id_autor:Number(autor),      
      id_editorial:Number(editorial),      
      id_genero:Number(genero)      
    };
    //console.log(libroModificado);

    const token = window.sessionStorage.getItem("token");
    if (!token) {
      console.log("no hay token");
      //navigate("/home");
    } else {
      //console.log(token);
      const response = await fetch(
        import.meta.env.VITE_URLBASE + "/libros/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,            
          },
          body: JSON.stringify(libroModificado),
        }
      );
      const data = await response.json();
      if (data.status !== "Bad Request") {
        //console.log("data", data);
        setAlerta({
          class: "alert alert-success fade show text-center",
          msg: "Libro modificado con exito"
        });
      } else {
        setAlerta({
          class: "alert alert-danger fade show text-center",
          msg: data.message
        });
      };
    };
    getData();  
  };
  


// *** borrado OK ***
  const borrarLibro = async (id) => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      console.log("no hay token");
      //navigate("/home");
    } else {
      //console.log(token);
      console.log(id)
      const response = await fetch(
        import.meta.env.VITE_URLBASE + "/libros/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataBorra = await response.json();
      console.log(dataBorra);
    };
    getData();
  };


  return (
    <div className="container">
      <table className="table table-striped table-hover table-sm mt-5">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Titulo</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
            <th scope="col"></th>            
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id_libro}>
            <th scope="row">{libro.id_libro}</th>
            <td>{libro.titulo}</td>
            <td>{libro.precio}</td>
            <td>{libro.stock}</td>
            <td>
              <i className="fa fa-edit" 
                data-bs-toggle="modal" 
                data-bs-target="#editModal"
                onClick={()=>cargaLibro(libro)}></i>
            </td>
            <td>
              <i className="fa fa-trash-can" 
                onClick={()=>borrarLibro(libro.id_libro)}></i>              
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
                            {autores.map((autor) => (
                              <option key={autor.id_autor} value={autor.id_autor}>{autor.nombre}</option>
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
                            {generos.map((genero) => (
                              <option key={genero.id_genero} value={genero.id_genero}>{genero.genero}</option>
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
                            {editoriales.map((editorial) => (
                              <option key={editorial.id_editorial} value={editorial.id_editorial}>{editorial.nombre}</option>
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
                    <button type="submit" className="btn btn-filtros mb-5">Modificar</button>
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

export default AdmVisor;