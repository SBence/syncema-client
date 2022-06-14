import { MantineProvider } from "@mantine/core";
import SyncemaShell from "./components/SyncemaShell.js";

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <SyncemaShell />
    </MantineProvider>
  );
}
