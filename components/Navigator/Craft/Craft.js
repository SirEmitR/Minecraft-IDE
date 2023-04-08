import React, { useState } from 'react'
import CraftImage from '../../../public/crafting.png'
import Image from 'next/image'
import styles from './craft.module.css'
import WoodPickaxe from '../../../public/woodpickaxe.png'
import Plank from '../../../public/plank.png'
import Stone from '../../../public/stone.png'
import Iron from '../../../public/iron.png'
import Gold from '../../../public/gold.png'
import Diamond from '../../../public/diamond.png'
import Mechero from '../../../public/mechero.png'
import Pedernal from '../../../public/pedernal.png'
import PortalGif from '../../../public/nether-portal-minecraft.gif'
import Obsidian from '../../../public/obsidian.png'
import StonePickaxe from '../../../public/stonepickaxe.png'
import IronPickaxe from '../../../public/ironpickaxe.png'
import GoldPickaxe from '../../../public/goldpickaxe.png'
import DiamonPickaxe  from '../../../public/diamondpickaxe.png'
import Crafteo from './Crafteo/Crafteo'
const Craft = () => {
    const [open, setOpen] = useState(false)
  return (
    <li>
        <Image 
            src={CraftImage}
            alt='Crafting table'
            width={50}
            height={50}
            onClick={e => setOpen(!open)}
            className={styles.craftImage}
            title='Mesa de crafteo'
        />
        {open &&
            <div className={styles.crafting}>
            <h2>Fabricación</h2>
            <div className={styles.mesa}>
                <Crafteo styles={styles} object={{
                    id: 'wood pickaxe',
                    image: WoodPickaxe,
                    type: 0,
                    damage: 1.5
                }} required={[{
                    id: 'madera',
                    image: Plank,
                    count: 6
                }]} />
                <Crafteo styles={styles} object={{
                    id: 'stone pickaxe',
                    image: StonePickaxe,
                    type: 0,
                    damage: 2
                }} required={[
                    {
                    id: 'madera',
                    image: Plank,
                    count: 3
                    },
                    {
                    id: 'piedra',
                    image: Stone,
                    count: 3
                    }
                    ]} />
                    <Crafteo styles={styles} object={{
                    id: 'iron pickaxe',
                    image: IronPickaxe,
                    type: 0,
                    damage: 2.5
                }} required={[
                    {
                    id: 'madera',
                    image: Plank,
                    count: 3
                    },
                    {
                    id: 'hierro',
                    image: Iron,
                    count: 3
                    }
                    ]} />
                <Crafteo styles={styles} object={{
                    id: 'gold pickaxe',
                    image: GoldPickaxe,
                    type: 0,
                    damage: 3
                }} required={[
                    {
                    id: 'madera',
                    image: Plank,
                    count: 3
                    },
                    {
                    id: 'oro',
                    image: Gold,
                    count: 3
                    }
                ]} />
                <Crafteo styles={styles} object={{
                    id: 'diamond pickaxe',
                    image: DiamonPickaxe,
                    type: 0,
                    damage: 4
                }} required={[
                    {
                    id: 'madera',
                    image: Plank,
                    count: 3
                    },
                    {
                    id: 'diamante',
                    image: Diamond,
                    count: 3
                    }
                ]} />
                <Crafteo styles={styles} object={{
                    id: 'mechero',
                    image: Mechero,
                    type: 1,
                    damage: 0,
                    publicImage: 'mechero.png'
                }} required={[
                    {
                    id: 'grava',
                    image: Pedernal,
                    count: 1
                    },
                    {
                    id: 'hierro',
                    image: Iron,
                    count: 1
                    }
                ]} />
                <Crafteo styles={styles} object={{
                    id: 'portal',
                    image: PortalGif,
                    type: 2,
                    damage: 0
                }} required={[
                    {
                    id: 'obsidiana',
                    image: Obsidian,
                    count: 8
                    },
                    {
                    id: 'mechero',
                    image: Mechero,
                    count: 1
                    }
                ]} />
            </div>
        </div>
        }
    </li>
  )
}

export default Craft