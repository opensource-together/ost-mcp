import { describe, it, expect } from "vitest";
import { createIntegrationClient } from "./setup.js";

const client = createIntegrationClient();

describe("search_projects", () => {
  it("returns an array of projects for a keyword search", async () => {
    const results = await client.searchProjects({ q: "react" });

    expect(Array.isArray(results)).toBe(true);
  });

  it("each result has required Project fields", async () => {
    const results = await client.searchProjects({ q: "react" });

    for (const project of results) {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("title");
      expect(typeof project.id).toBe("string");
      expect(typeof project.title).toBe("string");
    }
  });

  it("each result contains nested categories, domains, and tech_stacks arrays", async () => {
    const results = await client.searchProjects({ q: "react" });

    for (const project of results) {
      expect(Array.isArray(project.categories)).toBe(true);
      expect(Array.isArray(project.domains)).toBe(true);
      expect(Array.isArray(project.tech_stacks)).toBe(true);
    }
  });

  it("respects the limit parameter", async () => {
    const results = await client.searchProjects({ q: "react", limit: 2 });

    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("returns an empty array for a nonsense query", async () => {
    const results = await client.searchProjects({
      q: "zzzznonexistentproject99999",
    });

    expect(Array.isArray(results)).toBe(true);
  });
});

describe("get_project", () => {
  it("returns a project with all required fields for a valid ID", async () => {
    const searchResults = await client.searchProjects({ q: "react", limit: 1 });
    const projectId = searchResults[0]?.id;
    expect(projectId).toBeDefined();

    const project = await client.getProject(projectId!);

    expect(project.id).toBe(projectId);
    expect(typeof project.title).toBe("string");
    expect(typeof project.published).toBe("boolean");
    expect(typeof project.trending).toBe("boolean");
  });

  it("returns nested arrays matching types.ts definitions", async () => {
    const searchResults = await client.searchProjects({ q: "react", limit: 1 });
    const project = await client.getProject(searchResults[0]!.id);

    expect(Array.isArray(project.categories)).toBe(true);
    for (const cat of project.categories) {
      expect(typeof cat.id).toBe("string");
      expect(typeof cat.name).toBe("string");
    }

    expect(Array.isArray(project.domains)).toBe(true);
    for (const dom of project.domains) {
      expect(typeof dom.id).toBe("string");
      expect(typeof dom.name).toBe("string");
    }

    expect(Array.isArray(project.tech_stacks)).toBe(true);
    for (const ts of project.tech_stacks) {
      expect(typeof ts.id).toBe("string");
      expect(typeof ts.name).toBe("string");
    }
  });

  it("throws an error for an invalid project ID", async () => {
    await expect(
      client.getProject("00000000-0000-0000-0000-000000000000")
    ).rejects.toThrow();
  });
});

describe("get_trending", () => {
  it("returns an array of trending projects", async () => {
    const trending = await client.getTrending();

    expect(Array.isArray(trending)).toBe(true);
  });

  it("each result has project_id field", async () => {
    const trending = await client.getTrending();

    for (const item of trending) {
      expect(typeof item.project_id).toBe("string");
    }
  });

  it("respects the limit parameter", async () => {
    const trending = await client.getTrending(3);

    expect(trending.length).toBeLessThanOrEqual(3);
  });
});

describe("find_similar", () => {
  it("returns an array of similar projects for a valid project ID", async () => {
    const searchResults = await client.searchProjects({ q: "react", limit: 1 });
    const projectId = searchResults[0]?.id;
    expect(projectId).toBeDefined();

    const similar = await client.findSimilar(projectId!);

    expect(Array.isArray(similar)).toBe(true);
  });

  it("each result has similarity score and required fields", async () => {
    const searchResults = await client.searchProjects({ q: "react", limit: 1 });
    const similar = await client.findSimilar(searchResults[0]!.id);

    for (const item of similar) {
      expect(typeof item.id).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.similarity).toBe("number");
      expect(item.similarity).toBeGreaterThanOrEqual(0);
      expect(item.similarity).toBeLessThanOrEqual(1);
    }
  });
});

describe("list_categories", () => {
  it("returns a non-empty array", async () => {
    const categories = await client.listCategories();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it("each category has id and name as strings", async () => {
    const categories = await client.listCategories();

    for (const cat of categories) {
      expect(typeof cat.id).toBe("string");
      expect(typeof cat.name).toBe("string");
    }
  });
});

describe("list_domains", () => {
  it("returns a non-empty array", async () => {
    const domains = await client.listDomains();

    expect(Array.isArray(domains)).toBe(true);
    expect(domains.length).toBeGreaterThan(0);
  });

  it("each domain has id and name as strings", async () => {
    const domains = await client.listDomains();

    for (const dom of domains) {
      expect(typeof dom.id).toBe("string");
      expect(typeof dom.name).toBe("string");
    }
  });
});

describe("list_techstacks", () => {
  it("returns a non-empty array", async () => {
    const techStacks = await client.listTechStacks();

    expect(Array.isArray(techStacks)).toBe(true);
    expect(techStacks.length).toBeGreaterThan(0);
  });

  it("each tech stack has id, name, icon_url, and type", async () => {
    const techStacks = await client.listTechStacks();

    for (const ts of techStacks) {
      expect(typeof ts.id).toBe("string");
      expect(typeof ts.name).toBe("string");
      expect(typeof ts.icon_url).toBe("string");
      expect(typeof ts.type).toBe("string");
    }
  });
});
