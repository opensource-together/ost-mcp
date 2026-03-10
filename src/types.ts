export interface Category {
  id: string;
  name: string;
}

export interface Domain {
  id: string;
  name: string;
}

export interface TechStack {
  id: string;
  name: string;
  icon_url: string;
  type: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  repo_url: string | null;
  published: boolean;
  trending: boolean;
  logo_url: string | null;
  categories: Category[];
  domains: Domain[];
  tech_stacks: TechStack[];
}

export interface SimilarProject {
  id: string;
  title: string;
  description: string | null;
  repo_url: string | null;
  similarity: number;
}

export interface TrendingProject {
  project_id: string;
  stars: number | null;
  last_synced_at: string | null;
}
