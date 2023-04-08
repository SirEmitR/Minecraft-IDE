import { useCompile } from 'context/compileContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
const Wapon = () => {
    const {wapon} = useCompile()
    const [image, setImage] = useState(null)
    useEffect(() =>{
      setImage(wapon?.image)
    }, [wapon])
  return (
    <li>
        {image && <Image
            src={image}
            alt='Wapon'
            height={50}
            title='Herramienta'
        />}
    </li>
  )
}

export default Wapon