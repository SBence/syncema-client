import { Box, Center, Overlay, Title } from "@mantine/core";
import "plyr-react/plyr.css";
import { useEffect } from "react";
import MyPlyr from "./player/MyPlyr.js";

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

  return (
    <>
      <Box sx={{ position: "relative" }}>
        {!videoID && (
          <Overlay opacity={1} color="#000">
            <Center style={{ width: "100%", height: "100%" }}>
              <Title>Empty queue</Title>
            </Center>
          </Overlay>
        )}
        <div>
          <MyPlyr source={source} options={options} />
        </div>
      </Box>
    </>
  );
}
