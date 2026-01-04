# IP.Guide - Documentación

## ¿Qué es IP.Guide?

**IP.Guide** es una API REST gratuita y de código abierto que proporciona información detallada sobre direcciones IP, rangos de red (CIDR) y Sistemas Autónomos (ASN).

## Características Principales

| Característica | Descripción |
|----------------|-------------|
| 🆓 **Gratuita** | Sin costos, sin límites de uso conocidos |
| 🔓 **Sin Autenticación** | No requiere API key ni registro |
| 🌍 **IPv4 e IPv6** | Soporta ambos protocolos |
| 📍 **Geolocalización** | Ciudad, país, zona horaria, coordenadas |
| 🌐 **Información de Red** | CIDR, rango de hosts, ASN |
| 🏢 **Datos de ASN** | Organización, RIR, prefijos anunciados |

## Casos de Uso

- **Seguridad**: Identificar origen de tráfico sospechoso
- **Analytics**: Geolocalizar visitantes de tu sitio web
- **DevOps**: Automatizar verificaciones de infraestructura
- **Investigación**: Análisis de redes y sistemas autónomos

## Inicio Rápido

```bash
# Obtener info de tu IP actual
curl https://ip.guide/

# Consultar una IP específica
curl https://ip.guide/8.8.8.8

# Consultar un ASN
curl https://ip.guide/AS15169
```

## Contenido de la Documentación

- [**Endpoints**](api/endpoints.md) - Todos los endpoints disponibles
- [**Respuestas**](api/respuestas.md) - Estructura de las respuestas JSON
- [**Ejemplos**](ejemplos/ejemplos.md) - Código de ejemplo en varios lenguajes

## Demo Interactiva

Consulta la [aplicación demo](/demo/index.html) para ver IP.Guide en acción con:
- Consulta de tu IP automática
- Búsqueda de cualquier IP
- Explorador de ASN
- Visualización en mapa

---

*Documentación basada en la investigación del servicio ip.guide*
