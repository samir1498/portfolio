import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tldr: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesTitle: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    status: z.enum(["in-development", "live", "archived"]),
    github: z.string().optional(),
    demo: z.string().optional(),
    techStack: z.array(z.string()),
    features: z.array(z.string()),
    plannedFeatures: z.array(z.string()),
    highlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    pubDate: z.coerce.date(),
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
  }),
});

export const collections = { blog, projects };
