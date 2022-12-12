import { initTRPC, TRPCError } from '@trpc/server'
import { type Context } from './context'
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

const isAuthed = t.middleware(({ ctx, next }) => {
  const user = ctx.clerkuser
  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated ',
    })
  }
  const prisma = ctx.prisma
  if (!prisma) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Prisma is not initialized',
    })
  }
  //overwriting context here causes significant performance issues!!
  return next({
    ctx,
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
