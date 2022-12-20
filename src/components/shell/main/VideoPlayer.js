import {
  AspectRatio,
  Box,
  Center,
  Overlay,
  Slider,
  Space,
  Title,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import secondsToString from "../../../utils/secondsToString.js";

export default function VideoPlayer({ socket, userID, videoURL, listOpened }) {
  const playerRef = useRef();
  const [videoPlaying, setVideoPlaying] = useState(false); // TODO: Get current playing state from server.
  const [progressBar, setProgressBar] = useState(0);

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
        {!videoURL && !listOpened && (
          <Overlay opacity={1} color="#000">
            <Center style={{ width: "100%", height: "100%" }}>
              <Title>Empty queue</Title>
            </Center>
          </Overlay>
        )}
        <AspectRatio ratio={16 / 9} sx={{ maxHeight: "100%" }} mx="auto">
          <ReactPlayer
            width="100%"
            height="100%"
            ref={playerRef}
            url={videoURL}
            playing={videoPlaying}
            controls={true}
            muted={true}
            onPlay={() => {
              playerEventEmitter("playVideo");
            }}
            onPause={() => playerEventEmitter("pauseVideo")}
            /* onSeek={() =>
              playerEventEmitter("seekTo", {
                time: playerRef.current.getCurrentTime(),
              })
            } */
            onProgress={({ playedSeconds }) => setProgressBar(playedSeconds)}
          />
        </AspectRatio>
        {playerRef?.current && (
          <>
            <Space h="xs" />
            <Slider
              min={0}
              max={playerRef.current.getDuration()}
              styles={{ markLabel: { display: "none" } }}
              value={progressBar}
              label={(value) => secondsToString(value)}
              onChange={setProgressBar}
              onChangeEnd={(value) => {
                playerRef.current.seekTo(value);
                playerEventEmitter("seekTo", {
                  time: value,
                });
              }}
            />
          </>
        )}
      </Box>
    </>
  );
}
