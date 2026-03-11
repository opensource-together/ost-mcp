import { describe, it, expect } from "vitest";
import { createIntegrationClient } from "./setup.js";

const client = createIntegrationClient();

describe("Integration smoke tests", () => {
  it("lists categories from the local API", async () => {
    const categories = await client.listCategories();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it("lists domains from the local API", async () => {
    const domains = await client.listDomains();

    expect(Array.isArray(domains)).toBe(true);
    expect(domains.length).toBeGreaterThan(0);
  });

  it("lists tech stacks from the local API", async () => {
    const techStacks = await client.listTechStacks();

    expect(Array.isArray(techStacks)).toBe(true);
    expect(techStacks.length).toBeGreaterThan(0);
  });
});
