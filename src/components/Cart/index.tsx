import * as S from './styles'

import Tag from '../Tag'
import Button from '../Button'

import { RootReducer } from '../../store'

import { useSelector, useDispatch } from 'react-redux'
import { hadleOpen, remove } from '../../store/reducers/cartSlice'
import { formatPrice } from '../../App'

import Delete from '../../assets/Svg/lixeira-de-reciclagem.svg'

export default function Cart() {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()

  const total = items.reduce((sum, item) => sum + (item.preco || 0), 0)

  return (
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={() => dispatch(hadleOpen())} />
      <S.Sidebar>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <ul key={index}>
                <S.CartItem>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h3>{item.nome}</h3>
                    <span>{formatPrice(item.preco)}</span>
                  </div>
                  <button
                    type='button'
                    onClick={() => dispatch(remove(item.id))}
                  >
                    <Delete />
                  </button>
                </S.CartItem>
              </ul>
            ))}
            <S.PricesContainer>
              <S.Prices>Valor total</S.Prices>
              <S.Prices>{formatPrice(total)}</S.Prices>
            </S.PricesContainer>
            <Button
              title='Clique aqui para continuar com a entrega'
              type='button'
            >
              Continuar com a entrega
            </Button>
          </>
        ) : (
          <S.Prices>Adicione algum produto no carrinho</S.Prices>
        )}
      </S.Sidebar>
    </S.CartContainer>
  )
}
