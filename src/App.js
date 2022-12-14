import {
  Box,
  Button,
  Center,
  Group,
  MantineProvider,
  Overlay,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useEffect, useState } from "react";
import SyncemaShell from "./components/SyncemaShell.js";
import { io } from "socket.io-client";
import * as URLParamUtils from "./utils/URLParamUtils.js";

const socket = io("http://localhost:3031");

export default function App() {
  const [roomID, setRoomID] = useState();
  const [username, setUsername] = useState(
    localStorage.getItem("username") ?? "Guest"
  );
  const [userRoomID, setUserRoomID] = useState("");

  function joinRoom(roomToJoin) {
    socket.emit("joinRoom", {
      roomID: roomToJoin,
      userID: localStorage.getItem("userID"),
      username: username,
    });
  }

  useEffect(() => {
    const URLRoomID = URLParamUtils.get("room");
    if (URLRoomID) joinRoom(URLRoomID);
  }, []);

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <Box sx={{ height: "100%", position: "relative" }}>
          {!roomID && (
            <Overlay opacity={1} color="#000" zIndex={201}>
              <Center style={{ width: "100%", height: "100%" }}>
                <Stack>
                  <Title>Welcome to Syncema!</Title>
                  <Group position="center">
                    <TextInput
                      value={userRoomID}
                      onChange={(event) =>
                        setUserRoomID(event.currentTarget.value)
                      }
                    />
                    <Button
                      disabled={!userRoomID}
                      onClick={() => joinRoom(userRoomID)}
                    >
                      Join or create named room
                    </Button>
                  </Group>
                  <Button onClick={() => joinRoom()}>Create random room</Button>
                </Stack>
              </Center>
            </Overlay>
          )}
          <SyncemaShell
            socket={socket}
            username={username}
            setUsername={setUsername}
            roomID={roomID}
            setRoomID={setRoomID}
          />
        </Box>
      </NotificationsProvider>
    </MantineProvider>
  );
}
