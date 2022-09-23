import { Center, Title } from "@mantine/core";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect } from "react";

export default function VideoPlayer({ videoID, options }) {
  useEffect(() => {
    // TODO: Listen to events here
  }, []);

  const source = {
    type: "video",
    sources: [
      {
        src: videoID,
        provider: "youtube",
      },
    ],
  };

  return videoID ? (
    <Plyr source={source} options={options} />
  ) : (
    <Center>
      <Title>Empty queue</Title>
    </Center>
  );
}
