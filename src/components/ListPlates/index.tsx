import CardPlates from '../CardPlates'
import * as S from './styles'
import { Link } from 'react-router-dom'

import Pizza from '../../assets/Images/Pizza.png'

export default function ListPlates() {
  return (
    <S.List>
      <CardPlates
        image={Pizza}
        title='Pizza Marguerita'
        description='A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!'
      />
      <CardPlates
        image={Pizza}
        title='Pizza Marguerita'
        description='A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!'
      />
      <CardPlates
        image={Pizza}
        title='Pizza Marguerita'
        description='A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!'
      />
      <CardPlates
        image={Pizza}
        title='Pizza Marguerita'
        description='A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!'
      />
      <CardPlates
        image={Pizza}
        title='Pizza Marguerita'
        description='A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!'
      />
      <CardPlates
        image={Pizza}
        title='Pizza Marguerita'
        description='A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!'
      />
    </S.List>
  )
}
