import Tag from '../Tag'
import * as S from './styles'

import Star from '../../assets/Svg/Estrela.svg'

type Props = {
  title: string
  category: string
  highlight?: boolean
  description: string
  score: string
  image: string
}

export default function CardRestaurant({
  title,
  category,
  description,
  highlight,
  image,
  score,
}: Props) {
  return (
    <S.Card>
      <img src={image} alt={category} />
      <S.CardBody>
        <S.Head>
          <S.Title>{title}</S.Title>
          <div>
            <S.Score>{score}</S.Score>
            <Star />
          </div>
        </S.Head>
        <S.Infos>
          {highlight ? <Tag>Destaque da semana</Tag> : null}
          <Tag>{category}</Tag>
        </S.Infos>
        <S.Description>{description}</S.Description>
        <S.Button to={'/perfil'}>Saiba Mais</S.Button>
      </S.CardBody>
    </S.Card>
  )
}
