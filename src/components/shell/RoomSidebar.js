import { Button, Group, Stack, Title } from "@mantine/core";
import * as URLParamUtils from "../../utils/URLParamUtils.js";

export default function RoomSidebar() {
  const recentRooms = JSON.parse(localStorage.getItem("recentRooms")) ?? [];

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
      <Title order={3}>Recent rooms</Title>
      <Group>{roomButtons}</Group>
    </Stack>
  );
}
