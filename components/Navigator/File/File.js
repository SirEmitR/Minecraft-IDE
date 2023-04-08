import Image from 'next/image'
import React, { useState } from 'react'
import styles from './file.module.css'
const File = () => {
    const [createFile, setCreateFile] = useState(false)
  return (
    <li className={styles.file}>
        <Image
            src={require('../../../public/libro.png')}
            alt='Minecraft book'
            width={40}
            onClick={e => setCreateFile(!createFile)}
            title='Crear documento'
        />
        {createFile &&
            <form>
                <input placeholder='Nombre del documento'/>
            </form>
        }
    </li>
  )
}

export default File