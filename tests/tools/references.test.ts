import { describe, it, expect, vi } from "vitest";
import { createCategoriesTool, createDomainsTool, createTechStacksTool } from "../../src/tools/references.js";
import type { OSTClient } from "../../src/client.js";

describe("list_categories tool", () => {
  it("returns formatted categories", async () => {
    const mockClient = {
      listCategories: vi.fn().mockResolvedValue([
        { id: "1", name: "Web Development" },
        { id: "2", name: "Machine Learning" },
      ]),
    } as unknown as OSTClient;

    const tool = createCategoriesTool(mockClient);
    const result = await tool.handler({});

    expect(result).toContain("Web Development");
    expect(result).toContain("Machine Learning");
  });
});

describe("list_domains tool", () => {
  it("returns formatted domains", async () => {
    const mockClient = {
      listDomains: vi.fn().mockResolvedValue([
        { id: "1", name: "Healthcare" },
      ]),
    } as unknown as OSTClient;

    const tool = createDomainsTool(mockClient);
    const result = await tool.handler({});

    expect(result).toContain("Healthcare");
  });
});

describe("list_techstacks tool", () => {
  it("returns formatted tech stacks", async () => {
    const mockClient = {
      listTechStacks: vi.fn().mockResolvedValue([
        { id: "1", name: "Python", type: "LANGUAGE", icon_url: "http://img" },
      ]),
    } as unknown as OSTClient;

    const tool = createTechStacksTool(mockClient);
    const result = await tool.handler({});

    expect(result).toContain("Python");
    expect(result).toContain("LANGUAGE");
  });
});
