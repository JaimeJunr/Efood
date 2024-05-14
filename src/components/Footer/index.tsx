import * as S from './styles'

import Logo from '../../assets/Svg/Efood.svg'
import Instagram from '../../assets/Svg/Instagram.svg'
import Facebook from '../../assets/Svg/Facebook.svg'
import Twitter from '../../assets/Svg/Twitter.svg'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <S.Footer>
      <S.HeadFooter>
        <Link to={'/'}>
          <Logo />
        </Link>
        <S.SocialMedia>
          <a href='/'>
            <Instagram />
          </a>
          <a href='/'>
            <Facebook />
          </a>
          <a href='/'>
            <Twitter />
          </a>
        </S.SocialMedia>
      </S.HeadFooter>
      <S.FooterDescription>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </S.FooterDescription>
    </S.Footer>
  )
}
