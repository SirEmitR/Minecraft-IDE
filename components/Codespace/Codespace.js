import React from 'react'
import styles from './codespace.module.css'
import MarkerText from './MarkerText/MarkerText'
import { useCompile } from 'context/compileContext'
const Codespace = () => {
    const {code, setCode} = useCompile()
  return (
    <div className={styles.codespace}>
        <form>
            <textarea value={code} onChange={e => setCode(e.target.value)}/>
            <MarkerText code={code} />
        </form>
    </div>
  )
}

export default Codespace