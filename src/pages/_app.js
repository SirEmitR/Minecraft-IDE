import '@/styles/globals.css'
import { CompileProvider } from 'context/compileContext'
import { LifeProvider } from 'context/lifeContext'

export default function App({ Component, pageProps }) {
  return (
    <LifeProvider>
      <CompileProvider>
          <Component {...pageProps} />
      </CompileProvider>
    </LifeProvider>
  )
}
