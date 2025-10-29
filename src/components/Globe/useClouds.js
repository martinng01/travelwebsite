import { useEffect } from "react";
import * as THREE from "three";

export default function useClouds(globeRef) {
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.002;

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (texture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({ map: texture, transparent: true })
      );
      globe.scene().add(clouds);

      const rotate = () => {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotate);
      };
      rotate();
    });
  }, [globeRef]);
}
