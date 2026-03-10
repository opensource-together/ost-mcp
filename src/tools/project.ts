import { z } from "zod";
import type { OSTClient } from "../client.js";

export const getProjectSchema = z.object({
  project_id: z.string().uuid().describe("UUID of the project"),
});

export function createGetProjectTool(client: OSTClient) {
  return {
    name: "get_project",
    description: "Get full details of a specific open-source project by ID.",
    schema: getProjectSchema,
    handler: async (params: z.infer<typeof getProjectSchema>): Promise<string> => {
      const p = await client.getProject(params.project_id);

      const categories = p.categories.map((c) => c.name).join(", ") || "None";
      const domains = p.domains.map((d) => d.name).join(", ") || "None";
      const techStacks = p.tech_stacks.map((t) => t.name).join(", ") || "None";

      return [
        `# ${p.title}`,
        p.description || "No description",
        "",
        `**URL:** ${p.repo_url || "N/A"}`,
        `**Categories:** ${categories}`,
        `**Domains:** ${domains}`,
        `**Tech Stacks:** ${techStacks}`,
        `**Published:** ${p.published} | **Trending:** ${p.trending}`,
      ].join("\n");
    },
  };
}
