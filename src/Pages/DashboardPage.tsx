import React from 'react';
import { IncomingRequest } from '../components/IncomingRequest';
import { ProfilePerformanceInfo } from '../components/ProfilePerformanceInfo';

type Props = {
  
}

export const DashboardPage = (props: Props)  =>{
  return (
    
    <div>
      <IncomingRequest></IncomingRequest>
      <ProfilePerformanceInfo></ProfilePerformanceInfo>
    </div>
  );
}