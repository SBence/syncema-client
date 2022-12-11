import {
  ActionIcon,
  Button,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";
import * as URLParamUtils from "../../utils/URLParamUtils.js";

export default function RoomSidebar({ username, socket }) {
  const [usernameDraft, setUsernameDraft] = useState("");
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
      <Group>
        <TextInput
          label="Username"
          value={usernameDraft}
          onChange={(event) => setUsernameDraft(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              variant="default"
              disabled={!usernameDraft}
              onClick={() => {
                socket.emit("changeName", {
                  roomID: URLParamUtils.get("room"),
                  userID: localStorage.getItem("userID"),
                  username: usernameDraft,
                });
                setUsernameDraft("");
              }}
            >
              <Check size={20} />
            </ActionIcon>
          }
          placeholder={username}
          style={{ width: "100%" }}
        />
      </Group>
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
