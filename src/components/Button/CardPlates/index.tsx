import * as React from 'react'
import * as S from './styles'
import { MenuItem } from '../../models/Restaurant'
import Button from '../Button'
import { Description, Title } from '../../styles'

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
      <Title>{product.nome}</Title>
      <Description>{getDescription(product.descricao)}</Description>
      <Button
        title='Clique para saber mais detalhes'
        type='button'
        onClick={() => {
          onOpenModal()
          setCurrectProduct(product)
        }}
      >
        Mais Detalhes
      </Button>
    </S.Card>
  )
}
