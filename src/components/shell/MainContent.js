import { Grid } from "@mantine/core";
import ChatBox from "./main/ChatBox.js";
import VideoPlayer from "./main/VideoPlayer.js";

export default function MainContent({
  socket,
  userID,
  roomID,
  connected,
  currentVideoURL,
  listOpened,
}) {
  return (
    <Grid style={{ height: "100%" }}>
      <Grid.Col md={6} lg={9}>
        <VideoPlayer
          socket={socket}
          userID={userID}
          videoURL={currentVideoURL}
          listOpened={listOpened}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={3} style={{ display: "flex" }}>
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
