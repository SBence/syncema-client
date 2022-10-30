import {
  Badge,
  Button,
  Grid,
  Group,
  HoverCard,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { ChevronDown, ChevronUp, PlaylistX } from "tabler-icons-react";

export default function VideoCard({ video, videoIndex, socket, userID }) {
  return (
    <HoverCard shadow="md">
      <HoverCard.Target>
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
              <Image
                radius="md"
                src={video.thumbnailURL}
                alt="Video thumbnail"
              />
            </Grid.Col>
            <Grid.Col
              span={9}
              style={{
                minWidth: 0,
              }}
            >
              <Title
                order={5}
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {video.title}
              </Title>
              <Badge
                color={video.duration.toLowerCase() === "live" ? "red" : "gray"}
                variant="filled"
              >
                {video.duration}
              </Badge>
              <Text
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >{`Queued by: ${video.queuedBy}`}</Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Group>
          <Button leftIcon={<ChevronDown />}>Move up</Button>
          <Button
            color="red"
            leftIcon={<PlaylistX />}
            onClick={() => {
              socket.emit("removeVideo", {
                userID: userID,
                videoIndex: videoIndex,
              });
            }}
          >
            Remove
          </Button>
          <Button leftIcon={<ChevronUp />}>Move down</Button>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
