import * as S from './styles'
import { MenuItem } from '../../models/Restaurant'

import Fade from '@mui/material/Fade'
import { formatPrice } from '../../App'
import Button from '../Button'
import { add } from '../../store/reducers/cartSlice'
import { useDispatch } from 'react-redux'

export type PropsModal = {
  open: boolean
  onClose: () => void
  product: MenuItem
}

export default function ModalProduct({ open, onClose, product }: PropsModal) {
  const dispatch = useDispatch()

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

            <Button
              onClick={() => dispatch(add(product))}
              title='Clique para adicionar ao carrinho'
              type='button'
            >
              Adicionar ao carrinho - {formatPrice(product.preco)}
            </Button>
          </div>
          <S.ClearIconS onClick={onClose} />
        </S.Card>
      </Fade>
    </S.Modal>
  )
}
