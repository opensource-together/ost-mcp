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
      expect.stringContaining("/projects/search?q=react&limit=5"),
      expect.objectContaining({ signal: expect.any(AbortSignal) })
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

  it("maps 401 responses to a human-readable auth error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      headers: new Headers(),
      json: () => Promise.resolve({ detail: "Unauthorized" }),
    });

    await expect(client.getProject("bad-id")).rejects.toThrow(
      "Invalid or missing OST_API_KEY. Generate or regenerate a Personal Access Token in your OpenSource Together account settings."
    );
  });

  it("maps 429 responses to a retry-after message", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      headers: new Headers({ "Retry-After": "30" }),
      json: () => Promise.resolve({ detail: "Too many requests" }),
    });

    await expect(client.getProject("slow-down")).rejects.toThrow(
      "Rate limit exceeded. Retry in 30 seconds."
    );
  });

  it("maps 503 responses to a temporary backend message", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      headers: new Headers(),
      json: () => Promise.resolve({ detail: "Service unavailable" }),
    });

    await expect(client.getProject("server-down")).rejects.toThrow(
      "OST backend temporarily unavailable (status 503). Please try again shortly."
    );
  });
});
