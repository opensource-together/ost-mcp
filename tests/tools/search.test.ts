import { describe, it, expect, vi } from "vitest";
import { createSearchTool } from "../../src/tools/search.js";
import type { OSTClient } from "../../src/client.js";

describe("search_projects tool", () => {
  it("calls client.searchProjects with correct params", async () => {
    const mockClient = {
      searchProjects: vi.fn().mockResolvedValue([
        { id: "1", title: "React App", description: "A react app" },
      ]),
    } as unknown as OSTClient;

    const tool = createSearchTool(mockClient);
    const result = await tool.handler({ q: "react", limit: 5 });

    expect(mockClient.searchProjects).toHaveBeenCalledWith({
      q: "react",
      limit: 5,
    });
    expect(result).toContain("React App");
  });

  it("returns message when no results found", async () => {
    const mockClient = {
      searchProjects: vi.fn().mockResolvedValue([]),
    } as unknown as OSTClient;

    const tool = createSearchTool(mockClient);
    const result = await tool.handler({ q: "nonexistent" });

    expect(result).toContain("No projects found");
  });
});
