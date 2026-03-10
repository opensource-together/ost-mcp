# @opensource-together/mcp

> Need a project? Just ask your agent.

Stop browsing GitHub. Tell your AI agent what you need — it finds the right open-source project for you. Works with Claude Desktop, Cursor, Windsurf, OpenClaw, Claude Code, and any MCP-compatible agent.

## Quick Start

Add this to your MCP client config:

```json
{
  "mcpServers": {
    "ost": {
      "command": "npx",
      "args": ["@opensource-together/mcp"]
    }
  }
}
```

That's it. Ask your agent:

- *"Find me React projects for e-commerce"*
- *"What's trending in open source right now?"*
- *"Show me projects similar to FastAPI"*

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

```
You ask your agent --> ost-mcp (stdio) --> OST Linker API --> projects found
```

The MCP server connects to the [OST Linker](https://github.com/opensource-together/ost-linker) recommendation engine, which uses pgvector embeddings for semantic search and similarity matching.

## Development

```bash
npm install
npm test        # 14 tests
npm run build
npm run dev     # watch mode
```

## Links

- [OpenSourceTogether](https://opensource-together.com/)
- [OST Linker](https://github.com/opensource-together/ost-linker) — AI recommendation API
- [MCP Protocol](https://modelcontextprotocol.io/)

## License

MIT
