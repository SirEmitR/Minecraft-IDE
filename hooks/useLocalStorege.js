import { useState } from "react";

export function useLocalStorage(key, init){
    const [value, setValue] = useState(() =>{
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : init
        }catch{
            return init
        }
    })
    const setLocalStorage = val =>{
        try{
            window.localStorage.setItem(key, JSON.stringify(val))
            setValue(val)
        }
        catch{
            console.log(err)
        }
    }
    return [value, setLocalStorage]
}