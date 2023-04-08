import Image from 'next/image'
import React, { useState } from 'react'
import ChestImage from '../../../public/textures/chest.png'
import styles from './chest.module.css'
import { useCompile } from 'context/compileContext'
const Chest = () => {
  const [open, setOpen] = useState(false)
  const {inventario} = useCompile()
  return (
    <li className={styles.chest}>
        <Image 
        src={ChestImage}
        alt='Chest image'
        width={50}
        height={50}
        onClick={e => setOpen(!open)}
        className={styles.chestimage}
        title='Inventario'
        />
        {
            open &&
          <div className={styles.chestOpen}>
            <h2>Cofre</h2>
            <div className={styles.inventario}>
              {Array.from({length: 36}).map((_, i) =>{
                const inv = inventario[i]
                console.log(inv)
                return(
                  <div key={i} className={styles.cuadro}>
                    {inv ?
                      <>
                        <Image 
                        src={require(`../../../public/${inv.image}`)}
                        alt={`${inv.id}`}
                        width={inv?.id === 'grava' ? 25 : 45}
                        />
                        <span>{inv.count}</span>
                      </>:
                      null
                    }
                  </div>
                )
              })}
            </div>
          </div>
        }
    </li>
  )
}

export default Chest