import type { AppProps } from 'next/app'
import '../styles/globals.css'  // Importez votre CSS global ici
import Head from 'next/head'
import { Inter, Orbitron } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'

// Police futuriste pour les titres
const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
})

// Police de base pour le corps de texte
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portfolio Cialone Quentin | Développeur Web Fullstack</title>
        <meta name="description" content="Portfolio futuriste et interactif de Quentin Cialone, développeur web fullstack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <main className={`${inter.variable} ${orbitron.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  )
}

export default MyApp