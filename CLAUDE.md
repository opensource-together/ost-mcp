# CLAUDE.md

## Project Overview

OST MCP is the Model Context Protocol server for [OpenSourceTogether](https://opensource-together.com/). It lets developers discover and explore open-source projects directly from Claude Desktop, IDEs, and other MCP-compatible clients.

It consumes the OST Linker REST API and exposes 7 MCP tools for project search, discovery, and similarity.

## Common Commands

### Development
```bash
npm install                    # Install dependencies
npm run build                  # Compile TypeScript
npm run dev                    # Watch mode
npm test                       # Run tests (vitest)
npm run lint                   # Type check (tsc --noEmit)
```

### Testing
```bash
npx vitest run                 # All tests
npx vitest run tests/tools/    # Tool tests only
npx vitest --watch             # Watch mode
```

## Architecture

```
User (Claude Desktop/IDE) -> MCP Server (stdio) -> OSTClient (HTTP) -> OST Linker API
```

- `src/index.ts` — MCP server entry point, registers all tools
- `src/client.ts` — HTTP client for the OST Linker REST API
- `src/tools/` — One file per MCP tool (or group)
- `src/config.ts` — Reads `OST_API_URL` from env
- `src/types.ts` — Shared TypeScript types

## MCP Tools (v1)

| Tool | Description |
|------|-------------|
| `search_projects` | Search projects by keyword with optional filters |
| `get_project` | Get full project details by ID |
| `get_trending` | Get trending/popular projects |
| `find_similar` | Find similar projects via AI embeddings |
| `list_categories` | List all categories |
| `list_domains` | List all domains |
| `list_techstacks` | List all tech stacks |

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `OST_API_URL` | OST Linker API base URL | `https://api.opensource-together.com` |

## Related Repos

- [ost-linker](https://github.com/opensource-together/ost-linker) — AI recommendation pipeline + REST API that this MCP consumes
- [ost-backend](https://github.com/opensource-together/ost-backend) — Main OST platform backend

## Distribution

Published as `@opensource-together/mcp` on npm. Users install via:

```json
{
  "mcpServers": {
    "ost": {
      "command": "npx",
      "args": ["@opensource-together/mcp"],
      "env": {
        "OST_API_URL": "https://api.opensource-together.com"
      }
    }
  }
}
```
