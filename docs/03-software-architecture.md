# Software Architecture

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | Software Architecture |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/01-product-requirements-document.md, docs/02-information-architecture.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the software architecture for Disyn. It describes system boundaries, application layers, domain modules, deployment topology, integration patterns, security posture, event strategy, scaling model, and implementation principles.

This is not an implementation plan or code artifact. It establishes the architecture that future code must follow.

## 2. Architecture Summary

Disyn will be built as an API-first, multi-tenant, domain-driven learning platform with:

- A Next.js web application for public, learner, instructor, employer, organization admin, and super admin experiences.
- A NestJS backend application exposing REST APIs and optional GraphQL read APIs where they create clear product value.
- PostgreSQL as the transactional source of truth.
- Prisma ORM for database access through repository adapters.
- Redis for caching, distributed locks, sessions where applicable, and BullMQ queues.
- BullMQ workers for asynchronous jobs such as email, notifications, media processing, certificate generation, analytics projections, and AI ingestion.
- S3-compatible object storage through an internal storage abstraction.
- A governed AI subsystem using OpenAI, embeddings, vector retrieval, tenant-scoped source policies, and Retrieval-Augmented Generation.
- Event-driven integration through domain events, an outbox pattern, and webhook delivery.
- Clean Architecture and DDD boundaries per feature module.

The recommended initial backend shape is a modular monolith, not premature microservices. Each bounded context will have strict internal boundaries so selected modules can later be extracted into independent services when operational scale, team ownership, or compliance requires it.

## 3. Existing Repository Context

The current repository is a small Next.js application:

- Next.js 16.2.9.
- React 19.2.4.
- TypeScript.
- Tailwind CSS 4.
- Prisma 5.22.0.
- Existing `src`, `prisma`, and `public` folders.

Before any frontend implementation, engineers must read the relevant local Next.js guide in `node_modules/next/dist/docs/` because the repository's Next.js version may include breaking changes and conventions that differ from older assumptions.

The architecture assumes the current application will evolve into a monorepo. The monorepo structure itself will be specified in a later artifact.

## 4. Architecture Goals

| Goal | Architectural Response |
| --- | --- |
| Serve many organizations securely | Tenant context is enforced in authentication, authorization, data access, jobs, object storage, search, analytics, and AI retrieval. |
| Support millions of learners | Stateless APIs, cacheable reads, async workers, indexed database design, read models for analytics, CDN-backed media, and horizontal scaling. |
| Preserve long-term maintainability | DDD bounded contexts, clean architecture layers, repository ports, explicit domain events, ADRs, and testable modules. |
| Enable enterprise deployment flexibility | Cloud-provider abstractions for storage, email, SMS, AI, vector database, and deployment targets. |
| Keep learning content configurable | Course, curriculum, assessment, credential, CMS, and branding data are managed through admin tools, not hardcoded. |
| Build trustworthy credentials | Credentialing is isolated as an official-record domain with immutable issuance history, QR verification, revocation, and audit trails. |
| Govern AI behavior | AI access is mediated through tenant policy, retrieval authorization, source approval, and safety logging. |
| Support future extraction | Modules communicate through application contracts and events rather than direct cross-module persistence coupling. |

## 5. Key Architecture Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Backend shape | Modular monolith first, service-extractable later. | This gives strong consistency and simpler delivery early while preserving extraction paths for AI, analytics, notifications, and search. |
| API style | REST primary, GraphQL optional for selected read aggregation. | REST is predictable, cacheable, and enterprise-friendly. GraphQL is useful only where dashboards or complex clients benefit from flexible reads. |
| Data source of truth | PostgreSQL. | Relational integrity is essential for tenants, enrollments, assessments, credentials, audit logs, and transactional workflows. |
| ORM | Prisma behind repository adapters. | Prisma improves type safety and migrations while repository ports prevent domain logic from depending on Prisma directly. |
| Async processing | BullMQ with Redis. | Email, notifications, AI ingestion, certificates, media, and analytics should not block interactive requests. |
| Event reliability | Transactional outbox pattern. | Domain events must not be lost when database changes and async dispatch happen together. |
| CQRS | Selective, not universal. | Complex analytics, dashboards, search, and credential verification benefit from read models; simple CRUD does not need extra layers. |
| Multi-tenancy | Shared application with tenant-scoped records and optional dedicated deployments for enterprise customers. | This balances SaaS efficiency with enterprise isolation options. |
| Tenant isolation enforcement | Application authorization plus database constraints, indexes, and optional PostgreSQL Row Level Security for high-security deployments. | Defense in depth is required because tenant leakage is a catastrophic failure. |
| AI boundary | Internal AI application service, not direct UI-to-provider calls. | Prompts, retrieval, privacy, cost controls, logging, and safety policies must be centrally enforced. |
| Object storage | S3-compatible storage port. | Cloudflare R2 and AWS S3 compatibility avoids provider lock-in. |
| Frontend state | Server-rendered where useful, TanStack Query for client server-state, local UI state only where appropriate. | This avoids global state sprawl and keeps data fetching explicit. |
| Authentication | JWT access tokens, refresh tokens, OAuth readiness, MFA readiness. | Supports web, mobile, API clients, and enterprise identity needs. |
| Authorization | RBAC with tenant-scoped roles and permission checks. | Roles differ by organization and must be enforced consistently across APIs and background jobs. |

