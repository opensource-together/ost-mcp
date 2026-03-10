import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getConfig } from "../src/config.js";

describe("getConfig", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("reads OST_API_URL from environment", () => {
    process.env.OST_API_URL = "https://api.example.com";
    const config = getConfig();
    expect(config.apiUrl).toBe("https://api.example.com");
  });

  it("uses default URL when OST_API_URL is not set", () => {
    delete process.env.OST_API_URL;
    const config = getConfig();
    expect(config.apiUrl).toBe("https://api.opensource-together.com");
  });

  it("strips trailing slash from URL", () => {
    process.env.OST_API_URL = "https://api.example.com/";
    const config = getConfig();
    expect(config.apiUrl).toBe("https://api.example.com");
  });
});
