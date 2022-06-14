import { Paper, Text } from "@mantine/core";

export default function MessageCard({ message }) {
  return (
    <Paper shadow="xs" p="sm">
      <Text weight="bold">{message.author}</Text>
      <Text>{message.content}</Text>
    </Paper>
  );
}
