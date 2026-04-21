# @opensource-together/mcp

> Need a project? Just ask your agent.

Stop browsing GitHub. Tell your AI agent what you need — it finds the right open-source project for you. Works with Claude, OpenClaw, and any MCP-compatible agent.

## Quick Start

Add this to your MCP client config:

```json
{
  "mcpServers": {
    "ost": {
      "command": "npx",
      "args": ["@opensource-together/mcp"],
      "env": {
        "OST_API_KEY": "your-personal-access-token"
      }
    }
  }
}
```

> Generate your key at your OpenSource Together account settings.

## Distribution

Published as `@opensource-together/mcp` on npm. Example client config:

```json
{
  "mcpServers": {
    "ost": {
      "command": "npx",
      "args": ["@opensource-together/mcp"],
      "env": {
        "OST_API_KEY": "your-personal-access-token",
        "OST_API_URL": "https://api.opensource-together.com/v1/mcp"
      }
    }
  }
}
```

> Generate your key at your OpenSource Together account settings.

## Tools

| Tool | What it does |
|------|-------------|
| `search_projects` | Search by keyword + filter by category, domain, or tech stack |
| `get_project` | Get full details on any project |
| `get_trending` | See what's hot right now |
| `find_similar` | Find similar projects using AI embeddings |
| `list_categories` | Browse all categories |
| `list_domains` | Browse all domains |
| `list_techstacks` | Browse all tech stacks |

## How it works

Ask your agent > [@ost-mcp](https://github.com/opensource-together/ost-mcp) > [@ost-backend](https://github.com/opensource-together/ost-backend) > projects found

- *"Find me React projects for e-commerce"*
- *"What's trending in open source right now?"*
- *"Show me projects similar to FastAPI"*

## Development

```bash
npm install
npm test
npm run build
npm run dev
```

## Environment Variables

| Variable | Purpose | Default |
|------|-------------|---------|
| `OST_API_KEY` | Personal Access Token from your OST account | Required |
| `OST_API_URL` | MCP gateway base URL | `https://api.opensource-together.com/v1/mcp` |

## License

MIT
