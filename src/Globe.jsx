import Globe from "react-globe.gl";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function GlobeComponent() {
  const globeEl = useRef();
  const [places, setPlaces] = useState([]);

  // Function to handle point clicks and rotate globe
  const handlePointClick = (point) => {
    const globe = globeEl.current;
    // Smoothly rotate and zoom to the clicked point
    globe.pointOfView(
      {
        lat: point.lat,
        lng: point.lng,
        altitude: 0.2, // Closer zoom - reduced from 2.5 to 1.5
      },
      1500 // Slightly longer animation duration for smoother zoom
    );
  };

  useEffect(() => {
    const globe = globeEl.current;

    // Add clouds layer
    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.002; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
        })
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
  }, []);

  useEffect(() => {
    setPlaces([
      // 🌏 Asia
      { name: "Bangkok", lat: 13.7563, lng: 100.5018, color: "#ff9f1c" },
      { name: "Istanbul", lat: 41.0082, lng: 28.9784, color: "#70a1ff" },
      { name: "Cappadocia", lat: 38.6431, lng: 34.8273, color: "#5352ed" },
      { name: "Taiwan", lat: 23.6978, lng: 120.9605, color: "#ffa502" },
      { name: "Chongqing", lat: 29.4316, lng: 106.9123, color: "#2ed573" },
      { name: "Chengdu", lat: 30.5728, lng: 104.0668, color: "#1e90ff" },
      { name: "Kota Kinabalu", lat: 5.9804, lng: 116.0735, color: "#eccc68" },
      { name: "Kundasang", lat: 5.989, lng: 116.593, color: "#ff7f50" },

      // 🇪🇺 Europe
      { name: "Malta", lat: 35.9375, lng: 14.3754, color: "#ffa502" },
      { name: "Barcelona", lat: 41.3851, lng: 2.1734, color: "#ff7f50" },
      { name: "Paris", lat: 48.8566, lng: 2.3522, color: "#ff4757" },
      { name: "London", lat: 51.5074, lng: -0.1278, color: "#70a1ff" },
      { name: "Galway", lat: 53.2707, lng: -9.0568, color: "#5352ed" },
      { name: "Vilnius", lat: 54.6872, lng: 25.2797, color: "#2ed573" },
      { name: "Kaunas", lat: 54.8985, lng: 23.9036, color: "#7bed9f" },
      { name: "Riga", lat: 56.9496, lng: 24.1052, color: "#1e90ff" },
      { name: "Tallinn", lat: 59.437, lng: 24.7535, color: "#2f3542" },
      { name: "Tirana", lat: 41.3275, lng: 19.8189, color: "#ff6348" },
      { name: "Sarandë", lat: 39.8756, lng: 20.0055, color: "#ff9f43" },
      { name: "Kotor", lat: 42.4247, lng: 18.7712, color: "#eccc68" },
      { name: "Dubrovnik", lat: 42.6507, lng: 18.0944, color: "#70a1ff" },
      { name: "Split", lat: 43.5081, lng: 16.4402, color: "#2ed573" },
      { name: "Mostar", lat: 43.3438, lng: 17.8078, color: "#ff7f50" },
      { name: "Žabljak", lat: 43.1556, lng: 19.1223, color: "#1e90ff" },
      { name: "Rome", lat: 41.9028, lng: 12.4964, color: "#ff9f1c" },
      { name: "Florence", lat: 43.7696, lng: 11.2558, color: "#ff7f50" },
      { name: "Venice", lat: 45.4408, lng: 12.3155, color: "#ffa502" },
      { name: "Milan", lat: 45.4642, lng: 9.19, color: "#ff4757" },
      { name: "Kraków", lat: 50.0647, lng: 19.945, color: "#1e90ff" },
      { name: "Zakopane", lat: 49.2992, lng: 19.9496, color: "#3742fa" },
    ]);
  }, []);

  return (
    <div className="w-screen h-screen">
      <Globe
        ref={globeEl}
        animateIn={false}
        globeImageUrl="earth.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="stars.jpg"
        showAtmosphere={true}
        atmosphereAltitude={0.25}
        htmlElementsData={places}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={(d) => {
          const marker = document.createElement("div");
          marker.onclick = () => handlePointClick(d);
          marker.style.width = "12px";
          marker.style.height = "12px";
          marker.style.borderRadius = "50%";
          marker.style.backgroundColor = d.color;
          marker.style.border = "2px solid white";
          marker.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
          marker.style.cursor = "pointer";
          marker.style.pointerEvents = "auto";
          marker.style.transform = "translate(-50%, -50%)";
          marker.style.transition = "all 0.3s ease";

          // Add hover effect
          marker.addEventListener("mouseenter", () => {
            marker.style.transform = "translate(-50%, -50%) scale(1.3)";
            marker.style.boxShadow = "0 4px 8px rgba(0,0,0,0.4)";
          });

          marker.addEventListener("mouseleave", () => {
            marker.style.transform = "translate(-50%, -50%) scale(1)";
            marker.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
          });

          // Create container with label
          const container = document.createElement("div");
          container.style.position = "relative";
          container.style.pointerEvents = "auto";

          // Add country label (initially hidden)
          const label = document.createElement("div");
          label.textContent = d.name;
          label.style.position = "absolute";
          label.style.top = "20px";
          label.style.left = "50%";
          label.style.transform = "translateX(-50%)";
          label.style.backgroundColor = "rgba(0,0,0,0.8)";
          label.style.color = "white";
          label.style.padding = "4px 8px";
          label.style.borderRadius = "4px";
          label.style.fontSize = "12px";
          label.style.fontWeight = "bold";
          label.style.whiteSpace = "nowrap";
          label.style.opacity = "0";
          label.style.transition = "opacity 0.3s ease";
          label.style.pointerEvents = "none";

          // Show label on hover
          container.addEventListener("mouseenter", () => {
            label.style.opacity = "1";
          });

          container.addEventListener("mouseleave", () => {
            label.style.opacity = "0";
          });

          container.appendChild(marker);
          container.appendChild(label);

          return container;
        }}
        htmlTransitionDuration={1000}
        onHtmlElementClick={handlePointClick}
      />
    </div>
  );
}

export default GlobeComponent;
