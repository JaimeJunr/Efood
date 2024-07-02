import { keyframes, styled } from 'styled-components'
import { Colors, breakpoints } from '../../styles'

import ClearIcon from '@mui/icons-material/Clear'

export const ButtonToTalk = styled.button`
  position: fixed;
  opacity: 1;
  visibility: visible;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;

  background-color: ${Colors.red};
  color: ${Colors.white};
  border: none;
  cursor: pointer;

  &.is-open {
    visibility: hidden;

    opacity: 0;
    transition: visibility 0.5s, opacity 0.9s ease;
  }
`

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 50;
  bottom: 16px;
  right: 16px;

  width: 500px;
  height: 60vh;
  justify-content: flex-end;

  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  background-color: ${Colors.minRed};
  align-items: center;
  padding: 16px;
  visibility: hidden;
  opacity: 0;
  transform: translateY(100%);
  transition: visibility 0.5s, opacity 0.9s ease, transform 0.9s ease-in-out;

  &.is-open {
    visibility: visible;
    opacity: 0.5;
    transform: translateY(0);

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 500px; // Adjust width for smaller screens
    bottom: 40px;
    left: 0;
  }
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.75rem 1rem;
  background-color: ${Colors.white};
  overflow: hidden; // Ensure content doesn't overflow the container
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;

  background-color: ${Colors.red};
  color: ${Colors.white};
`

export const HeaderTitle = styled.h3`
  margin: 0;
  font-weight: 500;
`

export const ClosedButon = styled(ClearIcon)`
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
    color: ${Colors.gray};

    background: ${Colors.maxRed};
  }
`

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.75rem 1rem;
  overflow-y: auto; // Enable vertical scrolling if content overflows
`

export const Message = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;

  &.disabled {
    display: none;
  }
`

const TypeMessage = `
  display: flex;
  border-radius: 0.5rem;
  padding: 0.75rem;
  width: 90%;
  flex-direction: column;

  border-radius: 8px;
  margin-bottom: 16px;


  padding: 0.75rem;



  span {
    font-weight: bold;
    height: 100%;
    margin-bottom: 4px;
  }

`

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 8px;
`

export const UserMessage = styled.div`
  ${TypeMessage}

  justify-content: flex-start;
  color: ${Colors.white};
  background-color: ${Colors.red};

  p {
    text-align: end;
  }

  span {
    text-align: end;
  }
`

export const AIMessage = styled.div`
  ${TypeMessage}

  justify-content: flex-end;
  background-color: ${Colors.minRed};
  color: ${Colors.red};
`

export const Footer = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${Colors.red};
  border-radius: 0 0 0.5rem 0.5rem;
`

export const FooterContainer = styled.div`
  &.disabled {
    display: none;
  }

  h3 {
    margin-bottom: 8px;
    color: ${Colors.white};
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
  }
`

export const Form = styled.div`
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 8px;
  margin-right: 4px;
  border: 1px solid ${Colors.maxRed};
  outline: none;
  border-radius: 4px;
`

export const Button = styled.button`
  width: 40px;
  height: 40px;
  padding-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.red};
  color: ${Colors.white};
  border: none;

  cursor: pointer;

  &:hover {
    background-color: ${Colors.maxRed};
  }
`

export const Loading = styled.div`
  background-color: ${Colors.red};
  color: ${Colors.white};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #333;
  animation: ${spin} 0.8s linear infinite;
`

export const PromptOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`

export const PromptButton = styled.button`
  background-color: ${Colors.minRed};
  color: ${Colors.maxRed};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;

  font-size: 16px;
  line-height: 19px;
  font-weight: 600;

  &:hover {
    background-color: ${Colors.gray};
    color: ${Colors.white};
  }

  &.disabled {
    display: none;
  }
`

export const SuportButton = styled.a`
  background-color: ${Colors.red};
  color: ${Colors.white};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;

  font-size: 16px;
  line-height: 19px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background-color: ${Colors.maxRed};
    color: ${Colors.white};
  }

  &.disabled {
    display: none;
  }
`
