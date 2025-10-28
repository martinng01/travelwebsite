import { Container, Image } from "@mantine/core";

export default function LandscapeImage({ src, radius = "md" }) {
  return (
    <Container px={0} py="xl" h={600} mx={0} size="100%">
      <Image
        src={src}
        radius={radius}
        fit="cover"
        style={{
          height: "100%",
          width: "100%",
          objectPosition: "center",
        }}
      />
    </Container>
  );
}
