import { useCmsClientComposable } from "~/composables/useCmsClient"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const offset = Number(query.offset) || 0
  const limit = Number(query.limit) || 10

  const { getPosts } = useCmsClientComposable()
  const posts = await getPosts(offset, limit)

  return {
    posts: posts
  }
})
