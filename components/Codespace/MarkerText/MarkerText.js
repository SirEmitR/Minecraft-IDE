import React, { useEffect, useState } from 'react'
import {initBlock, tokens, validarSentencia} from '../../../helpers/regExpresion'
import styles from './markertext.module.css'
import { sintacticAnalisys } from 'helpers/sintactico'
const MarkerText = ({ code}) => {
    const [lineCount, setLineCount] = useState(0)
    useEffect(() =>{
        const text = String(code).split('\n')
        setLineCount(text.length)
        const codeHTML = document.getElementById('code')
        codeHTML.innerHTML = ''

        text.forEach((word, index) =>{
            codeHTML.innerHTML+= sintacticAnalisys(word, index + 1)
            codeHTML.innerHTML+= '</br>'
        })

        // text.forEach((word, index) =>{
        //     const words = word.split(' ')
        //     words.forEach((w) =>{
        //         let rest = '', rest2 ='', rest3=''
        //         let isfunction = false
        //         let opener = false
        //         let closer = false
        //         if(w.includes('.')){
        //             const splited = w.split('.')
        //             if(splited[0] !== ''){
        //                 isfunction = true
        //                 w   = splited[0]
        //                 rest = splited[1]
        //                 if(rest.includes('<')){
        //                     rest2 = rest.split('<')
        //                     opener = true
        //                     if(rest2[1].includes('>')){
        //                         rest3 = rest2[1].split('>')
        //                         closer = true
        //                     }
        //                 }
        //             }
        //         }
        //         const block = tokens.find(token => token.id === w)
        //         if(block){
        //             codeHTML.innerHTML+= `<span style='color:${block.color};font-weight:${block.wigth}'>${w}</span>`
        //             if(isfunction){
        //                 if(opener){
        //                     if(closer){
        //                         codeHTML.innerHTML+= `<span class=${styles.function}>.${rest2[0]}</span>`
        //                         codeHTML.innerHTML+= `<span>${'<'}</span>`
        //                         codeHTML.innerHTML+= `<span style="color: ${rest3[0] || '#FFF'}">${rest3[0]}</span>`
        //                         codeHTML.innerHTML+= `<span>${'>'}${rest3[1]}</span>`
        //                     }else{
        //                         codeHTML.innerHTML+= `<span class=${styles.function}>.${rest2[0]}</span>`
        //                         codeHTML.innerHTML+= `<span>${'<'}</span>`
        //                         codeHTML.innerHTML+= `<span style="color: ${rest2[1] || '#FFF'}">${rest2[1]}</span>`
        //                     }
        //                 }else{
        //                     codeHTML.innerHTML+= `<span class=${styles.function}>.${rest}</span>`
        //                 }
        //             }
        //         }
        //         else{
        //             codeHTML.innerHTML+= `<span>${w}</span>`
        //         }
        //         codeHTML.innerHTML+= '<span> </span>'
        //     })
        //     if(!validarSentencia(word, index + 1)){
        //         if(word){
        //             codeHTML.innerHTML+= `<span style={color:'red'} class=${styles.error}>!</span>`
        //         }
        //     }
        //     codeHTML.innerHTML+= '</br>'
        // })
    }, [code])
    
  return (
    <section id='marktext'>
        <ul>
            {Array.from({length: lineCount}, (_, index) => index).map((l) =>{
                return (
                    <li key={l}>
                        {l + 1}
                    </li>
                )
            })}
        </ul>
        <div id='code' className={styles.code}></div>
        
    </section>
  )
}

export default MarkerText