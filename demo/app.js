/**
 * IP.Guide Explorer - Aplicación Demo
 * Consume la API de ip.guide para mostrar información de IPs, redes y ASN
 */

// ============================================
// Estado de la aplicación
// ============================================
const state = {
    currentType: 'ip',
    map: null,
    marker: null
};

// ============================================
// API
// ============================================
const API_BASE = 'https://ip.guide';

async function fetchIPInfo(ip = '') {
    const url = ip ? `${API_BASE}/${ip}` : API_BASE;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al consultar: ${response.status}`);
    }
    return response.json();
}

async function fetchASNInfo(asn) {
    const asnNumber = asn.toString().replace(/^AS/i, '');
    const response = await fetch(`${API_BASE}/AS${asnNumber}`);
    if (!response.ok) {
        throw new Error(`Error al consultar ASN: ${response.status}`);
    }
    return response.json();
}

// ============================================
// UI - Mi IP
// ============================================
async function loadMyIP() {
    const container = document.getElementById('myIpContent');
    container.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Detectando tu IP...</span>
    `;
    
    try {
        const data = await fetchIPInfo();
        const flag = getCountryFlag(data.network?.autonomous_system?.country || '');
        
        container.innerHTML = `
            <span class="my-ip-value">${data.ip}</span>
            <span class="my-ip-location">
                <span class="flag">${flag}</span>
                ${data.location?.city ? data.location.city + ', ' : ''}${data.location?.country || 'Desconocido'}
            </span>
        `;
        
        // Mostrar en mapa
        if (data.location?.latitude && data.location?.longitude) {
            showOnMap(data.location.latitude, data.location.longitude, data.ip);
        }
    } catch (error) {
        container.innerHTML = `
            <div class="error-message">
                <span>❌</span>
                <span>No se pudo detectar tu IP: ${error.message}</span>
            </div>
        `;
    }
}

