import React from 'react';

export const TerminosView: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)', marginTop: 'var(--space-4)' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
          Términos y Condiciones
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Brillo Total — La Rioja, Argentina</p>
      </div>

      <div style={{
        backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)', border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)', lineHeight: '1.8', fontSize: '14px',
      }}>
        {[
          { n: 1, t: 'Información del Comercio', c: '<strong>Brillo Total</strong> es un emprendimiento dedicado a la comercialización, fraccionamiento y distribución de productos de limpieza sueltos y envasados, con sede en La Rioja Capital, Provincia de La Rioja, Argentina. El presente documento regula el uso de la plataforma web <strong>brillo-total.netlify.app</strong> y la relación comercial entre Brillo Total y sus clientes.' },
          { n: 2, t: 'Aceptación de los Términos', c: 'Al utilizar esta plataforma y enviar un pedido a través de WhatsApp, el cliente acepta los presentes términos y condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el servicio.' },
          { n: 3, t: 'Productos y Precios', c: 'Los precios publicados están expresados en Pesos Argentinos (ARS) e incluyen IVA cuando corresponda. Brillo Total ofrece dos modalidades de tarifa: Minorista (para consumidores finales que adquieran menos de 20 litros/unidades) y Mayorista (para revendedores y clientes que adquieran 20 litros/unidades o más, sujeto a verificación). Los precios pueden variar sin previo aviso. La disponibilidad de stock se muestra en tiempo real.' },
          { n: 4, t: 'Proceso de Pedido', c: 'El cliente selecciona los productos deseados, completa el formulario con sus datos y envía el pedido a través de WhatsApp. El pedido enviado constituye una solicitud formal. Brillo Total confirmará la disponibilidad y coordinará la entrega o retiro mediante el mismo canal. Nos reservamos el derecho de rechazar pedidos que consideremos inapropiados.' },
          { n: 5, t: 'Envíos y Retiros', c: 'Los pedidos pueden retirarse personalmente en nuestra sucursal. El servicio de envío a domicilio está sujeto a disponibilidad y debe coordinarse previamente. El cliente es responsable de proporcionar una dirección de entrega correcta.' },
          { n: 6, t: 'Fraccionamiento por Litro', c: 'Brillo Total fomenta el consumo responsable. Se invita a los clientes a traer sus propios envases para fraccionar. El peso del envase se descuenta al momento de la venta. Brillo Total no se responsabiliza por la calidad o seguridad de los envases proporcionados por el cliente.' },
          { n: 7, t: 'Cambios y Devoluciones', c: 'Los productos de limpieza fraccionados no pueden ser devueltos ni cambiados por razones de higiene, excepto si presentan defectos de fabricación comprobables. Los cambios o reclamos deben realizarse dentro de las 48 horas posteriores a la recepción del pedido.' },
          { n: 8, t: 'Privacidad de los Datos', c: 'Los datos personales proporcionados serán utilizados exclusivamente para gestionar y dar seguimiento al pedido. Brillo Total no compartirá, venderá ni cederá información personal a terceros sin el consentimiento expreso del cliente, salvo obligación legal.' },
          { n: 9, t: 'Responsabilidad', c: 'Brillo Total no se responsabiliza por daños directos o indirectos derivados del mal uso de los productos adquiridos. Las recomendaciones de uso son de carácter orientativo.' },
          { n: 10, t: 'Legislación Aplicable', c: 'Los presentes términos se rigen por las leyes de la República Argentina. Ante cualquier controversia, las partes se someten a la jurisdicción de los tribunales ordinarios de la Provincia de La Rioja.' },
          { n: 11, t: 'Modificaciones', c: 'Brillo Total se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.' },
        ].map((s) => (
          <section key={s.n} style={{ marginBottom: 'var(--space-5)' }}>
            <h3 style={{ color: 'var(--color-primary)', margin: '0 0 var(--space-2)', fontSize: '17px' }}>
              {s.n}. {s.t}
            </h3>
            <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: s.c }} />
          </section>
        ))}

        <div style={{
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-5)',
          borderTop: '1px solid var(--color-border-light)',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '13px',
        }}>
          <p>Última actualización: Julio 2026</p>
        </div>
      </div>
    </div>
  );
};
