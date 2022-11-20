import { Box, Center, Overlay, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function VideoPlayer({ socket, userID, videoURL }) {
  const playerRef = useRef();
  const [videoPlaying, setVideoPlaying] = useState(false); // TODO: Get current playing state from server.

  useEffect(() => {
    socket.on("videoPlay", () => setVideoPlaying(true));
    socket.on("videoPause", () => setVideoPlaying(false));
    socket.on("videoSeek", (seconds) => playerRef.current.seekTo(seconds));
  }, []);

  function playerEventEmitter(event, options) {
    socket.emit(event, { userID: userID, ...options });
  }

  return (
    <>
      <Box sx={{ position: "relative" }}>
        {!videoURL && (
          <Overlay opacity={1} color="#000">
            <Center style={{ width: "100%", height: "100%" }}>
              <Title>Empty queue</Title>
            </Center>
          </Overlay>
        )}
        <ReactPlayer
          ref={playerRef}
          url={videoURL}
          playing={videoPlaying}
          controls={true}
          muted={true}
          onPlay={() => {
            playerEventEmitter("playVideo");
          }}
          onPause={() => playerEventEmitter("pauseVideo")}
          onSeek={() =>
            playerEventEmitter("seekTo", {
              time: playerRef.current.getCurrentTime(),
            })
          }
        />
      </Box>
    </>
  );
}
