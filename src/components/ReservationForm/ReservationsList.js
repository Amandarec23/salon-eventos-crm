import React, { useEffect, useState } from 'react';
import styles from './ReservationForm.module.css';

function ReservationsList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Intentando obtener reservas de la API...');
    fetch('http://localhost/Backend-salon/api/v1/get_reservas.php')
      .then((res) => {
        console.log('Respuesta recibida:', res);
        if (!res.ok) {
          throw new Error('HTTP status ' + res.status);
        }
        return res.json();
      })
      .then((result) => {
        console.log('JSON recibido:', result);
        if (result.success) {
          setReservations(result.data);
        } else {
          setReservations([]);
          setError('No se pudieron obtener las reservas (success=false)');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener reservas:', err);
        setError('Error al cargar las reservas: ' + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Cargando reservas...</div>;
  if (error) return <div className={styles.error}>Ocurrió un error: {error}</div>;

  return (
    <div className={styles.reservationsListContainer}>
      <h2 className={styles.title2} style={{ color: '#a57248', textAlign: 'center' }}>Todas las Reservas</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.reservationsTable} border="1"> 
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Participantes</th>
              <th>Costo Total</th>
              <th>Estado</th>
              <th>Fecha de Reserva</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="9">No hay reservas registradas.</td>
              </tr>
            ) : (
              reservations.map((reserva, i) => (
                <tr key={reserva.id || i}>
                  <td>{reserva.nombre_completo}</td>
                  <td>{reserva.email}</td>
                  <td>{reserva.telefono}</td>
                  <td>{reserva.fecha_inicio}</td>
                  <td>{reserva.fecha_fin}</td>
                  <td>{reserva.num_participantes}</td>
                  <td>${Number(reserva.costo_total).toLocaleString('es-CO', {minimumFractionDigits: 2})}</td>
                  <td>{reserva.estado}</td>
                  <td>{reserva.fecha_reserva}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReservationsList;