## 6. System Context

### 6.1 Users

| Actor | Uses |
| --- | --- |
| Learner | Web app, mobile app, AI tutor, course player, wallet. |
| Instructor | Web app, grading queues, courses, discussions, reports. |
| Assessor | Practical assessment review, rubrics, evidence decisions. |
| Organization Admin | Admin dashboard, CMS, users, programs, credentials, settings. |
| Super Admin | Platform operations, tenant management, security, feature flags. |
| Employer Verifier | Verification portal, shared credentials, job posts where enabled. |
| External Developer | API portal, webhooks, API keys, integration logs. |

### 6.2 External Systems

| System | Purpose |
| --- | --- |
| OAuth Providers | Enterprise or social authentication. |
| Email Provider | Transactional and notification email delivery. |
| SMS Provider | SMS notifications through a provider abstraction. |
| Firebase Cloud Messaging | Push notifications. |
| Cloudflare R2 or AWS S3 | Object storage. |
| OpenAI | AI generation and embeddings. |
| Vector Database | Embedding search for RAG. |
| CDN and Cloudflare | Edge caching, DNS, WAF, TLS, bot controls. |
| Payment, HRIS, SIS, Government Registries | Future integrations through APIs and webhooks. |

## 7. Container Architecture

| Container | Technology | Responsibility |
| --- | --- | --- |
| Web App | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui | Public site, dashboards, admin workspaces, employer portal, API portal UI. |
| Mobile App | React Native | Offline learning, notes, downloads, push notifications, AI chat, wallet. |
| API Application | NestJS, TypeScript | REST APIs, optional GraphQL, domain orchestration, authentication, authorization. |
| Worker Application | NestJS, BullMQ | Async jobs, notifications, certificates, AI ingestion, media processing, analytics projections. |
| Scheduler | NestJS or worker process | Recurring jobs, cleanup, expiry, reminders, reporting schedules. |
| PostgreSQL | Managed PostgreSQL | Transactional source of truth. |
| Redis | Managed Redis | Cache, queues, locks, rate limit counters. |
| Object Storage | Cloudflare R2 or S3-compatible | Media, documents, exports, generated certificates. |
| Vector Store | Provider selected later | Tenant-scoped embedding retrieval for AI. |
| Search Index | PostgreSQL FTS initially, OpenSearch or Meilisearch when scale requires | Search over courses, CMS, users, credentials, knowledge, and admin records. |
| API Gateway or Edge | Nginx, Cloudflare, platform gateway | TLS, routing, WAF, rate limiting, compression, request policy. |

## 8. Deployment Architecture

### 8.1 Development

Development should use Docker Compose for dependent infrastructure:

- PostgreSQL.
- Redis.
- Optional local object storage such as MinIO.
- Optional local mail catcher.
- API application.
- Worker application.
- Web application.

Rationale: consistent local infrastructure reduces onboarding friction and makes integration tests reliable.

### 8.2 Production SaaS

Recommended production topology:

- Web app deployed to Vercel or container hosting when enterprise policy requires it.
- API application deployed as horizontally scalable containers.
- Worker application deployed as independent scalable containers.
- PostgreSQL managed by a production-grade provider.
- Redis managed by a production-grade provider.
- Object storage on Cloudflare R2 or AWS S3.
- CDN and WAF through Cloudflare.
- Background job monitoring and alerting.
- Centralized logs, metrics, traces, and error tracking.

### 8.3 Enterprise Dedicated Deployment

For high-security customers, the same architecture can be deployed in a dedicated environment:

- Dedicated database.
- Dedicated object storage bucket.
- Dedicated Redis instance.
- Dedicated API and worker instances.
- Optional private networking.
- Customer-specific compliance controls.

Rationale: some government, ministry, and large institutional customers will require stronger isolation than shared SaaS.

### 8.4 Kubernetes Readiness

The system should be Kubernetes-ready without requiring Kubernetes for the first deployment.

Requirements:

- Stateless API containers.
- Separate worker deployments by queue type.
- Health checks.
- Readiness checks.
- Graceful shutdown.
- Config through environment variables and secrets.
- Horizontal scaling policies.
- Migration jobs separate from application startup.

## 9. Logical Architecture

The backend follows Clean Architecture inside each bounded context:

```text
Presentation Layer
  REST controllers, optional GraphQL resolvers, request DTOs

Application Layer
  Commands, queries, use cases, orchestration, transactions

Domain Layer
  Entities, value objects, aggregates, domain services, domain events

Ports
  Repository interfaces, provider interfaces, event bus interfaces

Infrastructure Adapters
  Prisma repositories, Redis cache, object storage, email, SMS, OpenAI, vector DB
```

