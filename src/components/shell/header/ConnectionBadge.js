import { Badge } from "@mantine/core";

const colorMap = {
  "-1": "red",
  0: "yellow",
  1: "green",
};

const textMap = {
  "-1": "Disconnected",
  0: "Joining room",
  1: "Connected",
};

export default function ConnectionBadge({ roomID, connected }) {
  let connectionState;
  if (!connected) {
    connectionState = -1;
  } else {
    connectionState = roomID ? 1 : 0;
  }

  return (
    <Badge color={colorMap[connectionState]} variant="dot">
      {textMap[connectionState]}
    </Badge>
  );
}
