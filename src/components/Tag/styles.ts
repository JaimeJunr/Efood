import styled from 'styled-components'
import { Colors } from '../../styles'

import { Props } from '.'

export const TagContain = styled.div<Props>`
  height: 14px;
  background-color: ${Colors.red};
  padding: 4px 6px;
  display: inline-block;

  color: ${Colors.white};
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`
