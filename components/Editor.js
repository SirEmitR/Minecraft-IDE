import { Archivo } from '@next/font/google'
import React, { useEffect, useState } from 'react'
import styles from '../src/styles/Editor.module.css'
import Archivero from './Archivero'
const Editor = ({actual}) => {
    const [codigo,  setCoodigo] = useState()

    useEffect(() =>{
        if(actual !== undefined && actual !== null){
            setCoodigo(actual.codigo)
        }
    }, [actual])

  return (
    <div
        className={styles.editor}
    >
        <Archivero />
        <textarea className={styles.codigo} onChange={e => setCoodigo(e.target.value)} value={codigo}>

        </textarea>
    </div>
  )
}

export default Editor