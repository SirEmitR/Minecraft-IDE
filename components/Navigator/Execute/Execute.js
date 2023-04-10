import Image from 'next/image'
import React from 'react'
import Vagoneta from '../../../public/execute.png'
import styles from './execute.module.css'
import { useCompile } from 'context/compileContext'
const Execute = () => {
  const {correctCompile, executeCode} = useCompile()
  return (
    <li>
      <button title='Ejectrar' className={styles.execute} onClick={e => executeCode()} disabled={!correctCompile}>
        <Image src={Vagoneta} alt='Execute' height={50}/>
      </button>
    </li>
  )
}

export default Execute