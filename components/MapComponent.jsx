// components/MapComponent.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MapComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fix for default marker icons
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-surface)",
          borderRadius: "0",
        }}
      >
        <p>Loading map...</p>
      </div>
    );
  }

  // Custom icon for corporate office (teal/primary color)
  const corporateIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Custom icon for manufacturing facility (blue color)
  const manufacturingIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Coordinates for both locations (verified from Google Maps)
  const corporateOffice = {
    position: [26.92029, 75.80175],
    name: "Corporate Office",
    address: "2 A Vanasthali Marg, S C Road, Jaipur, Rajasthan 302001",
    link: "https://maps.app.goo.gl/ej1HwtRCW7QxELd58",
  };

  const manufacturingFacility = {
    position: [26.9957070054532, 75.77252164706485],
    name: "Manufacturing Facility",
    address:
      "G1-818k, Road No. 14, Vishwakarma Industrial Area, Murlipura, Jaipur, Rajasthan 302013",
    link: "https://maps.app.goo.gl/BiuM81spZRvnQh9s8",
  };

  // Center the map between both locations
  const centerPosition = [
    (corporateOffice.position[0] + manufacturingFacility.position[0]) / 2,
    (corporateOffice.position[1] + manufacturingFacility.position[1]) / 2,
  ];

  return (
    <MapContainer
      center={centerPosition}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "0" }}
      className="leaflet-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Corporate Office Marker */}
      <Marker position={corporateOffice.position} icon={corporateIcon}>
        <Popup className="custom-popup">
          <div style={{ padding: "8px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                fontWeight: "600",
                color: "#134252",
              }}
            >
              🏢 {corporateOffice.name}
            </h4>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                lineHeight: "1.4",
                color: "#626C71",
              }}
            >
              {corporateOffice.address}
            </p>
            <a
              href={corporateOffice.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "6px 12px",
                background: "#21808D",
                color: "white",
                textDecoration: "none",
                borderRadius: "0",
                fontSize: "13px",
                fontWeight: "500",
                transition: "background 0.2s",
              }}
            >
              Get Directions →
            </a>
          </div>
        </Popup>
      </Marker>

      {/* Manufacturing Facility Marker */}
      <Marker
        position={manufacturingFacility.position}
        icon={manufacturingIcon}
      >
        <Popup className="custom-popup">
          <div style={{ padding: "8px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                fontWeight: "600",
                color: "#134252",
              }}
            >
              🏭 {manufacturingFacility.name}
            </h4>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                lineHeight: "1.4",
                color: "#626C71",
              }}
            >
              {manufacturingFacility.address}
            </p>
            <a
              href={manufacturingFacility.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "6px 12px",
                background: "#21808D",
                color: "white",
                textDecoration: "none",
                borderRadius: "0",
                fontSize: "13px",
                fontWeight: "500",
                transition: "background 0.2s",
              }}
            >
              Get Directions →
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
