# API Specification

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | API Specification |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/01-product-requirements-document.md, docs/02-information-architecture.md, docs/03-software-architecture.md, docs/04-database-design.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the first enterprise API specification for Disyn. It covers REST conventions, versioning, authentication, authorization, tenant context, error contracts, pagination, idempotency, endpoint groups, webhook events, and optional GraphQL boundaries.

The API is the primary contract between web, mobile, workers, integrations, and future services.

## 2. API Principles

| Principle | Requirement | Rationale |
| --- | --- | --- |
| API first | Public and internal product behavior is defined through stable API contracts. | Web, mobile, integrations, and workers need predictable contracts. |
| Tenant-aware | Every tenant-scoped request resolves and enforces tenant context. | Tenant leakage is catastrophic. |
| Permission-aware | APIs enforce RBAC and resource checks server-side. | Frontend checks improve UX but are never trusted. |
| Versioned | Breaking changes require explicit versioning. | Enterprise integrations need stability. |
| Observable | Requests use request IDs, audit events, and structured errors. | Production support and compliance need traceability. |
| Idempotent where needed | Retryable commands accept idempotency keys. | Mobile, jobs, webhooks, and payments-ready flows need safe retries. |
| Consistent | Responses, errors, pagination, filtering, and timestamps follow one standard. | Consistency lowers development and integration cost. |

## 3. Base URLs and Versioning

| Environment | Pattern |
| --- | --- |
| Local API | `http://localhost:4000/api/v1` |
| Staging API | `https://api.staging.disyn.example/api/v1` |
| Production API | `https://api.disyn.example/api/v1` |
| Tenant Domain API | `https://{tenant-domain}/api/v1` where deployment supports same-domain API routing |

Versioning rules:

- Current major version: `v1`.
- Breaking changes require `v2`.
- Additive fields are allowed in the same version.
- Deprecated fields must remain for a documented deprecation window.
- Webhook payloads are versioned separately through event schema versions.

## 4. Authentication

### 4.1 Token Model

- Access tokens are short-lived JWTs.
- Refresh tokens are rotating and revocable.
- Refresh token reuse is treated as a security event.
- OAuth providers are supported through backend-controlled flows.
- MFA is optional at foundation but schema and API are MFA-ready.

### 4.2 Required Headers

| Header | Required | Purpose |
| --- | --- | --- |
| `Authorization: Bearer <token>` | Authenticated APIs | Access token. |
| `X-Tenant-Id` | Tenant-scoped APIs unless tenant is resolved by domain | Active tenant context. |
| `X-Request-Id` | Recommended | Client-provided correlation ID. |
| `Idempotency-Key` | Required for retryable commands | Safe retries. |
| `If-Match` | Required for selected updates | Optimistic concurrency using resource version or ETag. |
| `Accept-Language` | Optional | Locale preference. |

### 4.3 Tenant Resolution Order

1. Verified tenant domain.
2. Explicit `X-Tenant-Id`.
3. Tenant slug in route where used.
4. User default tenant where safe.

APIs must reject ambiguous tenant context.

## 5. Authorization

Authorization uses RBAC plus resource-level checks.

Required authorization inputs:

- User ID.
- Tenant ID.
- Membership status.
- Roles.
- Permissions.
- Resource ownership or assignment.
- Training center, cohort, department, or team scope where applicable.

Permission format:

```text
{domain}.{resource}.{action}
```

Examples:

- `users.memberships.read`
- `courses.courses.create`
- `assessments.submissions.grade`
- `credentials.issued.revoke`
- `ai.tutor.use`
- `platform.tenants.suspend`

## 6. Response Standards

### 6.1 Success Envelope

Single-resource responses:

```json
{
  "data": {
    "id": "uuid",
    "type": "course"
  },
  "meta": {
    "requestId": "req_123"
  }
}
```

Collection responses:

```json
{
  "data": [],
  "pagination": {
    "limit": 25,
    "cursor": "opaque_cursor",
    "nextCursor": "opaque_cursor",
    "hasNextPage": true
  },
  "meta": {
    "requestId": "req_123"
  }
}
```

