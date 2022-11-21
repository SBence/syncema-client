import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import SyncemaShell from "./components/SyncemaShell.js";

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <SyncemaShell />
      </NotificationsProvider>
    </MantineProvider>
  );
}
