# ost-mcp

Agent-facing guide for **[ost-mcp](https://github.com/opensource-together/ost-mcp)** — the [`@opensource-together/mcp`](https://www.npmjs.com/package/@opensource-together/mcp) MCP server used from Claude Desktop, IDEs, and other MCP clients.

User-facing README: [README.md](README.md).

## Project overview

- **Upstream HTTP API:** Requests go to **`OST_API_URL`** (default: **`https://api.opensource-together.com/v1/mcp`**), the platform **MCP gateway** served by **[ost-backend](https://github.com/opensource-together/ost-backend)** (`Authorization: Bearer` + `OST_API_KEY`).
- **Data / recommendations:** Recommendations ultimately come from the **[ost-linker](https://github.com/opensource-together/ost-linker)** pipeline; this npm package talks only to the gateway base URL above.

Flow: MCP client → stdio server (`src/index.ts`) → `OSTClient` (`src/client.ts`) → HTTP gateway.

## Repository layout

| Path | Role |
|------|------|
| `src/index.ts` | MCP server entry: registers tools |
| `src/client.ts` | HTTP client (paths under the gateway base URL) |
| `src/config.ts` | **`OST_API_URL`**, **`OST_API_KEY`** (required) |
| `src/types.ts` | Shared response types |
| `src/tools/*.ts` | One module per MCP tool |

## Commands

Run from **`ost-mcp/`** (this repo):

```bash
npm install
npm run build       # compile TypeScript → dist/
npm run dev         # tsc --watch
npm start           # node dist/index.js
npm test            # unit tests (Vitest)
npm run test:integration   # hits a live API — set OST_API_URL / OST_API_KEY
npm run lint        # tsc --noEmit
```

## MCP tools (current)

| Tool | Role |
|------|------|
| `search_projects` | Keyword search + optional category, domain, tech stack |
| `get_project` | Full project by id |
| `get_trending` | Trending / popular projects |
| `find_similar` | Similar projects (embeddings) |
| `list_categories` | Reference: categories |
| `list_domains` | Reference: domains |
| `list_techstacks` | Reference: tech stacks |

## Configuration

| Variable | Required | Purpose |
|---------|----------|---------|
| `OST_API_KEY` | **Yes** | Personal access token; sent as `Authorization: Bearer`. |
| `OST_API_URL` | No | Gateway base URL (no trailing slash). Default: `https://api.opensource-together.com/v1/mcp`. |

For local development against another host, set both variables in the MCP client’s `env` block.

## npm / MCP client snippet

```json
{
  "mcpServers": {
    "ost": {
      "command": "npx",
      "args": ["@opensource-together/mcp"],
      "env": {
        "OST_API_KEY": "<personal-access-token>",
        "OST_API_URL": "https://api.opensource-together.com/v1/mcp"
      }
    }
  }
}
```

Generate tokens in OpenSource Together account settings.

## License

See **MIT** in [package.json](./package.json) / [README.md](./README.md).
