import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  useMantineTheme,
} from "@mantine/core";
import MainContent from "./shell/MainContent.js";
import HeaderContent from "./shell/HeaderContent.js";

export default function SyncemaShell() {
  const theme = useMantineTheme();
  const [listOpened, setListOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!listOpened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <HeaderContent
            listOpened={listOpened}
            setListOpened={setListOpened}
          />
        </Header>
      }
    >
      <MainContent />
    </AppShell>
  );
}
