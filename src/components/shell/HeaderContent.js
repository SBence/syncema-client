import {
  ActionIcon,
  Burger,
  Button,
  CopyButton,
  Drawer,
  Group,
  MediaQuery,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Check, Copy, LayoutSidebarRightExpand } from "tabler-icons-react";
import ConnectionBadge from "./header/ConnectionBadge.js";
import RoomSidebar from "./RoomSidebar.js";

export default function HeaderContent({
  listOpened,
  setListOpened,
  roomID,
  connected,
  username,
  socket,
}) {
  const [roomInfoOpened, setRoomInfoOpened] = useState(false);

  return (
    <>
      <Group position="apart">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={listOpened}
            onClick={() => setListOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Group>
          <Title order={2}>
            <Text color="red" inherit component="span">
              Sync
            </Text>
            ema
          </Title>
          <ConnectionBadge roomID={roomID} connected={connected} />
        </Group>

        <Group>
          <CopyButton value={window.location.href} timeout={3000}>
            {({ copied, copy }) => (
              <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                <Button
                  color={copied ? "green" : "gray"}
                  variant={copied ? "light" : "default"}
                  rightIcon={copied ? <Check /> : <Copy />}
                  disabled={!roomID}
                  onClick={copy}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `Room ID: <code>${
                        roomID ? roomID : "----"
                      }</code>`,
                    }}
                  />
                </Button>
              </MediaQuery>
            )}
          </CopyButton>
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => setRoomInfoOpened(true)}
          >
            <LayoutSidebarRightExpand />
          </ActionIcon>
        </Group>
      </Group>

      <Drawer
        opened={roomInfoOpened}
        onClose={() => setRoomInfoOpened(false)}
        title="Room info"
        padding="xl"
        size="xl"
        position="right"
      >
        <RoomSidebar username={username} socket={socket} />
      </Drawer>
    </>
  );
}
