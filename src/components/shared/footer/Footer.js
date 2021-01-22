import React from "react";
import { withRouter } from 'react-router-dom';
import { SlackOutlined, GithubOutlined } from "@ant-design/icons";

import { FooterBottom, Copyright, Icon, FooterLinks } from './styles/styles';
import ctd from "../../../utils/graphics/ctd.png";

const Footer = ({ location }) => {
  return (
    <>
      <FooterBottom style={location.pathname === '/request' ? { position: 'fixed', bottom: 0 } : null}>
        <Copyright>
          Copyright © RideShare · All Rights Reserved
        </Copyright>
        <Icon>
          <FooterLinks
            href="https://www.codethedream.org/"
            target="_blank">
            <img src={ctd} alt="Code The Cream"></img>
          </FooterLinks>
          <FooterLinks
            href="https://github.com/jgabitto/ctd_final_project"
            target="_blank">
            <GithubOutlined />
          </FooterLinks>
          <FooterLinks
            href="https://github.com/jgabitto/ctd_final_project_frontend"
            target="_blank">
            <GithubOutlined />
          </FooterLinks>
        </Icon>
      </FooterBottom>
    </>
  );
};
export default withRouter(Footer);
