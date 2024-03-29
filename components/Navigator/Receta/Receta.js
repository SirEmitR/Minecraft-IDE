import Image from 'next/image'
import React, { useState } from 'react'
import RecetaBook from '../../../public/recetbook.png'
import styles from './receta.module.css'
const Receta = () => {
  const [open,setOpen] = useState(false)
  return (
    <li className={styles.receta}>
        <Image 
            src={RecetaBook}
            alt='Libro de receta'
            width={40}
            height={40}
        />
    </li>
  )
}

export default Receta