import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { Prisma } from '@my/db'

export const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma?.post.findMany()
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const f = { where: { id: input } } satisfies Prisma.PostFindFirstArgs
    return ctx.prisma?.post.findFirst(f)
  }),
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma?.post.create({ data: input })
    }),
})
