import React from "react";
import { Container } from "@mantine/core";

function ImmersiveVideo({ src }) {
  return (
    <Container
      px={0}
      py={0}
      my={0}
      mx="auto"
      size="60%"
      style={{ height: "100vh" }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          display: "block",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </Container>
  );
}

export default ImmersiveVideo;
