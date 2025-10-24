import Globe from "react-globe.gl";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function GlobeComponent() {
  const globeEl = useRef();
  const [places, setPlaces] = useState([]);

  // Function to handle point clicks and rotate globe
  const handlePointClick = (point) => {
    console.log("hi");

    const globe = globeEl.current;

    // Temporarily disable auto-rotation
    globe.controls().autoRotate = false;

    // Smoothly rotate and zoom to the clicked point
    globe.pointOfView(
      {
        lat: point.lat,
        lng: point.lng,
        altitude: 1, // Closer zoom - reduced from 2.5 to 1.5
      },
      1500 // Slightly longer animation duration for smoother zoom
    );

    // Re-enable auto-rotation after a longer delay to enjoy the zoomed view
    setTimeout(() => {
      globe.controls().autoRotate = true;
    }, 5000);
  };

  useEffect(() => {
    const globe = globeEl.current;

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.1;

    // Add clouds layer
    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

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
      {
        name: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        color: "#ff6b35",
        country: "Singapore",
      },
      {
        name: "Japan",
        lat: 36.2048,
        lng: 138.2529,
        color: "#3742fa",
        country: "Japan",
      },
      {
        name: "United States",
        lat: 39.8283,
        lng: -98.5795,
        color: "#ff4757",
        country: "USA",
      },
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
          // Create a small marker for the country
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
