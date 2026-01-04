# Ejemplos de Uso

## cURL

```bash
# Tu IP actual
curl https://ip.guide/

# IP específica
curl https://ip.guide/8.8.8.8

# IP con formato bonito (requiere jq)
curl -s https://ip.guide/8.8.8.8 | jq .

# Consultar ASN
curl https://ip.guide/AS15169

# Consultar rango CIDR
curl https://ip.guide/192.168.0.0/16
```

---

## JavaScript (Fetch)

```javascript
// Consultar IP actual
async function getMyIP() {
  const response = await fetch('https://ip.guide/');
  const data = await response.json();
  console.log(`Tu IP: ${data.ip}`);
  console.log(`País: ${data.location.country}`);
  console.log(`Ciudad: ${data.location.city}`);
  return data;
}

// Consultar IP específica
async function lookupIP(ip) {
  const response = await fetch(`https://ip.guide/${ip}`);
  const data = await response.json();
  return data;
}

// Consultar ASN
async function lookupASN(asn) {
  const response = await fetch(`https://ip.guide/AS${asn}`);
  const data = await response.json();
  console.log(`${data.name} tiene ${data.prefixes.v4.length} prefijos IPv4`);
  return data;
}

// Uso
getMyIP();
lookupIP('8.8.8.8').then(data => console.log(data));
lookupASN(15169).then(data => console.log(data.organization));
```

---

## Python

```python
import requests

def get_my_ip():
    """Obtiene información de tu IP actual"""
    response = requests.get('https://ip.guide/')
    data = response.json()
    print(f"Tu IP: {data['ip']}")
    print(f"País: {data['location']['country']}")
    return data

def lookup_ip(ip: str):
    """Consulta información de una IP específica"""
    response = requests.get(f'https://ip.guide/{ip}')
    return response.json()

def lookup_asn(asn: int):
    """Consulta información de un ASN"""
    response = requests.get(f'https://ip.guide/AS{asn}')
    data = response.json()
    print(f"{data['name']}: {len(data['prefixes']['v4'])} prefijos IPv4")
    return data

# Uso
if __name__ == '__main__':
    my_info = get_my_ip()
    
    google_dns = lookup_ip('8.8.8.8')
    print(f"8.8.8.8 pertenece a {google_dns['network']['autonomous_system']['organization']}")
    
    google_asn = lookup_asn(15169)
    print(f"Google tiene {len(google_asn['prefixes']['v6'])} prefijos IPv6")
```

---

## PHP

```php
<?php

function getMyIP(): array {
    $response = file_get_contents('https://ip.guide/');
    return json_decode($response, true);
}

function lookupIP(string $ip): array {
    $response = file_get_contents("https://ip.guide/{$ip}");
    return json_decode($response, true);
}

function lookupASN(int $asn): array {
    $response = file_get_contents("https://ip.guide/AS{$asn}");
    return json_decode($response, true);
}

// Uso
$myInfo = getMyIP();
echo "Tu IP: " . $myInfo['ip'] . "\n";
echo "País: " . $myInfo['location']['country'] . "\n";

$googleDNS = lookupIP('8.8.8.8');
echo "8.8.8.8 -> " . $googleDNS['network']['autonomous_system']['organization'] . "\n";
```

---

## Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type IPInfo struct {
    IP      string `json:"ip"`
    Network struct {
        CIDR             string `json:"cidr"`
        AutonomousSystem struct {
            ASN          int    `json:"asn"`
            Name         string `json:"name"`
            Organization string `json:"organization"`
        } `json:"autonomous_system"`
    } `json:"network"`
    Location struct {
        City      string  `json:"city"`
        Country   string  `json:"country"`
        Latitude  float64 `json:"latitude"`
        Longitude float64 `json:"longitude"`
    } `json:"location"`
}

func lookupIP(ip string) (*IPInfo, error) {
    url := "https://ip.guide/"
    if ip != "" {
        url += ip
    }
    
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    
    var info IPInfo
    json.Unmarshal(body, &info)
    return &info, nil
}

func main() {
    // Tu IP
    myInfo, _ := lookupIP("")
    fmt.Printf("Tu IP: %s (%s)\n", myInfo.IP, myInfo.Location.Country)
    
    // Google DNS
    google, _ := lookupIP("8.8.8.8")
    fmt.Printf("8.8.8.8 -> %s\n", google.Network.AutonomousSystem.Organization)
}
```

---

## Casos de Uso Comunes

### Verificar si una IP es de un país específico

```javascript
async function isFromCountry(ip, countryCode) {
  const data = await fetch(`https://ip.guide/${ip}`).then(r => r.json());
  return data.network.autonomous_system.country === countryCode;
}

// Ejemplo: verificar si es de Estados Unidos
isFromCountry('8.8.8.8', 'US').then(result => {
  console.log(result ? 'Es de USA' : 'No es de USA');
});
```

### Obtener todos los prefijos de un ISP

```python
def get_isp_prefixes(asn: int) -> dict:
    """Obtiene todos los prefijos IPv4 e IPv6 de un ASN"""
    data = requests.get(f'https://ip.guide/AS{asn}').json()
    return {
        'organization': data['organization'],
        'ipv4_count': len(data['prefixes']['v4']),
        'ipv6_count': len(data['prefixes']['v6']),
        'prefixes': data['prefixes']
    }

# Ejemplo: prefijos de Cloudflare
cloudflare = get_isp_prefixes(13335)
print(f"Cloudflare: {cloudflare['ipv4_count']} IPv4, {cloudflare['ipv6_count']} IPv6")
```
