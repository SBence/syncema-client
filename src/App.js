import { MantineProvider } from "@mantine/core";
import MainShell from "./components/SyncemaShell.js";

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <MainShell />
    </MantineProvider>
  );
}
