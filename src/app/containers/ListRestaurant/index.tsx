import * as S from './styles' // Assuming styles are correctly defined

import { Restaurant } from '../../models/Restaurant'
import { CardRestaurant } from '../../components/CardRestaurant'
import { Skeleton } from '@mui/material'

type Props = {
  restaurants?: Restaurant[]
}

export default function ListRestaurant({ restaurants }: Props) {
  return (
    <S.List>
      {restaurants ? (
        restaurants.map((restaurant, index) => (
          <CardRestaurant
            key={index}
            descricao={restaurant.descricao}
            tipo={restaurant.tipo}
            destacado={restaurant.destacado}
            id={restaurant.id}
            capa={restaurant.capa}
            avaliacao={restaurant.avaliacao}
            cardapio={restaurant.cardapio}
            titulo={restaurant.titulo}
          />
        ))
      ) : (
        <>
          <Skeleton variant='rectangular' width={'100%'} height={300} />
          <Skeleton variant='rectangular' width={'100%'} height={300} />
          <Skeleton variant='rectangular' width={'100%'} height={300} />
          <Skeleton variant='rectangular' width={'100%'} height={300} />
          <Skeleton variant='rectangular' width={'100%'} height={300} />
          <Skeleton variant='rectangular' width={'100%'} height={300} />
        </>
      )}
    </S.List>
  )
}
