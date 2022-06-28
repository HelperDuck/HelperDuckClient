import { Icon } from '@iconify/react';
import React from 'react';
import brainBook from '../media/brainBook.svg'
import './DashUserInfo.css'
import { useSelector } from "react-redux";


type Props = {

}

export const DashUserInfo = (props: Props) =>{


  const user = useSelector((state:any) => state.user.value);

console.log(user, 'state final')
return (

<div className='dash-user-wrapper'>
  <div className='credits-taken-outer-container'>
    <div className='credits-container'>
      <div className='number'><span>55</span></div>
      <div className='word'><span>Credits</span> </div>
    </div>
    <div className='taken-container'>
      <div className='number'><span>55</span></div>
      <div className='word'><span>Taken requests</span> </div>
    </div>
  </div>
  <div className='languages-outer-container'>
    <div className='languages-inner-container'>
      <div className='languages-icon'>
        <Icon className='icon1' icon="lucide:languages" />
      </div>
      <div className='languages-container'>
        <div className='languages-title'><span>Languages</span></div>
        <div className='languages-list'>
          <div>Portuguese</div>
          <div>English</div>
        </div>
      </div>
    </div>


    <div className='expertise-inner-container'>
      <div className='languages-icon'>
        <Icon className='icon1' icon="healthicons:eyeglasses" />
      </div>
      <div className='languages-container'>
        <div className='languages-title'><span>Expertise</span></div>
        <div className='languages-list'>
          <div className='test'>
            <div className='singleLang'>react</div>
            <div className='singleLang'>redux</div>
            <div className='singleLang'>JavaScript</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className='aboutme-outer-container'>
    <div className='about-me-container'>
      <div className='about-me-title'>About me</div>
      <div className='about-me-description'>+10 years of
        experience.....blablablablablablablablablablablablablablablablablablablablablablablablablablabla</div>
    </div>
    <div className='about-me-icon'><img src={brainBook} alt="boy img" />
    </div>
  </div>
</div>
);
}