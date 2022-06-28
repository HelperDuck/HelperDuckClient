import React from 'react';
import "./IncomingRequest.css";
import { Icon } from '@iconify/react';

type Props = {
  
}

export const IncomingRequest = (props: Props)  =>{
  return (
    
    <div className='IncomingRequest-wrapper'>
     
      <div className='info-container'>
        <div className='profile-info-container'>
          <div className='picture-container'><img className='profile-pic' src='https://i.ibb.co/35ZbKjP/fernanda.png' alt='profile pic'></img></div>
          <div className='info'>
          <div className='subject'>React Form</div>
          <div className='user'>by Fernanda Gananca</div>
          <div className='stats-container'>
            <span className='avg-tip'><Icon icon="icon-park-solid:duck" className='duck-icon' /><span>20</span></span>
             <span className='avg-score'><Icon icon="heroicons-solid:fire"  className='fire-icon' /><span>4.9</span></span> 
          </div>
          </div>
        </div>
        <div className='buttons-container'>
        <button className='accept-button'>Accept</button>
        <button className='decline-button'>Decline</button>
      </div>
             </div>
      <div className='IncomingRequest-description'>I need help to implement a multi-select input on React where I if the user is logged in he can edit it, but if its not the user, this fiel should be blockedI need help to implement a multi-select input on React where I if the user is logged in he can edit it, but if its not the user, this fiel should be blockedhelp to implement a multi-select input on React where I if the user is logged in he can edit it, but if its not the user, this fiel should be blocked</div>
    </div>
  );
}