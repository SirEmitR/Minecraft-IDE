import Cube from 'components/Cube/Cube'
import { useCompile } from 'context/compileContext'
import React from 'react'
import styles from './result.module.css'
import Image from 'next/image'
import Zorro from '../../../public/zorro.gif'
const Result = () => {
    const {compile, compileResult, drop, cubes, orderCubes, indexCube, correctCompile, execute} = useCompile()
  return (
    <div className={styles.result}>
      {!execute && compile &&
        <>
          {compileResult ? 
          <div className={styles.error}>
              <span>linea: {compileResult[0]}</span> <span>{compileResult[1]}</span>
              <div>estado de compilacion: {compileResult[2] ? 'correcto' : 'incorrecto'}</div>
          </div>
          :
            <div className={styles.noerror}>
            <p>0 errores. Se puede ejecutar el codigo</p>
              estado de compilacion: correcto<p></p>
            </div>
          }
        </>
      }
      {
        compile && correctCompile && execute &&
          <>
            {orderCubes.length > 0 && indexCube !== -1 &&
              <Cube values={cubes[indexCube]}/>
          }</>
      }
        
      {!compile && !compileResult && 
        <div className={styles.await}>
          <Image 
            src={Zorro}
            alt='Zorro'
            height={200}
          />
        </div>
      }
      {
        drop &&
        <div className={styles.drop}>
          <Image 
            src={require(`../../../public/${drop?.awardImage}`)}
            alt= {`${drop?.id}`}
            width={100}
          />
          </div>
        }
    </div>
  )
}

export default Result