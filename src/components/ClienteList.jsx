import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ClienteFormModal from './ClienteFormModal.jsx';

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    fetch('http://127.0.0.1:8000/api/cliente')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/cliente/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setClientes(clientes.filter(cliente => cliente.id !== id));
        } else {
          console.error('Error al eliminar el cliente');
        }
      })
      .catch(error => console.error('Error al eliminar el cliente:', error));
  };

  const handleCreate = (cliente) => {
    fetch('http://127.0.0.1:8000/api/cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(response => response.json())
      .then(data => {
        setClientes([...clientes, data]);
        setShowModal(false);
      })
      .catch(error => console.error('Error al crear el cliente:', error));
  };

  const handleUpdate = (cliente) => {
    fetch(`http://127.0.0.1:8000/api/cliente/${cliente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el cliente');
        }
        return response.json();
      })
      .then(data => {
        setClientes(clientes.map(cli => (cli.id === data.id ? data : cli)));
        setShowModal(false);
      })
      .catch(error => console.error('Error al actualizar el cliente:', error));
  };

  const handleSave = (cliente) => {
    console.log('Cliente a guardar:', cliente);  
    if (cliente.id) {
      handleUpdate(cliente);
    } else {
      handleCreate(cliente);
    }
  };

  return (
    <Container>
      <h2>Lista de Clientes</h2>
      <Button onClick={() => { setSelectedCliente(null); setShowModal(true); }}>Agregar Cliente</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cli => (
            <tr key={cli.id}>
              <td>{cli.nombre}</td>
              <td>{cli.email}</td>
              <td>{cli.telefono}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => { 
                  setSelectedCliente(cli); 
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
        <ClienteFormModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          cliente={selectedCliente}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}

export default ClienteList;