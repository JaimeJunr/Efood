import styled from 'styled-components'
import { Colors } from '../../styles'
import { TagContain } from '../Tag/styles'
import { ButtonContain } from '../Button/styles'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
`

export const CartContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  visibility: hidden;
  opacity: 0;
  transform: translateX(100%);
  transition: visibility 0.5s, opacity 0.2s ease, transform 0.2s ease-in-out;

  &.is-open {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.5s ease, transform 0.5s ease-in-out;
  }
`

export const Sidebar = styled.aside`
  z-index: 1;
  max-width: 360px;
  width: 100%;
  background-color: ${Colors.red};
  padding: 40px 16px 40px 16px;
  overflow-y: scroll;

  ${ButtonContain} {
    max-width: 100%;
    width: 100%;
  }
`

export const PricesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Prices = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.white};
  line-height: 17px;
  margin-bottom: 16px;
  margin-top: 40px;
`

export const CartItem = styled.li`
  background-color: ${Colors.white};
  position: relative;
  display: flex;
  margin-bottom: 16px;

  padding: 8px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  div {
    h3 {
      color: ${Colors.red};
      font-weight: 900;
      font-size: 18px;
      line-height: 21px;
    }

    span {
      margin-top: 16px;
      display: block;
      color: ${Colors.red};
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    }
  }

  button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 16px;
    height: 16px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`
