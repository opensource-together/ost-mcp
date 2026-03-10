import { z } from "zod";
import type { OSTClient } from "../client.js";

const emptySchema = z.object({});

export function createCategoriesTool(client: OSTClient) {
  return {
    name: "list_categories",
    description: "List all available project categories.",
    schema: emptySchema,
    handler: async (_params: z.infer<typeof emptySchema>): Promise<string> => {
      const categories = await client.listCategories();
      return categories.map((c) => `- ${c.name}`).join("\n");
    },
  };
}

export function createDomainsTool(client: OSTClient) {
  return {
    name: "list_domains",
    description: "List all available project domains.",
    schema: emptySchema,
    handler: async (_params: z.infer<typeof emptySchema>): Promise<string> => {
      const domains = await client.listDomains();
      return domains.map((d) => `- ${d.name}`).join("\n");
    },
  };
}

export function createTechStacksTool(client: OSTClient) {
  return {
    name: "list_techstacks",
    description: "List all available tech stacks (languages and technologies).",
    schema: emptySchema,
    handler: async (_params: z.infer<typeof emptySchema>): Promise<string> => {
      const stacks = await client.listTechStacks();
      return stacks.map((t) => `- ${t.name} (${t.type})`).join("\n");
    },
  };
}
