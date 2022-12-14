import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  useMantineTheme,
} from "@mantine/core";

import MainContent from "./shell/MainContent.js";
import HeaderContent from "./shell/HeaderContent.js";
import * as URLParamUtils from "../utils/URLParamUtils.js";
import QueueContent from "./shell/QueueContent.js";
import { showNotification } from "@mantine/notifications";

export default function SyncemaShell({
  socket,
  username,
  setUsername,
  roomID,
  setRoomID,
}) {
  const theme = useMantineTheme();
  const [listOpened, setListOpened] = useState(false);

  const [userID, setUserID] = useState();
  const [connected, setConnected] = useState(false);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      setConnected(socket.connected);
    });

    socket.on("memberJoined", (username) => {
      showNotification({
        message: `Member joined: ${username}`,
      });
    });

    socket.on("memberLeft", () => {
      showNotification({
        color: "red",
        message: `Member left`, // TODO: Show username
      });
    });

    socket.on("kick", () => {
      window.location.replace(window.location.origin);
    });

    socket.on("queueUpdate", (newQueue) => {
      setQueue(newQueue);
    });

    socket.on("nameChanged", (newName) => {
      localStorage.setItem("username", newName);
      setUsername(newName);
      showNotification({
        title: `Username successfully changed to: ${newName}`,
        color: "green",
      });
    });

    socket.on("joinedRoom", ({ roomID, userID }) => {
      setRoomID(roomID);
      URLParamUtils.set("room", roomID);
      setUserID(userID);
      localStorage.setItem("userID", userID);

      let recentRooms = JSON.parse(localStorage.getItem("recentRooms"));
      if (roomID.length > 4) {
        if (recentRooms) {
          if (!recentRooms.includes(roomID)) {
            if (recentRooms.length >= 5) recentRooms.pop();
          } else {
            recentRooms.splice(recentRooms.indexOf(roomID), 1);
          }
          recentRooms.unshift(roomID);
        } else {
          recentRooms = [roomID];
        }
        localStorage.setItem("recentRooms", JSON.stringify(recentRooms));
      }
    });
  }, []);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!listOpened}
          width={{ sm: 200, lg: 350 }}
        >
          <QueueContent
            socket={socket}
            userID={userID}
            roomID={roomID}
            connected={connected}
            queue={queue}
          />
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <HeaderContent
            listOpened={listOpened}
            setListOpened={setListOpened}
            roomID={roomID}
            connected={connected}
            username={username}
            socket={socket}
          />
        </Header>
      }
    >
      <MainContent
        socket={socket}
        userID={userID}
        roomID={roomID}
        connected={connected}
        currentVideoURL={queue[0]?.url}
        listOpened={listOpened}
      />
    </AppShell>
  );
}
