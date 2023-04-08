import { useCompile } from 'context/compileContext'
import React from 'react'
import styles from './compile.module.css'
import Image from 'next/image'
import Yunque from '../../../public/yunque.png'
const Compile = () => {
    const {compileCode, compiling} = useCompile()
  return (
    <li>
        <button title='Compilar' className={styles.ejecutar} onClick={e => compileCode()} disabled={compiling}>
          <Image src={Yunque} alt='yunque' height={50}/>
        </button>
    </li>
  )
}

export default Compile