### 6.2 Error Envelope

```json
{
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "Course was not found.",
    "details": [],
    "requestId": "req_123"
  }
}
```

### 6.3 HTTP Status Codes

| Status | Meaning |
| --- | --- |
| `200` | Successful read or update. |
| `201` | Resource created. |
| `202` | Accepted for asynchronous processing. |
| `204` | Successful no-content response. |
| `400` | Invalid request. |
| `401` | Authentication required or invalid. |
| `403` | Authenticated but not allowed. |
| `404` | Resource not found or intentionally hidden. |
| `409` | Conflict or duplicate state. |
| `412` | Optimistic concurrency failure. |
| `422` | Valid JSON but failed domain validation. |
| `429` | Rate limit exceeded. |
| `500` | Internal server error. |
| `503` | Temporary dependency or service unavailable. |

## 7. Pagination, Filtering, Sorting

Collection parameters:

| Parameter | Example | Notes |
| --- | --- | --- |
| `limit` | `25` | Default 25, max 100 unless endpoint allows more. |
| `cursor` | `opaque` | Cursor pagination by default. |
| `q` | `welding` | Search query. |
| `sort` | `createdAt:desc` | Whitelisted fields only. |
| `filter[status]` | `PUBLISHED` | Whitelisted filters only. |
| `filter[createdFrom]` | `2026-01-01T00:00:00Z` | ISO 8601. |

Offset pagination is allowed only for small admin reference tables.

## 8. Idempotency

Commands requiring `Idempotency-Key`:

- User invitation.
- Bulk import.
- Enrollment creation.
- Assessment submission.
- Credential issuance.
- Credential revocation.
- File upload intent creation.
- AI ingestion job creation.
- Webhook event ingestion.
- Report export creation.

Idempotency records are tenant-scoped and expire by endpoint policy.

## 9. API Resource Groups

### 9.1 Authentication

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/auth/login` | Email/password login. |
| `POST` | `/auth/refresh` | Rotate refresh token. |
| `POST` | `/auth/logout` | Revoke current session. |
| `POST` | `/auth/logout-all` | Revoke all sessions for current user. |
| `POST` | `/auth/password/request-reset` | Request reset. |
| `POST` | `/auth/password/reset` | Complete reset. |
| `GET` | `/auth/oauth/{provider}/start` | Start OAuth flow. |
| `GET` | `/auth/oauth/{provider}/callback` | OAuth callback. |
| `POST` | `/auth/mfa/setup` | Begin MFA setup. |
| `POST` | `/auth/mfa/verify` | Verify MFA challenge. |
| `GET` | `/auth/me` | Current user, memberships, permissions. |

### 9.2 Tenants and Organizations

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/tenants/current` | Active tenant context. |
| `GET` | `/organizations/current` | Current organization profile. |
| `PATCH` | `/organizations/current` | Update organization profile. |
| `GET` | `/organization/branding` | Read branding. |
| `PATCH` | `/organization/branding` | Update branding. |
| `GET` | `/organization/training-centers` | List centers. |
| `POST` | `/organization/training-centers` | Create center. |
| `PATCH` | `/organization/training-centers/{id}` | Update center. |
| `DELETE` | `/organization/training-centers/{id}` | Archive center. |
| `GET` | `/organization/settings` | Read tenant settings. |
| `PATCH` | `/organization/settings` | Update settings. |

