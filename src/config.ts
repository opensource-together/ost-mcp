export interface Config {
  apiUrl: string;
}

const DEFAULT_API_URL = "https://api.opensource-together.com";

export function getConfig(): Config {
  const rawUrl = process.env.OST_API_URL || DEFAULT_API_URL;
  const apiUrl = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

  return { apiUrl };
}
