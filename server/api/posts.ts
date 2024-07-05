import { getPosts } from "~/utils/microcms"

export default defineEventHandler(async (event) => {
  const posts = await getPosts();

  return {
    posts: posts
  }
})
