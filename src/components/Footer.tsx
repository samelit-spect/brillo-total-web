import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h3 className={styles.brandTitle}>✨ Brillo Total</h3>
          <p className={styles.text}>
            Venta mayorista y minorista de productos de limpieza sueltos y envasados de alta calidad para el hogar y el automotor.
          </p>
        </div>

        <div>
          <h4 className={styles.sectionTitle}>📍 Contacto</h4>
          <p className={styles.contactLine}>{UBICACION.direccion}</p>
          <p className={styles.contactLine}>📦 Fraccionamiento por Litro</p>
          <p className={styles.text}>💬 Pedidos por WhatsApp</p>
        </div>

        <div>
          <h4 className={styles.sectionTitle}>⏰ Horarios</h4>
          <p className={styles.scheduleLabel}>Lun a Vie:</p>
          <p className={styles.scheduleValue}>{UBICACION.horarios.semana}</p>
          <p className={styles.scheduleLabel}>Sábados:</p>
          <p className={styles.scheduleValueLast}>{UBICACION.horarios.sabado}</p>
        </div>
      </div>

      <div className={styles.socialRow}>
        <a
          href={`https://www.instagram.com/${UBICACION.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <span className={styles.socialDotInstagram} />
          Instagram
        </a>
        <a
          href={`https://www.facebook.com/${UBICACION.facebook}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <span className={styles.socialDotFacebook} />
          Facebook
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLinkWhatsapp}
        >
          <span className={styles.socialDotWhatsapp} />
          WhatsApp
        </a>
      </div>

      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          &copy; {new Date().getFullYear()} Brillo Total. Todos los derechos reservados.
        </p>
        <p className={styles.copyrightSmall}>
          Hecho con 🐾 en La Rioja, Argentina
        </p>
        <button
          onClick={() => navigate('/terminos')}
          className={styles.termsLink}
        >
          Términos y Condiciones
        </button>
      </div>
    </footer>
  );
};
