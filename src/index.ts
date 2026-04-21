#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { OSTClient } from "./client.js";
import { getConfig } from "./config.js";
import { createSearchTool, searchToolSchema } from "./tools/search.js";
import { createGetProjectTool, getProjectSchema } from "./tools/project.js";
import { createTrendingTool, trendingSchema } from "./tools/trending.js";
import { createSimilarTool, similarSchema } from "./tools/similar.js";
import {
  createCategoriesTool,
  createDomainsTool,
  createTechStacksTool,
} from "./tools/references.js";

const config = getConfig();
const client = new OSTClient(config.apiUrl, config.apiKey);

const server = new McpServer({
  name: "ost-mcp",
  version: "0.1.0",
});

const search = createSearchTool(client);
server.tool(search.name, search.description, searchToolSchema.shape, async (params) => {
  const result = await search.handler(searchToolSchema.parse(params));
  return { content: [{ type: "text" as const, text: result }] };
});

const getProject = createGetProjectTool(client);
server.tool(getProject.name, getProject.description, getProjectSchema.shape, async (params) => {
  const result = await getProject.handler(getProjectSchema.parse(params));
  return { content: [{ type: "text" as const, text: result }] };
});

const trending = createTrendingTool(client);
server.tool(trending.name, trending.description, trendingSchema.shape, async (params) => {
  const result = await trending.handler(trendingSchema.parse(params));
  return { content: [{ type: "text" as const, text: result }] };
});

const similar = createSimilarTool(client);
server.tool(similar.name, similar.description, similarSchema.shape, async (params) => {
  const result = await similar.handler(similarSchema.parse(params));
  return { content: [{ type: "text" as const, text: result }] };
});

const categories = createCategoriesTool(client);
server.tool(categories.name, categories.description, {}, async () => {
  const result = await categories.handler({});
  return { content: [{ type: "text" as const, text: result }] };
});

const domains = createDomainsTool(client);
server.tool(domains.name, domains.description, {}, async () => {
  const result = await domains.handler({});
  return { content: [{ type: "text" as const, text: result }] };
});

const techStacks = createTechStacksTool(client);
server.tool(techStacks.name, techStacks.description, {}, async () => {
  const result = await techStacks.handler({});
  return { content: [{ type: "text" as const, text: result }] };
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
