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
`;