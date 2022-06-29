import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Peer, { Instance } from "simple-peer";
import io from "socket.io-client";
import { WebRTCUser } from "../Types/WebRTCUser";
import "./VideoCallPage.css";

// const LOCAL_SERVER = 'http://localhost:3002/';
// const DEV_SERVER = 'https://helperduck-dev.herokuapp.com/';
const PROD_SERVER = "https://helperduck.herokuapp.com/";
const SOCKET_SERVER_URL = PROD_SERVER;

type VideoProps = {
  stream?: MediaStream;
  peer: Instance;
  className?: string;
};

const Video = (props: VideoProps) => {
  const ref = useRef<HTMLVideoElement | any>();

  useEffect(() => {
    //@ts-ignore
    props.peer.on("stream", (stream) => {
      if (ref.current) ref.current.srcObject = stream;
    });
  }, []); //eslint-disable-line

  return (
    <>
      <video playsInline muted autoPlay ref={ref} className="video-container" />
    </>
  );
};

type Props = {
  // setScreenSharingId: React.Dispatch<React.SetStateAction<any>>
};

export const VideoCallPage = (props: Props) => {
  //HOOKS for classroom state management
  const [peers, setPeers] = useState<WebRTCUser[]>([]); //this will track the peers for rendering purposes
  const [stream, setStream] = useState<MediaStream>(); //eslint-disable-line
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const socketRef = useRef<any>(); //will handle the sockets communications for signaling //TODO: check type works
  const userVideo = useRef<HTMLVideoElement | any>(); //TODO: may need to remove the null value
  const peersRef = useRef<any[]>([]); //this will be used to track and handle the RTC Connections //TODO: check type works
  const userStream = useRef<MediaStream>();

  const currentPath = useLocation();
  const roomId: string | undefined = currentPath.pathname.split("/").pop();
  console.log("roomId:", roomId);

  const videoConstraints = {
    video: {
      cursor: "always",
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  };

  useEffect(() => {
    //@ts-ignore
    // const testSocket = socketIOClient.connect(SOCKET_SERVER_URL);
    const socket = io(SOCKET_SERVER_URL);
    console.log(socket, "success on client side");

    navigator.mediaDevices
      .getUserMedia(videoConstraints)
      .then((stream) => {
        if (userVideo.current) userVideo.current.srcObject = stream;
        userStream.current = stream;

        if (socketRef.current) socketRef.current.emit("joiningRoom", roomId);
        //TODO: attention to the next line --> the if statement is being suggested by TypeScript. Consider ignoring it if needed.
        if (socketRef.current)
          socketRef.current.on(
            "allParticipants",
            (participantsInRoom: string[]) => {
              console.log(participantsInRoom, "participantsInRoom");
              const peersArr: any[] = []; //array for rendering

              participantsInRoom.forEach((participantId: string) => {
                const peer = generateNewPeer(
                  participantId,
                  //@ts-ignore
                  socketRef.current.id,
                  stream
                );

                peersRef.current.push({
                  peerId: participantId,
                  peer,
                });

                //the peer itself plus the peerId will be used when rendering
                peersArr.push({
                  peerId: participantId,
                  peer,
                });
              });
              console.log(
                "peersArr before setting setPeers - used for rendering: ",
                peersArr
              );
              setPeers(peersArr);
            }
          );

        //TODO: this if statement is preventing unresolved promises -> get back to it if needed
        if (socketRef.current)
          socketRef.current.on(
            "userHasJoined",
            (data: { signal: any; callerId: string }) => {
              try {
                const peer = addNewPeer(data.signal, data.callerId, stream);

                peersRef.current.push({
                  peerId: data.callerId,
                  peer,
                });

                //this object will contain the peer plus the callerId
                const peerObj = {
                  peer,
                  peerId: data.callerId,
                };

                setPeers((participants) => [...participants, peerObj]);
              } catch (err) {
                console.log("Error handling userHasJoined Socket Event: ", err);
              }
            }
          );

        if (socketRef.current)
          //TODO: this if statement is preventing unresolved promises -> get back to it if needed
          socketRef.current.on(
            "serverReceivedTheReturnedSignal",
            (data: { id: any; signal: any }) => {
              const targetPeer = peersRef.current.find(
                (target) => target.peerId === data.id
              );
              targetPeer.peer.signal(data.signal);
            }
          );

        if (socketRef.current)
          //TODO: this if statement is preventing unresolved promises -> get back to it if needed
          socketRef.current.on("leftCall", (id: Instance) => {
            const peerObj = peersRef.current.find(
              (target) => target.peerId === id
            );
            if (peerObj) {
              peerObj.peer.destroy();
            }
            console.log("the peer being deleted", peerObj); //TODO: this is not logging

            /*filter out the participant that is leaving
            and re-render video containers to all participants based on the updated state*/
            const peers = peersRef.current.filter(
              (target) => target.peerId !== id
            );
            peersRef.current = peers;
            setPeers(peers);
          });
      })
      .catch((err) => {
        console.log("Error at useEffect: ", err);
      });
  }, []); //eslint-disable-line

  const generateNewPeer = (
    userToSignal: string,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new Peer({
      initiator: true, //to inform the others participants that "I" joined
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      if (socketRef.current)
        socketRef.current.emit("sendingSignalToServer", {
          userToSignal,
          callerId,
          signal,
        });
    });

    return peer;
  };

  const addNewPeer = (
    newSignalIncoming: string | Peer.SignalData,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    /*we signal upon the newly incoming signal
      whenever an offer is received, we send our signal back to the callerID*/
    peer.on("signal", (signal) => {
      socketRef.current.emit("returningSignalToServer", {
        signal,
        callerId,
      });
    });

    //we are accepting the signal and triggering the 'signal' socket event above
    peer.signal(newSignalIncoming);
    return peer;
  };

  const toggleCam = (): void => {
    if (userStream.current) {
      let videoTrack = userStream.current
        .getVideoTracks()
        .find((track) => track.kind === "video");

      if (videoTrack && videoTrack.enabled) {
        videoTrack.enabled = !videoTrack.enabled;
      } else {
        if (videoTrack) videoTrack.enabled = true;
      }
      if (videoTrack) console.log(videoTrack.enabled, "myCam");
    }
  };

  const toggleMic = (): void => {
    if (userStream.current) {
      const audioTrack = userStream.current
        .getTracks()
        .find((track) => track.kind === "audio");
      if (audioTrack)
        if (audioTrack.enabled) {
          audioTrack.enabled = !audioTrack.enabled;
        } else {
          audioTrack.enabled = true;
        }
      if (audioTrack) console.log(audioTrack.enabled, "myMic");
    }
  };

  const exitCall = () => {
    if (userStream.current)
      userStream.current.getVideoTracks()[0].enabled = false;
    window.location.replace("/dashboard2");
  };

  const streamToggler = (stream: MediaStream) => {
    setStream(stream);
    if (userStream.current) setScreenSharingId(userStream.current.id);
  };

  const screenShare = async () => {
    try {
      //check if user is already sharing the screen
      if (screenSharingId) {
        navigator.mediaDevices
          .getUserMedia(videoConstraints)
          .then(streamToggler);
      } else {
        const mediaTracks = await navigator.mediaDevices.getDisplayMedia({});
        const screenSharingTrack = mediaTracks.getTracks()[0]; //GET SCREEN TRACK

        if (userStream.current) {
          let videoTrack = userStream.current.getTracks()[1]; //GET VIDEO TRACK

          //Replace Cam Stream by Screen Stream
          userStream.current.removeTrack(videoTrack);
          userStream.current.addTrack(screenSharingTrack);

          //event listener for reversing streams when user stops sharing screen
          screenSharingTrack.onended = () => {
            if (userStream.current)
              userStream.current.removeTrack(screenSharingTrack);
            if (userStream.current) userStream.current.addTrack(videoTrack);
          };
        }
      }
    } catch (err) {
      console.log("Errot at screenshare function: ", err);
    }

    // if(userStream.current) {
    //   userStream.current.getVideoTracks()[0].enabled = false;
    // }
  };

  return (
    <div className="videos-wrapper">
      <div className="my-video-wrapper">
        <video
          playsInline
          muted
          ref={userVideo}
          autoPlay
          controls
          className="video-container"
        />

        <div className="video-controls">
          <button className="cam-btn video-btn" onClick={toggleCam}>
            📸
          </button>
          <button className="mic-btn video-btn" onClick={toggleMic}>
            🎙️
          </button>
          <button className="phone-btn video-btn" onClick={exitCall}>
            ☎️
          </button>
          <button className="screen-btn video-btn" onClick={screenShare}>
            🖥️
          </button>
        </div>
      </div>

      <div className="peers-video">
        "Peers videos will be displayed below"
        {peers.map((peer) => {
          return (
            <div className="my-video-wrapper">
              <Video
                key={peer.peerId}
                peer={peer.peer}
                className="video-container"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
