import React from 'react';

import logo from '../../utils/graphics/logo.png';
import car from "../../utils/graphics/car.png";
import wheel from "../../utils/graphics/wheel.png";
import { StyledDiv } from './styles/styles';

const Car = () => {
  return (
    <>
      <div style={{ marginTop: '100px', marginBottom: '350px' }}><img className="logo" src={logo}></img></div>
      <div className="car">
        <StyledDiv>
          <img style={{
            position: 'absolute',
            top: '40%',
            width: '50%',
            left: '25%'
          }} src={car} />
          <img style={{
            position: 'absolute',
            top: '76%',
            left: '30.5%',
            width: '8%',
            animation: 'wheel 3s infinite linear'
          }} src={wheel} />
          <img style={{
            position: 'absolute',
            top: '76%',
            left: '60.9%',
            width: '8%',
            animation: 'wheel 3s infinite linear'
          }} src={wheel} />
        </StyledDiv>
      </div >
    </>
  )
}

export default Car;