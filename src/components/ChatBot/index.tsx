import * as S from './styles'
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from 'react'
import { useChat } from 'ai/react'
import { useGetRestaurantsQuery } from '../../api/services/api'

import MessageSquare from '../../assets/Svg/message-square.svg'
import Send from '../../assets/Svg/send.svg'

const predefinedPrompts = [
  'Quais são os restaurantes em destaque da semana?',
  'Vocês oferecem opções veganas?',
  'Quais formas de pagamento são aceitas?',
  'Qual é o restaurante mais bem avaliado?',
  'Quais são os 5 restaurantes mais bem avaliados?',
  'Quais são os pratos mais bem avaliados?',
]

export default function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false)
  const [form, setForm] = useState(false)
  const [showSupportButton, setShowSupportButton] = useState(true)
  const [messageCount, setMessageCount] = useState(0)
  const [page, setPage] = useState(3)

  const { data: restaurants } = useGetRestaurantsQuery()

  const { messages, input, handleInputChange, isLoading, append, setInput } =
    useChat({
      api: 'http://localhost:3333/api/chatbot',
      streamMode: 'text',
      body: {
        restaurants: restaurants,
      },
    })

  const toggleChat = () => setChatOpen(!chatOpen)

  const handlePromptClick = (prompt: string) => {
    append({ content: prompt, role: 'user' })
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (messageCount >= 3) {
      setShowSupportButton(false)
    }
  }, [messageCount])

  const optionsPronpt = () => {
    if (page > predefinedPrompts.length) {
      setForm(true)
    }
  }

  useEffect(() => {
    optionsPronpt()
  }, [page])

  const chatContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <S.ButtonToTalk
        className={chatOpen ? 'is-open' : ''}
        onClick={toggleChat}
      >
        <MessageSquare />
      </S.ButtonToTalk>
      <S.ChatBox className={chatOpen ? 'is-open' : ''}>
        <S.Header>
          <S.HeaderTitle>EFOOD Assistente</S.HeaderTitle>
          <S.ClosedButon onClick={toggleChat} />
        </S.Header>
        <S.ChatContainer ref={chatContainerRef}>
          <S.Messages>
            <>
              {messages.map(msg => (
                <div key={msg.id}>
                  {msg.role === 'user' ? (
                    <S.Message>
                      <S.UserMessage>
                        <span>Você </span>
                        <p>{msg.content}</p>
                      </S.UserMessage>
                      <S.Avatar src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                    </S.Message>
                  ) : (
                    <S.Message>
                      <S.Avatar src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                      <S.AIMessage>
                        <span>Assistente </span>
                        <p>{msg.content}</p>
                      </S.AIMessage>
                    </S.Message>
                  )}
                </div>
              ))}

              <S.Message className={showSupportButton ? 'disabled' : ''}>
                <S.Avatar src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                <S.AIMessage>
                  <span>Assistente </span>
                  <p>
                    'Você chegou ao limite de mensagens. Chame nosso suporte:
                    (11) 99999-9999, ou clique abaixo'
                  </p>
                  <S.SuportButton
                    className={showSupportButton ? 'disabled' : ''}
                    href='#'
                  >
                    Suporte
                  </S.SuportButton>
                </S.AIMessage>
              </S.Message>
            </>
          </S.Messages>
          {isLoading && (
            <S.Loading>
              <span>Generating response...</span>
              <S.Spinner>
                <div className='spinner'>
                  <div className='bounce1'></div>
                  <div className='bounce2'></div>
                  <div className='bounce3'></div>
                </div>
              </S.Spinner>
            </S.Loading>
          )}
        </S.ChatContainer>
        <S.Footer>
          <S.PromptOptions>
            {predefinedPrompts.slice(page - 3, page).map((prompt, index) => (
              <S.PromptButton
                disabled={isLoading}
                key={index}
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
              </S.PromptButton>
            ))}
            <S.PromptButton
              className={form ? 'disabled' : ''}
              disabled={isLoading}
              onClick={() => {
                setPage(prev =>
                  prev <= predefinedPrompts.length ? prev + 3 : prev,
                )
                optionsPronpt()
              }}
            >
              Outros
            </S.PromptButton>
          </S.PromptOptions>

          <S.FooterContainer
            className={form && showSupportButton ? '' : 'disabled'}
          >
            <h3>Você tem mais {3 - messageCount} mensagens</h3>
            <S.Form>
              <S.Input
                disabled={isLoading}
                type='text'
                value={input}
                onChange={handleInputChange}
                placeholder='Type a message...'
                onKeyDown={async event => {
                  if (event.key === 'Enter' && input) {
                    append({ content: input, role: 'user' })
                    setInput('')
                    setMessageCount(count => count + 1)
                  }
                }}
              />
              <S.Button
                disabled={isLoading}
                onClick={async () => {
                  if (input) {
                    append({ content: input, role: 'user' })
                    setInput('')
                    setMessageCount(count => count + 1)
                  }
                }}
              >
                <Send />
              </S.Button>
            </S.Form>
          </S.FooterContainer>
        </S.Footer>
      </S.ChatBox>
    </>
  )
}
