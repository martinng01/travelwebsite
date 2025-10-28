import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Container, Image } from "@mantine/core";

export default function ImageCarousel({
  images,
  height = 600,
  withIndicators = true,
  radius = "md",
}) {
  return (
    <Container px={0} py="xl" h={600} mx={0} size="100%">
      <Carousel
        withIndicators={withIndicators}
        height={height}
        emblaOptions={{
          loop: true,
        }}
      >
        {images.map((src, index) => (
          <Carousel.Slide key={index}>
            <Image
              src={src}
              radius={radius}
              fit="cover"
              style={{
                height: "100%",
                width: "100%",
                objectPosition: "center",
              }}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}
