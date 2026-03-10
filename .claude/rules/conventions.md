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
- Follow TDD: write failing test first, then implement
