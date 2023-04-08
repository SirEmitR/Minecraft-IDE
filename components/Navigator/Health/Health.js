import { useLife } from 'context/lifeContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Heart from '../../../public/heart.png'
import HalfHeart from '../../../public/halfHeart.png'
import Empty from '../../../public/emptyHeart.png'
import styles from './healt.module.css'
const Health = () => {
    const {life} = useLife()
    const [hearts, setHearts] = useState(0)
    const [half, setHalf] = useState(false)
    const [empty, setEmpty] = useState(0)
    useEffect(() =>{
        const hearts = Math.floor(life / 2)
        setHearts(Math.floor(life / 2))
        const ishalf = life % 2 === 1
        setHalf(ishalf)
        if(ishalf){
            const emptyHearts = Math.abs(hearts + 1 - 10)
            setEmpty(emptyHearts)
        }else{
            const emptyHearts = Math.abs(hearts - 10)
            setEmpty(emptyHearts)
        }
    }, [life])
  return (
    <li className={styles.health}>
    {Array.from({length: hearts }).map((l, index) =>{
        return (
            <Image
                src={Heart}
                alt='Heart'
                key={index}
                width={30}
                height={30}
            />
        )
    })}
    {half && 
        <Image
        src={HalfHeart}
        alt='half heart'
        width={30}
        height={30}
    />
    }
    {Array.from({length: empty }).map((l, index) =>{
        return (
            <Image
                src={Empty}
                alt='Empty heart'
                key={index}
                width={30}
                height={30}
            />
        )
    })}
    </li>
  )
}

export default Health