import React from 'react';
import { IncomingRequest } from '../components/IncomingRequest';
import { ProfilePerformanceInfo } from '../components/ProfilePerformanceInfo';
import { RequestHistory } from '../components/RequestHistory';

type Props = {
  
}

export const DashboardPage = (props: Props)  =>{
  return (
    
    <div>
      <IncomingRequest></IncomingRequest>
      <ProfilePerformanceInfo></ProfilePerformanceInfo>
      <RequestHistory></RequestHistory>
    </div>
  );
}