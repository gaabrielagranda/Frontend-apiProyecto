import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

function EmpleadoFormModal({ show, handleClose, empleado, onSave }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    puesto: ''
  });

  useEffect(() => {
    if (empleado) {
      setFormData(empleado);  
    } else {
      setFormData({
        nombre: '',
        email: '',
        puesto: ''
      });
    }
  }, [empleado]);  

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
        <Modal.Title>Formulario de Empleado</Modal.Title>
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
            <Form.Label>Puesto</Form.Label>
            <Form.Control
              type="text"
              name="puesto"
              value={formData.puesto}
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

EmpleadoFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  empleado: PropTypes.shape({
    nombre: PropTypes.string,
    email: PropTypes.string,
    puesto: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired
};

EmpleadoFormModal.defaultProps = {
    empleado: {
    nombre: '',
    email: '',
    puesto: ''
  }
};

export default EmpleadoFormModal;