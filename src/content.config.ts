import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      tldr: z.string().optional(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      ogImage: z.string().optional(),
      ogImageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      series: z.string().min(1).optional(),
      seriesTitle: z.string().min(1).optional(),
      seriesOrder: z.number().int().positive().optional(),
    })
    .superRefine((data, ctx) => {
      const hasSeries =
        data.series !== undefined ||
        data.seriesTitle !== undefined ||
        data.seriesOrder !== undefined;
      const hasAll =
        data.series !== undefined &&
        data.seriesTitle !== undefined &&
        data.seriesOrder !== undefined;

      if (hasSeries && !hasAll) {
        if (data.series === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "series is required when series metadata is set",
            path: ["series"],
          });
        }
        if (data.seriesTitle === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "seriesTitle is required when series metadata is set",
            path: ["seriesTitle"],
          });
        }
        if (data.seriesOrder === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "seriesOrder is required when series metadata is set",
            path: ["seriesOrder"],
          });
        }
      }
    }),
});

export const collections = { blog };
