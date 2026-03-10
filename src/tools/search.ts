import { z } from "zod";
import type { OSTClient } from "../client.js";

export const searchToolSchema = z.object({
  q: z.string().describe("Search query (project title or description)"),
  category: z.string().optional().describe("Filter by category name"),
  domain: z.string().optional().describe("Filter by domain name"),
  techstack: z.string().optional().describe("Filter by tech stack name"),
  limit: z
    .number()
    .min(1)
    .max(50)
    .optional()
    .default(20)
    .describe("Max results (default 20, max 50)"),
});

export function createSearchTool(client: OSTClient) {
  return {
    name: "search_projects",
    description:
      "Search open-source projects by keyword. Optionally filter by category, domain, or tech stack.",
    schema: searchToolSchema,
    handler: async (params: z.infer<typeof searchToolSchema>): Promise<string> => {
      const projects = await client.searchProjects(params);

      if (projects.length === 0) {
        return "No projects found matching your query.";
      }

      return projects
        .map(
          (p) =>
            `**${p.title}** (${p.repo_url || "no URL"})\n${p.description || "No description"}`
        )
        .join("\n\n");
    },
  };
}
