import { useCompile } from 'context/compileContext'
import Image from 'next/image'
import React from 'react'

const Crafteo = ({styles, required, object}) => {
    const {inventario, buildObject} = useCompile()
  return (
    <div className={styles.craft}>
        <Image onClick={e => buildObject(object,required )} src={object?.image} alt={object?.id} width={50} className={`${styles.item}`}/>
        <div className={styles.required}>
            {required.map((r, index) =>{
                const existentes = inventario.findIndex(inv => inv.id === r?.id)
                let cantEx = 0
                if(existentes !== -1){
                    cantEx = inventario[existentes]?.count
                }
                return (
                   <>
                    {Array.from({length: r?.count}).map((re, i) =>{
                        return (
                            <Image key={i} src={r?.image} className={`${i + 1 > cantEx && styles.disabled}`} alt={r?.id} width={r?.id === 'grava' ? 30 : 50}/>
                        )
                    })}
                   </>
                )
            })}
        </div>
    </div>
  )
}

export default Crafteo