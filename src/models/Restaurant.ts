// models/Restaurant.ts

export type Restaurant = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: MenuItem[]
}

export type MenuItem = {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}
