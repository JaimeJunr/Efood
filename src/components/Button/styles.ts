import styled from 'styled-components'
import { Colors } from '../../styles'
import { Link } from 'react-router-dom'

import { Props } from '.'

export const ButtonContain = styled.button<Props>`
  display: block;
  width: 100%;
  padding: 4px 0;

  background-color: ${Colors.minRed};
  border: transparent;

  color: ${Colors.red};
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;

  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    background: ${Colors.lightGray};
    color: ${Colors.maxRed};
  }

  &:active {
    background: ${Colors.gray};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${Colors.red};
    outline: none;
  }
`
export const ButtonLink = styled.button`
  background-color: ${Colors.red};

  border: transparent;
  padding: 4px 6px;

  cursor: pointer;
  transition: all 0.1s ease;

  text-decoration: none;
  color: ${Colors.white};
  text-align: center;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    transform: scale(1.02);
    background: ${Colors.maxRed};
  }
`
