import { Instance } from "simple-peer";

export type WebRTCUser = {
  id?: string;
  stream?: MediaStream; 
  peer: Instance;
  peerId?: string;
  className?: string;
}