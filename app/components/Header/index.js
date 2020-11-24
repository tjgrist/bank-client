/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import { StyledHeader, StyledImg } from './styles';

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/" style={{padding: '5px'}}>
        <StyledImg
          width="50"
          height="50"
          src={logo}
          alt="Cloud Nalu"
        />
      </Link>

    </StyledHeader>
  );
}