Dependency rule:

- Domain does not depend on application, presentation, infrastructure, NestJS, Prisma, or external providers.
- Application depends on domain and ports.
- Infrastructure implements ports.
- Presentation calls application use cases.

Rationale: this keeps business rules testable and stable even when providers, databases, or frameworks change.

## 10. Bounded Contexts

### 10.1 Identity and Access

Responsibilities:

- Authentication.
- Sessions.
- Refresh tokens.
- OAuth readiness.
- MFA readiness.
- RBAC.
- Permission checks.
- Account recovery.

Owns:

- User identity.
- Credentials.
- Sessions.
- Roles.
- Permissions.
- Memberships.

Publishes events:

- `UserRegistered`.
- `UserInvited`.
- `UserSuspended`.
- `RoleAssigned`.
- `PermissionChanged`.
- `LoginSucceeded`.
- `LoginFailed`.
- `SessionRevoked`.

### 10.2 Tenancy and Organization

Responsibilities:

- Tenant lifecycle.
- Organization profile.
- Branding.
- Domains.
- Training centers.
- Departments.
- Teams.
- Tenant settings.
- Feature flags.

Owns:

- Tenant.
- Organization.
- Tenant settings.
- Training center.
- Domain configuration.

Publishes events:

- `TenantCreated`.
- `TenantSuspended`.
- `OrganizationUpdated`.
- `BrandingChanged`.
- `FeatureFlagChanged`.

### 10.3 Learning Delivery

Responsibilities:

- Programs.
- Courses.
- Modules.
- Lessons.
- Topics.
- Activities.
- Course player state.
- Enrollments.
- Progress.
- Completion.

Owns:

- Program structure.
- Course structure.
- Enrollment.
- Progress records.
- Lesson completion.

Publishes events:

- `CoursePublished`.
- `LearnerEnrolled`.
- `LessonCompleted`.
- `CourseCompleted`.
- `ProgressUpdated`.

### 10.4 Curriculum and Competency

Responsibilities:

- Qualification frameworks.
- Competencies.
- Outcomes.
- Framework alignment.
- Competency mapping.
- Mastery rules.

Owns:

- Frameworks.
- Qualification levels.
- Competencies.
- Learning outcomes.
- Mapping records.

Publishes events:

- `FrameworkCreated`.
- `CompetencyMapped`.
- `MasteryUpdated`.

### 10.5 Assessment

Responsibilities:

- Question bank.
- Quiz engine.
- Assignment engine.
- Practical assessment.
- Exam engine.
- Rubrics.
- Attempts.
- Grading.
- Moderation.
- Feedback.

Owns:

- Questions.
- Rubrics.
- Assessments.
- Attempts.
- Submissions.
- Grades.
- Moderation records.

Publishes events:

- `AssessmentPublished`.
- `AssessmentSubmitted`.
- `AssessmentGraded`.
- `PracticalCompetencyAwarded`.
- `ExamCompleted`.
- `FeedbackReleased`.

### 10.6 Credentialing

Responsibilities:

- Credential eligibility.
- Certificate generation.
- Badge generation.
- Certificate numbers.
- QR verification.
- Wallet.
- Revocation.
- Transcript generation.

Owns:

- Credential templates.
- Issued credentials.
- Verification records.
- Revocation records.
- Wallet items.
- Transcripts.

Publishes events:

- `CredentialEligible`.
- `CredentialIssued`.
- `CredentialVerified`.
- `CredentialRevoked`.
- `TranscriptGenerated`.

### 10.7 CMS and Content

Responsibilities:

- Public pages.
- Homepage.
- Footer.
- Navigation.
- Blogs.
- News.
- FAQs.
- Policies.
- Announcements.
- Content lifecycle.

Owns:

- CMS pages.
- Navigation items.
- Editorial content.
- Policy versions.
- Announcement records.

Publishes events:

- `ContentSubmittedForReview`.
- `ContentPublished`.
- `PolicyUpdated`.
- `AnnouncementPublished`.

### 10.8 Media and File Management

Responsibilities:

- Uploads.
- Downloads.
- Storage keys.
- File metadata.
- Access policies.
- Media processing.
- Virus scanning readiness.
- Retention rules.

Owns:

- File metadata.
- Media variants.
- Usage references.
- Storage access policy records.

Publishes events:

- `FileUploaded`.
- `FileProcessed`.
- `FileAccessed`.
- `FileArchived`.

### 10.9 AI and Knowledge

Responsibilities:

- AI tutor policy.
- Knowledge base.
- Source approval.
- Document ingestion.
- Chunking.
- Embeddings.
- Retrieval.
- Answer generation.
- AI logs.
- Weakness tracking signals.

Owns:

- AI tenant settings.
- Knowledge source metadata.
- Ingestion jobs.
- Prompt policy.
- AI interaction logs.
- Study recommendations.

Publishes events:

- `KnowledgeSourceApproved`.
- `KnowledgeSourceIndexed`.
- `AiTutorResponded`.
- `AiTutorRefused`.
- `LearnerWeaknessDetected`.

