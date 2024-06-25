import styled from 'styled-components'
import { breakpoints } from '../../styles'

export const List = styled.ul`
  display: grid;
  margin-top: 80px;
  margin-bottom: 120px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;
  grid-row-gap: 32px;
  padding: 0;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-row-gap: 48px;
  }
`
