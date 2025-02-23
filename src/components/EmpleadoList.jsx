import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import EmpleadoFormModal from './EmpleadoFormModal.jsx';

function EmpleadoList() {
    const [empleados, setEmpleados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  
    useEffect(() => {
      fetchEmpleados();
    }, []);
  
    const fetchEmpleados = () => {
      fetch('http://127.0.0.1:8000/api/empleado')
        .then(response => response.json())
        .then(data => setEmpleados(data))
        .catch(error => console.error('Error al cargar los datos:', error));
    };
  
    const handleDelete = (id) => {
      fetch(`http://127.0.0.1:8000/api/empleado/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setEmpleados(empleados.filter(empleado => empleado.id !== id));
          } else {
            console.error('Error al eliminar el empleado');
          }
        })
        .catch(error => console.error('Error al eliminar el empleado:', error));
    };
  
    const handleCreate = (empleado) => {
      fetch('http://127.0.0.1:8000/api/empleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      })
        .then(response => response.json())
        .then(data => {
          setEmpleados([...empleados, data]);
          setShowModal(false);
        })
        .catch(error => console.error('Error al crear el empleado:', error));
    };
  
    const handleUpdate = (empleado) => {
      fetch(`http://127.0.0.1:8000/api/empleado/${empleado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar el empleado');
          }
          return response.json();
        })
        .then(data => {
          setEmpleados(empleados.map(cli => (cli.id === data.id ? data : cli)));
          setShowModal(false);
        })
        .catch(error => console.error('Error al actualizar el empleado:', error));
    };
  
    const handleSave = (empleado) => {
      console.log('Empleado a guardar:', empleado);  
      if (empleado.id) {
        handleUpdate(empleado);
      } else {
        handleCreate(empleado);
      }
    };
  
    return (
      <Container>
        <h2>Lista de Empleados</h2>
        <Button onClick={() => { setSelectedEmpleado(null); setShowModal(true); }}>Agregar Empleado</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Puesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(cli => (
              <tr key={cli.id}>
                <td>{cli.nombre}</td>
                <td>{cli.email}</td>
                <td>{cli.puesto}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => { 
                    setSelectedEmpleado(cli); 
                    setShowModal(true); 
                  }}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(cli.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {showModal && (
          <EmpleadoFormModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            empleado={selectedEmpleado}
            onSave={handleSave}
          />
        )}
      </Container>
    );
  }
  
  export default EmpleadoList;