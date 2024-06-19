import Tag from '../Tag'
import * as S from './styles'
import Star from '../../assets/Svg/Estrela.svg'
import { Restaurant } from '../../models/Restaurant'
import { Link } from 'react-router-dom'

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
  cardapio,
  titulo,
}: Restaurant) => {
  return (
    <S.Card>
      <img src={capa} alt={tipo} />
      <S.CardBody>
        <S.Head>
          <S.Title>{titulo}</S.Title>
          <div>
            <S.Score>{avaliacao}</S.Score>
            <Star />
          </div>
        </S.Head>
        <S.Infos>
          {destacado ? <Tag>Destaque da semana</Tag> : null}
          <Tag>{tipo}</Tag>
        </S.Infos>
        <S.Description>{getDescription(descricao)}</S.Description>
        <S.Button>
          <Link to={`/perfil/${id}`}>Saiba mais</Link>
        </S.Button>
      </S.CardBody>
    </S.Card>
  )
}
