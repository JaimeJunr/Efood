import { styled } from 'styled-components'
import { Colors } from '../../styles'
import { TagContain } from '../Tag/styles'

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
    margin-bottom: 8px;
  }
`
