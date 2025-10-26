// src/components/PostImage.jsx
import { Image, Box } from "@mantine/core";

export function PostImage({ src, alt, side = false }) {
  if (side) {
    return (
      <Box className="md:w-1/3 md:float-left md:mr-6 mb-4">
        <Image src={src} alt={alt} radius="md" />
      </Box>
    );
  }

  return (
    <Box className="my-4">
      <Image src={src} alt={alt} radius="md" />
    </Box>
  );
}
