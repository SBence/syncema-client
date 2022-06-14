import { Grid } from "@mantine/core";
import ChatBox from "./main/ChatBox.js";

export default function MainContent({ socket, userID, roomID, connected }) {
  return (
    <Grid>
      <Grid.Col md={6} lg={9}>
        Video
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
