import { describe, it, expect, vi } from "vitest";
import { createGetProjectTool } from "../../src/tools/project.js";
import type { OSTClient } from "../../src/client.js";

describe("get_project tool", () => {
  it("returns formatted project details", async () => {
    const mockClient = {
      getProject: vi.fn().mockResolvedValue({
        id: "1",
        title: "FastAPI",
        description: "Modern Python web framework",
        repo_url: "https://github.com/tiangolo/fastapi",
        categories: [{ id: "c1", name: "Web Development" }],
        domains: [{ id: "d1", name: "Backend" }],
        tech_stacks: [{ id: "t1", name: "Python", type: "LANGUAGE" }],
      }),
    } as unknown as OSTClient;

    const tool = createGetProjectTool(mockClient);
    const result = await tool.handler({ project_id: "1" });

    expect(result).toContain("FastAPI");
    expect(result).toContain("Web Development");
    expect(result).toContain("Python");
  });
});
