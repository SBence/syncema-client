import { Badge, Grid, Group, Image, Paper, Text, Title } from "@mantine/core";

export default function VideoCard({ video }) {
  return (
    <Paper
      shadow="xs"
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[6],
        "&:hover": {
          backgroundColor: theme.colors.dark[5],
        },
      })}
    >
      <Grid grow>
        <Grid.Col span={3}>
          <Image radius="md" src={video.thumbnailURL} alt="Video thumbnail" />
        </Grid.Col>
        <Grid.Col span={9}>
          <Group position="apart">
            <Title order={5} style={{ textOverflow: "ellipsis" }}>
              {video.title}
            </Title>
            <Badge
              color={video.duration.toLowerCase() === "live" ? "red" : "gray"}
              variant="filled"
            >
              {video.duration}
            </Badge>
          </Group>
          <Text>{`Queued by: ${video.queuedBy}`}</Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
