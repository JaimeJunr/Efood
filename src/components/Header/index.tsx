import * as S from './styles'

import Logo from '../../assets/Svg/Efood.svg'
import { Link } from 'react-router-dom'
import { Container } from '../../styles'
import { Restaurant } from '../../models/Restaurant'

export type Props = {
  home?: boolean
  restaurant?: Restaurant
}

export default function Header({ home, restaurant }: Props) {
  return (
    <>
      {home ? (
        <S.Header home>
          <Container>
            <Link to={'/'}>
              <Logo />
            </Link>
            <S.HeaderTitle>
              Viva experiências gastronômicas no conforto da sua casa
            </S.HeaderTitle>
          </Container>
        </S.Header>
      ) : (
        <>
          <S.Header>
            <Container>
              <S.HeaderPerfil>Restaurantes</S.HeaderPerfil>
              <Link to={'/'}>
                <Logo />
              </Link>
              <S.HeaderPerfil>0 produto(s) no carrinho</S.HeaderPerfil>
            </Container>
          </S.Header>
          <S.ImageContainer restaurant={restaurant}>
            <Container>
              <S.RestaurantTitle category>{restaurant?.tipo}</S.RestaurantTitle>
              <S.RestaurantTitle>{restaurant?.titulo}</S.RestaurantTitle>
            </Container>
          </S.ImageContainer>
        </>
      )}
    </>
  )
}
