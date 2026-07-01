# Project Folder Structure

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | Project Folder Structure |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/03-software-architecture.md, docs/07-design-system.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the internal folder structure for Disyn applications and packages. It translates Clean Architecture, DDD, Hexagonal Architecture, and feature-based organization into a practical code layout.

The actual monorepo root layout is defined in `docs/09-monorepo-structure.md`.

## 2. Structure Principles

| Principle | Application |
| --- | --- |
| Feature-first | Product domains own their UI, API, use cases, tests, and types where practical. |
| Layered inside features | Domain, application, infrastructure, and presentation remain separated. |
| Frameworks at the edges | NestJS, Next.js, Prisma, providers, and UI libraries stay outside domain logic. |
| Shared code is earned | Shared packages exist only for reusable primitives, contracts, tooling, or cross-cutting concerns. |
| Tests live near behavior | Unit tests sit near units; integration and E2E tests live in dedicated test areas. |
| No dumping grounds | Avoid vague folders such as `utils` unless the scope is specific. |

## 3. Backend App Structure

Target backend app: `apps/api`.

```text
apps/api/
  src/
    main.ts
    app.module.ts
    config/
      env.schema.ts
      app-config.module.ts
    common/
      decorators/
      filters/
      guards/
      interceptors/
      pipes/
      middleware/
      pagination/
      errors/
      logging/
    modules/
      identity-access/
        domain/
          entities/
          value-objects/
          services/
          events/
        application/
          commands/
          queries/
          use-cases/
          dto/
          ports/
        infrastructure/
          prisma/
          password/
          tokens/
          oauth/
        presentation/
          http/
            controllers/
            request-dto/
            response-dto/
        identity-access.module.ts
        tests/
      tenancy/
      learning-delivery/
      curriculum/
      assessment/
      credentialing/
      cms/
      media/
      ai-knowledge/
      communication/
      analytics/
      search/
      career-employer/
      audit-compliance/
      integration/
    database/
      prisma.service.ts
      transaction-manager.ts
    observability/
      logger.ts
      tracing.ts
      metrics.ts
    bootstrap/
      seed-permissions.ts
  test/
    integration/
    e2e/
```

## 4. Backend Module Rules

Each backend bounded context follows this internal shape:

| Folder | Allowed Contents | Forbidden Contents |
| --- | --- | --- |
| `domain` | Entities, value objects, domain services, domain events, invariants. | NestJS decorators, Prisma imports, HTTP DTOs. |
| `application` | Use cases, commands, queries, ports, transaction orchestration. | Direct provider calls, controller logic. |
| `infrastructure` | Prisma repositories, external provider adapters, Redis, storage, email, AI adapters. | Business rules. |
| `presentation` | REST controllers, request DTOs, response DTOs, guards specific to module. | Persistence and domain mutation logic. |
| `tests` | Module unit tests and fixtures. | Broad E2E suites. |

Dependency rule:

```text
presentation -> application -> domain
infrastructure -> application/domain ports
domain -> no framework dependencies
```

## 5. Worker App Structure

Target worker app: `apps/worker`.

```text
apps/worker/
  src/
    main.ts
    worker.module.ts
    queues/
      queue-names.ts
      queue-config.ts
    processors/
      outbox.processor.ts
      notifications.processor.ts
      email.processor.ts
      sms.processor.ts
      push.processor.ts
      media.processor.ts
      certificate.processor.ts
      ai-ingestion.processor.ts
      analytics.processor.ts
      search-index.processor.ts
      webhooks.processor.ts
    schedulers/
      credential-expiry.scheduler.ts
      cleanup.scheduler.ts
      report.scheduler.ts
    common/
      job-context.ts
      idempotency.ts
      retry-policy.ts
  test/
    integration/
```

Rules:

- Workers must be idempotent.
- Jobs must include tenant context where applicable.
- External provider calls live behind adapters.
- Worker failures must be observable and retryable.

## 6. Web App Structure

Target web app: `apps/web`.

Before implementation, engineers must read the relevant local Next.js 16 documentation in `node_modules/next/dist/docs/` because this project version may differ from older conventions.

```text
apps/web/
  src/
    app/
      (public)/
        page.tsx
        programs/
        verify/
      (auth)/
        login/
        reset-password/
        invite/
      (app)/
        app/
          layout.tsx
          learn/
          instructor/
          admin/
          super-admin/
          employer/
          career/
      api/
        health/
    features/
      auth/
        components/
        hooks/
        api/
        schemas/
      learner/
      instructor/
      admin/
      courses/
      curriculum/
      assessment/
      credentials/
      ai-tutor/
      cms/
      media/
      analytics/
      employer/
      career/
    components/
      layout/
      navigation/
      feedback/
    design-system/
      primitives/
      tokens/
      patterns/
    lib/
      api-client/
      auth/
      tenant/
      permissions/
      query/
      validation/
      formatting/
    styles/
      globals.css
    test/
      fixtures/
      mocks/
```

