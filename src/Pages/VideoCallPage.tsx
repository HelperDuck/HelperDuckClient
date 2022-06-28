import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Peer, { Instance, SimplePeer } from 'simple-peer';
import { Socket } from 'socket.io-client';
import io from "socket.io-client";
import socketIOClient from 'socket.io-client';
import { WebRTCUser } from '../Types/WebRTCUser'
import { SocketType } from 'dgram';
// console.log(socketIO);


const SOCKET_SERVER_URL = 'http://localhost:3002/';

type VideoProps = {
  stream?: MediaStream
  peer: Instance ; 
}

const Video = (props: VideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    //@ts-ignore
    props.peer.on('stream', (stream) => {
      if(ref.current) ref.current.srcObject = stream;
    });
  }, []);

  return (
    <>
      <video
        playsInline
        muted
        autoPlay
        ref={ref}
        className="video-container"
      />
    </>
  );
};


type Props = {
  
 }

export const VideoCallPage = (props: Props)  =>{
    //HOOKS for classroom state management
    const [peers, setPeers] = useState<WebRTCUser[]>([]); //this will track the peers for rendering purposes
    const socketRef = useRef<any>(); //will handle the sockets communications for signaling //TODO: check type works 
    const userVideo = useRef<HTMLVideoElement>(null); //TODO: may need to remove the null value
    const peersRef = useRef<any[]>([]); //this will be used to track and handle the RTC Connections //TODO: check type works
    const userStream = useRef<MediaStream>();
    
    const currentPath = useLocation();
    const roomId: string | undefined = currentPath.pathname.split('/').pop();
    console.log('roomId:', roomId);
    
    const videoConstraints = {
      video: {
        width: { ideal: 1920, max: 7680 },
        height: { ideal: 1080, max: 4320 },
      },
      audio: true,
    };
    
    useEffect(() => {
      //@ts-ignore
      // const testSocket = socketIOClient.connect(SOCKET_SERVER_URL);
      const socket = io(SOCKET_SERVER_URL);
      console.log(socket, 'success on client side')
      
      navigator.mediaDevices
        .getUserMedia(videoConstraints)
        .then((stream) => {
          if (userVideo.current) userVideo.current.srcObject = stream;
          userStream.current = stream;
          
          if (socketRef.current) socketRef.current.emit('joiningRoom', roomId);
          //TODO: attention to the next line --> the if statement is being suggested by TypeScript. Consider ignoring it if needed.
          if (socketRef.current)
          socketRef.current.on(
            'allParticipants',
            (participantsInRoom: string[]) => {
              console.log(participantsInRoom, 'participantsInRoom');
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
              console.log('peersArr before setting setPeers - used for rendering: ', peersArr);
              setPeers(peersArr);
            }
          );
          
          //TODO: this if statement is preventing unresolved promises -> get back to it if needed
          if (socketRef.current)
          socketRef.current.on('userHasJoined',  (data: { signal: any; callerId: string; }) => {
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
                console.log('Error handling userHasJoined Socket Event: ', err);
            }
          });
          
          if (socketRef.current) //TODO: this if statement is preventing unresolved promises -> get back to it if needed
          socketRef.current.on('serverReceivedTheReturnedSignal', (data: { id: any; signal: any; }) => {
            const targetPeer = peersRef.current.find(
              (target) => target.peerId === data.id
            );
            targetPeer.peer.signal(data.signal);
          });
          
          if (socketRef.current) //TODO: this if statement is preventing unresolved promises -> get back to it if needed
          socketRef.current.on('leftCall', (id: any) => {
            const peerObj = peersRef.current.find(
              (target) => target.peerId === id
            );
            if (peerObj) {
              peerObj.peer.destroy();
            }
            console.log('the peer being deleted', peerObj); //TODO: this is not logging
  
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
            console.log('Error at useEffect: ', err);
        })
      
    },[]);
    
    const generateNewPeer = (userToSignal: string, callerId: string, stream: MediaStream) => {
      const peer = new Peer({
        initiator: true, //to inform the others participants that "I" joined
        trickle: false,
        stream,
      });
  
      peer.on('signal', (signal) => {
        if (socketRef.current)
        socketRef.current.emit('sendingSignalToServer', {
          userToSignal,
          callerId,
          signal,
        });
      });
  
      return peer;
    };

    const addNewPeer = (newSignalIncoming: string | Peer.SignalData, callerId: string, stream: MediaStream) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });
  
      /*we signal upon the newly incoming signal
      whenever an offer is received, we send our signal back to the callerID*/
      peer.on('signal', (signal) => {
        socketRef.current.emit('returningSignalToServer', {
          signal,
          callerId,
        });
      });
  
      //we are accepting the signal and triggering the 'signal' socket event above
      peer.signal(newSignalIncoming);
      return peer;
    };
  
  //TODO: line for Video will most likely be changed, but it compiles for now
  return (
    
    <div>
      "Hello World"
      <Video peer={new Peer()} /> 
    </div>
  );
}

