import * as React from 'react'
import * as S from './styles'
import { MenuItem } from '../../models/Restaurant'

type Props = {
  product: MenuItem
  onOpenModal: () => void
  setCurrectProduct: React.Dispatch<React.SetStateAction<MenuItem | undefined>> // Função para abrir o modal
}

const getDescription = (description: string) => {
  if (description.length > 140) {
    return description.slice(0, 130) + '...'
  }
  return description
}

export default function CardPlates({
  onOpenModal,
  setCurrectProduct,
  product,
}: Props) {
  return (
    <S.Card>
      <img src={product.foto} alt={product.nome} />
      <S.Title>{product.nome}</S.Title>
      <S.Description>{getDescription(product.descricao)}</S.Description>
      <S.TriggerButton
        onClick={() => {
          onOpenModal()
          setCurrectProduct(product)
        }}
      >
        Mais Detalhes
      </S.TriggerButton>
    </S.Card>
  )
}
