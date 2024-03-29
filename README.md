# T3-Tamagui-Turbo - DEPRECATED
# @chen-rn and I have joined forces.
# https://github.com/chen-rn/CUA
# Use this instead
#### Basaed on the Tamagui + Solito + Next + Expo Monorepo
#### Includes tRPC + Prisma + Clerk.dev auth

## 🔦 About

This is a monorepo based on the tamagui example, with T3 extras.



Many thanks to [@FernandoTheRojo](https://twitter.com/fernandotherojo) for the Solito starter monorepo which this was forked from. Check out his [talk about using expo + next together at Next.js Conf 2021](https://www.youtube.com/watch?v=0lnbdRweJtA).

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- [solito](https://solito.dev) for cross-platform navigation
- Expo SDK
  - added expo router
- Next.js
- React Navigation
- tRPC
- Prisma
- Clerk.dev Auth

## 🗂 Folder layout

The main apps are:

- `expo` (native)
- `next` (web)

- `packages` shared packages across apps
  - `ui` includes your custom UI kit that will be optimized by Tamagui
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.
  - `api` tRPC api routers and definitions
  - `db` Prisma schema and generated client

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Clone .env.example to .env. Fill in values. 
- Enter clerk.dev public api(same as env.NEXT_PUBLIC_CLERK_FRONTEND_API) into apps/expo/app/_layout.tsx in frontendApi. 

- Install dependencies: `yarn`

- Run watch in a separate terminal: `yarn watch`

- Next.js local dev: `yarn web`
  - Runs `yarn next`
- Expo local dev: `yarn native`
  - Runs `expo start`

## Developing

We've added `packages/ui` to show an example of [building your own design system](https://tamagui.dev/docs/guides/design-systems).

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@my/ui` for how this works.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `expo`:

```sh
cd apps/expo
yarn add react-native-reanimated
cd ..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

You may potentially want to have the native module transpiled for the next app. Add the module name to the list for `withTM` in the [`apps/next/next.config.js`](apps/next/next.config.js#L47) file.

```ts
withTM([
  'solito',
  'react-native-web',
  'expo-linking',
  'expo-constants',
  'expo-modules-core',
  'expo-crypto', // <-- add this or any other native module
  '@my/config',
])
```
