import React from 'react'
import File from './File/File'
import styles from './navigator.module.css'
import Health from './Health/Health'
import Compile from './Compile/Compile'
import Chest from './Chest/Chest'
import Wapon from './Wapon/Wapon'
import Execute from './Execute/Execute'
import Receta from './Receta/Receta'
import Craft from './Craft/Craft'
import Portal from './Portal/Portal'
import { useCompile } from 'context/compileContext'
import Clear from './Clear/Clear'
const Navigator = () => {
  const {portalActive} = useCompile()
  return (
    <nav className={`${styles.navigator} ${portalActive && styles.end}`}>
      <ul>
        <Health />
        <Wapon />
        <Compile />
        <Clear />
        <Execute />
        <Craft />
        <Chest />
        <Portal />
      </ul>
    </nav>
  )
}

export default Navigator