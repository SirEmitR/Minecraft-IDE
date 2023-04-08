import React, { useContext, useEffect, useState } from 'react'

import { materials, resetValues, tasks, tokens } from 'helpers/regExpresion';
import { useLife } from './lifeContext';
import { useLocalStorage } from 'hooks/useLocalStorege';
import HandSteve from '../public/stevehand.png'
const CompileContext = React.createContext();

export function useCompile(){
    return useContext(CompileContext);
}
function compararCadenas(cadena1, cadena2) {
    var longitud = Math.max(cadena1.length, cadena2.length);
    for (var i = 0; i < longitud; i++) {
      if (cadena1[i] !== cadena2[i]) {
        return i;
      }
    }
    return -1; // Si las cadenas son iguales, devolver -1
}
export function CompileProvider ({children}){
    const [compile, setCompile] = useState(false)
    const [compiling, setCompiling] = useState(false)
    const [code, setCode] = useState('')
    const {removeLife, resetLife} = useLife()
    const [compileResult, setCompileResult] = useState(null)
    const [cubes, setCubes] = useState([])
    const [currentCube, setCurrentCube] = useState(0)
    const [wapon, setWapon] = useLocalStorage('wapon', {id: 'hand', image: HandSteve, damage: 1})
    const [portal, setPortal] = useLocalStorage('portal', false)
    const [portalActive, setPortalActive] = useState(false)
    const [orderCubes, setOrderCubes] = useState([])
    const [correctCompile, setCorrectCompile] = useState(false)
    const [execute, setExecute] = useState(false)
    const [indexCube, setIndexCube] = useState(-1)
    const [drop, setDrop] = useState(null)
    const [inventario, setInventario] = useLocalStorage('inventario', [])
    function compileCode(){
        setCompiling(true)
        const result = semanticAnalisys()
        setTimeout(() =>{
            setCompileResult(result)
            if(result !== null){
                removeLife(1)
                setCompile(false)
            }else{
                resetLife()
                setCompile(true)
            }
            setCompiling(false)
        }, 3000)
        return result
    }
    function togglePortal(){
        setPortalActive(!portalActive)
    }
    function buildObject(object, materials){
        let validation = 0
        materials.forEach((mat) =>{
            const invIndex = inventario.find(inv => inv.id === mat?.id)
            if(invIndex){
                if(invIndex?.count >= mat?.count){
                    validation += 1
                }
            }
        })
        if(validation >= materials.length){
            if(object?.type === 0){
                setWapon({
                    id:object?.id,
                    image: object?.image,
                    damage: object?.damage
                })
            }
            if(object?.type === 1){
                const mate = {
                    id:object?.id,
                    awardImage: object?.publicImage,
                }
                agregarInventario(mate)
            }
            if(object?.type === 2){
                setPortal(true)
            }
            materials.forEach((mat) =>{
                removeInvetario(mat, mat?.count)
            })
        }
    }

    function removeInvetario(material, count){
        const invIndex = inventario.findIndex(i => i.id === material.id)
        if(invIndex !== -1){
            let invAux = inventario
            const cantidad = invAux[invIndex].count
            if(cantidad - count <= 0){
                invAux.splice(invIndex, 1)
            }else{
                invAux[invIndex].count = cantidad - count
            }
            setInventario(invAux)
        }
    }

    function agregarInventario(material){
        const invIndex = inventario.findIndex(i => i.id === material.id)
        if(invIndex !== -1){
            let invAux = inventario
            invAux[invIndex].count = invAux[invIndex].count + 1
            setInventario(invAux)
        }else{
            const newInv = {
                id: material.id,
                image: material.awardImage,
                count: 1
            }
            let invAux = inventario
            invAux.push(newInv)
            setInventario(invAux)
        }
    }
    function earnDrop(material){
        let dropear = false
        if(material?.porcentage !== 100){
            if (Math.random() < material?.porcentage / 100) {
                dropear = true;
            } else {
                dropear = false;
            }
        }else{
            dropear = true
        }
        if(dropear){
            setDrop(material)
            agregarInventario(material)  
        }else{
            setDrop({id: 'nothing', awardImage: 'steveraro.gif'})
        }
        setTimeout(() =>{
            setDrop(null)
        }, 4000)
    }

    function changeCube(){
        if(currentCube + 1 == orderCubes.length){
            setOrderCubes([])
            setCurrentCube(0)
            setIndexCube(-1)
        }else{
            setCurrentCube(currentCube + 1)
            const indexNextCube = orderCubes[currentCube + 1]
            setIndexCube(indexNextCube)
        }
    }

    function operation(values){
        const [number1, operator,number2] = values
        const n1 = parseInt(number1)
        const n2= parseInt(number2)
        switch(operator){
            case '+':
                return n1 + n2
            case '-':
                return n1 - n2
            case '*':
                return n1 * n2
        }
    }
    function semanticAnalisys(){
        let result = null
        let list = []
        let indCube = -1
        let ordCubes = []
        setCurrentCube(0)
        materials.map(mat =>{
            const newCube = {
                id: mat.id,
                style: mat.id,
                texture: mat.texture,
                resist: mat.resist,
                award: mat.award,
                porcentage: mat.porcentage,
                color: null, 
                awardImage: mat.awardImage
            }
            list.push(newCube)
        })
        tasks.forEach((task) =>{
            const {id, correct, line, values} = task
            if(id === 'init'){
                if(correct){
                    const newCube = {
                        id: values?.id,
                        style: values?.style ? values?.style : 'basic',
                        resist: values?.resist ? values?.resist : 3,
                        color: values?.color ? values?.color : '#FFF',
                        texture: values?.texture ? values?.texture : null,
                        award: null,
                        porcentage: 0,
                    }
                    list.push(newCube)
                }else{
                    result = validateErrors(task)
                }
            }
            if(id === 'asign'){
                if(correct){
                    const {fun} = values
                    const indexId = list.findIndex(cube => cube?.id === values?.id)
                    if(indexId !== -1){
                        if(fun === 'dureza'){
                            const {type} = values
                            if(type === 0){
                                list[indexId].resist = parseInt(values?.values[0])
                            }else{
                                list[indexId].resist = operation(values?.values)
                            }
                        }
                        if(fun === 'color'){
                            list[indexId].color = values?.values[0]
                        }
                        if(fun === 'estilo'){
                            const {style, texture} = values?.values
                            list[indexId].style = style
                            list[indexId].texture = texture
                        }
                    }
                }
            }
            if(id === 'craft'){
                if(correct){
                    const idBlock = values.id
                    const indexId = list.findIndex(cube => cube?.id === idBlock)
                    if(indCube === -1){
                        indCube = indexId
                    }
                    ordCubes.push(indexId)
                }
            }
        })
        setIndexCube(indCube)
        setCubes(list)
        setOrderCubes(ordCubes)
        if(result === null){
            setCompileResult(null)
            setCorrectCompile(true)
        }else{
            setCompileResult(result)
            setCorrectCompile(false)
        }
        // tasks.forEach((task) =>{
        //     switch(task.id){
        //         case 'init':
        //             if(!task.correct){
        //                 const regex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*[a-zA-Z]\w*)\s*$/
        //                 const isvalid = task.sentence.match(regex)
        //                 if(isvalid){
        //                     const block = 'bloque'
        //                     if(isvalid[1] !== block){
        //                         const strComp = compararCadenas(block, isvalid[1])
        //                         if(strComp !== -1){
        //                             result = [task.line, `Sentencia invalida en la posicion ${strComp} se esperaba 'bloque'`, false]
        //                             break
        //                         }

        //                     }else{
        //                         tokens.forEach((token) =>{
        //                             const strComp = compararCadenas(token.id, isvalid[1])
        //                             if(strComp !== -1){
        //                                 result = [task.line, `Sentencia invalida en la posicion ${strComp} se esperaba un identificador`, false]
        //                                 return
        //                             }
        //                         })
        //                     }
        //                 }
        //                 result = [task.line, `Sentencia invalida se esperaba 'bloque' y un identificador` , false]
        //             }else{
        //                 if(tokens.filter(token => token.line === 0).findIndex(token => token.id === task.values.id) !== -1){
        //                     result = [task.line, `${task.values.id} es una palabra reservada que no puede ser utilizada como identificador, se esperaba bloque idetificador` , false]
        //                     return
        //                 }
        //             }
        //             break;
        //         case 'asign':
        //             if(!task.correct){
        //                 switch(task.values.fun){
        //                     case 'color':
        //                         //validara rgb, hexadecimal, palabras
        //                         const valll = 'rgb(255,255,255)'
        //                         const rgb = /\s*rgb\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)\s*/
        //                         const valueRegex = `^\s*(${rgb})`
        //                         const valid = task.values.val.match(valueRegex)
        //                         console.log(valid)
        //                         break
        //                 }
        //                 if(task.sentence.indexOf('.') === -1){
        //                     result = [task.line, `Se esperaba una funcion de asignacion ${task.values.id}.${task.values.fun}<valor>`, false]
        //                     break
        //                 }
        //             }
        //             break;
        //     }
        //     if(result !== null){
        //         return
        //     }
        // })   
        return result
    }
    function toggleCompile(){
        setCompile(!compile)
    }
    function toggleCompiling(){
        setCompiling(!compiling)
    }

    function validateErrors(task){
        let result = null
        if(task.id === 'init'){
            if(!task.correct){
                const regex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*[a-zA-Z]\w*)\s*$/
                const isvalid = task.sentence.match(regex)
                if(isvalid){
                    const block = 'bloque'
                    if(isvalid[1] !== block){
                        const strComp = compararCadenas(block, isvalid[1])
                        if(strComp !== -1){
                            return result = [task.line, `Sentencia invalida en la posicion ${strComp} se esperaba 'bloque'`, false]
                        }
                    }else{
                        let r = null
                        tokens.forEach((t) =>{
                            const strComp = compararCadenas(t.id, isvalid[2])
                            if(strComp !== -1){
                                r = [task.line, `${isvalid[2]} ya ha sido declarado anteriormente`, false]
                            }
                        })
                        if(r){
                            return result = r
                        }
                        if(materials.findIndex(t => t.id === task.values.id) !== -1){
                            return result = [task.line, `${task.values.id} es una palabra reservada que no puede ser utilizada como identificador, se esperaba bloque idetificador` , false]
                            
                        }
                    }
                }else{
                    return result = [task.line, `Sentencia invalida se esperaba 'bloque' y un identificador` , false]
                }
            }
        }
                
                // case 'asign':
                //     if(!task.correct){
                //         switch(task.values.fun){
                //             case 'color':
                //                     //validara rgb, hexadecimal, palabras
                //                     const valll = 'rgb(255,255,255)'
                //                     const rgb = /\s*rgb\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)\s*/
                //                     const valueRegex = `^\s*(${rgb})`
                //                     const valid = task.values.val.match(valueRegex)
                //                     break
                //             }
                //             if(task.sentence.indexOf('.') === -1){
                //                 result = [task.line, `Se esperaba una funcion de asignacion ${task.values.id}.${task.values.fun}<valor>`, false]
                //                 break
                //             }
                //         }
                //         break;
                // }
        return result
    }

    function clearSolution(){
        setCompile(false)
        setCompiling(false)
        setCompileResult(null)
        setCorrectCompile(false)
        setCode('')
        resetValues()
        setCubes([])
        setCurrentCube(0)
        setIndexCube(-1)
        setOrderCubes([])
        setDrop(null)
    }
    const value = {
        toggleCompile,
        toggleCompiling,
        compiling,
        compile,
        code,
        setCode,
        compileCode,
        compileResult,
        currentCube,
        changeCube,
        cubes,
        wapon,
        orderCubes,
        indexCube,
        drop,
        earnDrop,
        inventario,
        buildObject,
        portal,
        portalActive,
        togglePortal,
        correctCompile,
        execute,
        clearSolution
    }
    return(
        <CompileContext.Provider value={value}>
            {children}
        </CompileContext.Provider>
    )
}