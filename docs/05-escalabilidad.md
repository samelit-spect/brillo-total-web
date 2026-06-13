# 📂 Análisis de Escalabilidad y Contexto Local

Este documento responde de forma fundamentada a la Guía de Evaluación de Arquitectura para la plataforma de **Brillo Total**, analizando el comportamiento del sistema ante el crecimiento del tráfico, la carga de datos y las limitaciones de conectividad del entorno real.

---

## ⚡ 1. Escalabilidad de Carga y Tráfico (RPS y Concurrencia)

### A. Patrón de Tráfico Estimado
El comercio presenta un patrón de tráfico de tipo **asíncrono con picos estacionales de demanda**. Los picos se concentran principalmente a fin y principio de mes (período de cobro de salarios en la administración pública y comercios de La Rioja), momentos en los cuales los clientes minoristas y los revendedores mayoristas realizan el abastecimiento masivo de insumos de limpieza. El sistema estima una carga base de 5 RPS (Peticiones por Segundo) y picos concurrentes de hasta 40 RPS.

### B. Modelo de Concurrencia y Mitigación de Carga
* **I/O No Bloqueante:** Al delegar la lógica en la infraestructura Serverless de Firebase, la aplicación absorbe las consultas concurrentes de manera asíncrona a través de un bucle de eventos (*Event Loop*). Ninguna petición retiene hilos del servidor esperando lecturas de disco.
* **Diseño State-Less:** El frontend en React no almacena sesiones del lado de un servidor dedicado. Toda la información del carrito y el estado del cliente viaja en cada petición o se gestiona localmente en la aplicación (Context API). Esto permite que, si el tráfico escala abruptamente, la infraestructura distribuya la carga transparentemente sin corromper los datos del negocio.
* **Estrategia de Caching:** Los recursos estáticos e imágenes pesadas de los productos se almacenan localmente en el dispositivo mediante la **Cache Storage API** de la PWA. Esto reduce drásticamente el número de peticiones de red (RPS) que llegan a la base de datos en la nube, ya que el navegador solo consume datos de red cuando hay cambios reales en los precios o el stock.

---

## 💾 2. Escalabilidad de Datos (Teorema CAP y Almacenamiento)

### A. Tipo de Datos y Elección de Motor
Se seleccionó un motor **NoSQL (Cloud Firestore)** debido a la naturaleza documental e independiente de la información de preventa. Los productos no requieren relaciones complejas que exijan costosas operaciones de cruce de tablas (*JOINs*), lo que garantiza lecturas extremadamente veloces en smartphones de gama media-baja.

### B. Postura frente al Teorema CAP (Enfoque AP)
Ante una partición de red o caída de conectividad, el sistema prioriza de forma absoluta la **Disponibilidad y la Tolerancia a Particiones (Enfoque AP - Availability and Partition Tolerance)**.

* **Justificación de Negocio:** Para "Brillo Total" es crítico que el catálogo y el carrito sigan operativos en el celular del cliente aunque haya microcortes de internet. Firestore resuelve esto mediante su mecanismo de persistencia local: si un usuario pierde la conexión mientras arma su pedido, la aplicación no se congela ni arroja un error de servidor. Permite seguir interactuando con la interfaz y, una vez restablecido el enlace a internet, los datos se sincronizan en segundo plano logrando una **Consistencia Eventual**.

### C. Proyección de Crecimiento a 5 Años
Considerando un catálogo activo de 150 productos de limpieza estables (con variantes de fragancias y litros) y una estimación de 500 pedidos mensuales registrados de forma histórica, el volumen de datos generado se proyecta en:

$$\text{Volumen Anual} \approx 150 \text{ productos} \times 2\text{ KB} + 6000 \text{ pedidos} \times 5\text{ KB} \approx 30.3 \text{ MB por año}$$

A lo largo de 5 años, el total acumulado no superará los **155 MB de almacenamiento**, cifra que encaja perfectamente dentro del límite gratuito de 1 GB (Spark Plan de Firebase), garantizando la viabilidad económica absoluta del proyecto a largo plazo sin costos operativos de infraestructura.

---

## 📍 3. Justificación del Stack y Contexto Local

### A. Selección de Modelo Arquitectónico
Se seleccionó una variante del **Stack C (Jamstack / Serverless Híbrido)**. El Frontend estático es compilado y distribuido a través de redes de entrega de contenido (CDN) de Netlify globales, mientras que los datos mutables de precios y stock se consultan de manera asíncrona a la nube de Firebase.

### B. Pertinencia para el Contexto de La Rioja Capital
Esta decisión de arquitectura técnica se fundamenta directamente en las particularidades socio-económicas y de conectividad de la región:

* **Resiliencia ante Conectividad Inestable:** En zonas periféricas o durante picos de saturación de las redes móviles en la ciudad, una aplicación web tradicional fallaría al cargar. El enfoque PWA con caché e indexación local permite que los clientes sigan consultando el precio del desinfectante o detergente suelto sin pantallas en blanco.
* **Bajo Consumo de Datos Móviles:** Al descargar la estructura de la aplicación una sola vez (gracias a la arquitectura SPA), las navegaciones posteriores solo transfieren datos planos en formato JSON ligero, cuidando el consumo del paquete de datos móviles de los clientes y revendedores.
* **Costo Operativo Cero ($0):** Al encajar holgadamente dentro de las capas gratuitas de Netlify y Firebase, el emprendimiento familiar puede competir en el mercado digital con herramientas profesionales sin afrontar abonos mensuales en dólares, eliminando riesgos financieros para el comercio.

---

## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal.
* ⚙️ Ir a [Especificación del Stack Tecnológico](./04-stack-tecnologico.md).