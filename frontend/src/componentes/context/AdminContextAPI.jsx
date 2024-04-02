import { createContext, useState, useEffect } from "react";
//import { URLBASE } from "../../config/index";

export const AdminContextAPI = createContext();

const AdminProviderAPI = ({ children}) => {

  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [alerta,setAlerta] = useState({ class:"alert alert-light fade", msg:""});    
  

    const getData = async () => {
      const response = await fetch(import.meta.env.VITE_URLBASE + '/libros');
      const data = await response.json();
      setLibros(data);
  
      const resAutor = await fetch(import.meta.env.VITE_URLBASE + '/autores');
      const dataAutor = await resAutor.json();
      setAutores(dataAutor);
  
      const resEditorial = await fetch(import.meta.env.VITE_URLBASE + '/editoriales');
      const dataEditorial = await resEditorial.json();
      setEditoriales(dataEditorial);
  
      const resGenero = await fetch(import.meta.env.VITE_URLBASE + '/generos');
      const dataGenero = await resGenero.json();
      setGeneros(dataGenero);
    };  
    useEffect(() => {
      getData();
    }, []);           

    return (
        <AdminContextAPI.Provider value={{ 
          libros, setLibros,
          autores, setAutores,
          editoriales, setEditoriales,
          generos, setGeneros,
          alerta, setAlerta,
          getData }}>
            {children}
        </AdminContextAPI.Provider>
    );
};

export default AdminProviderAPI;