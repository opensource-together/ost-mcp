# Conventions

## Code Style
- TypeScript strict mode
- ESM modules (import/export, `.js` extensions in imports)
- Vitest for tests
- Zod for schema validation

## Testing
- Tests in `tests/` mirroring `src/` structure
- Use vitest `describe`/`it` blocks
- Mock the OSTClient in tool tests, mock `fetch` in client tests
- One assertion focus per test

## Git
- Conventional commits: `feat:`, `fix:`, `test:`, `chore:`, `docs:`
- Co-Author: spidecode-bot <263227865+spicode-bot@users.noreply.github.com>

## Implementation Plan
- Full implementation plan is at: `/home/spidey/git/ost-linker/specs/2026-03-10-ost-mcp-plan.md`
- Follow TDD: write failing test first, then implement
