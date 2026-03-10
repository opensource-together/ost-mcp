import { describe, it, expect, vi, beforeEach } from "vitest";
import { OSTClient } from "../src/client.js";

describe("OSTClient", () => {
  let client: OSTClient;

  beforeEach(() => {
    client = new OSTClient("https://api.example.com");
  });

  it("searchProjects calls correct URL with query params", async () => {
    const mockResponse = [{ id: "1", title: "Test" }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await client.searchProjects({ q: "react", limit: 5 });
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/projects/search?q=react&limit=5")
    );
  });

  it("getProject calls correct URL", async () => {
    const mockProject = { id: "abc", title: "My Project" };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProject),
    });

    const result = await client.getProject("abc");
    expect(result).toEqual(mockProject);
  });

  it("throws on non-ok response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ detail: "Not found" }),
    });

    await expect(client.getProject("bad-id")).rejects.toThrow("Not found");
  });
});
