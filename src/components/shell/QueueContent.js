import { ActionIcon, Space, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { PlaylistAdd } from "tabler-icons-react";
import VideoCard from "./queue/VideoCard.js";

export default function QueueContent({
  socket,
  userID,
  roomID,
  connected,
  queue,
}) {
  const [draft, setDraft] = useState("");

  let videoIndex = 0;
  const queueElements = [];
  for (const video of queue) {
    queueElements.push(
      <VideoCard
        key={videoIndex}
        video={video}
        videoIndex={videoIndex}
        queueLength={queue.length}
        socket={socket}
        userID={userID}
      />
    );
    videoIndex += 1;
  }

  return (
    <>
      <Title order={3}>Queue</Title>
      <Space h="xs" />
      <Stack
        style={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {queueElements}
      </Stack>
      <Space h="md" />
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
            disabled={!(roomID && connected && draft)}
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
