import CardRestaurant from '../CardRestaurant'
import * as S from './styles'
import { Link } from 'react-router-dom'

import Japonesa from '../../assets/Images/Japonesa.png'
import Italiana from '../../assets/Images/Italiana.png'

export default function ListRestaurant() {
  return (
    <S.List>
      <CardRestaurant
        image={Italiana}
        title='La Dolce Vita Trattoria'
        category='Italiana'
        description='A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'
        highlight
        score='4.6'
      />
      <CardRestaurant
        image={Japonesa}
        title='Hioki Sushi'
        category='Japonesa'
        description='Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!'
        score='4.9'
      />
      <CardRestaurant
        image={Japonesa}
        title='Hioki Sushi'
        category='Japonesa'
        description='Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!'
        score='4.9'
      />
      <CardRestaurant
        image={Japonesa}
        title='Hioki Sushi'
        category='Japonesa'
        description='Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!'
        score='4.9'
      />
      <CardRestaurant
        image={Japonesa}
        title='Hioki Sushi'
        category='Japonesa'
        description='Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!'
        score='4.9'
      />
      <CardRestaurant
        image={Japonesa}
        title='Hioki Sushi'
        category='Japonesa'
        description='Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!'
        score='4.9'
      />
    </S.List>
  )
}
