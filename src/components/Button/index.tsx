import React from 'react'
import { Link } from 'react-router-dom'
import * as S from './styles'

export type Props = {
  type: 'button' | 'link'
  title: string
  onClick?: () => void
  children: React.ReactNode
  to?: string
}

export default function Button({ type, children, title, onClick, to }: Props) {
  if (type === 'button') {
    return (
      <S.ButtonContain type='button' title={title} onClick={onClick}>
        {children}
      </S.ButtonContain>
    )
  }
  return (
    <Link to={to!}>
      <S.ButtonLink title={title} type='button'>
        {children}
      </S.ButtonLink>
    </Link>
  )
}
