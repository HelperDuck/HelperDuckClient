import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Peer from 'simple-peer';
import { Socket } from 'socket.io-client';
import { io } from "socket.io-client";
import socketIOClient from 'socket.io-client';
import { WebRTCUser } from '../Types/WebRTCUser'
// console.log(socketIO);


const URL = 'http://localhost:3002/';



type Props = {
  
 }

export const VideoCallPage = (props: Props)  =>{
    //HOOKS for classroom state management
    // const [peers, setPeers] = useState([]); //this will track the peers for rendering purposes
     const socketRef = useRef(); //will handle the sockets communications for signaling
    // const userVideo = useRef();
    // const peersRef = useRef([]); //this will be used to track and handle the RTC Connections
    // const userStream = useRef();
  
    
    useEffect(() => {
      //@ts-ignore
      const testSocket = socketIOClient.connect(URL);
      // const socket = io(URL);
      console.log(testSocket, 'success on client side')
    },[]);
    

  
  
  return (
    
    <div>
      "Hello World"
    </div>
  );
}