import 'expo-dev-client'
import React from 'react'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { TRPCAuthContext } from './utils/trpc'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { tokenCache } from './cache'
import SignInScreen from './SignInScreen'

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider
      frontendApi={''}
      tokenCache={tokenCache} //THIS IS REQUIRED!!!!
    >
      <SignedIn>
        <TRPCAuthContext>
          <Provider>
            <NativeNavigation />
          </Provider>
        </TRPCAuthContext>
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </ClerkProvider>
  )
}
