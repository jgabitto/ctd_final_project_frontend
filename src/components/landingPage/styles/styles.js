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

export const FooterBottom = styled.footer`
    z-index: 4;
    width: 100%;
    flex: none;
    display: block;
    font-weight: 300;
    background-color: black;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    height: 60px;
    @media only screen and (max-width: 767px) {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        padding-left: 0;
    }
`;

export const Copyright = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    text-transform: uppercase;
    font-size: 0.8rem;
    span {
        padding-top: 0px;
        font-size: 20px;
        color: white;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 180px;
    padding-right: 20px;
    img {
        width: 18px;
    }
    @media only screen and (max-width: 767px) {
        padding-right: 0;
        padding-top: 12px;
    }
`;

export const FooterLinks = styled.a`
    display: flex;
    font-size: 20px;
    color: white;
    &:hover {
        color: white;
        cursor: pointer;
    }
`;