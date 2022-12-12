import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { useMemo } from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import { api } from '@my/api/src/client'
import { useRouter } from 'next/router'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'
import Redirector from 'utils/redirector'
const publicPages = ['/sign-in/[[...index]]', '/sign-up/[[...index]]', '/'] as string[]

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [theme, setTheme] = useRootTheme()

  const contents = useMemo(() => {
    // @ts-ignore
    return <Component {...pageProps} />
  }, [Component, pageProps])
  const { pathname } = useRouter()
  const isPublicPage = publicPages.includes(pathname)

  return (
    <>
      <Head>
        <title>Tamagui Example App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextThemeProvider onChangeTheme={setTheme}>
        <Provider disableRootThemeClass defaultTheme={theme}>
          <ClerkProvider {...pageProps}>
            {isPublicPage ? (
              contents
            ) : (
              <>
                <SignedIn>{contents}</SignedIn>
                <SignedOut>
                  <Redirector />
                </SignedOut>
              </>
            )}
          </ClerkProvider>
        </Provider>
      </NextThemeProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
