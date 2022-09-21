import { Grid } from "@mantine/core";
import ChatBox from "./main/ChatBox.js";
import VideoPlayer from "./main/VideoPlayer.js";

export default function MainContent({
  socket,
  userID,
  roomID,
  connected,
  currentVideoURL,
}) {
  return (
    <Grid>
      <Grid.Col md={6} lg={9}>
        <VideoPlayer videoID={currentVideoURL} />
      </Grid.Col>
      <Grid.Col md={6} lg={3}>
        <ChatBox
          socket={socket}
          userID={userID}
          roomID={roomID}
          connected={connected}
        />
      </Grid.Col>
    </Grid>
  );
}
