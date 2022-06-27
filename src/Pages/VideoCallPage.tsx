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
    const socketRef = useRef<Socket>(); //will handle the sockets communications for signaling //TODO: check type works 
    const userVideo = useRef<HTMLVideoElement>(null); //TODO: may need to remove the null value
    const peersRef = useRef< Socket[]>([]); //this will be used to track and handle the RTC Connections //TODO: check type works
    const userStream = useRef<MediaStream>();
    
    const currentPath = useLocation();
    const roomId: string | undefined = currentPath.pathname.split('/').pop();
    console.log('roomId:', roomId);
  
    
    useEffect(() => {
      //@ts-ignore
      // const testSocket = socketIOClient.connect(SOCKET_SERVER_URL);
      const socket = io(SOCKET_SERVER_URL);
      console.log(socket, 'success on client side')
    },[]);
    

  
  //TODO: line 69 will most likely be changed, but it compiles for now
  return (
    
    <div>
      "Hello World"
      <Video peer={new Peer()} /> 
    </div>
  );
}