### 9.3 Users, Roles, Permissions

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/users` | List tenant users. |
| `POST` | `/users/invitations` | Invite user. |
| `POST` | `/users/imports` | Start bulk import. |
| `GET` | `/users/{id}` | User detail within tenant scope. |
| `PATCH` | `/users/{id}` | Update tenant-scoped profile fields. |
| `POST` | `/users/{id}/suspend` | Suspend membership. |
| `POST` | `/users/{id}/reactivate` | Reactivate membership. |
| `GET` | `/roles` | List tenant roles. |
| `POST` | `/roles` | Create role. |
| `PATCH` | `/roles/{id}` | Update role. |
| `PUT` | `/roles/{id}/permissions` | Replace role permissions. |
| `PUT` | `/users/{id}/roles` | Replace user roles. |
| `GET` | `/permissions` | List permission catalogue. |

### 9.4 Programs, Courses, Lessons

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/programs` | List programs. |
| `POST` | `/programs` | Create program. |
| `GET` | `/programs/{id}` | Program detail. |
| `PATCH` | `/programs/{id}` | Update program. |
| `POST` | `/programs/{id}/publish` | Publish program version. |
| `GET` | `/courses` | List courses. |
| `POST` | `/courses` | Create course. |
| `GET` | `/courses/{id}` | Course detail. |
| `PATCH` | `/courses/{id}` | Update course metadata. |
| `GET` | `/courses/{id}/outline` | Course module/lesson outline. |
| `POST` | `/courses/{id}/modules` | Create module. |
| `PATCH` | `/courses/{id}/modules/{moduleId}` | Update module. |
| `POST` | `/modules/{moduleId}/lessons` | Create lesson. |
| `GET` | `/lessons/{id}` | Lesson detail. |
| `PATCH` | `/lessons/{id}` | Update lesson. |
| `POST` | `/courses/{id}/publish` | Publish course version. |

### 9.5 Learner Delivery

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/learner/dashboard` | Learner dashboard. |
| `GET` | `/learner/enrollments` | Current enrollments. |
| `GET` | `/learner/enrollments/{id}` | Enrollment detail. |
| `POST` | `/learner/enrollments` | Self-enroll where allowed. |
| `POST` | `/learner/progress/lessons/{lessonId}` | Update lesson progress. |
| `GET` | `/learner/assignments` | Learner assignment list. |
| `GET` | `/learner/practicals` | Learner practical list. |
| `GET` | `/learner/exams` | Learner exam list. |
| `GET` | `/learner/notes` | Notes and bookmarks. |
| `POST` | `/learner/notes` | Create note. |
| `GET` | `/learner/wallet` | Certificates and badges. |

### 9.6 Curriculum and Competencies

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/curriculum/frameworks` | List frameworks. |
| `POST` | `/curriculum/frameworks` | Create framework. |
| `GET` | `/curriculum/competencies` | List competencies. |
| `POST` | `/curriculum/competencies` | Create competency. |
| `PATCH` | `/curriculum/competencies/{id}` | Update competency. |
| `POST` | `/programs/{id}/competencies` | Map competency to program. |
| `POST` | `/courses/{id}/outcomes` | Map outcome to course. |

### 9.7 Assessments

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/question-banks` | List question banks. |
| `POST` | `/question-banks` | Create question bank. |
| `GET` | `/questions` | List questions. |
| `POST` | `/questions` | Create question. |
| `PATCH` | `/questions/{id}` | Update question. |
| `GET` | `/rubrics` | List rubrics. |
| `POST` | `/rubrics` | Create rubric. |
| `GET` | `/assessments` | List assessments. |
| `POST` | `/assessments` | Create assessment. |
| `PATCH` | `/assessments/{id}` | Update assessment. |
| `POST` | `/assessments/{id}/publish` | Publish assessment. |
| `POST` | `/assessments/{id}/attempts` | Start attempt. |
| `POST` | `/assessment-attempts/{id}/submissions` | Submit answer or evidence. |
| `POST` | `/assessment-attempts/{id}/submit-final` | Finalize attempt. |
| `GET` | `/instructor/assessment-queue` | Grading queue. |
| `POST` | `/assessment-attempts/{id}/grade` | Grade attempt. |
| `POST` | `/assessment-attempts/{id}/release-feedback` | Release feedback. |

### 9.8 Credentials

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/credential-templates` | List templates. |
| `POST` | `/credential-templates` | Create template. |
| `PATCH` | `/credential-templates/{id}` | Update template. |
| `GET` | `/credential-rules` | List eligibility rules. |
| `POST` | `/credential-rules` | Create eligibility rule. |
| `GET` | `/credentials/eligibility` | Eligibility queue. |
| `POST` | `/credentials/issue` | Issue credential. |
| `GET` | `/credentials` | List issued credentials. |
| `GET` | `/credentials/{id}` | Credential detail. |
| `POST` | `/credentials/{id}/revoke` | Revoke credential. |
| `POST` | `/credentials/{id}/restore` | Restore only where policy allows. |
| `GET` | `/verify/{credentialNumber}` | Public verification. |
| `GET` | `/transcripts/{id}` | Transcript detail where authorized. |

