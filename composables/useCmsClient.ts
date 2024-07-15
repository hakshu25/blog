import { createClient } from "microcms-js-sdk";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  };
}

export interface PostsResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const useCmsClientComposable = () => {
  const runtimeConfig = useRuntimeConfig()
  const cmsApiClient = createClient({
    serviceDomain: runtimeConfig.cmsApiDomain,
    apiKey: runtimeConfig.cmsApiKey,
  });

  const getPosts = async (offset: number, limit: number): ReturnType<typeof cmsApiClient.getList<Post>> => {
    try {
      const response = await cmsApiClient.getList<Post>({
        endpoint: 'posts',
        queries: { offset, limit }
      })
      return response
    } catch (error) {
      console.error('MicroCMS API error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch posts from MicroCMS'
      })
    }
  }

  return {
    getPosts
  }
}