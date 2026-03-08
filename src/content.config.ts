import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tldr: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
