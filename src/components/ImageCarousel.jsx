import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Image } from "@mantine/core";

export default function ImageCarousel({
  images,
  height = 400,
  withIndicators = true,
  radius = "md",
}) {
  return (
    <Carousel withIndicators={withIndicators} height={height}>
      {images.map((src, index) => (
        <Carousel.Slide key={index}>
          <Image
            src={src}
            radius={radius}
            fit="cover"
            style={{ height: "100%", width: "100%", objectPosition: "center" }}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
