import { createClient } from 'microcms-js-sdk'

const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig.cmsApiDomain)
const cmsApiClient = createClient({
  serviceDomain: runtimeConfig.cmsApiDomain,
  apiKey: runtimeConfig.cmsApiKey,
});

interface Post {
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

interface PostsResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const getPosts = async () => {
  return await cmsApiClient.getList<PostsResponse>({
    endpoint: 'posts',
  });
}