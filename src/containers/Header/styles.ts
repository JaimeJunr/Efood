import styled from 'styled-components'

import Back from '../../assets/Images/Vector.png'

import { Colors, breakpoints } from '../../styles'
import { Props } from './index'

import { Container } from '../../styles'

type Title = {
  category?: boolean
}

export const Header = styled.header<Props>`
  width: 100%;
  height: ${props => (props.home ? '328px' : '186px')};
  background: url(${Back});

  ${Container} {
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: ${props => (props.home ? 'column' : 'row')};
    justify-content: space-between;

    a {
      display: flex;
      justify-content: center;
      width: 200px;
      svg {
        margin-top: ${props => (props.home ? '50px' : '0')};
        height: 57.5px;

        cursor: pointer;
        transition: all 0.1s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  @media (max-width: ${breakpoints.desktop}) {
    height: ${props => (props.home ? '260px' : '150px')};

    ${Container} {
      a {
        svg {
          margin-top: ${props => (props.home ? '30px' : '0')};
        }
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: ${props => (props.home ? '220px' : '120px')};

    ${Container} {
      flex-direction: column;
      a {
        svg {
          margin-top: ${props => (props.home ? '20px' : '0')};
        }
      }
    }
  }
`

export const HeaderTitle = styled.h1`
  width: 539px;
  height: 84px;
  margin-bottom: 40px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  text-align: center;

  color: ${Colors.red};

  @media (max-width: ${breakpoints.desktop}) {
    width: 70%;
    font-size: 32px;
    line-height: 38px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
    width: 100%;
    line-height: 34px;
    margin-bottom: 30px;
  }
`
export const HeaderPerfil = styled.h2`
  width: 200px;
  height: 21px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  text-align: start;

  color: ${Colors.red};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px;
    line-height: 19px;
  }
`
export const ImageContainer = styled.div<Props>`
  width: 100%;
  height: 280px;
  background-image: url(${props => props.restaurant?.capa});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  @media (max-width: ${breakpoints.desktop}) {
    height: 240px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 180px;
  }
`
export const RestaurantTitle = styled.h2<Title>`
  height: 33.25px;
  z-index: 1;

  font-family: 'Roboto';

  font-style: normal;
  font-weight: ${props => (props.category ? '100' : '900')};
  font-size: 32px;
  line-height: 38px;
  margin: 32px 0;

  color: ${Colors.white};

  /* @media (max-width: ${breakpoints.desktop}) {
    font-size: 28px;
    line-height: 34px;
    margin: 16px 0;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
    line-height: 30px;
    margin: 16px 0;
  } */
`
