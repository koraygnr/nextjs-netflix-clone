import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import { ModalContextProvider } from '@/contexts/ModalContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </Layout>
    </AuthProvider>
  )
}
