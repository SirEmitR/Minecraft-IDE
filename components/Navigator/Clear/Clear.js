import React from 'react'
import Bed from '../../../public/bed.png'
import Image from 'next/image'
import styles from './clear.module.css'
import { useCompile } from 'context/compileContext'
const Clear = () => {
    const {clearSolution} = useCompile()
  return (
    <li>
        <Image
            src={Bed}
            alt='Bed'
            title='Limpiar solucion'
            height={50}
            className={styles.clear}
            onClick={e => clearSolution()}
        />
    </li>
  )
}

export default Clear