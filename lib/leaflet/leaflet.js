const map = L.map("map").setView([4.711, -74.0721], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    fetch("https://raw.githubusercontent.com/SantiM78/geoson/main/mapa_tecnicos_g4s.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el GeoJSON");
        }
        return response.json();
      })
      .then((data) => {
        L.geoJSON(data, {
          onEachFeature: function (feature, layer) {
            const props = feature.properties;
            const zonaImg = props.zona?.toLowerCase().replace(/\s/g, "-");
            const img = zonaImg
              ? `<img src="assets/img/${zonaImg}.jpg" width="200" style="margin-top: 5px; border-radius: 8px;">`
              : "";
            const popup = `
              <strong>${props.name || "Técnico"}</strong><br>
              ${props.description || "Sin descripción"}<br>
              ${img}
            `;
            layer.bindPopup(popup);
          },
        }).addTo(map);
      })
      .catch((error) => {
        console.error("Error al cargar GeoJSON:", error);
        alert("No se pudo cargar el mapa. Intenta con un servidor local o revisa la consola.");
      });

