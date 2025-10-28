import {
  Container,
  px,
  SimpleGrid,
  Stack,
  useMantineTheme,
  Image,
} from "@mantine/core";

const BASE_HEIGHT = 600;
const getSubHeight = (children, spacing) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default function ImageThreeGrid({ src1, src2, src3 }) {
  const theme = useMantineTheme();
  return (
    <Container px={0} my="xl" h={BASE_HEIGHT} mx={0} size="100%">
      <SimpleGrid cols={2}>
        <Image src={src1} radius="md" h={BASE_HEIGHT} />
        <Stack>
          <Image
            src={src2}
            radius="md"
            h={getSubHeight(2, px(theme.spacing.md))}
          />
          <Image
            src={src3}
            radius="md"
            h={getSubHeight(2, px(theme.spacing.md))}
          />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
