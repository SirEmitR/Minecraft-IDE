
import React, { useEffect, useState } from 'react'
import { useCompile } from 'context/compileContext'
import Image from 'next/image'
import PortalImage from '../../../public/nether-portal-minecraft.gif'
import styles from './portal.module.css'
const Portal = () => {
    const {portal, togglePortal } = useCompile()
    const [display, setDisplay] = useState(false)
    useEffect(() =>{
      if(portal == true){
        setDisplay(true)
      }else{
        setDisplay(false)
      }
    }, [portal])
  return (
    <li>
        {display &&
            <Image 
            title='Cambiar de dimension' 
            className={styles.portal} 
            src={PortalImage} 
            alt='Portal image' 
            height={50} 
            onClick={e => togglePortal()} 
            />
        }
    </li>
  )
}

export default Portal