import React, { useContext, useState } from 'react'


const LifeContext = React.createContext();

export function useLife(){
    return useContext(LifeContext);
}

export function LifeProvider ({children}){
    const [life, setLife] = useState(20)
    const [damaging, setDamaging] = useState(false)

    function removeLife(damage){
        setDamaging(true)
        if(life < damage){
            setLife(0)
        }else{
            setLife(life - damage)
        }
        setTimeout(() =>{
            setDamaging(false)
        }, 600)
    }

    function resetLife(){
        setLife(20)
    }

    const value = {
        removeLife,
        life,
        damaging,
        resetLife
    }
    return(
        <LifeContext.Provider value={value}>
            {children}
        </LifeContext.Provider>
    )
}