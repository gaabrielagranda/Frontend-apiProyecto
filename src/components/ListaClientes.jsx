import { useEffect, useState } from 'react';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {clientes.map((cliente) => (
        <li key={cliente.id}>
          {cliente.nombre} - {cliente.email} - {cliente.telefono}
        </li>
      ))}
    </ul>
  );
}

export default ListaClientes;