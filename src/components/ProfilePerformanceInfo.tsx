import React from 'react';
import "./ProfilePerformanceInfo.css"
type Props = {

}

export const ProfilePerformanceInfo = (props: Props) =>{
return (

<div className='profilePerformanceInfo-wrapper'>
  <div className='profile-requests-stats'>
    <div className='request-title'>Requests</div>
    <div className='stats-outer-container'>
      <div className='stats-inner-container'>
        <div className='number'><span>55</span></div>
        <div className='word'><span>Opened</span> </div>
      </div>
      <div className='stats-inner-container'>
        <div className='number'><span>22</span></div>
        <div className='word'><span>Taken</span></div>
      </div>
    </div>
  </div>
  <div className='profile-requests-stats'>
    <div className='request-title'>Score</div>
    <div className='stats-outer-container'>
      <div className='stats-inner-container'>
        <div className='number'><span>20</span></div>
        <div className='word'><span>Avg Tip</span> </div>
      </div>
      <div className='stats-inner-container'>
        <div className='number'><span>4.5</span></div>
        <div className='word'><span>Rating</span></div>
      </div>
    </div>
  </div>


</div>
);
}