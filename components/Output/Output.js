import React, { useEffect, useState } from 'react'
import styles from './output.module.css'
import { useCompile } from 'context/compileContext'
import Compile from 'components/Compile/Compile'
import Result from './Result/Result'
const Output = () => {
  const {compiling} = useCompile()
  return (
    <div className={styles.output}>
    {compiling ?
      <Compile />
      :
      <Result />
    }
    </div>
  )
}

export default Output