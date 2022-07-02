import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Peer, { Instance } from "simple-peer";
import io from "socket.io-client";
import { WebRTCUser } from "../Types/WebRTCUser";
import "./VideoCallPage.css";

// const LOCAL = "http://localhost:3002/";
// const DEV = 'https://helperduck-dev.herokuapp.com/';
const PROD = 'https://helperduck.herokuapp.com/';
const SOCKET_SERVER_URL = PROD;

const Video = (props: WebRTCUser) => {
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

type Props = {
  // setScreenSharingId: React.Dispatch<React.SetStateAction<any>>
};

export const VideoCallPage = (props: Props) => {
  //HOOKS for classroom state management
  const [peers, setPeers] = useState<WebRTCUser[]>([]); //this will track the peers for rendering purposes
  const [stream, setStream] = useState<MediaStreamTrack>(); //eslint-disable-line
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const socketRef = useRef<any>(); //will handle the sockets communications for signaling //TODO: check type works
  const userVideo = useRef<HTMLVideoElement | any>(null); //TODO: may need to remove the null value
  let partnerVideo = useRef<any>();
  const peersRef = useRef<any[]>([]); //this will be used to track and handle the RTC Connections //TODO: check type works
  const userStream = useRef<MediaStream>();
  const [screening, setScreening] = useState<string>("");
  // console.log(screenSharingId, 'screenSharingId')
  console.log(screening); //TODO: erase this
  console.log(stream);
  console.log(screenSharingId);
  const currentPath = useLocation();
  const roomId: string | undefined = currentPath.pathname.split("/").pop();
  console.log("roomId:", roomId);

  const videoConstraints = {
    video: {
      cursor: "always",
      width: { ideal: 1280 },
      height: { ideal: 720 },
      aspectRatio: 1.777777778,
      frameRate: 30,
    },
    audio: {
      sampleSize: 16,
      channelCount: 2,
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  };

  //TODO: new useEffect WIP
  // useEffect(() => {
  //   console.log(screening, "ling screening state");
  //   if (peersRef.current.length > 0) {
  //     let peersEffect = peersRef.current.find((track) => track.kind === 'video');
  //     console.log(peersEffect, " peersEffect at useEffect");
  //     let track = peersEffect.stream[1];
  //     // let trackTwo = peersEffect.getTracks()[0];
  //     // peersEffect.removeTrack(track);
  //     // peersEffect.addTrack(trackTwo);
  //   }
  // }, [screening]);

  useEffect(() => {
    //@ts-ignore
    socketRef.current = io.connect(SOCKET_SERVER_URL);
    console.log(socketRef, "success on client side");

    navigator.mediaDevices
      .getUserMedia(videoConstraints)
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        if (socketRef) socketRef.current.emit("joiningRoom", roomId);

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

                setPeers((participants) => {
                  console.log(participants, "Participants line 157");
                  console.log(peerObj, "peerObj line 158");
                  // if (participants.find((p) => p.peerId === peerObj.peerId) ) {
                  //   console.log(participants, "participan insside find");
                  //   return participants;
                  // }
                  let base = [...participants, peerObj];
                  console.log(base, "BASSSSSEEEEE");
                  return base;
                });
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
              partnerVideo.current = targetPeer;
            }
          );

        if (socketRef.current) {
          socketRef.current.on("screenToggling", (screenSharingTrack: any) => {
            console.log(
              "WE are actually inside the screen toggling  inside the socket event",
              screenSharingTrack
            );
            // setStream(data);
            setScreening(screenSharingTrack);
            // streamToggler(data)
          });
        }

        if (socketRef.current)
          //TODO: this if statement is preventing unresolved promises -> get back to it if needed
          socketRef.current.on("leftCall", (id: Instance) => {
            const peerObj = peersRef.current.find(
              (target) => target.peerId === id
            );
            if (peerObj) {
              peerObj.peer.destroy();
            }
            console.log("the peer being deleted", peerObj);

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

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("renegotiate", () => {
        console.log("reload svp");
        window.location.reload();
      });
    }
  }, []);

  // const mediaStream = navigator.mediaDevices.getDisplayMedia({});
  // //TODO: emit socket event, 'toggling', mediaStream
  // //TODO: recieve the socket event on('toggling', invoke streamToggler function)

  // const screenSharingTrack = mediaStream.getTracks()[0]; //GET SCREEN TRACK

  // if (socketRef.current)
  // socketRef.current.on(
  //   "renegotiate",
  //   (participantsInRoom: string[]) => {
  //     console.log(participantsInRoom, "participantsInRoom");
  //     const peersArr: any[] = []; //array for rendering

  //     participantsInRoom.forEach((participantId: string) => {
  //       const peer = generateNewPeer(
  //         participantId,
  //         //@ts-ignore
  //         socketRef.current.id,
  //         stream
  //       );

  //       peersRef.current.push({
  //         peerId: participantId,
  //         peer,
  //       });

  //       //the peer itself plus the peerId will be used when rendering
  //       peersArr.push({
  //         peerId: participantId,
  //         peer,
  //       });
  //     });
  //     console.log("peersArr before setting setPeers - used for rendering: ", peersArr);
  //     setPeers(peersArr);
  //   }
  // );

  const generateNewPeer = (userToSignal: string | Peer.SignalData, callerId: string, stream: MediaStream) => {
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
    partnerVideo.current = peer;

    return peer;
  };

  const toggleCam = (): void => {
    if (userStream.current) {
      let allTracks = userStream.current.getTracks();
      console.log(allTracks);

      let videoTrack = userStream.current
        .getVideoTracks()
        .find((track) => track.kind === "video");

      if (videoTrack && videoTrack.enabled) {
        videoTrack.enabled = false;
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
          audioTrack.enabled = false;
        } else {
          audioTrack.enabled = true;
        }
      if (audioTrack) console.log(audioTrack.enabled, "myMic");
    }
  };

  const exitCall = () => {
    if (userStream.current)
      userStream.current.getVideoTracks()[0].enabled = false;
    window.location.replace("/dashboard");
  };

  const streamToggler = (stream: MediaStreamTrack) => {
    console.log(stream, "stream inside the streamToggler");
    setStream(stream);
    if (userStream.current) setScreenSharingId(userStream.current.id);
  };


  
  const screenShare = async () => {
    try {
      //check if user is already sharing the screen

      const mediaStream = await navigator.mediaDevices.getDisplayMedia({});

      const screenSharingTrack = mediaStream.getTracks()[0]; //GET SCREEN TRACK

      streamToggler(screenSharingTrack);

      if (socketRef.current && screenSharingTrack) {
        console.log(
          "socketRef exists at screenShare function, ofc",
          screenSharingTrack
        );
        socketRef.current.emit("screenToggling", roomId);
      }

      if (userStream.current) {
        let videoTrack = userStream.current.getTracks()[1]; //GET VIDEO TRACK

        // //Replace Cam Stream by Screen Stream
        userStream.current.removeTrack(videoTrack);
        userStream.current.addTrack(screenSharingTrack);

        /*Problem Description
          User is able to share screen stream but is not updating the other peers 
          Only when peers refresh
          this is happening because Media changes require WebRTC peer connection renegotiation
          https://stackoverflow.com/questions/31165316/webrtc-renegotiate-the-peer-connection-to-switch-streams
          
          Possible Solution: emit socket events to trigger renegotiation
          */
        if (socketRef.current)
          //event listener for reversing streams when user stops sharing screen
          screenSharingTrack.onended = () => {
            if (userStream.current)
              userStream.current.removeTrack(screenSharingTrack);
            if (userStream.current) userStream.current.addTrack(videoTrack);
          };
      }
    } catch (err) {
      console.log("Error at screenshare function: ", err);
    }
  };
  

  
  return (
    <div className="videos-wrapper">
      <div className="participants-videos-wrapper">
        <div className="inner-video-wrapper">
        <video
          playsInline
          muted
          ref={userVideo}
          autoPlay
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

        {peers.map((peer, index) => {
          if (index === 0) {
          return (
            <Video
              key={peer.peerId}
              peer={peer.peer}
              className="video-container"
              />
          );
        
} else {
  return (
    <></>
  )
}})}
     </div>
    </div>
  );
};
