import { ActionIcon, Space, Stack, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Send } from "tabler-icons-react";
import MessageCard from "./chat/MessageCard.js";

export default function ChatBox({ socket, userID, roomID, connected }) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (messages) => {
      setMessages(messages);
    });
  }, []);

  const messageElements = [];
  for (const message of messages) {
    messageElements.push(<MessageCard message={message} />);
  }

  return (
    <Stack sx={{ width: "100%" }}>
      {roomID && connected ? (
        <Title order={3}>Chat</Title>
      ) : (
        <Title color="red">Chat (disconnected)</Title>
      )}
      <Space h="xs" />
      <Stack
        style={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {messageElements}
      </Stack>
      <TextInput
        value={draft}
        type="text"
        disabled={!(roomID && connected)}
        error={!(roomID && connected)}
        placeholder={roomID && connected ? "" : "Chat disconnected"}
        onChange={(event) => setDraft(event.currentTarget.value)}
        rightSection={
          <ActionIcon
            variant="default"
            disabled={!(roomID && connected && draft)}
            onClick={() => {
              socket.emit("sendMessage", { userID: userID, content: draft });
              setDraft("");
            }}
          >
            <Send size={20} />
          </ActionIcon>
        }
      />
    </Stack>
  );
}
