import { Box, Grid, Text, Title, Group, ThemeIcon, Image } from "@mantine/core";
import { IconMapPin, IconCalendar, IconCamera } from "@tabler/icons-react";

export default function VerticalHero({
  title,
  content,
  location,
  date,
  image,
}) {
  return (
    <Box py="xl">
      <Grid gutter="xl" align="stretch">
        {/* Left column: text */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box>
            <Title order={1} fw={400} fz="2.5rem" mb="md" ff="serif">
              {title}
            </Title>

            <Text fz="md" c="dimmed" mb="lg" style={{ lineHeight: 1.8 }}>
              {content}
            </Text>

            <Box mt="lg">
              <Group gap="xs" mb={4}>
                <ThemeIcon variant="light" color="gray" size="sm" radius="xl">
                  <IconMapPin size={16} />
                </ThemeIcon>
                <Text>{location}</Text>
              </Group>

              <Group gap="xs" mb={4}>
                <ThemeIcon variant="light" color="gray" size="sm" radius="xl">
                  <IconCalendar size={16} />
                </ThemeIcon>
                <Text>{`Taken at ${date}`}</Text>
              </Group>
            </Box>
          </Box>
        </Grid.Col>

        {/* Right column: image */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Image
            src={image}
            radius="md"
            fit="cover"
            alt={title}
            style={{ height: "100%", minHeight: 400, objectPosition: "center" }}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
