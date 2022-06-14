import { ActionIcon, Stack, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { PlaylistAdd } from "tabler-icons-react";
import VideoCard from "./queue/VideoCard.js";

export default function QueueContent({ socket, userID, roomID, connected }) {
  const [draft, setDraft] = useState("");
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.on("queueUpdate", (newQueue) => {
      setQueue(newQueue);
    });
  }, []);

  const queueElements = [];
  for (const video of queue) {
    queueElements.push(<VideoCard video={video} />);
  }

  return (
    <>
      <Title order={3}>Queue</Title>
      <Stack>{queueElements}</Stack>
      <TextInput
        value={draft}
        type="text"
        disabled={!(roomID && connected)}
        error={!(roomID && connected)}
        placeholder={roomID && connected ? "" : "Queue disconnected"}
        onChange={(event) => setDraft(event.currentTarget.value)}
        rightSection={
          <ActionIcon
            variant="default"
            disabled={!(roomID && connected)}
            onClick={() => {
              socket.emit("enqueueVideo", { userID: userID, videoURL: draft });
              setDraft("");
            }}
          >
            <PlaylistAdd size={20} />
          </ActionIcon>
        }
      />
    </>
  );
}
