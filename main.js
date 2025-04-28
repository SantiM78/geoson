const map = L.map("map").setView([4.711, -74.0721], 11); // Bogotá

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

fetch("https://umap.openstreetmap.fr/es/map/mapa-tecnicos-g4s_1211986")
  .then((res) => res.json())
  .then((data) => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const info = feature.properties;
        const popupContent = `
          <strong>${info.nombre}</strong><br>
          Visitas: ${info.visitas}<br>
          Zona: ${info.zona}<br>
          <img src="${info.foto}" width="150px">
        `;
        layer.bindPopup(popupContent);
      },
      style: function (feature) {
        // Cambiar el color en base a la zona o visitas
        let color = "blue";
        if (feature.properties.zona === "Zona 1") {
          color = "red";
        } else if (feature.properties.visitas > 50) {
          color = "green";
        }

        return {
          color: color,
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5,
        };
      },
    }).addTo(map);
  })
  .catch((error) => {
    console.error("Error al cargar el GeoJSON:", error);
  });
