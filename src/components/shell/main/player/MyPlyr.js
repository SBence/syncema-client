import { useEffect, useRef } from "react";
import { usePlyr } from "plyr-react";

export default (props) => {
  const ref = useRef();
  const { source, options = null, ...rest } = props;
  const raptorRef = usePlyr(ref, {
    source,
    options,
  });
  useEffect(() => {
    const { current } = ref;
    if (current.plyr.source === null) return;

    const plyrApi = current.plyr;
    plyrApi.on("ready", () => console.log("Player is ready"));
    plyrApi.on("canplay", () => {
      console.log("Duration:", plyrApi.duration);
    });
    plyrApi.on("ended", () => console.log("Player ended"));
  });
  return <video ref={raptorRef} className="plyr-react plyr" {...rest} />;
};
