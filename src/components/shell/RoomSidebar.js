import { ActionIcon, Button, Group, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { X } from "tabler-icons-react";
import * as URLParamUtils from "../../utils/URLParamUtils.js";

export default function RoomSidebar() {
  const [recentRooms, setRecentRooms] = useState(
    JSON.parse(localStorage.getItem("recentRooms")) ?? []
  );

  let roomButtons = [];
  for (const roomID of recentRooms) {
    roomButtons.push(
      <Button
        key={roomID}
        color="gray"
        compact
        onClick={() => {
          URLParamUtils.set("room", roomID);
          location.reload();
        }}
      >
        {roomID}
      </Button>
    );
  }

  return (
    <Stack>
      <Group position="apart">
        <Title order={3}>Recent rooms</Title>
        <ActionIcon
          color="red"
          variant="filled"
          onClick={() => {
            setRecentRooms([]);
            localStorage.setItem("recentRooms", "[]");
          }}
        >
          <X size={18} />
        </ActionIcon>
      </Group>
      <Group>{roomButtons}</Group>
    </Stack>
  );
}
