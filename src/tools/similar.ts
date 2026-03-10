import { z } from "zod";
import type { OSTClient } from "../client.js";

export const similarSchema = z.object({
  project_id: z.string().describe("UUID of the project to find similar projects for"),
  limit: z.number().min(1).max(50).optional().default(10).describe("Max results"),
});

export function createSimilarTool(client: OSTClient) {
  return {
    name: "find_similar",
    description:
      "Find projects similar to a given project using AI embeddings (cosine similarity).",
    schema: similarSchema,
    handler: async (params: z.infer<typeof similarSchema>): Promise<string> => {
      const projects = await client.findSimilar(params.project_id, params.limit);

      if (projects.length === 0) {
        return "No similar projects found.";
      }

      return projects
        .map(
          (p) =>
            `**${p.title}** (${Math.round(p.similarity * 100)}% similar)\n${p.repo_url || "no URL"} — ${p.description || "No description"}`
        )
        .join("\n\n");
    },
  };
}
