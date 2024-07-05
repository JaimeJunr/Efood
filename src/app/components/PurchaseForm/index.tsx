import * as S from './styles'
import { useFormik } from 'formik'
import * as Y from 'yup'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { Order } from '../../services/api'
import { setDelivery, setPayment } from '../../store/reducers/cartSlice'
import { RootReducer } from '../../store'
import { formatPrice } from '../../utils'
import Button from '../Button'

type Props = {
  submit: (order: Order) => void
  isLoading: boolean
}

export default function PurchaseForm({ isLoading, submit }: Props) {
  const dispatch = useDispatch()
  const { payment, delivery, items } = useSelector(
    (state: RootReducer) => state.cart,
  )

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    validateForm,
    setTouched,
  } = useFormik({
    initialValues: {
      receiver: '',
      address: '',
      city: '',
      zipCode: '',
      number: '',
      complement: '',
      cardName: '',
      cardNumber: '',
      code: '',
      month: '',
      year: '',
    },
    validationSchema: Y.object({
      receiver: Y.string().min(4).required('Quem é o destinatário?'),
      address: Y.string().min(2).required('O Endereço é obrigatório'),
      city: Y.string().min(2).required('A Cidade é obrigatória'),
      zipCode: Y.string().min(9).max(9).required('O CEP é obrigatório'),
      number: Y.string().min(4).required('O Número é obrigatório'),
      complement: Y.string(),
      cardName: Y.string().min(3).required('O nome do cartão é obrigatório'),
      cardNumber: Y.string()
        .min(19)
        .max(19)
        .required('O número do cartão é obrigatório'),
      code: Y.string().min(3).max(3).required('O CVV é obrigatório'),
      month: Y.string()
        .min(2)
        .max(2)
        .required('O mês de validade é obrigatório'),
      year: Y.string()
        .min(2)
        .max(2)
        .required('O ano de validade é obrigatório'),
    }),
    onSubmit: values => {
      submit({
        products: items.map(item => ({
          id: item.id,
          price: item.preco,
        })),
        delivery: {
          address: {
            description: values.address,
            city: values.city,
            complement: values.complement,
            number: parseInt(values.number),
            zipCode: values.zipCode,
          },
          receiver: values.receiver,
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: parseInt(values.code),
            expires: {
              month: parseInt(values.month),
              year: parseInt(values.year),
            },
          },
        },
      })
    },
  })

  const handleBackToCart = () => {
    dispatch(setDelivery(false))
  }

  const handleContinueToPayment = async () => {
    const deliveryErrors = await validateForm()
    const deliveryFieldsFilled = !Object.keys(deliveryErrors).some(field =>
      ['receiver', 'address', 'city', 'zipCode', 'number'].includes(field),
    )

    if (deliveryFieldsFilled) {
      dispatch(setDelivery(false))
      dispatch(setPayment(true))
    } else {
      // console.log('error', deliveryErrors)
      setTouched({
        receiver: true,
        address: true,
        city: true,
        zipCode: true,
        number: true,
      })
    }
  }

  const handleBackToDelivery = () => {
    dispatch(setDelivery(true))
    dispatch(setPayment(false))
  }

  const total = items.reduce((sum, item) => sum + (item.preco || 0), 0)

  return (
    <S.FormStyled onSubmit={handleSubmit}>
      {delivery && (
        <>
          <S.Title>Entrega</S.Title>
          <S.Row>
            <S.Controler>
              <label
                className={touched.receiver ? 'error' : ''}
                htmlFor='receiver'
              >
                Quem irá receber
              </label>
              <input
                className={touched.receiver ? 'error' : ''}
                type='text'
                name='receiver'
                id='receiver'
                value={values.receiver}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <S.Row>
            <S.Controler>
              <label
                className={touched.address ? 'error' : ''}
                htmlFor='address'
              >
                Endereço
              </label>
              <input
                className={touched.address ? 'error' : ''}
                type='text'
                name='address'
                id='address'
                value={values.address}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <S.Row>
            <S.Controler>
              <label className={touched.city ? 'error' : ''} htmlFor='city'>
                Cidade
              </label>
              <input
                className={touched.city ? 'error' : ''}
                type='text'
                name='city'
                id='city'
                value={values.city}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <S.Row>
            <S.Controler width='45%'>
              <label
                className={touched.zipCode ? 'error' : ''}
                htmlFor='zipCode'
              >
                CEP
              </label>
              <InputMask
                className={touched.zipCode ? 'error' : ''}
                mask='99999-999'
                type='text'
                name='zipCode'
                id='zipCode'
                value={values.zipCode}
                onChange={handleChange}
              />
            </S.Controler>
            <S.Controler width='45%'>
              <label className={touched.number ? 'error' : ''} htmlFor='number'>
                Número
              </label>
              <input
                className={touched.number ? 'error' : ''}
                type='text'
                name='number'
                id='number'
                value={values.number}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <S.Row>
            <S.Controler>
              <label htmlFor='complement'>Complemento (opcional)</label>
              <input
                type='text'
                name='complement'
                id='complement'
                value={values.complement}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <Button
            title='Clique aqui para continuar com o pagamento'
            type='button'
            onClick={handleContinueToPayment}
          >
            Continuar com o pagamento
          </Button>
          <Button
            title='Voltar para o carrinho'
            type='button'
            onClick={handleBackToCart}
          >
            Voltar para o carrinho
          </Button>
        </>
      )}
      {payment && (
        <>
          <S.Title>Pagamento - valor a pagar {formatPrice(total)}</S.Title>
          <S.Row>
            <S.Controler>
              <label
                className={errors.cardName ? 'error' : ''}
                htmlFor='cardName'
              >
                Nome no Cartão
              </label>
              <input
                className={errors.cardName ? 'error' : ''}
                type='text'
                name='cardName'
                id='cardName'
                value={values.cardName}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <S.Row>
            <S.Controler width='55%'>
              <label
                className={errors.cardNumber ? 'error' : ''}
                htmlFor='cardNumber'
              >
                Número no Cartão
              </label>
              <InputMask
                className={errors.cardNumber ? 'error' : ''}
                mask='9999 9999 9999 9999'
                type='text'
                name='cardNumber'
                id='cardNumber'
                value={values.cardNumber}
                onChange={handleChange}
              />
            </S.Controler>
            <S.Controler width='35%'>
              <label className={errors.code ? 'error' : ''} htmlFor='code'>
                CVV
              </label>
              <InputMask
                className={errors.code ? 'error' : ''}
                mask='999'
                type='text'
                name='code'
                id='code'
                value={values.code}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <S.Row>
            <S.Controler width='45%'>
              <label className={errors.month ? 'error' : ''} htmlFor='month'>
                Mês de Vencimento
              </label>
              <InputMask
                className={errors.month ? 'error' : ''}
                mask='99'
                type='text'
                name='month'
                id='month'
                value={values.month}
                onChange={handleChange}
              />
            </S.Controler>
            <S.Controler width='45%'>
              <label className={errors.year ? 'error' : ''} htmlFor='year'>
                Ano de Vencimento
              </label>
              <InputMask
                className={errors.year ? 'error' : ''}
                mask='99'
                type='text'
                name='year'
                id='year'
                value={values.year}
                onChange={handleChange}
              />
            </S.Controler>
          </S.Row>
          <Button title='Finalizar compra' type='submit' disabled={isLoading}>
            {isLoading ? 'Finalizando...' : 'Finalizar compra'}
          </Button>
          <Button
            title='Voltar para o carrinho'
            type='button'
            onClick={handleBackToDelivery}
          >
            Voltar para a edição de endereço
          </Button>
        </>
      )}
    </S.FormStyled>
  )
}
