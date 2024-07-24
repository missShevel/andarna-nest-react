import AndarnaIcon from '../assets/AndarnaIcon';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const CompanyName = styled.p`
  font-size: 32px;
  color: white;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <AndarnaIcon style={{ fontSize: '50px' }} />
      <CompanyName>Andarna</CompanyName>
    </LogoWrapper>
  );
};

export default Logo;
