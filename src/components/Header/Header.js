import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-scroll'; // Para scroll suave
import logo from '../../assets/logo.png'; // Asegúrate de tener un logo en assets

function Header({ onReserveClick }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo Salón de Eventos Oasis" className={styles.logo} />
                <span className={styles.brandName}> </span>
            </div>
            <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                <ul>
                    <li>
                        <a href="#salon-section" >
                            Salón
                        </a>
                    </li>
                    <li>
                        <a href="#gallery-section" >
                            Galería
                        </a>
                    </li>
                    <li>
                        <a href="#testimonials-section" >
                            Testimonios
                        </a>
                    </li>
                    <li>
                        <button className={styles.reserveButton} onClick={onReserveClick}>
                            Reservar Ahora
                        </button>
                    </li>
                </ul>
            </nav>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </header>
    );
}

export default Header;
