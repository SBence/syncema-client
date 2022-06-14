import {
  ActionIcon,
  Burger,
  Button,
  Drawer,
  Group,
  MediaQuery,
  Popover,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Copy, LayoutSidebarRightExpand } from "tabler-icons-react";
import ConnectionBadge from "./header/ConnectionBadge.js";
import RoomSidebar from "./RoomSidebar.js";

export default function HeaderContent({
  listOpened,
  setListOpened,
  roomID,
  connected,
}) {
  const [roomInfoOpened, setRoomInfoOpened] = useState(false);
  const [opened, setOpened] = useState(false);

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
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={
                <Button
                  color="gray"
                  variant="default"
                  rightIcon={<Copy />}
                  disabled={!roomID}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setOpened(true);
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `Room ID: <code>${
                        roomID ? roomID : "----"
                      }</code>`,
                    }}
                  />
                </Button>
              }
              position="bottom"
              withArrow
              trapFocus={false}
              transition="slide-down"
            >
              <div style={{ display: "flex" }}>
                <Text size="sm">Copied to clipboard</Text>
              </div>
            </Popover>
          </MediaQuery>
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
        <RoomSidebar />
      </Drawer>
    </>
  );
}
