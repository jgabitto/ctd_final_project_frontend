import styled from 'styled-components';

export const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  margin: auto;
`

export const Section = styled.div`
  display:flex;
  flex-grow: 1;
  flex-basis:auto;
  flex-shrink:0;
  flex-flow: row;
  background-image: url('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_824,h_550/v1554854756/assets/74/0853d5-80e4-414a-91d7-6fd0b15a136d/original/UberIM_20250-medium-%282%29.jpg');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
//   background-attachment: fixed;
`;

export const Main = styled.main`
padding:100px 20px 0 20px;
  margin:0;
  min-height:100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
//   &::after{
//   content: '';
//   position:absolute;
//   left: 0;
//   top: 0;
//   width:100%; 
//   height:100%;
//   }
`;
