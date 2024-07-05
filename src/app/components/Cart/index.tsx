import * as S from './styles'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setDelivery,
  handleOpen,
  remove,
  cleanCart,
  setPayment,
} from '../../store/reducers/cartSlice'
import { formatPrice } from '../../utils'
import { RootReducer } from '../../store'
import { useSubmitOrderMutation } from '../../services/api'
import Button from '../Button'
import PurchaseForm from '../PurchaseForm'
import Delete from '../../assets/Svg/lixeira-de-reciclagem.svg'

export default function Cart() {
  const { isOpen, items, payment, delivery } = useSelector(
    (state: RootReducer) => state.cart,
  )

  const [submit, { data, isSuccess, isLoading }] = useSubmitOrderMutation()

  const dispatch = useDispatch()
  const total = items.reduce((sum, item) => sum + (item.preco || 0), 0)

  const handleConclude = () => {
    dispatch(handleOpen())
    dispatch(cleanCart())
  }

  useEffect(() => {
    if (items.length === 0) {
      setPayment(false)
      setDelivery(false)
    }
  }, [items.length])

  return (
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={() => dispatch(handleOpen())} />
      <S.Sidebar>
        {isSuccess && data && items.length > 0 ? (
          <S.Sucess>
            <h2>Pedido realizado - {data.orderId}</h2>
            <p>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </p>
            <p>
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
            </p>
            <p>
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a
              refeição.
            </p>
            <p>
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!!
            </p>
            <Button
              title='Clique aqui para voltar'
              type='button'
              onClick={handleConclude}
            >
              Concluir
            </Button>
          </S.Sucess>
        ) : (
          <>
            {!delivery && !payment && (
              <>
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
                      onClick={() => dispatch(setDelivery(true))}
                    >
                      Continuar com a entrega
                    </Button>
                  </>
                ) : (
                  <S.Prices>Adicione algum produto no carrinho</S.Prices>
                )}
              </>
            )}
            <PurchaseForm submit={submit} isLoading={isLoading} />
          </>
        )}
      </S.Sidebar>
    </S.CartContainer>
  )
}
