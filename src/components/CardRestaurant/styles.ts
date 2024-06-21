import { styled } from 'styled-components'
import { Colors } from '../../styles'
import { TagContain } from '../Tag/styles'
import { Link } from 'react-router-dom'

export const Card = styled.li`
  list-style: none;
  position: relative;
  background-color: ${Colors.white};
  color: ${Colors.red};
  border: 0 solid #e66767;
  border-width: 0 1px 1px 1px;
  ${TagContain} {
    margin-right: 8px;
  }

  img {
    width: 100%;
    height: 217px;
  }
`
export const CardBody = styled.div`
  padding: 8px;
`

export const Head = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
  }
`

export const Score = styled.h3`
  width: 26px;
  height: 21px;
  display: block;

  margin-right: 4px;

  font-weight: 700;
  text-align: center;
  font-size: 18px;
  line-height: 21px;
`

export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
