import { useEffect, useState } from 'react';

function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/empleado')
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {empleados.map((empleado) => (
        <li key={empleado.id}>
          {empleado.nombre} - {empleado.email} - {empleado.puesto}
        </li>
      ))}
    </ul>
  );
}

export default ListaEmpleados;