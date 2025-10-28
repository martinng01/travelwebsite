import { Grid, Text, Image, Container } from "@mantine/core";

export default function TextImageSideBySide({
  children,
  src,
  textSize = "md",
  h = 600,
}) {
  return (
    <Container px={0} my="xl" h={600} mx={0} size="100%">
      <Grid align="flex-start" gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text size={textSize}>{children}</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image src={src} radius="md" h={h} />
        </Grid.Col>
      </Grid>
    </Container>
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
