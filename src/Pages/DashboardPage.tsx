import React from 'react';
import { DashUserInfo } from '../components/DashUserInfo';
import { IncomingRequest } from '../components/IncomingRequest';
import { NavBar } from '../components/NavBar';
import { ProfilePerformanceInfo } from '../components/ProfilePerformanceInfo';
import { RequestHistory } from '../components/RequestHistory';
import boySvg from '../media/boy.svg'
import './DashboardPage.css'
type Props = {
  
}

export const DashboardPage = (props: Props)  =>{
  return (
    
    <div className='dashboard-wrapper'>
      <div className='navbar-container'><NavBar></NavBar></div>
      <div className='first-half-container'> <div className='about-me-icon'><img src={boySvg} alt="boy img" />  </div>
      <IncomingRequest></IncomingRequest>
      <ProfilePerformanceInfo></ProfilePerformanceInfo>
      <RequestHistory></RequestHistory>
      <DashUserInfo></DashUserInfo></div>
      <div className='second-half-container'></div>

      
    </div>
  );
}