import {
  ActionIcon,
  Burger,
  Button,
  Drawer,
  Group,
  MediaQuery,
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
  roomID = "UNKNOWN",
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
          <ConnectionBadge />
        </Group>

        <Group>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Button
              color="gray"
              variant="default"
              rightIcon={<Copy />}
              onClick={() => navigator.clipboard.writeText(roomID)}
            >
              Room ID: {roomID}
            </Button>
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
