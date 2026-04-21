import type {
  Category,
  Domain,
  Project,
  SimilarProject,
  TechStack,
  TrendingProject,
} from "./types.js";

export class OSTClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const detail = (body as { detail?: string }).detail;

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Invalid or missing OST_API_KEY. Generate or regenerate a Personal Access Token in your OpenSource Together account settings."
        );
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const retryWindow = retryAfter ? `${retryAfter} seconds` : "shortly";
        throw new Error(`Rate limit exceeded. Retry in ${retryWindow}.`);
      }

      if (response.status >= 500) {
        throw new Error(
          `OST backend temporarily unavailable (status ${response.status}). Please try again shortly.`
        );
      }

      throw new Error(detail || `API error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  async searchProjects(params: {
    q: string;
    category?: string;
    domain?: string;
    techstack?: string;
    limit?: number;
  }): Promise<Project[]> {
    const searchParams = new URLSearchParams();
    searchParams.set("q", params.q);
    if (params.category) searchParams.set("category", params.category);
    if (params.domain) searchParams.set("domain", params.domain);
    if (params.techstack) searchParams.set("techstack", params.techstack);
    if (params.limit) searchParams.set("limit", String(params.limit));
    return this.request(`/projects/search?${searchParams}`);
  }

  async getProject(projectId: string): Promise<Project> {
    return this.request(`/projects/${projectId}`);
  }

  async findSimilar(
    projectId: string,
    limit?: number
  ): Promise<SimilarProject[]> {
    const params = limit ? `?limit=${limit}` : "";
    return this.request(`/projects/${projectId}/similar${params}`);
  }

  async getTrending(limit?: number): Promise<TrendingProject[]> {
    const params = limit ? `?limit=${limit}` : "";
    return this.request(`/recommendations/trending${params}`);
  }

  async listCategories(): Promise<Category[]> {
    return this.request("/categories");
  }

  async listDomains(): Promise<Domain[]> {
    return this.request("/domains");
  }

  async listTechStacks(): Promise<TechStack[]> {
    return this.request("/techstacks");
  }
}
