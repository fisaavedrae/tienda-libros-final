import '../App.css';
import { useState, useEffect } from "react";
import image1 from '../assets/img/inicial.jpg';

const Destacado = () => {

  const [libros, setLibros] = useState([]);

  const getData = async () => {
    const response = await fetch(import.meta.env.VITE_URLBASE + '/libros');
    const data = await response.json();
    setLibros(data);
  };  
  useEffect(() => {
    getData();
  }, []);
  
  const destacados = libros.filter(libro => libro.destacado === true)
  

  return (
    <div className='box-main mb-5'>
      <h1 className='box-titulo'>Destacados</h1>

      <div className='box-slide'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">        
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="..." />
            </div>
            {destacados.map(item => (
              <div key={item.id_libro} className="carousel-item">
                <img src={item.urlimagen} className="d-block w-100" alt="..." />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Destacado;