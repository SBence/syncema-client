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

  return <Plyr source={source} options={options} />;
}