### 10.10 Communication

Responsibilities:

- In-app notifications.
- Email queue.
- SMS abstraction.
- Push notifications.
- Messaging.
- Discussion forums.
- Notification templates.

Owns:

- Notifications.
- Message threads.
- Discussion posts.
- Delivery attempts.
- Templates.

Publishes events:

- `NotificationCreated`.
- `NotificationDelivered`.
- `MessageSent`.
- `DiscussionPostCreated`.

### 10.11 Analytics and Reporting

Responsibilities:

- Dashboards.
- Reports.
- Exports.
- Aggregations.
- Learning analytics.
- Operational analytics.
- Credential analytics.
- AI usage analytics.

Owns:

- Read models.
- Report definitions.
- Export jobs.
- Aggregated metrics.

Consumes events:

- Enrollment, progress, assessment, credential, communication, AI, and audit events.

### 10.12 Search

Responsibilities:

- Indexing.
- Query APIs.
- Permission-aware results.
- Public and authenticated search.

Owns:

- Search documents.
- Index metadata.
- Reindex jobs.

Consumes events:

- Content, course, user, credential, media, knowledge, and CMS publication events.

### 10.13 Career and Employer

Responsibilities:

- Employer accounts.
- Credential sharing.
- Job board.
- Applications.
- Career profile.
- Skills profile.

Owns:

- Employer profiles.
- Job posts.
- Applications.
- Credential share links.
- Career profile records.

Publishes events:

- `CredentialShared`.
- `JobPosted`.
- `ApplicationSubmitted`.

### 10.14 Audit and Compliance

Responsibilities:

- Audit event capture.
- Sensitive action history.
- Export logging.
- Security review support.
- Compliance evidence.

Owns:

- Audit events.
- Access logs.
- Export records.
- Administrative action history.

Consumes:

- Security, tenant, content, assessment, credential, AI, and file events.

### 10.15 Integration

Responsibilities:

- API keys.
- Webhooks.
- Webhook signing.
- Delivery logs.
- External provider configuration.
- Integration health.

Owns:

- API client records.
- Webhook subscriptions.
- Delivery attempts.
- Provider configs.

Publishes events:

- `WebhookDeliverySucceeded`.
- `WebhookDeliveryFailed`.
- `ApiKeyRotated`.

## 11. Backend Application Architecture

### 11.1 NestJS Module Pattern

Each bounded context should be represented as a NestJS feature module with internal folders for:

- Domain.
- Application.
- Infrastructure.
- Presentation.
- Tests.

The NestJS module exports only application-level contracts needed by other modules. It does not expose database models or infrastructure details.

Rationale: this keeps modules replaceable and prevents cross-context coupling through implementation details.

### 11.2 Request Flow

Standard command request:

1. Request enters controller.
2. Authentication guard resolves user and tenant context.
3. Authorization guard checks permission and resource scope.
4. Controller validates DTO.
5. Application command handler runs use case.
6. Domain aggregate enforces business rules.
7. Repository adapter persists changes through Prisma.
8. Domain events are written to outbox in the same transaction.
9. Response DTO is returned.
10. Worker dispatches outbox events asynchronously.

Standard query request:

1. Request enters controller.
2. Authentication and authorization run.
3. Query handler reads optimized data.
4. Query applies tenant and permission filters.
5. Response DTO is returned.

### 11.3 Transaction Boundaries

Transactions should be controlled by application use cases, not controllers.

Rules:

- One command should have one clear transaction boundary.
- Outbox events must be persisted in the same transaction as state changes.
- External provider calls should not happen inside database transactions.
- Long-running work must move to jobs.
- Idempotency keys are required for retryable external-facing commands such as credential issuance, payment-ready flows, imports, and webhook processing.

### 11.4 Repository Pattern

Repositories are ports in the application or domain boundary and implemented with Prisma in infrastructure.

Rules:

- Domain logic must not depend on Prisma models.
- Repository methods should reflect domain intent, not generic table access.
- Queries for complex dashboards may use dedicated read repositories or projections.
- All repository methods must require tenant context for tenant-scoped data.

## 12. Frontend Architecture

### 12.1 Web Application

The Next.js web app is responsible for:

- Public tenant site.
- Authentication flows.
- Learner workspace.
- Instructor workspace.
- Organization admin workspace.
- Super admin workspace.
- Employer portal.
- Career portal.
- Developer and API portal UI.

Before implementation, engineers must read the relevant `node_modules/next/dist/docs/` files for the exact Next.js 16 App Router behavior used by this repository.

### 12.2 Frontend Architectural Rules

- Use route groups to separate public, authenticated, admin, instructor, learner, employer, and platform areas.
- Keep workspace navigation data-driven and permission-aware.
- Use server rendering for public, SEO, and stable read-heavy pages where supported by the local Next version.
- Use TanStack Query for client-side server state where interactivity, caching, mutation, retries, or invalidation are required.
- Use React Hook Form and Zod for forms.
- Use shadcn/ui and the enterprise design system for shared components.
- Keep domain-specific UI in feature folders.
- Keep API clients typed and generated or centrally defined.
- Do not put authorization trust in the frontend. The backend is the enforcement boundary.

