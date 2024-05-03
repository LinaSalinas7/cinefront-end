import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [cantidadAsientos, setCantidadAsientos] = useState(0);

  useEffect(() => {
    cargarReservaciones();
  }, []);

  const cargarReservaciones = async () => {
    try {
      const response = await axios.get('/reservaciones');
      setReservaciones(response.data);
    } catch (error) {
      console.error('Error al cargar las reservaciones:', error);
    }
  };

  const crearReservacion = async () => {
    try {
      await axios.post('/reservaciones/crear', {
        nombreCliente,
        cantidadAsientos
      });
      cargarReservaciones();
      // Limpiar los campos después de crear la reservación
      setNombreCliente('');
      setCantidadAsientos(0);
    } catch (error) {
      console.error('Error al crear la reservación:', error);
    }
  };

  const cancelarReservacion = async (id) => {
    try {
      await axios.delete(`/reservaciones/cancelar/${id}`);
      cargarReservaciones();
    } catch (error) {
      console.error('Error al cancelar la reservación:', error);
    }
  };

  return (
    <div>
      <h2>Reservaciones</h2>
      <div>
        <h3>Crear Reservación</h3>
        <input
          type="text"
          placeholder="Nombre del Cliente"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad de Asientos"
          value={cantidadAsientos}
          onChange={(e) => setCantidadAsientos(e.target.value)}
        />
        <button onClick={crearReservacion}>Crear Reservación</button>
      </div>
      <div>
        <h3>Reservaciones Actuales</h3>
        <ul>
          {reservaciones.map((reservacion) => (
            <li key={reservacion.id}>
              Cliente: {reservacion.nombreCliente} - Asientos: {reservacion.cantidadAsientos}
              <button onClick={() => cancelarReservacion(reservacion.id)}>Cancelar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservaciones;
