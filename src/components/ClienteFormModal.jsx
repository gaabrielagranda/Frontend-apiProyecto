import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

function ClienteFormModal({ show, handleClose, cliente, onSave }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);  
    } else {
      setFormData({
        nombre: '',
        email: '',
        telefono: ''
      });
    }
  }, [cliente]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
    handleClose();  
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Formulario de Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

ClienteFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  cliente: PropTypes.shape({
    nombre: PropTypes.string,
    email: PropTypes.string,
    telefono: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired
};

ClienteFormModal.defaultProps = {
  cliente: {
    nombre: '',
    email: '',
    telefono: ''
  }
};

export default ClienteFormModal;