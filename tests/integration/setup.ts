import { OSTClient } from "../../src/client.js";

const INTEGRATION_API_URL =
  process.env.OST_API_URL || "http://localhost:8000";

export function createIntegrationClient(): OSTClient {
  return new OSTClient(INTEGRATION_API_URL);
}
