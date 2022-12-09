import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  useMantineTheme,
} from "@mantine/core";
import { io } from "socket.io-client";
import MainContent from "./shell/MainContent.js";
import HeaderContent from "./shell/HeaderContent.js";
import * as URLParamUtils from "../utils/URLParamUtils.js";
import QueueContent from "./shell/QueueContent.js";
import { showNotification } from "@mantine/notifications";

const socket = io("http://localhost:3031");

export default function SyncemaShell() {
  const theme = useMantineTheme();
  const [listOpened, setListOpened] = useState(false);
  const [roomID, setRoomID] = useState();
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

    socket.on("kick", () => {
      window.location.replace(window.location.origin);
    });
  }, []);

  useEffect(() => {
    socket.on("joinedRoom", ({ roomID, userID }) => {
      setRoomID(roomID);
      URLParamUtils.set("room", roomID);
      setUserID(userID);
      localStorage.setItem("userID", userID);
    });
    socket.emit("joinRoom", {
      roomID: URLParamUtils.get("room"),
      userID: localStorage.getItem("userID"),
      username: "Guest",
    });
  }, []);

  useEffect(() => {
    socket.on("queueUpdate", (newQueue) => {
      setQueue(newQueue);
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
