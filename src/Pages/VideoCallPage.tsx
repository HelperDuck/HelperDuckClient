import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { WebRTCUser } from "../Types/WebRTCUser";
import { Video } from "./Video";
import Peer, { Instance } from "simple-peer";
import io from "socket.io-client";
import "./VideoCallPage.css";
import { videoConstraints } from "../utils/videoConstraints";
import { roomIdState } from "../Redux/reducers/RoomId";
import { modalState } from "../Redux/reducers/ModalReducer";
import "./CreateReviewPage.css";
import { BACKEND_CONNECTION } from "../services/backEndConnection";

const SOCKET_SERVER_URL = BACKEND_CONNECTION + "/";

type Props = {};

export const VideoCallPage = (props: Props) => {
  //HOOKS for classroom state management
  const dispatch = useDispatch();
  const [peers, setPeers] = useState<WebRTCUser[]>([]); //this will track the peers for rendering purposes
  const socketRef = useRef<any>(); //will handle the sockets communications for signaling //TODO: check type works
  const userVideo = useRef<HTMLVideoElement | any>(null); //TODO: may need to remove the null value
  let partnerVideo = useRef<any>();
  const peersRef = useRef<any[]>([]); //this will be used to track and handle the RTC Connections //TODO: check type works
  const userStream = useRef<MediaStream>();
  const navigate = useNavigate();

  const currentPath = useLocation();
  const roomId: string | undefined = currentPath.pathname.split("/").pop();

  useEffect(() => {
    //@ts-ignore
    socketRef.current = io.connect(SOCKET_SERVER_URL);

    navigator.mediaDevices
      .getUserMedia(videoConstraints)
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        if (socketRef) socketRef.current.emit("joiningRoom", roomId);

        if (socketRef.current)
          socketRef.current.on(
            "allParticipants",
            (participantsInRoom: string[]) => {
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
              setPeers(peersArr);
            }
          );

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

        if (socketRef.current)
          socketRef.current.on("leftCall", (id: Instance) => {
            const peerObj = peersRef.current.find(
              (target) => target.peerId === id
            );
            if (peerObj) {
              peerObj.peer.destroy();
            }

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
        window.location.reload();
      });
    }
  }, []);

  const generateNewPeer = (
    userToSignal: string | Peer.SignalData,
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
    partnerVideo.current = peer;

    return peer;
  };

  const toggleCam = (): void => {
    if (userStream.current) {
      let videoTrack = userStream.current
        .getVideoTracks()
        .find((track) => track.kind === "video");

      if (videoTrack && videoTrack.enabled) {
        videoTrack.enabled = false;
      } else {
        if (videoTrack) videoTrack.enabled = true;
      }
      // if (videoTrack) console.log(videoTrack.enabled, "myCam");
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
    if (userStream.current && socketRef.current)
      userStream.current.getVideoTracks()[0].enabled = false;
    toggleMic();
    socketRef.current.disconnect();
    dispatch(roomIdState(roomId));
    navigate("/dashboard");
    dispatch(modalState(true));
  };

  const screenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({});
      const screenSharingTrack = mediaStream.getTracks()[0]; //GET SCREEN TRACK

      if (socketRef.current && screenSharingTrack) {
        socketRef.current.emit("screenToggling", roomId);
      }

      if (userStream.current) {
        let videoTrack = userStream.current.getTracks()[1]; //GET VIDEO TRACK
        // //Replace Cam Stream by Screen Stream
        userStream.current.removeTrack(videoTrack);
        userStream.current.addTrack(screenSharingTrack);

        //event listener for reversing streams when user stops sharing screen
        if (socketRef.current) {
          screenSharingTrack.onended = () => {
            if (userStream.current)
              userStream.current.removeTrack(screenSharingTrack);
            if (userStream.current) userStream.current.addTrack(videoTrack);
            if (socketRef.current && screenSharingTrack) {
              socketRef.current.emit("screenToggling", roomId);
            }
          };
        }
      }
    } catch (err) {
      console.log("Error at screen sharing function: ", err);
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
              <Icon
                icon="bi:camera-video"
                className="icons"
                color="rgba(255, 162, 0, 0.9)"
                hFlip={false}
                height={18}
                width={18}
              />
            </button>
            <button className="mic-btn video-btn" onClick={toggleMic}>
              <Icon
                icon="bi:mic"
                className="icons icon-on"
                color="rgba(255, 162, 0, 0.9)"
                hFlip={true}
                height={18}
                width={18}
              />
            </button>
            <button className="phone-btn video-btn" onClick={exitCall}>
              <Icon
                icon="bx-phone"
                className="icons icon-on"
                color="rgba(255, 162, 0, 0.9)"
                hFlip={false}
                height={18}
                width={18}
              />
            </button>
            <button className="screen-btn video-btn" onClick={screenShare}>
              <Icon
                icon="carbon:screen"
                className="icons icon-on"
                color="rgba(255, 162, 0, 0.9)"
                hFlip={true}
                height={18}
                width={18}
              />
            </button>
          </div>
        </div>

        {peers.map((peer, index) => {
          if (index === 0) {
            return (
              <div className="inner-video-wrapper">
                <Video
                  key={peer.peerId}
                  peer={peer.peer}
                  className="video-container partnervideo"
                />
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
};
