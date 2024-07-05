import * as S from './styles'

import { MenuItem, Restaurant } from '../../models/Restaurant'

import { useState } from 'react'
import CardPlates from '../../components/CardPlates'
import ModalProduct from '../../components/Modal'
import { Skeleton } from '@mui/material'

type Props = {
  restaurant?: Restaurant
}

export default function ListPlates({ restaurant }: Props) {
  const [product, setProduct] = useState<MenuItem>()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <S.List>
        {restaurant ? (
          restaurant.cardapio.map((item, index) => (
            <CardPlates
              key={index}
              product={item}
              onOpenModal={handleOpen}
              setCurrectProduct={setProduct} // Passa função para abrir o modal
            />
          ))
        ) : (
          <>
            <Skeleton variant='rectangular' width={'100%'} height={300} />
            <Skeleton variant='rectangular' width={'100%'} height={300} />
            <Skeleton variant='rectangular' width={'100%'} height={300} />
          </>
        )}
      </S.List>
      {product && (
        <ModalProduct open={open} onClose={handleClose} product={product} />
      )}
    </>
  )
}
