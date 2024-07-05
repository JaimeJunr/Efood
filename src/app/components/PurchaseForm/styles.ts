import styled from 'styled-components'
import { Colors } from '../../styles'

type Props = {
  width?: string
}

export const FormStyled = styled.form`
  button {
    margin-top: 8px;
  }
`

export const Title = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: ${Colors.white};

  margin-bottom: 16px;
`
export const Controler = styled.div<Props>`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  width: ${props => props.width || '100%'};

  input {
    background: ${Colors.white};
    border: 2px solid ${Colors.white};
    padding: 8px;

    &.error {
      border: 2px solid ${Colors.red};
    }
  }

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: ${Colors.white};
    margin-bottom: 8px;

    &.error {
      &::after {
        content: ' *';
      }
    }
  }
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  gap: 10%;
`
