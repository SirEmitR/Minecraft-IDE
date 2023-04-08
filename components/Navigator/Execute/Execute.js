import Image from 'next/image'
import React from 'react'
import Vagoneta from '../../../public/execute.png'
import styles from './execute.module.css'
import { useCompile } from 'context/compileContext'
const Execute = () => {
  const {correctCompile} = useCompile()
  return (
    <li>
      <button title='Ejectrar' className={styles.execute} disabled={!correctCompile}>
        <Image src={Vagoneta} alt='Execute' height={50}/>
      </button>
    </li>
  )
}

export default Execute