### 9.9 Media and Files

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/media` | List media files. |
| `POST` | `/media/upload-intents` | Create signed upload intent. |
| `POST` | `/media/{id}/complete-upload` | Confirm upload complete. |
| `GET` | `/media/{id}` | File metadata. |
| `GET` | `/media/{id}/download` | Signed download URL or stream. |
| `PATCH` | `/media/{id}` | Update metadata. |
| `DELETE` | `/media/{id}` | Archive file. |

### 9.10 AI and Knowledge

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/ai/settings` | Tenant AI settings. |
| `PATCH` | `/ai/settings` | Update AI policy. |
| `GET` | `/knowledge/sources` | List sources. |
| `POST` | `/knowledge/sources` | Register source. |
| `POST` | `/knowledge/sources/{id}/approve` | Approve source. |
| `POST` | `/knowledge/sources/{id}/ingest` | Start ingestion. |
| `GET` | `/knowledge/ingestion-jobs/{id}` | Ingestion status. |
| `POST` | `/ai/tutor/messages` | Ask AI tutor. |
| `POST` | `/ai/summaries` | Generate summary. |
| `POST` | `/ai/flashcards` | Generate flashcards. |
| `POST` | `/ai/quizzes` | Generate quiz draft. |
| `GET` | `/ai/interactions` | User or admin interaction history by permission. |

### 9.11 CMS

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/cms/pages` | List pages. |
| `POST` | `/cms/pages` | Create page. |
| `PATCH` | `/cms/pages/{id}` | Update page. |
| `POST` | `/cms/pages/{id}/submit-review` | Submit for review. |
| `POST` | `/cms/pages/{id}/publish` | Publish page. |
| `GET` | `/cms/navigation` | Get navigation. |
| `PUT` | `/cms/navigation/{menuKey}` | Replace menu. |
| `GET` | `/cms/announcements` | List announcements. |
| `POST` | `/cms/announcements` | Create announcement. |
| `GET` | `/cms/policies` | List policies. |
| `POST` | `/cms/policies` | Create policy. |

### 9.12 Notifications, Messages, Discussions

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/notifications` | List current user's notifications. |
| `POST` | `/notifications/{id}/read` | Mark read. |
| `GET` | `/messages/threads` | List threads. |
| `POST` | `/messages/threads` | Create thread. |
| `GET` | `/messages/threads/{id}` | Thread detail. |
| `POST` | `/messages/threads/{id}/messages` | Send message. |
| `GET` | `/discussions/forums` | List forums. |
| `POST` | `/discussions/topics` | Create topic. |
| `POST` | `/discussions/topics/{id}/posts` | Add post. |

### 9.13 Analytics and Reporting

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/analytics/learner-progress` | Learner progress report. |
| `GET` | `/analytics/course-performance` | Course analytics. |
| `GET` | `/analytics/competencies` | Competency mastery analytics. |
| `GET` | `/analytics/credentials` | Credential analytics. |
| `GET` | `/reports` | Saved report definitions. |
| `POST` | `/reports` | Create report definition. |
| `POST` | `/reports/{id}/exports` | Start export job. |
| `GET` | `/report-exports/{id}` | Export status and file. |

### 9.14 Employer and Career

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/employer/profile` | Employer profile. |
| `PATCH` | `/employer/profile` | Update employer profile. |
| `GET` | `/employer/shared-profiles` | Learner-shared profiles. |
| `GET` | `/career/profile` | Learner career profile. |
| `PATCH` | `/career/profile` | Update career profile. |
| `GET` | `/jobs` | List jobs. |
| `POST` | `/jobs` | Create job post. |
| `POST` | `/jobs/{id}/applications` | Apply to job. |