// ============================================
// UI - Búsqueda
// ============================================
async function performSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.trim();
    
    if (!query) {
        showError('Por favor ingresa una IP o ASN');
        return;
    }
    
    const resultsCard = document.getElementById('resultsCard');
    const resultsContent = document.getElementById('resultsContent');
    const resultsTitle = document.getElementById('resultsTitle');
    
    resultsCard.style.display = 'block';
    resultsContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="loading-spinner"></div>
            <span>Consultando...</span>
        </div>
    `;
    
    try {
        if (state.currentType === 'asn') {
            const data = await fetchASNInfo(query);
            resultsTitle.textContent = `📊 ASN ${data.asn}`;
            renderASNResults(data);
        } else {
            const data = await fetchIPInfo(query);
            resultsTitle.textContent = `📊 ${data.ip || query}`;
            renderIPResults(data);
            
            if (data.location?.latitude && data.location?.longitude) {
                showOnMap(data.location.latitude, data.location.longitude, data.ip);
            }
        }
    } catch (error) {
        resultsContent.innerHTML = `
            <div class="error-message">
                <span>❌</span>
                <span>${error.message}</span>
            </div>
        `;
    }
}

function renderIPResults(data) {
    const container = document.getElementById('resultsContent');
    const flag = getCountryFlag(data.network?.autonomous_system?.country || '');
    
    container.innerHTML = `
        <!-- Información de IP -->
        <div class="result-section">
            <h3>📍 Información General</h3>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">IP</span>
                    <span class="result-value highlight">${data.ip || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">País</span>
                    <span class="result-value">${flag} ${data.location?.country || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Ciudad</span>
                    <span class="result-value">${data.location?.city || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Zona Horaria</span>
                    <span class="result-value">${data.location?.timezone || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Latitud</span>
                    <span class="result-value">${data.location?.latitude?.toFixed(4) || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Longitud</span>
                    <span class="result-value">${data.location?.longitude?.toFixed(4) || 'N/A'}</span>
                </div>
            </div>
        </div>
        
        <!-- Información de Red -->
        <div class="result-section">
            <h3>🌐 Información de Red</h3>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">CIDR</span>
                    <span class="result-value highlight">${data.network?.cidr || data.cidr || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Rango Inicio</span>
                    <span class="result-value">${data.network?.hosts?.start || data.hosts?.start || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Rango Fin</span>
                    <span class="result-value">${data.network?.hosts?.end || data.hosts?.end || 'N/A'}</span>
                </div>
            </div>
        </div>
        
        <!-- Información de ASN -->
        <div class="result-section">
            <h3>🏢 Sistema Autónomo</h3>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">ASN</span>
                    <span class="result-value highlight">AS${data.network?.autonomous_system?.asn || data.autonomous_system?.asn || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Nombre</span>
                    <span class="result-value">${data.network?.autonomous_system?.name || data.autonomous_system?.name || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Organización</span>
                    <span class="result-value">${data.network?.autonomous_system?.organization || data.autonomous_system?.organization || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">RIR</span>
                    <span class="result-value">${data.network?.autonomous_system?.rir || data.autonomous_system?.rir || 'N/A'}</span>
                </div>
            </div>
        </div>
    `;
}

function renderASNResults(data) {
    const container = document.getElementById('resultsContent');
    const flag = getCountryFlag(data.country || '');
    
    const v4Count = data.prefixes?.v4?.length || 0;
    const v6Count = data.prefixes?.v6?.length || 0;
    const v4Preview = (data.prefixes?.v4 || []).slice(0, 20);
    const v6Preview = (data.prefixes?.v6 || []).slice(0, 20);
    
    container.innerHTML = `
        <!-- Información del ASN -->
        <div class="result-section">
            <h3>🏢 Sistema Autónomo</h3>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">ASN</span>
                    <span class="result-value highlight">AS${data.asn}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Nombre</span>
                    <span class="result-value">${data.name || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Organización</span>
                    <span class="result-value">${data.organization || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">País</span>
                    <span class="result-value">${flag} ${data.country || 'N/A'}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">RIR</span>
                    <span class="result-value">${data.rir || 'N/A'}</span>
                </div>
            </div>
        </div>
        
        <!-- Prefijos IPv4 -->
        <div class="result-section asn-prefixes">
            <h3>📦 Prefijos IPv4 (${v4Count})</h3>
            <div class="prefix-list" id="prefixListV4">
                ${v4Preview.map(p => `<span class="prefix-tag">${p}</span>`).join('')}
            </div>
            ${v4Count > 20 ? `<button class="prefix-toggle" onclick="togglePrefixes('v4', ${JSON.stringify(data.prefixes.v4).replace(/"/g, '&quot;')})">Mostrar todos (${v4Count})</button>` : ''}
        </div>
        
        <!-- Prefijos IPv6 -->
        <div class="result-section asn-prefixes">
            <h3>📦 Prefijos IPv6 (${v6Count})</h3>
            <div class="prefix-list" id="prefixListV6">
                ${v6Preview.map(p => `<span class="prefix-tag">${p}</span>`).join('')}
            </div>
            ${v6Count > 20 ? `<button class="prefix-toggle" onclick="togglePrefixes('v6', ${JSON.stringify(data.prefixes.v6).replace(/"/g, '&quot;')})">Mostrar todos (${v6Count})</button>` : ''}
        </div>
    `;
    
    // Ocultar mapa para ASN (no hay ubicación)
    document.getElementById('mapCard').style.display = 'none';
}

function togglePrefixes(type, prefixes) {
    const container = document.getElementById(`prefixList${type.toUpperCase()}`);
    const currentCount = container.children.length;
    const allPrefixes = typeof prefixes === 'string' ? JSON.parse(prefixes) : prefixes;
    
    if (currentCount < allPrefixes.length) {
        container.innerHTML = allPrefixes.map(p => `<span class="prefix-tag">${p}</span>`).join('');
    } else {
        container.innerHTML = allPrefixes.slice(0, 20).map(p => `<span class="prefix-tag">${p}</span>`).join('');
    }
}

function showError(message) {
    const resultsCard = document.getElementById('resultsCard');
    const resultsContent = document.getElementById('resultsContent');
    
    resultsCard.style.display = 'block';
    resultsContent.innerHTML = `
        <div class="error-message">
            <span>⚠️</span>
            <span>${message}</span>
        </div>
    `;
}

// ============================================
// Mapa
// ============================================
function initMap() {
    state.map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([20, 0], 2);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
    }).addTo(state.map);
}

function showOnMap(lat, lng, label = '') {
    const mapCard = document.getElementById('mapCard');
    mapCard.style.display = 'block';
    
    if (!state.map) {
        initMap();
    }
    
    // Remover marker anterior
    if (state.marker) {
        state.map.removeLayer(state.marker);
    }
    
    // Crear nuevo marker
    const icon = L.divIcon({
        html: `<div style="
            width: 20px;
            height: 20px;
            background: #6366f1;
            border: 3px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
        "></div>`,
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    state.marker = L.marker([lat, lng], { icon }).addTo(state.map);
    
    if (label) {
        state.marker.bindPopup(`<b>${label}</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`).openPopup();
    }
    
    state.map.setView([lat, lng], 10, { animate: true });
}

// ============================================
// Utilidades
// ============================================
function getCountryFlag(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    
    return String.fromCodePoint(...codePoints);
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Cargar mi IP al inicio
    loadMyIP();
    
    // Botón refrescar
    document.getElementById('refreshMyIp').addEventListener('click', loadMyIP);
    
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.currentType = tab.dataset.type;
            
            const input = document.getElementById('searchInput');
            input.placeholder = state.currentType === 'asn' 
                ? 'Ej: 15169 o AS15169' 
                : 'Ej: 8.8.8.8 o 192.168.0.0/24';
        });
    });
    
    // Búsqueda
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Ejemplos
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.dataset.query;
            const type = btn.dataset.type;
            
            // Cambiar tab si es necesario
            if (type !== state.currentType) {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelector(`.tab[data-type="${type}"]`).classList.add('active');
                state.currentType = type;
            }
            
            document.getElementById('searchInput').value = query;
            performSearch();
        });
    });
    
    // Cerrar resultados
    document.getElementById('closeResults').addEventListener('click', () => {
        document.getElementById('resultsCard').style.display = 'none';
    });
});
