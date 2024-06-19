import { styled } from 'styled-components'
import { Colors } from '../../styles'
import { TagContain } from '../Tag/styles'
import { Button } from '@mui/base/Button'

export const Card = styled.li`
  list-style: none;
  position: relative;
  background-color: ${Colors.red};
  color: ${Colors.white};
  border-width: 0 1px 1px 1px;
  padding: 8px;
  ${TagContain} {
    margin-right: 8px;
  }

  img {
    width: 100%;
    height: 167px;
  }
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin: 0;
`

export const Description = styled.p`
  font-size: 14px;
  display: block;
  font-weight: 400;
  margin-top: 16px;
  line-height: 22px;
`

export const TriggerButton = styled(Button)`
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