## 7. Web Feature Folder Rules

Each frontend feature can contain:

```text
features/{feature}/
  components/
  screens/
  hooks/
  api/
  schemas/
  types/
  state/
  tests/
```

Rules:

- Feature UI stays inside its feature unless it is reused across multiple domains.
- Shared components move to `design-system` only after reuse is clear.
- API clients use central HTTP and auth handling.
- Zod schemas are shared between forms and API client validation where practical.
- Authorization checks improve UX but never replace backend enforcement.

## 8. Mobile App Structure

Target mobile app: `apps/mobile`.

```text
apps/mobile/
  src/
    app/
      navigation/
      providers/
    features/
      auth/
      learner-home/
      courses/
      downloads/
      notes/
      assessments/
      ai-chat/
      wallet/
      notifications/
      sync/
    design-system/
      primitives/
      tokens/
    lib/
      api-client/
      storage/
      offline-db/
      sync-queue/
      push/
      auth/
    test/
```

Rules:

- Offline sync is a first-class feature, not a side effect.
- Local persistence is isolated behind storage ports.
- High-stakes exam offline mode requires separate approval.

## 9. Shared Package Structure

Shared packages should be specific:

```text
packages/
  api-contracts/
    src/
      generated/
      schemas/
      types/
  auth/
    src/
      permissions/
      rbac/
  config/
    src/
      env/
      eslint/
      tsconfig/
  database/
    prisma/
    src/
      client/
      migrations/
  design-system/
    src/
      primitives/
      tokens/
      patterns/
  domain-events/
    src/
      events/
      schemas/
  observability/
    src/
      logging/
      metrics/
      tracing/
  testing/
    src/
      factories/
      fixtures/
      test-utils/
```

Shared package rules:

- No package should become a miscellaneous utility bucket.
- Shared packages must have clear ownership.
- Public exports are explicit.
- Breaking shared package changes require changelog notes.

## 10. Test Structure

| Test Type | Location |
| --- | --- |
| Domain unit tests | Inside module `tests` or beside domain object. |
| Application use case tests | Module `tests/application`. |
| Repository integration tests | App-level `test/integration`. |
| API integration tests | `apps/api/test/integration`. |
| Web component tests | Feature `tests` or design-system tests. |
| E2E tests | `apps/e2e` or `tests/e2e`. |
| Accessibility tests | Web E2E and component examples. |
| AI evaluation tests | `apps/api/test/ai-evals` or `packages/testing`. |

## 11. Documentation Structure

```text
docs/
  01-product-requirements-document.md
  02-information-architecture.md
  03-software-architecture.md
  04-database-design.md
  05-api-specification.md
  06-ui-component-inventory.md
  07-design-system.md
  08-project-folder-structure.md
  09-monorepo-structure.md
  10-git-strategy.md
  11-development-roadmap.md
  12-epics.md
  13-features.md
  14-user-stories.md
  15-engineering-tasks.md
  16-effort-estimates.md
  adr/
  api/
  database/
  deployment/
  operations/
  security/
  testing/
```

## 12. Naming Standards

| Item | Convention |
| --- | --- |
| TypeScript files | `kebab-case.ts` |
| React components | `PascalCase.tsx` |
| Hooks | `use-name.ts` |
| DTO files | `create-course.request.ts`, `course.response.ts` |
| Tests | `*.spec.ts`, `*.test.ts`, `*.e2e-spec.ts` |
| Feature folders | `kebab-case` |
| Domain events | Past tense, e.g. `CoursePublishedEvent` |

## 13. Import Rules

- Domain cannot import infrastructure.
- Application cannot import presentation.
- Frontend features should not import from other feature internals.
- Shared packages expose public index files.
- Avoid deep imports across package boundaries.
- Enforce with lint rules or dependency boundary tooling when monorepo is established.

## 14. Approval Criteria

This folder structure is approved when stakeholders agree that:

- Clean Architecture boundaries are visible in the filesystem.
- Feature-based organization is practical.
- Backend, worker, web, mobile, shared packages, tests, and docs have clear homes.
- The structure supports future service extraction.

## 15. Next Artifact

The next artifact is the Monorepo Structure.
