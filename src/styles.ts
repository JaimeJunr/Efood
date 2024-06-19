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

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto';
  }
`

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`
