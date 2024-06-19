import * as S from './styles'

import { MenuItem, Restaurant } from '../../models/Restaurant'

import CardPlates from '../CardPlates'
import ModalProduct from '../Modal'
import { useState } from 'react'

type Props = {
  restaurant: Restaurant
}

export default function ListPlates({ restaurant }: Props) {
  const [product, setProduct] = useState<MenuItem>()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <S.List>
        {restaurant.cardapio.map((item, index) => (
          <CardPlates
            key={index}
            product={item}
            onOpenModal={handleOpen}
            setCurrectProduct={setProduct} // Passa função para abrir o modal
          />
        ))}
      </S.List>
      {product && (
        <ModalProduct open={open} onClose={handleClose} product={product} />
      )}
    </>
  )
}
