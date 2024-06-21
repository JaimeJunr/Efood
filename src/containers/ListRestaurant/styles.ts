import styled from 'styled-components'
import { breakpoints } from '../../styles'

export const List = styled.ul`
  display: grid;
  margin-top: 80px;
  margin-bottom: 120px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 80px;
  grid-row-gap: 48px;
  padding: 0;

  @media (max-width: ${breakpoints.desktop}) {
    grid-gap: 48px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`
