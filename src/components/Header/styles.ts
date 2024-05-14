import styled from 'styled-components'

import Back from '../../assets/Images/Vector.png'
import Italiana from '../../assets/Images/Italiana.png'
import { Colors } from '../../styles'
import { Props } from './index'

type Title = {
  category?: boolean
}

export const Header = styled.header<Props>`
  width: 100%;
  height: ${props => (props.home ? '328px' : '186px')};

  display: flex;
  flex-direction: ${props => (props.home ? 'column' : 'row')};
  align-items: center;
  justify-content: ${props => (props.home ? 'space-between' : 'space-around')};

  background: url(${Back});

  svg {
    width: 125px;
    margin-top: ${props => (props.home ? '50px' : '0')};
    height: 57.5px;
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
`
export const HeaderPerfil = styled.h2`
  height: 21px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: ${Colors.red};
`
export const ImageContainer = styled.div`
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 280px;
  }

  width: 100%;
  height: 280px;
  background-image: url(${Italiana});
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
`
export const RestaurantTitle = styled.h2<Title>`
  height: 33.25px;
  z-index: 1;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: ${props => (props.category ? '100' : '900')};
  font-size: 32px;
  line-height: 38px;

  color: ${Colors.white};
`
