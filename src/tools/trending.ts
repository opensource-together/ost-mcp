import { z } from "zod";
import type { OSTClient } from "../client.js";

export const trendingSchema = z.object({
  limit: z.number().min(1).max(50).optional().default(20).describe("Max results"),
});

export function createTrendingTool(client: OSTClient) {
  return {
    name: "get_trending",
    description: "Get globally trending and popular open-source projects.",
    schema: trendingSchema,
    handler: async (params: z.infer<typeof trendingSchema>): Promise<string> => {
      const projects = await client.getTrending(params.limit);

      if (projects.length === 0) {
        return "No trending projects found.";
      }

      return projects
        .map((p, i) => `${i + 1}. Project ${p.project_id} — ${p.stars ?? "?"} stars`)
        .join("\n");
    },
  };
}
