import { Badge } from "@mantine/core";

export default function ConnectionBadge({ connectionState = -2 }) {
  const colorMap = {
    "-2": "gray",
    "-1": "red",
    0: "yellow",
    1: "green",
  };
  const textMap = {
    "-2": "Unknown",
    "-1": "Disconnected",
    0: "Connecting",
    1: "Connected",
  };
  return (
    <Badge color={colorMap[connectionState]} variant="dot">
      {textMap[connectionState]}
    </Badge>
  );
}
