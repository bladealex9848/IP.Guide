# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-03

### Añadido

- **Landing Page** (`index.html`)
  - Diseño moderno con tema oscuro y glassmorphism
  - Hero section con ejemplo de código en vivo
  - Sección de características (features)
  - Sección de endpoints disponibles
  - Navegación responsive
  - Call-to-action para la demo

- **Demo Interactiva** (`demo/`)
  - Detección automática de IP del visitante
  - Búsqueda de cualquier IP (IPv4/IPv6)
  - Búsqueda de rangos CIDR
  - Explorador de ASN con prefijos
  - Mapa interactivo con Leaflet.js
  - Diseño premium con animaciones

- **Documentación** (`docs/`)
  - `README.md` - Visión general del servicio IP.Guide
  - `api/endpoints.md` - Documentación de todos los endpoints
  - `api/respuestas.md` - Estructura de respuestas JSON
  - `ejemplos/ejemplos.md` - Código de ejemplo en múltiples lenguajes

- **Estructura GitHub**
  - `README.md` - Documentación del repositorio
  - `CHANGELOG.md` - Historial de cambios
  - `LICENSE` - Licencia MIT
  - `.gitignore` - Archivos a ignorar

### Características Técnicas

- Sin dependencias de build (HTML/CSS/JS puro)
- Diseño completamente responsive
- Consumo de API ip.guide sin autenticación
- Mapa interactivo con tiles de CartoDB Dark
