if (document.getElementById('map')) {
    var map = L.map('map', { zoomControl: false }).setView([17.3850, 78.4867], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Default Pulse
    L.circle([17.3850, 78.4867], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 800 }).addTo(map);
}