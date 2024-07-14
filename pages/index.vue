<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Blog Posts</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="mt-8 flex justify-center">
      <Pagination :page="currentPage" :total-items="totalCount" :per-page="perPage" :siblings="1" :boundaries="1"
        @update:page="fetchPosts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Post } from '~/composables/useCmsClient';

const posts = ref<Post[]>([])
const totalCount = ref(0)
const currentPage = ref(1)
const perPage = 9

const fetchPosts = async (page: number = currentPage.value) => {
  try {
    const response = await $fetch<{ posts: PostsResponse }>('/api/posts', {
      params: {
        offset: (page - 1) * perPage,
        limit: perPage
      }
    })
    posts.value = response.posts.contents
    totalCount.value = response.posts.totalCount
    currentPage.value = page
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  }
}

// Fetch initial posts
await fetchPosts()

watch(currentPage, (newPage) => {
  fetchPosts(newPage)
})
</script>
