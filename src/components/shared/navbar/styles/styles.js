import styled from 'styled-components';

export const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: none;
  background-color: black;

  ul {
    background-color: black;
  }

  .menuItem {
    color: white;
  }

  .menuItem:hover, .ant-menu-submenu-active {
    // border-top: 2px solid black;
    color: black;
    background-color: white;
    
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
    border-bottom: none;
    color: black;
  }

  .ant-menu-submenu-title:hover {
    color: black;
  }

  .ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
    border-bottom: none;
  }

  .ant-menu-item-selected {
    color: white;
  }

  #icon {
    border-top: none;
    color: white;
  }
`;