import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MyContext } from "./componentes/context/MyContext.jsx";
import "./App.css";

import HomePage from "./pages/Home.jsx";
import Carrito from "./pages/Carrito.jsx";
import Pago from "./pages/Pago.jsx";
import DetalleLibro from "./pages/DetalleLibro.jsx";
import CerrarSesion from "./pages/CerrarSesion.jsx";
import Registro from "./pages/Registro.jsx";
import Login from "./pages/Login.jsx";
import Ordenes from "./pages/Ordenes.jsx";
import Admin from "./pages/Admin.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import MyAccount from "./pages/MyAccount.jsx";

//import jsonLibros from "./assets/libros.json";

function App() {
  const [total, setTotal] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [productos, setProductos] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [carro, setCarro] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openVistaRapida, setOpenVistaRapida] = useState(false);
  const [idProductoVistaRapida, setIdProductoVistaRapida] = useState(10);
  const [isLoadingGrilla, setIsLoadingGrilla] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [prefijoImagen, setPrefijoImagen] = useState(
    "https://fidatech.net/felipe/fotos-libros/"
  );
  const [buscador, setBuscador] = useState("");
  const [orden, setOrden] = useState(0);
  const [detalleOrden, setDetalleOrden] = useState([]);
  const [filtros, setFiltros] = useState({
    id_autor: "-1",
    id_editorial: "-1",
    id_genero: "-1",
    maxPrice: 100000,
    order_by: "titulo_ASC",
    limits: 6,
    page: 1,
  });
  const [usuario, setUsuario] = useState({
    id_usuario: 0,
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    token: "",
  });
  const [mensaje, setMensaje] = useState({
    mensaje: "",
    tipo: "",
    open: false,
  });

  const limpiarFiltros = () => {
    setFiltros({
      id_autor: "-1",
      id_editorial: "-1",
      id_genero: "-1",
      maxPrice: 100000,
      order_by: "titulo_ASC",
      limits: 6,
      page: 1,
    });
  };

  const agregarCarrito = (cant, obj) => {
    setTotal(Number(total) + Number(cant) * Number(obj.precio));
    const indice = carro.findIndex((item) => item.id_libro === obj.id_libro);

    if (indice !== -1) {
      carro[indice].qty = Number(obj.qty) + Number(cant);
      //console.log("carro antes de eliminar", carro);
      setCarro([...carro]);
    } else {
      obj.qty = Number(cant);
      carro.push(obj);
      setCarro(carro);
    }
  };

  const formatPrecio = (precio) => {
    const precioCLP = new Intl.NumberFormat("es-CL").format(precio);
    return "$ " + precioCLP;
  };
  useEffect(() => {
    ReadAPI();
    //console.log("entre al useefect");
  }, [filtros]);
  async function ReadAPI() {
    //console.log("voy a leer api");
    try {
      //console.log("filtros", filtros);
      const parametros =
        "id_autor=" +
        filtros.id_autor +
        "&id_editorial=" +
        filtros.id_editorial +
        "&id_genero=" +
        filtros.id_genero +
        "&maxPrice=" +
        filtros.maxPrice +
        "&limits=" +
        filtros.limits +
        "&page=" +
        filtros.page +
        "&order_by=" +
        filtros.order_by;
      const response = await fetch(
        "http://localhost:3000/libros/filtros?" + parametros
      );
      const data = await response.json();
      //console.log("order:", filtros.order_by);
      //console.log(data);
      if (data.status !== "Bad Request") {
        //console.log("data", data);
        setMensaje("");
        setProductos(data);
      } else {
        setProductos(""); //

        setMensaje(data.message);
        //console.log(mensaje);
      }

      //setProductos(jsonLibros);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MyContext.Provider
        value={{
          total,
          setTotal,
          productos,
          setProductos,
          carro,
          setCarro,
          orderProducts,
          setOrderProducts,
          totalOrder,
          setTotalOrder,
          open,
          setOpen,
          openVistaRapida,
          setOpenVistaRapida,
          idProductoVistaRapida,
          setIdProductoVistaRapida,
          agregarCarrito,
          formatPrecio,
          filtros,
          setFiltros,
          prefijoImagen,
          setPrefijoImagen,

          librosFiltrados,
          setLibrosFiltrados,
          isLoadingGrilla,
          setIsLoadingGrilla,
          ReadAPI,
          mensaje,
          setMensaje,
          currentPage,
          setCurrentPage,
          buscador,
          setBuscador,
          limpiarFiltros,
          usuario,
          setUsuario,
          orden,
          setOrden,
          detalleOrden,
          setDetalleOrden,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Libro/:id" element={<DetalleLibro />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Pago" element={<Pago />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/CerrarSesion" element={<CerrarSesion />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/MiCuenta" element={<MyAccount />} />
          <Route path="/Ordenes" element={<Ordenes />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;
