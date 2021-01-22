import styled from 'styled-components';

export const StyledP = styled.p`
  width: fit-content;

  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const StyledButton = styled.button`
  width: 200px;
  color: white;
  background-color: black;

  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  border-color: #d9d9d9;

  :hover {
    opacity: 0.8;
  }

  :disabled {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
`;

export const StyledDiv = styled.div`
  :hover {
    cursor: pointer;
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
    background-color: rgba(122, 122, 122, 0.1);
  }
  

`;
export const StyledContainer = styled.div`
  :not(.clicked):hover {
    cursor: pointer;
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
    background-color: rgba(122, 122, 122, 0.1);
  }
  
  .clicked {
    background-color: rgb(224, 235, 255);
  }

`;