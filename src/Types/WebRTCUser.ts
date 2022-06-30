import { Instance } from "simple-peer";

export type WebRTCUser = {
  id?: string;
  stream?: MediaStreamTrack; 
  peer: Instance;
  peerId?: string;
  className?: string;
}