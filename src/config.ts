export interface Config {
  apiUrl: string;
  apiKey: string;
}

const DEFAULT_API_URL = "https://api.opensource-together.com/v1/mcp";
const MISSING_API_KEY_ERROR =
  "OST_API_KEY is required. Generate a Personal Access Token in your OpenSource Together account settings, then add OST_API_KEY to your MCP client config env block.";

export function getConfig(): Config {
  const apiKey = process.env.OST_API_KEY;

  if (!apiKey) {
    throw new Error(MISSING_API_KEY_ERROR);
  }

  const rawUrl = process.env.OST_API_URL || DEFAULT_API_URL;
  const apiUrl = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

  return { apiUrl, apiKey };
}
