# IP.Guide Explorer

<p align="center">
  <img src="https://img.shields.io/badge/API-ip.guide-6366f1?style=for-the-badge" alt="IP.Guide API">
  <img src="https://img.shields.io/badge/Licencia-MIT-22d3ee?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/Estado-Activo-10b981?style=for-the-badge" alt="Active">
</p>

<p align="center">
  Documentación y demo interactiva para la API gratuita de <a href="https://ip.guide">ip.guide</a>
</p>

---

## 🌟 ¿Qué es IP.Guide?

**IP.Guide** es una API REST gratuita y sin autenticación para consultar información de:

- 📍 **Direcciones IP** (IPv4 e IPv6) - Geolocalización y datos de red
- 🌐 **Rangos CIDR** - Información de bloques de red
- 🏢 **Sistemas Autónomos (ASN)** - Organización y prefijos anunciados

## 🚀 Inicio Rápido

```bash
# Tu IP actual
curl https://ip.guide/

# IP específica
curl https://ip.guide/8.8.8.8

# Sistema Autónomo
curl https://ip.guide/AS15169
```

## 📁 Estructura del Proyecto

```
IP.Guide/
├── index.html          # Landing page
├── demo/               # Aplicación demo interactiva
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docs/               # Documentación HTML
│   ├── index.html      # Página principal
│   ├── styles.css      # Estilos compartidos
│   ├── endpoints.html  # Documentación de endpoints
│   ├── respuestas.html # Estructura de respuestas
│   └── ejemplos.html   # Ejemplos de código
├── README.md           # Este archivo
├── CHANGELOG.md        # Historial de cambios
└── LICENSE             # Licencia MIT
```

## 🎮 Demo Interactiva

La demo permite:
- Ver tu IP actual automáticamente
- Buscar cualquier IP, CIDR o ASN
- Visualizar ubicación en mapa
- Explorar prefijos de ASN

### Ejecutar localmente

```bash
# Clonar repositorio
git clone https://github.com/bladealex9848/IP.Guide.git
cd IP.Guide

# Iniciar servidor local
python3 -m http.server 8080

# Abrir en navegador
open http://localhost:8080
```

## 📖 Documentación

| Documento | Descripción |
|-----------|-------------|
| [Introducción](docs/index.html) | Visión general del servicio |
| [Endpoints](docs/endpoints.html) | Todos los endpoints disponibles |
| [Respuestas](docs/respuestas.html) | Estructura de respuestas JSON |
| [Ejemplos](docs/ejemplos.html) | Código en JS, Python, PHP, Go |

## 🔗 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Tu IP actual |
| GET | `/{IP}` | IP específica (IPv4/IPv6) |
| GET | `/{CIDR}` | Rango de red |
| GET | `/AS{num}` | Sistema Autónomo |

## 📊 Ejemplo de Respuesta

```json
{
  "ip": "8.8.8.8",
  "network": {
    "cidr": "8.8.8.0/24",
    "autonomous_system": {
      "asn": 15169,
      "name": "GOOGLE",
      "organization": "Google LLC"
    }
  },
  "location": {
    "country": "United States",
    "latitude": 37.751,
    "longitude": -97.822
  }
}
```

## 🛠️ Tecnologías

- **HTML5** + **CSS3** con variables CSS
- **JavaScript** vanilla (sin frameworks)
- **Leaflet.js** para mapas interactivos
- API de **ip.guide** (gratuita, sin autenticación)

## 👤 Autor

**Alexander Oviedo Fadul**

- 🌐 Website: [alexanderoviedofadul.dev](https://alexanderoviedofadul.dev)
- 💼 GitHub: [@bladealex9848](https://github.com/bladealex9848)

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  Hecho con ❤️ por <a href="https://alexanderoviedofadul.dev">Alexander Oviedo Fadul</a>
</p>

