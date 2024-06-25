import styled from 'styled-components'
import { Modal as BaseModal } from '@mui/base/Modal'
import Fade from '@mui/material/Fade'
import React from 'react'
import { Colors } from '../../styles'
import ClearIcon from '@mui/icons-material/Clear'

interface BackdropProps {
  open: boolean
}

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ open, ...other }, ref) => {
    return (
      <Fade in={open}>
        <div ref={ref} {...other} />
      </Fade>
    )
  },
)

Backdrop.displayName = 'Backdrop'

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`

export const Card = styled.div`
  position: relative;
  display: flex;
  height: 300px;
  margin: 0 auto;
  padding: 32px;
  background-color: ${Colors.red};
  color: ${Colors.white};

  img {
    width: 280px;
    height: 100%;
    object-fit: cover;
    padding-right: 24px;
  }

  div {
    height: 100%;
    button {
      width: 250px;
      height: 24px;
    }
  }
`

export const Title = styled.h3`
  margin: 0;
  display: block;
  text-align: start;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
`

export const Description = styled.p`
  display: block;
  font-weight: 400;
  line-height: 22px;
  font-style: normal;
  font-size: 14px;
  margin: 16px 0;
`

export const ButtonBuy = styled.button`
  display: inline-block;
  width: 250px;
  height: 24px;
  background-color: ${Colors.white};

  font-weight: 700;
  line-height: 16px;
  font-size: 14px;
  font-style: normal;
  color: ${Colors.red};
  text-align: center;

  border: none;

  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    color: ${Colors.maxRed};

    background: ${Colors.lightGray};
  }
`
export const ClearIconS = styled(ClearIcon)`
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
    color: ${Colors.gray};

    background: ${Colors.maxRed};
  }
`
