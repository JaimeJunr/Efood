import * as S from './styles'

import Logo from '../../assets/Svg/Efood.svg'
import { Link } from 'react-router-dom'
import { Container } from '../../styles'

export type Props = {
  home?: boolean
}

export default function Header({ home }: Props) {
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
          <S.ImageContainer>
            <Container>
              <S.RestaurantTitle category>Italiana</S.RestaurantTitle>
              <S.RestaurantTitle>La Dolce Vita Trattoria</S.RestaurantTitle>
            </Container>
          </S.ImageContainer>
        </>
      )}
    </>
  )
}