### 12.3 Frontend Data Flow

| Data Type | Recommended Handling |
| --- | --- |
| Public CMS content | Server-rendered or cached fetches. |
| Authenticated dashboard data | API queries with tenant and role context. |
| Forms | Zod validation, server-side validation repeated by API. |
| Course player progress | Optimistic UI allowed, final authority is backend event. |
| AI chat | Streaming-capable API route or direct backend stream, never direct browser-to-provider. |
| Admin tables | Paginated, filtered, permission-aware APIs. |
| Media uploads | Signed upload flow through backend-issued policies. |

## 13. Mobile Architecture

The React Native mobile app should use the same API contracts as the web app.

Core mobile components:

- Authentication client.
- Tenant context manager.
- Offline content store.
- Sync queue.
- Download manager.
- Notes and bookmarks store.
- Push notification handler.
- AI chat client.
- Wallet viewer.

Offline rules:

- Offline reading is allowed only for content marked downloadable.
- Offline progress events are queued and synced with idempotency.
- Offline notes and bookmarks sync with conflict handling.
- High-stakes exams should not be offline unless a separate secure offline exam architecture is approved.
- Practical drafts may be created offline; final submission requires sync validation.

## 14. API Architecture

### 14.1 API Principles

- APIs are tenant-aware.
- APIs are versioned.
- APIs use consistent error contracts.
- APIs use pagination for collections.
- APIs use idempotency for retryable commands.
- APIs enforce authorization server-side.
- APIs return stable DTOs, not database models.
- Public APIs have explicit rate limits.

### 14.2 API Surface Categories

| Category | Examples |
| --- | --- |
| Public APIs | Tenant public site, program catalog, credential verification. |
| Auth APIs | Login, refresh, logout, OAuth, MFA, session management. |
| Learner APIs | Enrollments, progress, lessons, submissions, wallet. |
| Instructor APIs | Cohorts, gradebook, submissions, practical assessments. |
| Admin APIs | Users, courses, CMS, assessments, credentials, settings. |
| Super Admin APIs | Tenants, feature flags, platform operations. |
| Employer APIs | Verification, shared profiles, job posts. |
| Integration APIs | Webhooks, API keys, external events. |
| AI APIs | Tutor, summaries, flashcards, quiz generation, ingestion status. |

### 14.3 GraphQL Position

GraphQL is optional and should be introduced only when it reduces real complexity. Suitable candidates:

- Analytics dashboards.
- Admin overview pages.
- Nested read-only course structure queries.
- Mobile home feed aggregation.

GraphQL should not be used for high-risk commands in the early architecture. Commands remain REST-first to keep authorization, validation, audit, and idempotency explicit.

## 15. Event Architecture

### 15.1 Event Types

| Event Type | Purpose |
| --- | --- |
| Domain Event | Captures meaningful business state changes inside a bounded context. |
| Integration Event | Stable external event delivered to webhooks or partner systems. |
| Audit Event | Security and compliance record of action or access. |
| Job Event | Internal worker lifecycle or background processing signal. |

### 15.2 Outbox Pattern

Commands that change state and publish events must write events to an outbox table in the same database transaction. Workers then read the outbox and dispatch events to queues, projections, search indexes, webhooks, and audit sinks.

Rationale: this prevents state changes from succeeding while their events are lost.

### 15.3 Event Consumers

| Consumer | Consumes |
| --- | --- |
| Notification Workers | Enrollment, assessment, credential, message, announcement events. |
| Analytics Projectors | Progress, assessment, credential, AI, communication events. |
| Search Indexers | Published content, course, media, credential, knowledge events. |
| Credential Workers | Eligibility and issuance events. |
| AI Ingestion Workers | Approved knowledge and course content events. |
| Webhook Workers | Stable integration events. |
| Audit Pipeline | Sensitive action and access events. |

### 15.4 Event Rules

- Events are immutable.
- Event names use past tense.
- Events include tenant context where applicable.
- Event payloads contain stable identifiers, not full sensitive records.
- Consumers must be idempotent.
- Failed event processing must be retryable and observable.

## 16. CQRS Strategy

CQRS should be used selectively.

Use CQRS for:

- Analytics dashboards.
- Reporting.
- Search.
- Credential verification views.
- Course progress summaries.
- AI weakness summaries.
- Admin overview pages.

Avoid CQRS for:

- Simple settings.
- Basic CRUD.
- Low-volume workflows.
- Areas where a direct transactional read is clearer.

Rationale: CQRS adds operational cost. It should be used only where read complexity, performance, or aggregation needs justify it.

## 17. Multi-Tenancy Architecture

### 17.1 Tenant Context

Every authenticated request must resolve:

