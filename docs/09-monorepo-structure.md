# Monorepo Structure

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | Monorepo Structure |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/03-software-architecture.md, docs/08-project-folder-structure.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the target monorepo structure for Disyn. It explains applications, packages, tooling, ownership boundaries, dependency rules, and the transition from the current single Next.js app into an enterprise-grade workspace.

## 2. Monorepo Decision

Decision: Use a monorepo.

Rationale:

- Web, API, worker, mobile, shared contracts, design system, database schema, and test tooling must evolve together.
- Shared TypeScript types and API contracts reduce integration drift.
- Cross-cutting changes such as RBAC, tenant context, and design tokens can be coordinated safely.
- CI can run affected builds and tests.
- The platform can later extract services while preserving contracts.

## 3. Recommended Tooling

| Tool | Purpose |
| --- | --- |
| npm workspaces or pnpm workspaces | Package workspace management. |
| Turborepo or Nx | Task orchestration and affected builds. |
| TypeScript project references | Faster type checks and package boundaries. |
| ESLint | Code quality and import boundaries. |
| Prettier | Formatting. |
| Prisma | Database schema and migrations. |
| Docker Compose | Local infrastructure. |
| GitHub Actions | CI/CD. |

Preferred initial choice:

- Use npm workspaces if preserving the current npm lockfile is the priority.
- Consider pnpm plus Turborepo when the monorepo is formally initialized and dependency performance matters.

## 4. Target Root Structure

```text
Disyn/
  apps/
    web/
    api/
    worker/
    mobile/
    e2e/
  packages/
    api-contracts/
    auth/
    config/
    database/
    design-system/
    domain-events/
    eslint-config/
    observability/
    testing/
    tsconfig/
  infrastructure/
    docker/
    nginx/
    terraform/
    kubernetes/
    scripts/
  docs/
    adr/
    api/
    database/
    deployment/
    operations/
    security/
    testing/
  tools/
    generators/
    migration/
    seed/
  .github/
    workflows/
  package.json
  turbo.json
  docker-compose.yml
  README.md
```

## 5. Applications

| App | Runtime | Purpose |
| --- | --- | --- |
| `apps/web` | Next.js | Public site and web workspaces. |
| `apps/api` | NestJS | REST APIs, auth, domain use cases. |
| `apps/worker` | NestJS/BullMQ | Background processing. |
| `apps/mobile` | React Native | Mobile app with offline learning. |
| `apps/e2e` | Playwright | Cross-app E2E tests. |

## 6. Packages

| Package | Purpose | Dependency Direction |
| --- | --- | --- |
| `packages/api-contracts` | Shared API schemas, DTO types, OpenAPI artifacts. | Used by web, mobile, API tests. |
| `packages/auth` | Permission constants, RBAC helpers, policy types. | Used by API, web, mobile. |
| `packages/config` | Environment schemas and runtime config helpers. | Used by apps. |
| `packages/database` | Prisma schema, migrations, generated client wrapper. | Used by API and worker. |
| `packages/design-system` | UI primitives, tokens, patterns. | Used by web and possibly mobile with platform-specific exports. |
| `packages/domain-events` | Event schemas and names. | Used by API, worker, integrations. |
| `packages/eslint-config` | Shared lint rules and import boundaries. | Used by all TS packages. |
| `packages/observability` | Logging, metrics, tracing helpers. | Used by API and worker. |
| `packages/testing` | Factories, fixtures, mocks, test utilities. | Used by apps and packages. |
| `packages/tsconfig` | Shared TypeScript configs. | Used by all TS packages. |

## 7. Infrastructure Folders

| Folder | Purpose |
| --- | --- |
| `infrastructure/docker` | Dockerfiles and local service config. |
| `infrastructure/nginx` | Nginx configs for self-hosted deployments. |
| `infrastructure/terraform` | Terraform-ready infrastructure modules. |
| `infrastructure/kubernetes` | Kubernetes manifests or Helm charts when needed. |
| `infrastructure/scripts` | Deployment and operational scripts. |

## 8. Dependency Rules

Allowed examples:

- `apps/web` imports `packages/api-contracts`, `packages/design-system`, `packages/auth`.
- `apps/api` imports `packages/database`, `packages/auth`, `packages/domain-events`, `packages/observability`.
- `apps/worker` imports `packages/database`, `packages/domain-events`, `packages/observability`.
- `packages/api-contracts` imports no app code.
- `packages/domain-events` imports no app code.

Forbidden:

- Packages importing from `apps/*`.
- `apps/web` importing backend internals.
- `apps/api` importing UI code.
- Domain packages importing Prisma directly unless they are infrastructure packages.
- Circular package dependencies.

## 9. Workspace Scripts

Root scripts should eventually include:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "test:e2e": "turbo test:e2e",
    "db:generate": "turbo db:generate",
    "db:migrate": "turbo db:migrate",
    "format": "prettier --write ."
  }
}
```

Exact script implementation should be decided during foundation setup.

## 10. Current Repository Transition Plan

Current state:

- Root is a Next.js app.
- `src`, `public`, `prisma`, and app config live at root.

Transition sequence:

1. Create `apps/web`.
2. Move current Next.js files into `apps/web`.
3. Move Prisma into `packages/database` or keep temporarily at root until foundation migration is approved.
4. Add root workspace `package.json`.
5. Add shared TypeScript and ESLint configs.
6. Add `apps/api` NestJS skeleton.
7. Add `apps/worker` skeleton.
8. Add Docker Compose infrastructure.
9. Add CI workflows.
10. Replace starter Prisma schema with foundation LMS schema only after database migration approval.

Important:

- Do not move files until Step 17 implementation begins.
- Before modifying frontend code, read relevant local Next.js 16 docs in `node_modules/next/dist/docs/`.

## 11. CI Monorepo Strategy

CI should run affected tasks where possible:

- Lint changed packages.
- Typecheck affected packages.
- Test affected packages.
- Build affected apps.
- Validate Prisma schema and migrations.
- Run E2E only for critical branches or affected UI areas.

Main branch protection requires:

- Lint pass.
- Typecheck pass.
- Unit tests pass.
- Build pass.
- Secret scan pass.
- Migration validation pass when database files change.

## 12. Versioning Strategy

Internal packages:

- Version together with the repository at first.
- Use changesets or equivalent only when external package publishing becomes necessary.

APIs:

- Version through URL major version and OpenAPI changelog.

Database:

- Version through migration history.

Events:

- Version through event schema version.

## 13. Ownership Model

| Area | Owner |
| --- | --- |
| `apps/web` | Frontend platform team. |
| `apps/api` | Backend platform team. |
| `apps/worker` | Backend and DevOps. |
| `apps/mobile` | Mobile team. |
| `packages/database` | Database architecture and backend. |
| `packages/design-system` | UI/UX architecture and frontend. |
| `packages/api-contracts` | Backend and frontend jointly. |
| `packages/domain-events` | Backend architecture. |
| `infrastructure` | DevOps. |
| `docs` | Engineering management and architecture. |

## 14. Approval Criteria

This monorepo structure is approved when stakeholders agree that:

- A monorepo is the right repository strategy.
- Applications and packages have clear boundaries.
- The current Next.js app has a controlled transition path.
- Tooling can support CI, testing, and long-term maintenance.

## 15. Next Artifact

The next artifact is the Git Strategy.
