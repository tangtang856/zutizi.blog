import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    h1: z.string(),
    publishDate: z.string().default('2026-11-26'),
    author: z.string().default('竹梯子评测团队'),
    cluster: z.string().optional(),
    featuredBrand: z.string().optional(),
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    h1: z.string(),
    platform: z.string(),
    readTime: z.string().default('5 分钟'),
    publishDate: z.string().default('2026-11-26'),
    author: z.string().default('竹梯子教程团队'),
    recommendedBrand: z.string().optional(),
  })
});

const glossary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    term: z.string(),
    category: z.string().default('网络技术'),
  })
});

export const collections = { blog, guides, glossary };
