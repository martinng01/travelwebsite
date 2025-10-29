import React, { useRef, useState, useEffect } from "react";
import Globe from "react-globe.gl";
import { Drawer, Loader, Text, Container } from "@mantine/core";

import useGlobeSize from "./useGlobeSize";
import useClouds from "./useClouds";
import usePosts from "./usePosts";
import slugify from "./slugify";
import { createMarker } from "./GlobeMarkers";
import { PLACES } from "./places"; // optional: if you move your places list out

function GlobeComponent() {
  const globeEl = useRef();
  const globeContainerRef = useRef(null);

  // Automatically tracks container size on window resize
  const { width, height } = useGlobeSize(globeContainerRef);

  // Add clouds
  useClouds(globeEl);

  // Drawer + post state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);

  // Dynamic import of MDX post
  const { PostComponent, loading, error } = usePosts(selectedSlug);

  // Disable page scroll when globe is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 📌 Handle clicking a marker → focus & open drawer
  const handlePointClick = (point) => {
    const globe = globeEl.current;
    globe.pointOfView({ lat: point.lat, lng: point.lng, altitude: 0.2 }, 1500);

    const slug = slugify(point.name);
    setSelectedSlug(slug);
    setTimeout(() => setDrawerOpen(true), 1000);
  };

  return (
    <div ref={globeContainerRef} style={{ width: "100vw", height: "100vh" }}>
      <Globe
        ref={globeEl}
        width={width}
        height={height}
        animateIn={false}
        globeImageUrl="earth.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="stars.jpg"
        showAtmosphere={true}
        atmosphereAltitude={0.25}
        htmlElementsData={PLACES}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={(d) => createMarker(d, handlePointClick)}
        htmlTransitionDuration={1000}
      />

      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        withCloseButton={false}
        offset={8}
        radius="md"
        position="right"
        size={1000}
      >
        {loading ? (
          <Container>
            <Loader />
            <Text>Loading post...</Text>
          </Container>
        ) : error ? (
          <Text>{error}</Text>
        ) : PostComponent ? (
          <PostComponent />
        ) : (
          <Text>Select a place with a post to view details.</Text>
        )}
      </Drawer>
    </div>
  );
}

export default GlobeComponent;
