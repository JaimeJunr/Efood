import * as S from './styles'
import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'

import MessageSquare from '../../assets/Svg/message-square.svg'
import Send from '../../assets/Svg/send.svg'

const predefinedPrompts = [
  'Quais são os restaurantes em destaque da semana?',
  'Vocês oferecem opções veganas?',
  'Quais formas de pagamento são aceitas?',
  'Qual é o restaurante mais bem avaliado?',
  'Quais são os 5 restaurantes mais bem avaliados?',
  'Vocês possuem Pizza no cardapio?',
]

export default function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false)
  const [form, setForm] = useState(false)
  const [showSupportButton, setShowSupportButton] = useState(true)
  const [messageCount, setMessageCount] = useState(0)
  const [page, setPage] = useState(3)

  const { messages, input, handleInputChange, isLoading, append, setInput } =
    useChat({
      api: '/api',
      streamMode: 'text',
    })

  // const { messages, input, handleInputChange, isLoading, append, setInput } =
  //   useChat({
  //     api: 'http://localhost:3333/api',
  //     streamMode: 'text',
  //   })

  const toggleChat = () => setChatOpen(!chatOpen)

  const handlePromptClick = (prompt: string) => {
    append({ content: prompt, role: 'user' })
  }

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
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

  return (
    <>
      <S.ButtonToTalk
        type='button'
        aria-label='Chatbot'
        title='Chatbot'
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
                        <span>Você</span>
                        <p>{msg.content}</p>
                      </S.UserMessage>
                      <S.Avatar
                        alt='Você'
                        src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                      />
                    </S.Message>
                  ) : (
                    <S.Message>
                      <S.Avatar
                        alt='Assistente'
                        src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                      />
                      <S.AIMessage>
                        <span>Assistente </span>
                        <p dangerouslySetInnerHTML={{ __html: msg.content }} />
                      </S.AIMessage>
                    </S.Message>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
              <S.Message className={showSupportButton ? 'disabled' : ''}>
                <S.Avatar
                  alt=' Assistente '
                  src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                />
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
                title={`Clique para gerar essa resposta: ${prompt}`}
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
                type='button'
                aria-label='Enviar'
                title='Enviar'
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
