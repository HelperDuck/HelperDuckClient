import React from 'react';
import { DashUserInfo } from '../components/DashUserInfo';
import { IncomingRequest } from '../components/IncomingRequest';
import { ProfilePerformanceInfo } from '../components/ProfilePerformanceInfo';
import { RequestHistory } from '../components/RequestHistory';
import boySvg from '../media/boy.svg'
type Props = {
  
}

export const DashboardPage = (props: Props)  =>{
  return (
    
    <div>
       <div className='about-me-icon'><img src={boySvg} alt="boy img" />  </div>
      <IncomingRequest></IncomingRequest>
      <ProfilePerformanceInfo></ProfilePerformanceInfo>
      <RequestHistory></RequestHistory>
      <DashUserInfo></DashUserInfo>
    </div>
  );
}