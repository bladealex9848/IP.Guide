# Estructura de Respuestas JSON

## Respuesta IP

Para consultas de IP individual (`/` o `/{IP}`):

```json
{
  "ip": "8.8.8.8",
  "network": {
    "cidr": "8.8.8.0/24",
    "hosts": {
      "start": "8.8.8.1",
      "end": "8.8.8.254"
    },
    "autonomous_system": {
      "asn": 15169,
      "name": "GOOGLE",
      "organization": "Google LLC",
      "country": "US",
      "rir": "ARIN"
    }
  },
  "location": {
    "city": "Mountain View",
    "country": "United States",
    "timezone": "America/Los_Angeles",
    "latitude": 37.386,
    "longitude": -122.0838
  }
}
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `ip` | string | Dirección IP consultada |
| `network.cidr` | string | Bloque de red en notación CIDR |
| `network.hosts.start` | string | Primera IP utilizable del rango |
| `network.hosts.end` | string | Última IP utilizable del rango |
| `network.autonomous_system.asn` | integer | Número del Sistema Autónomo |
| `network.autonomous_system.name` | string | Nombre corto del ASN |
| `network.autonomous_system.organization` | string | Nombre de la organización |
| `network.autonomous_system.country` | string | Código de país (ISO 3166-1 alpha-2) |
| `network.autonomous_system.rir` | string | Registro Regional de Internet (ARIN, RIPE, APNIC, LACNIC, AFRINIC) |
| `location.city` | string\|null | Ciudad (puede ser null) |
| `location.country` | string | País |
| `location.timezone` | string | Zona horaria (formato IANA) |
| `location.latitude` | number | Latitud |
| `location.longitude` | number | Longitud |

---

## Respuesta CIDR

Para consultas de rango de red (`/{CIDR}`):

```json
{
  "cidr": "191.108.64.0/20",
  "hosts": {
    "start": "191.108.64.1",
    "end": "191.108.79.254"
  },
  "autonomous_system": {
    "asn": 3816,
    "name": "COLOMBIA TELECOMUNICACIONES S.A. ESP BIC",
    "organization": "COLOMBIA TELECOMUNICACIONES S.A. ESP BIC",
    "country": "CO",
    "rir": "LACNIC"
  }
}
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `cidr` | string | Bloque de red consultado |
| `hosts.start` | string | Primera IP utilizable |
| `hosts.end` | string | Última IP utilizable |
| `autonomous_system.*` | object | Misma estructura que en respuesta IP |

> **Nota**: Las respuestas CIDR no incluyen información de geolocalización.

---

## Respuesta ASN

Para consultas de Sistema Autónomo (`/AS{number}`):

```json
{
  "asn": 15169,
  "name": "GOOGLE",
  "organization": "Google LLC",
  "country": "US",
  "rir": "ARIN",
  "prefixes": {
    "v4": [
      "8.8.4.0/24",
      "8.8.8.0/24",
      "8.34.208.0/20",
      ...
    ],
    "v6": [
      "2001:4860::/32",
      "2404:6800::/32",
      ...
    ]
  }
}
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `asn` | integer | Número del Sistema Autónomo |
| `name` | string | Nombre corto del ASN |
| `organization` | string | Nombre completo de la organización |
| `country` | string | Código de país |
| `rir` | string | Registro Regional de Internet |
| `prefixes.v4` | array | Lista de prefijos IPv4 anunciados |
| `prefixes.v6` | array | Lista de prefijos IPv6 anunciados |

---

## Códigos RIR

| Código | Nombre | Región |
|--------|--------|--------|
| ARIN | American Registry for Internet Numbers | Norteamérica |
| RIPE | Réseaux IP Européens | Europa, Medio Oriente, Asia Central |
| APNIC | Asia-Pacific Network Information Centre | Asia-Pacífico |
| LACNIC | Latin America and Caribbean Network Information Centre | Latinoamérica y Caribe |
| AFRINIC | African Network Information Centre | África |
