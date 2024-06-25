import * as S from './styles'

import Tag from '../Tag'
import Star from '../../assets/Svg/Estrela.svg'
import { Restaurant } from '../../models/Restaurant'

import Button from '../Button'
import { Description, Title } from '../../styles'

const getDescription = (description: string) => {
  if (description.length > 250) {
    return description.slice(0, 250) + '...'
  }
  return description
}

export const CardRestaurant = ({
  tipo,
  descricao,
  destacado,
  id,
  capa,
  avaliacao,
  titulo,
}: Restaurant) => {
  return (
    <S.Card>
      <img src={capa} alt={tipo} />
      <S.CardBody>
        <S.Head>
          <Title>{titulo}</Title>
          <div>
            <S.Score>{avaliacao}</S.Score>
            <Star />
          </div>
        </S.Head>
        <S.Infos>
          {destacado ? <Tag>Destaque da semana</Tag> : null}
          <Tag>{tipo}</Tag>
        </S.Infos>
        <Description>{getDescription(descricao)}</Description>
        <Button title='Saiba Mais' type='link' to={`/perfil/${id}`}>
          Saiba mais
        </Button>
      </S.CardBody>
    </S.Card>
  )
}
