import { Icon } from '@iconify/react';
import React from 'react';
import "./RequestHistory.css"

type Props = {
  
}

export const RequestHistory = (props: Props)  =>{
  return (
    
    <div className='RequestHistory-wrapper'>
      <div className='outer-container'>
         <div className='title'><span>Past Requests</span></div>
         <div className='past-request'>
         <div className='profile-pic-container'><img className='profile-pic-past-request' src='https://i.ibb.co/35ZbKjP/fernanda.png' alt='profile pic'></img></div>
         <div className='subject-user-container'>
            <div className='subject'>React Form</div>
            <div className='user'>by Fernanda Gananca</div></div>
         <div className='tip-container'>
            <span className='tip'><Icon icon="icon-park-solid:duck" className='duck-icon' /><span>20</span></span>
         </div>
      <div className='score-container'>
      <span className='score'><Icon icon="heroicons-solid:fire"  className='fire-icon' /><span>4.9</span></span> 
      </div>
      <div className='detail-button-container'>
        <button className='detail-btn'>View detail</button>
      </div>

      </div>
     
      </div>



      <div className='outer-container'>
         <div className='title'><span>Created by me</span></div>
         <div className='past-request'>
         {/* <div className='profile-pic-container'><img className='profile-pic' src='https://i.ibb.co/35ZbKjP/fernanda.png' alt='profile pic'></img></div> */}
         <div className='subject-user-container'>
            <div className='subject'>CANT CENTER A DIV AHHHHHHH</div>
            <div className='user'>by Fernanda Gananca</div></div>
         <div className='tip-container'>
            <span className='tip'><Icon icon="icon-park-solid:duck" className='duck-icon' /><span>20</span></span>
         </div>
      <div className='delete-request-container'>
      <span className='delete-request'><Icon icon="clarity:trash-solid" width="20" height="20" /></span> 
      </div>
      <div className='detail-button-container'>
        <button className='detail-btn'>View detail</button>
      </div>

      </div>
     
      </div>
    </div>
  );
}