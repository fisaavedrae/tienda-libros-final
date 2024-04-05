import Header from "../componentes/Header.jsx";
import AdmAddLibro from "../componentes/AdmAddLibro.jsx";
import AdmVisor from "../componentes/AdmVisor.jsx";
import Footer from "../componentes/Footer.jsx";
import AdminProviderAPI from "../componentes/context/AdminContextAPI.jsx";


const Admin = () => {
  return (
    <>
    <AdminProviderAPI>
      <Header />
      <AdmAddLibro />
      <AdmVisor />
      <Footer />
    </AdminProviderAPI>
    </>
  )
};

export default Admin;
