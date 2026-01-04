# Endpoints de la API IP.Guide

## URL Base

```
https://ip.guide
```

---

## 1. Consultar IP Propia

Obtiene información de la IP desde donde se realiza la petición.

**Endpoint**: `GET /`

**Ejemplo**:
```bash
curl https://ip.guide/
```

**Respuesta**: Ver [estructura de respuesta IP](respuestas.md#respuesta-ip)

---

## 2. Consultar IP Específica

Obtiene información de cualquier dirección IPv4 o IPv6.

**Endpoint**: `GET /{IP}`

**Parámetros**:
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `IP` | string | Dirección IPv4 o IPv6 |

**Ejemplos**:
```bash
# IPv4
curl https://ip.guide/8.8.8.8

# IPv6
curl https://ip.guide/2607:f8b0:4004:801::200e
```

**Respuesta**: Ver [estructura de respuesta IP](respuestas.md#respuesta-ip)

---

## 3. Consultar Rango de Red (CIDR)

Obtiene información de un bloque de red en notación CIDR.

**Endpoint**: `GET /{CIDR}`

**Parámetros**:
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `CIDR` | string | Notación CIDR (ej: 192.168.1.0/24) |

**Ejemplo**:
```bash
curl https://ip.guide/191.108.64.0/20
```

**Respuesta**: Ver [estructura de respuesta CIDR](respuestas.md#respuesta-cidr)

---

## 4. Consultar Sistema Autónomo (ASN)

Obtiene información detallada de un ASN, incluyendo todos sus prefijos anunciados.

**Endpoint**: `GET /AS{number}`

**Parámetros**:
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `number` | integer | Número del Sistema Autónomo |

**Ejemplo**:
```bash
curl https://ip.guide/AS15169
```

**Respuesta**: Ver [estructura de respuesta ASN](respuestas.md#respuesta-asn)

---

## Notas

- **Sin autenticación**: No se requiere API key
- **Formato**: Todas las respuestas son JSON
- **CORS**: Habilitado para uso desde navegadores
- **Rate Limiting**: No documentado oficialmente, usar con responsabilidad
