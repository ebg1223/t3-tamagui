import { prisma } from '@my/db'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import { User } from '@clerk/nextjs/dist/api'
/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/

//formerly not included or defined manually.
//see bottom
//manually defined for autocomplete.
type context_return_type = {
  prisma: typeof prisma
  clerkuser: User | null
}

export const createContext = async (opts: CreateNextContextOptions) => {
  //unused for now, trying to avoid hitting the clerk api if not needed.
  async function getClerkUser() {
    const { userId, claims } = getAuth(opts.req)
    console.log(claims)
    console.log(claims)
    return userId ? await clerkClient.users.getUser(userId) : null
  }

  //actual return
  let user: User | null = null
  try {
    user = await getClerkUser()
  } catch (e) {
    console.log(e)
  }
  return { prisma: prisma, clerkuser: user } as context_return_type //MATCHES BELOW
}

export type Context = context_return_type

//formerly export type Context = inferAsyncReturnType<typeof createContext>;
//This should be able to be inferred; however, intellisense or whatever does not like this
//So for autocomplete sake, as well as my own sanity, this is entered manually.

//If extending prisma is desired, do so in TRPC isAuthed middleware.
//That way, values will be null checked, and import resolution will be consistent based on procedure.
