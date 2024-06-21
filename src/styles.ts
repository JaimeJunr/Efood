import styled, { createGlobalStyle } from 'styled-components'

export const Colors = {
  white: '#ffffff',
  black: '#111111',
  maxRed: '#B85252',
  red: '#E66767',
  minRed: '#FFEBD9',
  gray: '#333333',
  lightGray: '#A3A3A3',
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '767px',
}

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
  }
`

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 80%;
  }
`
export const Description = styled.p`
  font-size: 14px;
  display: block;
  font-weight: 400;
  margin: 16px 0;
  line-height: 22px;
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
`
