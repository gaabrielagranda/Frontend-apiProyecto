import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ClienteList from './components/ClienteList.jsx';
import EmpleadoList from './components/EmpleadoList.jsx';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container d-flex flex-column justify-content-center py-4">
        <h1 className="text-dark text-center mb-5">Gestión de Clientes y Empleados!</h1>
        
        {/* Lista de Clientes */}
        <div className="mb-5">
          <h2 className="text-center mb-3">Clientes</h2>
          <div className="w-100 p-3">
            <ClienteList />
          </div>
        </div>

         {/* Sección de empleados */}
         <div>
          <h2 className="text-center mb-3">Empleados</h2>
          <div className="w-100 p-3">
            <EmpleadoList />
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
export default App