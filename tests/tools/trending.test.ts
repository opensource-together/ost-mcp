import { describe, it, expect, vi } from "vitest";
import { createTrendingTool } from "../../src/tools/trending.js";
import type { OSTClient } from "../../src/client.js";

describe("get_trending tool", () => {
  it("returns formatted trending projects", async () => {
    const mockClient = {
      getTrending: vi.fn().mockResolvedValue([
        { project_id: "1", stars: 5000, last_synced_at: "2026-01-01" },
        { project_id: "2", stars: 3000, last_synced_at: "2026-01-01" },
      ]),
    } as unknown as OSTClient;

    const tool = createTrendingTool(mockClient);
    const result = await tool.handler({ limit: 10 });

    expect(result).toContain("5000");
    expect(mockClient.getTrending).toHaveBeenCalledWith(10);
  });
});
