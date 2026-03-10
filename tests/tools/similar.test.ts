import { describe, it, expect, vi } from "vitest";
import { createSimilarTool } from "../../src/tools/similar.js";
import type { OSTClient } from "../../src/client.js";

describe("find_similar tool", () => {
  it("returns similar projects with similarity scores", async () => {
    const mockClient = {
      findSimilar: vi.fn().mockResolvedValue([
        { id: "2", title: "Similar Project", similarity: 0.85 },
      ]),
    } as unknown as OSTClient;

    const tool = createSimilarTool(mockClient);
    const result = await tool.handler({ project_id: "1", limit: 5 });

    expect(result).toContain("Similar Project");
    expect(result).toContain("85");
    expect(mockClient.findSimilar).toHaveBeenCalledWith("1", 5);
  });
});
