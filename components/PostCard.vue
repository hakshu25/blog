<template>
  <Card class="h-full flex flex-col">
    <CardHeader>
      <CardTitle>{{ post.title }}</CardTitle>
      <CardDescription>{{ formatDate(post.publishedAt) }}</CardDescription>
    </CardHeader>
    <CardContent class="flex-grow">
      <img v-if="post.eyecatch" :src="post.eyecatch.url" :alt="post.title"
        class="w-full h-48 object-cover mb-4 rounded-md" />
      <p class="line-clamp-3 text-gray-500">{{ truncateContent(removeHtmlTags(post.content)) }}</p>
    </CardContent>
    <CardFooter class="flex justify-between items-center">
      <Badge>{{ post.category.name }}</Badge>
      <NuxtLink :to="`/posts/${post.id}`" class="text-blue-500 hover:underline">
        Read more
      </NuxtLink>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Post } from '~/composables/useCmsClient';

interface Props {
  post: Post
}

defineProps<Props>()

const removeHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '')
}

const truncateContent = (content: string) => {
  return content.length > 100 ? content.slice(0, 100) + '...' : content
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
