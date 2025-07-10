// src/App.js
import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import SalonSection from './components/SalonSection/SalonSection';
import GallerySection from './components/GallerySection/GallerySection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import ReservationForm from './components/ReservationForm/ReservationForm';
import ReservationsList from './components/ReservationForm/ReservationsList';
import NewTestimonialForm from './components/TestimonialsSection/NewTestimonialForm';
import './App.css';
import SalonInfo from './components/SalonSection/SalonInfo';
import SalonServicios from './components/SalonSection/SalonServicios';
import g1 from './assets/gallery-img-1.jpeg';
import g2 from './assets/gallery-img-2.jpeg';
import g3 from './assets/gallery-img-3.jpeg';
import g4 from './assets/gallery-img-4.jpeg';
import g5 from './assets/gallery-img-5.jpeg';
import g6 from './assets/gallery-img-6.jpeg';
function App() {
  // Enlace de navegación simple para ejemplo
  const Navigation = () => (
    <nav style={{textAlign: 'center', margin: '1rem 0'}}>
      <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
      <Link to="/reservas">Ver Reservas</Link>
    </nav>
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialsData, setTestimonialsData] = useState([]);

  const openReservationModal = () => setIsModalOpen(true);
  const closeReservationModal = () => setIsModalOpen(false);

  // ✅ Cargar testimonios desde la API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost/Backend-salon/api/v1/testimonios.php');
        const data = await response.json();

        // Formatear los datos si es necesario
        const formattedData = data.map(testimonio => ({
          name: testimonio.nombre_cliente,
          comment: testimonio.comentario,
          rating: parseInt(testimonio.calificacion)
        }));

        setTestimonialsData(formattedData);
      } catch (error) {
        console.error('Error al cargar testimonios:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const salonData = {
    name: "S&A Salón de Eventos",
    description: "Es el lugar perfecto para celebrar tus momentos más especiales...",
    amenities: [
      "Aire acondicionado central",
      "Equipo de sonido profesional",
      "Iluminación ambiental personalizable",
      "Proyector y pantalla grande",
      "Cocina equipada para catering",
      "Estacionamiento privado",
      "Wifi de alta velocidad",
      "Personal de seguridad y limpieza"
    ],
    pricePerDay: 500.00,
    pricePerNight: 700.00,
    images: [
      { src: '/assets/salon-img-1.jpg', alt: 'Vista general del salón' },
      { src: '/assets/salon-img-2.jpg', alt: 'Salón decorado para boda' },
      { src: '/assets/salon-img-3.jpg', alt: 'Área de recepción' },
    ]
  };
  
  const galleryImages = [
    { src: g1, alt: 'Evento nocturno' },
    { src: g2, alt: 'Decoración floral' },
    { src: g3, alt: 'Mesa de dulces' },
    { src: g4, alt: 'Pista de baile' },
    { src: g5, alt: 'Barra de bebidas' },
    { src: g6, alt: 'Fachada del salón' },
  ];

  return (
    <Router>
      <div className="App">
        <Header onReserveClick={openReservationModal} />
        <Navigation />
        <Routes>
          <Route path="/" element={
            <main>
              <Banner onReserveClick={openReservationModal} />
              <SalonSection salon={salonData} onReserveClick={openReservationModal} />
              <SalonInfo />
              <SalonServicios />
              <GallerySection images={galleryImages} />
              <TestimonialsSection testimonials={testimonialsData} />
              <NewTestimonialForm />
            </main>
          } />
          <Route path="/reservas" element={<ReservationsList />} />
        </Routes>
        <Footer />
        <Modal isOpen={isModalOpen} onClose={closeReservationModal}>
          <ReservationForm
            onClose={closeReservationModal}
            salonPriceDay={salonData.pricePerDay}
            salonPriceNight={salonData.pricePerNight}
          />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
