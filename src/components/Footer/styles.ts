import styled from 'styled-components'

import Back from '../../assets/Images/Vector.png'
import { Colors } from '../../styles'

export const Footer = styled.footer`
  width: 100%;
  height: 298px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background: url(${Back});

  svg {
    width: 125px;
    margin-top: 40px;
    height: 57.5px;

    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`
export const HeadFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SocialMedia = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  width: 88px;
  a {
    width: 24px;
    height: 24px;
  }
  svg {
    width: 24px;
    height: 24px;
    margin: 0;

    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`

export const FooterDescription = styled.p`
  width: 480px;
  height: 24px;
  margin-bottom: 40px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;

  color: ${Colors.red};
`
