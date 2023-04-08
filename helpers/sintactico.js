import { initialize,functionExp, tokens, numberExp, operationExp, tasks, declareInvalidTask, createTask, idInitk, deleteTask, idExp, colExp, rgbExp, hexaExp, materials, materialExp, optionalSpace, forcedSpace} from "./regExpresion";
const singleBlock = new RegExp(`^\\s*(bloque)\\s*`)
const errorSpan = `<span style='color:red;font-size:12px;'> error</span>`
export function sintacticAnalisys(text, line){
    if(text === ''){
        deleteTask(line, text)
        return `<span>${text}</span>`
    }
    //validate initialize
    const initVal = text.match(initialize)
    if(initVal){
        const block = initVal[1]
        const idInit = initVal[2]
        if(idInit.match(`^\\s*(bloque|${materials.map(m => m.id).join('|')})\\s*$`)){
            const index = tokens.findIndex(token => token.line === line);
            if(index !== -1){
                //delcare invalid task
                declareInvalidTask(line, text, idInit)
                tokens.splice(index, 1)
            }
            return `<span style='color:yellow'>${block}</span><span style='text-decoration:underline 1px red; text-decoration-style: wavy;'>${idInit}</span>${errorSpan}`
        }else{
            const repeted = tokens.findIndex(token => token.id === idInit && token.line !== line);
            if(repeted !== -1){
                //delcare invalid task
                declareInvalidTask(line, text, idInit)
                return `<span style='color:yellow'>${block}</span><span style='text-decoration:line-through 1px red; text-decoration-style: wavy;'>${idInit}</span>${errorSpan}`
            }
            const index = tokens.findIndex(token => token.line === line);
            if(index !== -1){
                //delcare valid task
                declareInvalidTask(line, text, idInit)
                tokens[index].id = idInit
            }else{
                //delcare valid task
                const newToken = {
                    id: idInit,
                    color: 'rgb(62, 237, 253)',
                    wigth: 500, 
                    line: line
                }
                tokens.push(newToken)
            }
            const values = {id: 'init', values:{id: idInit}, line: line, correct: true}
            createTask(values, line, text)
            return `<span style='color:yellow'>${block}</span><span style='color:#00F4FF'>${idInit}</span>`
        }
    }

    //validate function
    const isfunction = text.match(functionExp)
    if(isfunction){
        const idInialized = isfunction[1]
        if(tokens.findIndex(token => token.id === idInialized) !== -1){
            const funTyped = isfunction[2]
            const value = isfunction[3]
            if(funTyped === 'dureza'){
                const numberValueExp = `^(${numberExp}|${operationExp})$`
                const isvalid = value.match(numberValueExp)
                if(isvalid){
                    const phrases = `(\\s*)${idExp}\\.dureza(.+)*`
                    const rest = isfunction.input.match(phrases)
                    if(!isvalid[2]){
                        //normal asignation
                        const [numeber1, oprator, number2] = [isvalid[4],isvalid[5],isvalid[6]]
                        const values = {id: 'asign', values:{id: idInialized, fun:funTyped, type: 1, values: [numeber1, oprator, number2]}, line: line, correct: true}
                        createTask(values,line, text)
                    }else{
                        const number = isvalid[2]
                        const values = {id: 'asign', values:{id: idInialized, fun:funTyped, type: 0, values: [number]}, line: line, correct: true}
                        createTask(values,line, text)
                    }
                    return `<span>${rest[1]}</span><span style='color:#00F4FF'>${idInialized}</span>.<span style='color:#FF6400'>${funTyped}</span><span>${rest[3]}</span>`
                }
            }
            if(funTyped === 'color'){
                const colorValueExp = `^(${colExp}|${rgbExp}|${hexaExp})$`
                const isvalid = value.match(colorValueExp)
                if(isvalid){
                    const color = isvalid[1]
                    const phrases = `(\\s*)${idExp}\\.color(.+)*`
                    const rest = isfunction.input.match(phrases)
                    const values = {id: 'asign', values:{id: idInialized, fun:funTyped, values: [color]}, line: line, correct: true}
                    createTask(values,line, text)
                    return `<span>${rest[1]}</span><span style='color:#00F4FF'>${idInialized}</span>.<span style='color:${color}'>${funTyped}</span><span>${rest[3]}</span>`
                }
            }
            if(funTyped === 'estilo'){
                const stylesExp = `^${materialExp}$`
                const isvalid = value.match(stylesExp)
                if(isvalid){
                    const material = isvalid[1]
                    const mat = materials.find(mate => mate.id === material)
                    const phrases = `(\\s*)${idExp}\\.estilo(.+)*`
                    const rest = isfunction.input.match(phrases)
                    const values = {id: 'asign', values:{id: idInialized, fun:funTyped, values: {style: mat?.id, texture: mat?.texture}}, line: line, correct: true}
                    createTask(values,line, text)
                    return `<span>${rest[1]}</span><span style='color:#00F4FF'>${idInialized}</span>.<span style='color:#FF5FE9'>${funTyped}</span><span>${rest[3]}</span>`
                }
            }
        }
    }
    const craftExp = `^${optionalSpace}craftear${forcedSpace}(${materials.map(m => m.id).join('|')}|${tokens.map(t => t.id).join('|')})${optionalSpace}$`
    const craftear = text.match(craftExp)
    if(craftear){
        const bloque = craftear[1]
        const ismaterial = bloque.match(materialExp)
        const phrases = `(\\s*)craftear(.+)*`
        const rest = craftear.input.match(phrases)
        const values = {id: 'craft', values:{id: bloque, type:0}, line: line, correct: true}
        createTask(values,line, text)
        if(ismaterial){
            
            return `<span>${rest[1]}</span><span style='color:#17FF00'>craftear</span><span style='color:#FFF'>${rest[2]}</span><div class='${bloque}'></div>`
        }else{
            return `<span>${rest[1]}</span><span style='color:#17FF00'>craftear</span><span style='color:#FFF'>${rest[2]}</span>`
        }
    }
    //everythong is wrong
    const tokenIndex = tokens.findIndex(token => token.line === line);
    if(tokenIndex !== -1){
        tokens.splice(tokenIndex, 1)
    }
    //delcare invalid task
    declareInvalidTask(line, text)
        
    return `<span>${text}</span>${errorSpan}`
}