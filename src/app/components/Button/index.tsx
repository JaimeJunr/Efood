import React from 'react'
import { Link } from 'react-router-dom'
import * as S from './styles'

export type Props = {
  type: 'button' | 'link' | 'submit'
  title: string
  onClick?: () => void
  children: React.ReactNode
  to?: string
  disabled?: boolean
}

export default function Button({
  type,
  children,
  title,
  onClick,
  to,
  disabled,
}: Props) {
  if (type != 'link') {
    return (
      <S.ButtonContain
        disabled={disabled}
        type={type}
        title={title}
        onClick={onClick}
      >
        {children}
      </S.ButtonContain>
    )
  }
  return (
    <Link to={to!}>
      <S.ButtonLink disabled={disabled} title={title} type='button'>
        {children}
      </S.ButtonLink>
    </Link>
  )
}