### 9.15 Super Admin

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/platform/tenants` | List tenants. |
| `POST` | `/platform/tenants` | Create tenant. |
| `GET` | `/platform/tenants/{id}` | Tenant detail. |
| `POST` | `/platform/tenants/{id}/suspend` | Suspend tenant. |
| `POST` | `/platform/tenants/{id}/reactivate` | Reactivate tenant. |
| `GET` | `/platform/feature-flags` | List flags. |
| `PUT` | `/platform/tenants/{id}/feature-flags` | Update tenant flags. |
| `GET` | `/platform/operations/queues` | Queue health. |
| `GET` | `/platform/security/events` | Security event review. |

### 9.16 Integrations and Webhooks

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/integrations/api-clients` | List API clients. |
| `POST` | `/integrations/api-clients` | Create API client. |
| `POST` | `/integrations/api-clients/{id}/rotate` | Rotate key. |
| `GET` | `/integrations/webhooks` | List subscriptions. |
| `POST` | `/integrations/webhooks` | Create subscription. |
| `PATCH` | `/integrations/webhooks/{id}` | Update subscription. |
| `POST` | `/integrations/webhooks/{id}/test` | Send test event. |
| `GET` | `/integrations/webhook-deliveries` | Delivery logs. |

## 10. Webhook Events

Webhook payload envelope:

```json
{
  "id": "evt_uuid",
  "type": "credential.issued",
  "schemaVersion": "1.0",
  "tenantId": "uuid",
  "occurredAt": "2026-07-01T12:00:00Z",
  "data": {}
}
```

Required event families:

| Event | Purpose |
| --- | --- |
| `user.invited` | User invitation created. |
| `user.suspended` | Membership suspended. |
| `learner.enrolled` | Learner enrolled. |
| `course.completed` | Course completed. |
| `assessment.submitted` | Assessment submitted. |
| `assessment.graded` | Assessment graded. |
| `credential.issued` | Credential issued. |
| `credential.revoked` | Credential revoked. |
| `credential.verified` | Credential verified. |
| `certificate.shared` | Learner shared credential. |
| `job.application_submitted` | Learner applied to job. |

Webhook security:

- HMAC signatures required.
- Delivery retries with backoff.
- Event IDs are idempotency keys for receivers.
- Payloads contain identifiers and safe summary data, not full sensitive records.

## 11. Optional GraphQL Boundary

GraphQL may be introduced later for read aggregation only:

- Admin dashboards.
- Learner dashboard feed.
- Course outline read.
- Analytics read models.

GraphQL commands are not part of the first architecture. REST remains the command boundary.

## 12. Rate Limiting

| API Area | Default Direction |
| --- | --- |
| Login and password reset | Strict IP and account limits. |
| Token refresh | User/session scoped limits. |
| Public verification | IP, certificate number, and tenant scoped limits. |
| AI tutor | Tenant, user, course, and cost scoped limits. |
| Search | User and tenant scoped limits. |
| File uploads | User, tenant, size, and storage quota limits. |
| Webhooks | API client scoped limits. |

## 13. Documentation Requirements

- OpenAPI specification generated from source.
- API examples for every public endpoint.
- Error catalogue.
- Permission matrix.
- Webhook schema documentation.
- Changelog per API version.
- Integration guide for enterprise customers.

## 14. Approval Criteria

This API Specification is approved when stakeholders agree that:

- REST-first boundaries are acceptable.
- Tenant, auth, permission, error, pagination, and idempotency standards are sufficient.
- Endpoint groups cover the product modules.
- Webhook events cover first enterprise integration needs.
- GraphQL is optional and limited to justified read cases.

## 15. Next Artifact

The next artifact is the UI Component Inventory.