- User ID.
- Active tenant ID.
- Membership ID.
- Roles.
- Permissions.
- Training center or department scope where applicable.
- Feature flags.
- Locale and timezone.

Background jobs must include tenant context explicitly.

### 17.2 Tenant Isolation Controls

| Layer | Control |
| --- | --- |
| API | Tenant-aware route guards, permission checks, resource ownership checks. |
| Application | Use cases require tenant context for tenant-scoped operations. |
| Repository | Tenant-scoped repository methods require tenant ID. |
| Database | Tenant ID columns, composite indexes, foreign keys, optional RLS. |
| Cache | Tenant-prefixed keys. |
| Queue | Tenant context in job payloads. |
| Object Storage | Tenant-scoped keys and signed access policies. |
| Search | Tenant-scoped documents and access filters. |
| AI | Tenant-scoped vector indexes or filters with authorization before retrieval. |
| Analytics | Tenant-scoped projections and exports. |

### 17.3 Tenant Isolation Testing

Tenant isolation must be tested as a first-class security requirement:

- Cross-tenant read denial.
- Cross-tenant mutation denial.
- Cross-tenant search denial.
- Cross-tenant AI retrieval denial.
- Cross-tenant file access denial.
- Cross-tenant cache key isolation.
- Cross-tenant webhook isolation.

## 18. Security Architecture

### 18.1 Security Layers

| Area | Controls |
| --- | --- |
| Authentication | Password hashing, JWT access tokens, refresh token rotation, OAuth readiness, MFA readiness. |
| Authorization | RBAC, resource-level checks, tenant scopes, least privilege. |
| Transport | TLS everywhere, HSTS, secure cookies where applicable. |
| API Protection | Rate limiting, input validation, output shaping, error normalization. |
| Browser Security | CSP, XSS prevention, CSRF protection where cookie auth is used. |
| Data Security | Encryption in transit, provider encryption at rest, secrets management. |
| File Security | Type validation, size limits, signed URLs, malware scanning readiness. |
| Audit | Sensitive action logs, access logs, export logs, credential events. |
| Operations | Security monitoring, dependency scanning, secret scanning, vulnerability management. |
| AI Safety | Source restrictions, prompt policy, refusal behavior, logging, abuse limits. |

### 18.2 OWASP Coverage

| OWASP Risk | Architectural Mitigation |
| --- | --- |
| Broken Access Control | Central authorization guards, resource checks, tenant isolation tests. |
| Cryptographic Failures | TLS, secure secrets, provider encryption, password hashing. |
| Injection | Prisma parameterization, validation, no raw SQL without review. |
| Insecure Design | Threat modeling, ADRs, secure defaults, approval workflows. |
| Security Misconfiguration | Environment validation, hardened headers, infrastructure templates. |
| Vulnerable Components | Dependency scanning, updates, lockfile review. |
| Identification and Authentication Failures | Token rotation, session revocation, MFA readiness, rate limits. |
| Software and Data Integrity Failures | CI checks, signed webhook validation, controlled deployments. |
| Logging and Monitoring Failures | Centralized logs, audit pipeline, alerts. |
| SSRF | URL allowlists for remote fetches, provider isolation, upload controls. |

## 19. AI Architecture

### 19.1 AI Subsystem Components

| Component | Responsibility |
| --- | --- |
| AI Policy Service | Tenant AI settings, source policy, capability rules. |
| Knowledge Source Manager | Approved documents, lessons, media metadata, source lifecycle. |
| Ingestion Pipeline | Extract, chunk, embed, index, and version approved content. |
| Retrieval Service | Tenant-scoped, permission-aware vector retrieval. |
| Prompt Orchestrator | Builds controlled prompts with retrieved context and safety instructions. |
| AI Provider Adapter | Calls OpenAI through a replaceable provider port. |
| AI Response Validator | Checks grounding signals, refusal conditions, and policy constraints. |
| AI Log Store | Stores interactions according to privacy and retention settings. |
| Recommendation Service | Converts learner weakness signals into revision suggestions. |

### 19.2 RAG Flow

1. User asks AI tutor a question.
2. API validates tenant, user, role, course access, and AI feature availability.
3. AI Policy Service determines allowed behavior.
4. Retrieval Service searches approved, accessible source chunks.
5. Prompt Orchestrator builds a response request using only allowed context.
6. AI Provider Adapter calls OpenAI.
7. Response Validator checks policy constraints.
8. API returns answer with source references where available.
9. AI Log Store records the interaction according to tenant policy.
10. Weakness signals are emitted where enabled.

### 19.3 AI Guardrails

- No direct client calls to OpenAI.
- No retrieval from unapproved sources by default.
- No cross-tenant retrieval.
- Refuse when approved material is insufficient.
- Cite source references where available.
- Avoid grading, certification, disciplinary, legal, medical, or employment decisions.
- Track cost and token usage by tenant.
- Apply rate limits and abuse detection.

## 20. Data Architecture Overview

The detailed database design will be produced in the next artifact. This architecture establishes these data principles:

