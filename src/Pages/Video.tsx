import { WebRTCUser } from "../Types/WebRTCUser";
import { useEffect, useRef } from "react";
import "./VideoCallPage.css";

export const Video = (props: WebRTCUser) => {
  const ref = useRef<HTMLVideoElement | any>();

  useEffect(() => {
    //@ts-ignore
    props.peer.on("stream", (stream) => {
      if (ref.current) ref.current.srcObject = stream;
    });
  }, []); //eslint-disable-line

  return (
    <>
      <video playsInline autoPlay ref={ref} className="video-container" />
    </>
  );
};