import React from 'react';

export const TerminosView: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--color-navy)', marginBottom: '10px' }}>Términos y Condiciones</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Brillo Total — La Rioja, Argentina</p>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '30px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', lineHeight: '1.8', fontSize: '14px' }}>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>1. Información del Comercio</h3>
          <p><strong>Brillo Total</strong> es un emprendimiento dedicado a la comercialización, fraccionamiento y distribución de productos de limpieza sueltos y envasados, con sede en La Rioja Capital, Provincia de La Rioja, Argentina.</p>
          <p>El presente documento regula el uso de la plataforma web <strong>brillo-total.netlify.app</strong> y la relación comercial entre Brillo Total y sus clientes.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>2. Aceptación de los Términos</h3>
          <p>Al utilizar esta plataforma y enviar un pedido a través de WhatsApp, el cliente acepta los presentes términos y condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el servicio.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>3. Productos y Precios</h3>
          <p><strong>3.1.</strong> Los precios publicados en la plataforma están expresados en Pesos Argentinos (ARS) e incluyen IVA cuando corresponda.</p>
          <p><strong>3.2.</strong> Brillo Total ofrece dos modalidades de tarifa:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Minorista:</strong> Para consumidores finales que adquieran menos de 20 litros/unidades.</li>
            <li><strong>Mayorista:</strong> Para revendedores y clientes que adquieran 20 litros/unidades o más. Sujeto a verificación por parte del vendedor.</li>
          </ul>
          <p><strong>3.3.</strong> Los precios pueden variar sin previo aviso. El precio aplicable será el vigente al momento de realizar el pedido.</p>
          <p><strong>3.4.</strong> La disponibilidad de stock se muestra en tiempo real. En caso de falta de stock después de confirmado el pedido, el vendedor se comunicará para coordinar una alternativa o cancelación.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>4. Proceso de Pedido</h3>
          <p><strong>4.1.</strong> El cliente selecciona los productos deseados, completa el formulario con sus datos y envía el pedido a través de WhatsApp.</p>
          <p><strong>4.2.</strong> El pedido enviado por WhatsApp constituye una solicitud formal. Brillo Total confirmará la disponibilidad y coordinará la entrega o retiro mediante el mismo canal.</p>
          <p><strong>4.3.</strong> Brillo Total se reserva el derecho de rechazar pedidos que consideremos inapropiados o que excedan nuestra capacidad operativa.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>5. Envíos y Retiros</h3>
          <p><strong>5.1.</strong> Los pedidos pueden retirarse personalmente en nuestra sucursal de La Rioja Capital, en los horarios indicados en la sección "Ubicación".</p>
          <p><strong>5.2.</strong> El servicio de envío a domicilio está sujeto a disponibilidad y debe coordinarse previamente con el vendedor. Pueden aplicar costos adicionales.</p>
          <p><strong>5.3.</strong> El cliente es responsable de proporcionar una dirección de entrega correcta. Brillo Total no se responsabiliza por entregas fallidas debido a datos incorrectos.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>6. Fraccionamiento por Litro</h3>
          <p>Brillo Total fomenta el consumo responsable. Se invita a los clientes a traer sus propios envases para fraccionar. El peso del envase se descuenta al momento de la venta. Brillo Total no se responsabiliza por la calidad o seguridad de los envases proporcionados por el cliente.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>7. Cambios y Devoluciones</h3>
          <p><strong>7.1.</strong> Los productos de limpieza fraccionados no pueden ser devueltos ni cambiados por razones de higiene y seguridad, excepto si presentan defectos de fabricación comprobables.</p>
          <p><strong>7.2.</strong> Los cambios o reclamos deben realizarse dentro de las 48 horas posteriores a la recepción del pedido, presentando el comprobante de compra.</p>
          <p><strong>7.3.</strong> Brillo Total evaluará cada caso particular y resolverá de buena fe.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>8. Privacidad de los Datos</h3>
          <p><strong>8.1.</strong> Los datos personales proporcionados por el cliente (nombre, número de WhatsApp) serán utilizados exclusivamente para gestionar y dar seguimiento a su pedido.</p>
          <p><strong>8.2.</strong> Brillo Total no compartirá, venderá ni cederá información personal a terceros sin el consentimiento expreso del cliente, salvo obligación legal.</p>
          <p><strong>8.3.</strong> Al enviar un pedido, el cliente consiente el tratamiento de sus datos personales conforme a la Ley N° 25.326 de Protección de Datos Personales de la República Argentina.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>9. Responsabilidad</h3>
          <p>Brillo Total no se responsabiliza por daños directos o indirectos derivados del mal uso de los productos adquiridos. Las recomendaciones de uso son de carácter orientativo. El cliente es responsable de leer y seguir las instrucciones de cada producto.</p>
        </section>

        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>10. Legislación Aplicable</h3>
          <p>Los presentes términos se rigen por las leyes de la República Argentina. Ante cualquier controversia, las partes se someten a la jurisdicción de los tribunales ordinarios de la Provincia de La Rioja, renunciando a cualquier otro fuero o jurisdicción.</p>
        </section>

        <section style={{ marginBottom: 0 }}>
          <h3 style={{ color: 'var(--color-primary)' }}>11. Modificaciones</h3>
          <p>Brillo Total se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma. Se recomienda al cliente revisar periódicamente esta sección.</p>
        </section>

        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--color-border-light)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '13px' }}>
          <p>Última actualización: Julio 2026</p>
        </div>
      </div>
    </div>
  );
};
