import * as S from './styles'

type Props = {
  title: string
  description: string
  image: string
}

export default function CardPlates({ title, description, image }: Props) {
  return (
    <S.Card>
      <img src={image} alt={title} />

      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Button to={'/perfil'}>Adicionar ao carrinho</S.Button>
    </S.Card>
  )
}
