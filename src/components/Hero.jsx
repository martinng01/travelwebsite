// src/components/Hero.jsx
import { Container, Title } from "@mantine/core";

export function Hero({ title, image }) {
  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <Container className="relative z-10 text-center">
        <Title order={1} className="text-white text-5xl md:text-7xl font-bold">
          {title}
        </Title>
      </Container>
    </div>
  );
}
