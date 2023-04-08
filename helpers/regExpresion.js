export let tokens = [
    
]

export const reserved = [
    {
        id: 'bloque', color:'rgb(219, 168, 0)' , wigth: 500, line: 0
    },
    { 
        id: 'craftear', color:'rgb(18, 190, 44)' , wigth: 500, line: 0
    }
]

export const functions = [
    {id: 'dureza', value: 0},
    {id: 'estilo', value: 1},
    {id: 'color', value: 2},
    {id: 'daño', value: 3},
    {id: 'animacion', value: 4}
]

export const materials = [
    {id: 'vidrio', texture: 'glass.png', resist: 3, award: null, porcentage: 0, awardImage: null},
    {id: 'madera', texture: 'madera.jpg', resist: 4, award: 'madera', porcentage: 100, awardImage: 'plank.png'},
    {id: 'piedra', texture: 'stone.png', resist: 10, award: 'piedra', porcentage: 100, awardImage: 'stone.png'},
    {id: 'hierro', texture: 'ironmineral.png', resist: 14, award: 'hierro', porcentage: 100, awardImage: 'iron.png'},
    {id: 'oro', texture: 'goldmineral.png', resist: 20, award: 'oro', porcentage: 100, awardImage: 'gold.png'},
    {id: 'diamante', texture: 'diamondmineral.png', resist: 35, award: 'diamante', porcentage: 100, awardImage: 'diamond.png'},
    {id: 'obsidiana', texture: 'obsidian.png', resist: 50, award: 'obsidiana', porcentage: 100, awardImage: 'obsidian.png'},
    {id: 'bedrock', texture: 'bedrock.png', resist: 1000000000,award: null, porcentage: 0, awardImage: null},
    {id: 'grava', texture: 'grave.png', resist: 3,award: 'pedernal', porcentage: 30, awardImage: 'pedernal.png'}
]

export let tasks = [
    {id: 'begin', values: null, line:0, correct: true}
]
// required space
export const forcedSpace = '\\s+'
// optional space
export const optionalSpace = '\\s*'
// MiBloque 
export const idExp = `${optionalSpace}(\\w*[a-zA-Z]\\w*)+${optionalSpace}`
// bloque 
export const blockExp = `(${optionalSpace}bloque${forcedSpace})`
// bloque MiBloque
export const initialize = `^${blockExp}${idExp}$`
// color , dureza
export const funExp = `(${functions.map(fun => fun.id).join('|')})`
// values
export const numberExp  = `(${optionalSpace}[0-9]+${optionalSpace})`
export const operatorsExp = `${optionalSpace}(\\+|\\-|\\*)${optionalSpace}`
export const operationExp = `(${numberExp}${operatorsExp}${numberExp})`
export const materialExp = `${optionalSpace}(basico|${materials.map(mat => mat.id).join('|')})${optionalSpace}`
export const colExp = `${optionalSpace}([a-zA-Z])+${optionalSpace}`
export const rgbExp = `${optionalSpace}(rgb\\(${optionalSpace}[0-9]{1,3}${optionalSpace}\\,${optionalSpace}[0-9]{1,3}${optionalSpace}\\, ${optionalSpace}[0-9]{1,3}${optionalSpace}\\))${optionalSpace}`
export const hexaExp = `${optionalSpace}(#[0-9a-fA-F]{3,6})${optionalSpace}`
export const valueFunc = `${optionalSpace}(${numberExp}|${operationExp}|${materialExp}|${colExp}|${rgbExp}|${hexaExp})`
export const functionExp = `^${optionalSpace}${idExp}\\.${funExp}${forcedSpace}\\=${valueFunc}$`

export function validarSentencia(string, line){
    const block = string.match(initialize)
    if(string === ''){
        const indexTask = tasks.findIndex(task => task.line === line)
        if(indexTask !== -1){
            tasks.splice(indexTask, 1)
        }
        return true
    }
    if(block){
        const index = tokens.findIndex(token => token.line === line);
        if(index !== -1){
            tokens[index].id = block[2]
        }else{
            const newToken = {
                id: block[2],
                color: 'rgb(62, 237, 253)',
                wigth: 500, 
                line: line
            }
            tokens.push(newToken)
        }
        const taskIndex = tasks.findIndex(task => task.line === line)
        if(taskIndex !== -1){
            tasks[taskIndex].id = 'init'
            tasks[taskIndex].values = {id: block[2]}
            tasks[taskIndex].correct = true
            tasks[taskIndex].sentence = string
        }else{
            const newTask = {
                id:'init',
                values:{
                    id:block[2]
                },
                line: line,
                sentence: string,
                correct: true
            }
            tasks.push(newTask)
        }
        return true
    }
    const asignationProperty = new RegExp(`^\s*(${tokens.map(t => t.id).join('|')})\\.(${functions.map(f => f.id).join('|')})<(rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+|[0-9]+)>\\s*$`);
    const asign = string.match(asignationProperty)
    if(asign){
        const taskIndex = tasks.findIndex(task => task.line === line)
        if(taskIndex !== -1){
            tasks[taskIndex].values = {
                id: asign[1],
                fun: asign[2],
                val: asign[3]
            }
            tasks[taskIndex].id = 'asign'
            tasks[taskIndex].sentence = string
            tasks[taskIndex].correct = true
        }else{
            const newTask = {
                id:'asign',
                values:{
                    id: asign[1],
                    fun: asign[2],
                    val: asign[3]
                },
                line: line,
                sentence: string,
                correct: true
            }
            tasks.push(newTask)
        }
        return true
    }
    const invoqueBlock = new RegExp(`^\\s*(craftear)\\s+(${tokens.map(token => token.id).join('|')})\\s*$`);
    const invoque = string.match(invoqueBlock)
    if(invoque){
        const taskIndex = tasks.findIndex(task => task.line === line)
        if(taskIndex !== -1){
            tasks[taskIndex].values = {
                id: invoque[2],
            }
            tasks[taskIndex].sentence = string
            tasks[taskIndex].correct = true
            tasks[taskIndex].id = 'craft'
        }else{
            const newTask = {
                id:'craft',
                values:{
                    id: invoque[2],
                },
                line: line,
                sentence: string,
                correct: true
            }
            tasks.push(newTask)
        }
        return true
    }
    const taskIndex = tasks.findIndex(task => task.line === line)
    if(taskIndex !== -1){
        tasks[taskIndex].correct = false
        tasks[taskIndex].sentence = string
    }
    return false
}

export function createTask(newTask, line, text){
    const taskIndex = tasks.findIndex(task => task.line === line)
    const t = {
        ...newTask,
        sentence: text
    }
    if(taskIndex !== -1){
        tasks[taskIndex] = t
    }else{
        tasks.push(t)
    }
    
}

export function deleteTask(line){
    const indexTask = tasks.findIndex(task => task.line === line)
    if(indexTask !== -1){
        tasks.splice(indexTask, 1)
    }
}

export function declareInvalidTask(line, text, id){
    const indexTask = tasks.findIndex(task => task.line === line)
    if(indexTask !== -1){
        tasks[indexTask].correct = false
        tasks[indexTask].sentence = text
        tasks[indexTask].values = {...tasks[indexTask].values, id: id}
    }
}

export function resetValues(){
    tokens = []
    tasks =[ {id: 'begin', values: null, line:0, correct: true}]
}