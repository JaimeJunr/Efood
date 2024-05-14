import * as S from './styles'

type Props = {
  type: 'button' | 'link'
  title: string
  to: string
  onClick?: () => void
  children: string
}

export default function Button({ type, children, title, to, onClick }: Props) {
  if (type === 'button')
    return (
      <S.ButtonContain type="button" title={title} onClick={onClick}>
        {children}
      </S.ButtonContain>
    )
  return (
    <S.ButtonLink to={to as string} title={title}>
      {children}
    </S.ButtonLink>
  )
}
