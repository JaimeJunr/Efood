import { styled } from 'styled-components'
import { Colors } from '../../styles'
import { TagContain } from '../Tag/styles'
import { Link } from 'react-router-dom'

export const Card = styled.div`
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

export const Button = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 4px 0;
  background-color: ${Colors.white};
  border: transparent;
  width: 100%;

  color: ${Colors.red};
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`
