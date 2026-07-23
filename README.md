# TribuCalma 🕊️
## Gestión de Servicios ITIL 4 para Terapia Neurodivergente

Plataforma ITSM que aplica el marco **ITIL 4** para la gestión de servicios de terapia para niños neurodivergentes. Incluye catálogo de servicios con SLAs, gestión de incidentes, solicitudes, cambios y mejora continua.

### 🚀 Características

- **Catálogo de Servicios** con SLAs y KPIs visuales
- **Service Desk** (Wilson Chat) con IA integrada (OpenRouter)
- **Portal de Solicitudes** (Request Fulfillment) con Ticket ID y flujo multi-paso
- **Gestión de Incidentes** con matriz de prioridades (Crítica, Alta, Media, Baja)
- **Gestión de Cambios** (Estándar, Normal, Emergencia)
- **Mejora Continua (CSI)** con feedback loop y dashboard de KPIs
- **Accesibilidad**: Alto contraste, letra grande, ruido blanco sensorial
- **Documentación ITIL 4** completa en español

### 🛠️ Stack

- HTML5 + Tailwind CSS (CDN)
- JavaScript Vanilla
- Font Awesome 6
- OpenRouter API (GPT-4o-mini) para Wilson Chat

### 🌐 Despliegue

Proyecto 100% estático — sin build necesaria. Desplegado en **Vercel**.

### 📁 Estructura

```
itil 4+/
├── hmtl.html              # Aplicación principal TribuCalma
├── itil4-documentacion.html # Guía completa ITIL 4
├── css/
│   ├── main.css
│   ├── components.css
│   └── accessibility.css
├── js/
│   ├── main.js
│   ├── booking.js
│   ├── incidents.js
│   ├── changes.js
│   ├── feedback.js
│   ├── services.js
│   └── wilson-chat.js
├── data/
│   └── config.js
└── tests/
    ├── booking.test.js
    ├── incidents.test.js
    └── services.test.js
```

### 📄 Licencia

Proyecto educativo basado en el marco ITIL 4 de Axelos.

