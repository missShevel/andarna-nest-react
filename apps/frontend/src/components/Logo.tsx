import React from 'react';
import AndarnaIcon from '../assets/AndarnaIcon';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const CompanyName = styled.p`
  font-size: 32px;
  color: white;
`;

type LogoProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Logo = ({ onClick }: LogoProps) => {
  return (
    <LogoWrapper onClick={onClick}>
      <AndarnaIcon style={{ fontSize: '50px' }} />
      <CompanyName>Andarna</CompanyName>
    </LogoWrapper>
  );
};

export default Logo;