- PostgreSQL is the source of truth.
- Tenant-scoped tables include tenant identifiers.
- Official records use audit history and immutable event trails where required.
- Soft delete is used for recoverable administrative records.
- Hard delete is restricted and policy-controlled.
- High-volume events and analytics may use partitioning or projection tables.
- Read models are separate from write models where CQRS is justified.
- Sensitive exports are audited.
- Migrations are reviewed and tested before production.

## 21. Caching Strategy

Use caching carefully because tenant data leakage through cache keys is a severe risk.

| Cache Type | Examples | Rules |
| --- | --- | --- |
| Edge Cache | Public pages, public program catalog, static assets. | Must vary by tenant domain and locale. |
| API Cache | Tenant settings, feature flags, permission maps. | Tenant-prefixed keys and short TTLs where needed. |
| Query Cache | Read-heavy lists and dashboards. | Invalidate on domain events. |
| Client Cache | TanStack Query state. | Scoped by active tenant and user. |
| AI Cache | Optional retrieval or answer cache. | Only for safe tenant-scoped source-grounded responses. |

## 22. File and Media Architecture

File access must flow through backend-issued policies.

Upload flow:

1. Client requests upload intent.
2. Backend validates permission, tenant, file type, size, and target usage.
3. Backend issues signed upload policy or pre-signed URL.
4. Client uploads to object storage.
5. Backend records file metadata.
6. Worker processes file, extracts metadata, creates variants, and marks status.
7. File becomes available according to approval and access policy.

Download flow:

1. Client requests file access.
2. Backend validates tenant, role, permission, and resource ownership.
3. Backend returns short-lived signed URL or streams file.
4. Sensitive downloads are audited.

## 23. Notification Architecture

Notifications are event-driven.

Flow:

1. Domain event occurs.
2. Notification policy determines recipients and channels.
3. Notification record is created.
4. Delivery jobs are queued.
5. Channel adapters deliver email, push, SMS, or in-app notification.
6. Delivery attempts and failures are recorded.

Rationale: notification delivery should be reliable, retryable, and decoupled from core transactions.

## 24. Search Architecture

Initial search can use PostgreSQL full-text search for controlled scope and simpler operations. As search volume, ranking needs, or multilingual requirements grow, search can move to a dedicated engine such as OpenSearch or Meilisearch behind a search port.

Search documents must include:

- Tenant ID.
- Object type.
- Object ID.
- Title.
- Summary.
- Tags.
- Visibility.
- Permission hints.
- Locale.
- Updated timestamp.

Final authorization must still be enforced by the API before returning sensitive results.

## 25. Analytics Architecture

Analytics should use event-fed projections rather than expensive live joins for every dashboard.

Pattern:

1. Domain events are emitted.
2. Analytics consumers update projection tables.
3. Dashboards query projections.
4. Reports use paginated reads and export jobs.
5. Sensitive exports are audited.

Rationale: large tenants need fast dashboards without overloading transactional tables.

## 26. Observability Architecture

Required observability:

- Structured logs.
- Correlation IDs.
- Request IDs.
- Tenant IDs in internal telemetry where safe.
- Metrics for API latency, errors, queue depth, job failures, database latency, cache hit rate, AI usage, storage usage, and webhook failures.
- Distributed tracing for API-to-worker and API-to-provider flows.
- Alerts for failed jobs, high error rates, suspicious auth activity, slow queries, queue backlog, and provider failures.

Sensitive data must not be written to logs.

## 27. Testing Architecture

| Test Type | Scope |
| --- | --- |
| Unit Tests | Domain entities, value objects, services, use cases. |
| Integration Tests | Repositories, database, queues, provider adapters, API modules. |
| Contract Tests | API DTOs, webhook payloads, provider ports. |
| E2E Tests | Learner, instructor, admin, employer, credential workflows. |
| Tenant Isolation Tests | Cross-tenant denial for API, cache, search, files, AI. |
| Security Tests | Auth, authorization, rate limits, validation, file handling. |
| Accessibility Tests | Core web flows and design system components. |
| Performance Tests | Common reads, enrollments, assessment submission, verification, dashboards. |
| AI Evaluation Tests | Grounding, refusal, citation, source isolation, policy compliance. |

## 28. CI/CD Architecture

CI should enforce:

- Type checking.
- Linting.
- Formatting.
- Unit tests.
- Integration tests where infrastructure is available.
- Prisma schema validation.
- Migration checks.
- Dependency vulnerability scanning.
- Secret scanning.
- Build verification.
- Accessibility checks for critical UI where feasible.

CD should support:

- Environment-specific configuration.
- Database migration approval.
- Zero-downtime deployment strategy where possible.
- Rollback plan.
- Worker deployment coordination.
- Feature flags for risky releases.

## 29. Scalability Strategy

