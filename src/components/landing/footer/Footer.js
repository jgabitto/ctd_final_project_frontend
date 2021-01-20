import React from "react";
import { SlackOutlined, GithubOutlined } from "@ant-design/icons";

import { FooterBottom, Copyright, Icon, FooterLinks } from '../styles/styles';

const Footer = () => {
  return (
    <>
      <FooterBottom>
        <Copyright>
          Copyright © Code the Dream · All Rights Reserved
                </Copyright>
        <Icon>
          <FooterLinks
            href="https://www.codethedream.org/"
            target="_blank">
            {/* <img src={ctd} alt="Code The Cream"></img> */}
          </FooterLinks>
          <FooterLinks
            href="https://teamtreehouse.com/home"
            target="_blank">
            {/* <img src={treehouse} alt="Team Treehouse"></img> */}
          </FooterLinks>
          <FooterLinks
            href="https://app.slack.com/client/T07EHJ738/learning-slack"
            target="_blank">
            <SlackOutlined />
          </FooterLinks>
          <FooterLinks
            href="https://github.com/Code-the-Dream-School?type=source"
            target="_blank">
            <GithubOutlined />
          </FooterLinks>
        </Icon>
      </FooterBottom>
    </>
  );
};
export default Footer;
