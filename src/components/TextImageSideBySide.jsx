import { Grid, Text, Image, Box } from "@mantine/core";

export function TextImageSideBySide({
  children,
  imageSrc,
  imageAlt = "Image",
  textSize = "md",
  imageHeight = 400,
}) {
  return (
    <Grid align="flex-start" gutter="xl">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Text size={textSize}>{children}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          radius="md"
          h={imageHeight}
          fit="cover"
        />
      </Grid.Col>
    </Grid>
  );
}

// Usage example:
// <TextImageSide
//   imageSrc="/images/kotor.jpeg"
//   imageAlt="Kotor"
//   imageHeight={400}
// >
//   This is a description that appears on the left side.
//   It can be as long as needed and will align vertically with the image.
// </TextImageSide>