| Concern | Strategy |
| --- | --- |
| Web traffic | CDN, edge caching, horizontal app scaling. |
| API load | Stateless containers, horizontal scaling, connection pooling. |
| Database load | Indexing, query review, read projections, partitioning for high-volume tables, replicas where needed. |
| Background jobs | Queue separation, worker autoscaling, idempotent jobs. |
| Media delivery | Object storage and CDN. |
| Search | Dedicated search engine when PostgreSQL FTS is insufficient. |
| Analytics | Event-fed projections and export jobs. |
| AI | Tenant rate limits, caching where safe, queue-based ingestion, provider abstraction. |
| Credential verification | Optimized read model, public rate limits, CDN for non-sensitive static assets. |

## 30. Reliability Strategy

- Health checks for web, API, workers, database, Redis, object storage, AI provider, and vector store.
- Graceful shutdown for API and worker processes.
- Idempotent background jobs.
- Dead-letter queues for failed jobs.
- Retry policies with backoff.
- Circuit breakers for external providers.
- Backup and restore procedures.
- Disaster recovery targets defined per deployment tier.
- Incident runbooks before production launch.

## 31. Migration and Evolution Strategy

The platform should evolve in stages:

1. Document architecture, database, APIs, and design system.
2. Establish monorepo and foundational infrastructure.
3. Build authentication, tenancy, RBAC, and audit foundation.
4. Build learning core.
5. Build assessment and credentialing.
6. Build AI and knowledge.
7. Build analytics, employer, career, mobile, and enterprise integrations.

Module extraction candidates when justified:

- AI and knowledge service.
- Notification service.
- Analytics service.
- Search service.
- Credential verification service.
- Media processing service.

Extraction criteria:

- Independent scaling need.
- Separate team ownership.
- Compliance isolation.
- Distinct deployment lifecycle.
- Clear API and event boundaries already exist.

## 32. Architecture Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Modular monolith becomes tangled | Enforce bounded-context imports, repository ports, module tests, ADRs, and architecture linting. |
| Tenant leakage | Defense-in-depth tenant checks, isolation tests, tenant-prefixed cache/search/storage, optional RLS. |
| Slow dashboards | Use event-fed projections and dedicated reporting jobs. |
| AI hallucination | RAG guardrails, approved sources, refusals, source references, evaluation tests. |
| Provider lock-in | Ports for storage, email, SMS, AI, vector DB, and search. |
| Queue failures | Idempotent jobs, retries, dead-letter queues, monitoring. |
| Credential fraud | Immutable issuance records, QR verification, revocation, audit trail. |
| Migration complexity | Reviewed migrations, staging environments, backup and rollback plans. |
| Frontend drift | Design system, typed API clients, feature folders, accessibility tests. |

## 33. Architecture Decision Records Required

The following ADRs should be created as implementation begins:

- ADR-001: Monorepo strategy.
- ADR-002: Modular monolith first.
- ADR-003: Tenant isolation model.
- ADR-004: Authentication and token strategy.
- ADR-005: RBAC and permission model.
- ADR-006: PostgreSQL and Prisma usage.
- ADR-007: Outbox and event processing.
- ADR-008: REST-first API strategy.
- ADR-009: AI RAG architecture and guardrails.
- ADR-010: Object storage abstraction.
- ADR-011: Search engine strategy.
- ADR-012: Analytics projection strategy.
- ADR-013: Mobile offline sync strategy.
- ADR-014: Credential verification and revocation model.

## 34. Implementation Readiness Checklist

Before writing production code for a feature, engineering must confirm:

- The relevant bounded context is identified.
- Domain entities, aggregates, and invariants are documented.
- API contract is defined.
- Authorization rules are defined.
- Tenant isolation behavior is defined.
- Audit events are defined.
- Tests are planned.
- Data model impact is reviewed.
- Failure and retry behavior is reviewed.
- Accessibility requirements are understood for user-facing UI.
- The relevant local Next.js documentation is read before frontend implementation.

## 35. Open Architecture Questions

- Should the first production backend be introduced in the same repository as a monorepo immediately, or should the current Next.js app remain separate until foundation work begins?
- Which vector database should be selected first: PostgreSQL with pgvector, managed vector database, or a search engine with vector support?
- Should PostgreSQL Row Level Security be mandatory for all deployments or enabled for high-security deployments only?
- Should the first release use NextAuth temporarily or replace authentication with the NestJS identity service immediately?
- Which observability stack should be preferred for the first deployment?
- Should employer accounts be global across tenants or tenant-scoped?
- Which webhook events are mandatory for first enterprise integrations?
- What are the first deployment targets: Vercel plus Railway, AWS ECS, Kubernetes, or another environment?

## 36. Approval Criteria

This Software Architecture is approved when stakeholders agree that:

- The modular monolith first approach is acceptable.
- The bounded contexts are correct.
- The event, CQRS, tenant isolation, security, AI, and deployment strategies are acceptable.
- The architecture supports the PRD and Information Architecture.
- Open architecture questions are answered or intentionally deferred.

## 37. Next Artifact

After Software Architecture approval, the next artifact is the Database Design. It will define the ER model, Prisma schema direction, tenant isolation structures, indexes, constraints, migration strategy, seed data, audit tables, and soft delete strategy.
