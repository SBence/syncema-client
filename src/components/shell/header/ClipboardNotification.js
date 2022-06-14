import { Affix, Notification } from "@mantine/core";
import { ClipboardCheck } from "tabler-icons-react";

export default function ClipboardNotification({ visible, setVisible }) {
  if (visible) {
    return (
      <Affix position={{ bottom: 20, right: 20 }}>
        <Notification
          icon={<ClipboardCheck size={18} />}
          color="green"
          onClose={() => {
            setVisible(false);
          }}
        >
          Room link copied
        </Notification>
      </Affix>
    );
  }
}
