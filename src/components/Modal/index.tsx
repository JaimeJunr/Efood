import * as S from './styles'
import { MenuItem } from '../../models/Restaurant'

import Fade from '@mui/material/Fade'

export type PropsModal = {
  open: boolean
  onClose: () => void
  product: MenuItem
}

export const formatPrice = (preco = 0) => {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco)
}

export default function ModalProduct({ open, onClose, product }: PropsModal) {
  if (!product) return null

  return (
    <S.Modal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: S.StyledBackdrop }}
    >
      <Fade in={open}>
        <S.Card>
          <img src={product.foto} alt={product.nome} />
          <div>
            <S.Title id='spring-modal-title'>{product.nome}</S.Title>
            <S.Description id='spring-modal-description'>
              {product.descricao}
            </S.Description>
            <S.Description>Serve {product.porcao}</S.Description>
            <S.ButtonBuy>
              Adicionar ao carrinho - {formatPrice(product.preco)}
            </S.ButtonBuy>
          </div>
          <S.ClearIconS onClick={onClose} />
        </S.Card>
      </Fade>
    </S.Modal>
  )
}
