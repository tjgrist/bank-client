/**
 *
 * Sidebar
 *
 */

import React from 'react';
import logo from 'images/logo.png';
import { StyledLogo } from './styles';

export default function Logo() {
  return (
    <StyledLogo
      style={{padding: '5px'}}>
      <img width="50px" height="50px" src={logo} alt="Cloud Nalu" />
    </StyledLogo>
  );
}
