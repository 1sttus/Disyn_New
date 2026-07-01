# Development Roadmap

## Vision
Disyn will evolve from a portfolio/admin starter into a multi-tenant vocational learning ecosystem with secure tenant management, dynamic curriculum authoring, assessments, credentialing, analytics, and AI-assisted tutoring.

## Architecture Direction
The initial implementation uses a modular monolith in Next.js and Prisma. This keeps the first release secure, testable, and maintainable while leaving room to introduce NestJS services, queue workers, and dedicated AI services later.

## Delivery Phases

### Phase 1 — Platform Foundation (Completed)
Focus: create the tenant-aware foundation and admin workspace.

- Establish organizations, programs, courses, modules, and lessons in Prisma.
- Expose admin APIs for organizations and programs.
- Add a learning-ecosystem management area to the admin dashboard.
- Verify build health and production compilation.

### Phase 2 — Learning Content Management
Focus: allow organizations to author curricula through the admin console.

- Course and module management screens.
- Lesson content editing and publishing workflow.
- Media upload and storage abstraction.
- Draft/publish lifecycle with audit metadata.

### Phase 3 — Assessment and Credentials
Focus: deliver competency-based assessment and credential issuance.

- Question bank and quiz engine.
- Practical submission workflows.
- Certificate issuance, QR verification, and revocation.

### Phase 4 — Learner Experience
Focus: create a learner-facing experience.

- Student dashboard.
- Program enrollment and progress tracking.
- AI tutor with RAG policy controls.
- Notifications and discussion experience.

### Phase 5 — Enterprise Hardening
Focus: scale, security, and operations.

- RBAC and tenant isolation enforcement.
- Audit trails and logging.
- Background workers for notifications and certificate generation.
- CI/CD, observability, and deployment automation.

## Epics

### Epic 1 — Multi-Tenant Core
- Feature: Organization management
- Feature: Program and curriculum modeling
- Feature: Role-based access foundation

### Epic 2 — Content Authoring
- Feature: Course authoring
- Feature: Module and lesson management
- Feature: Media library

### Epic 3 — Assessment and Certification
- Feature: Question bank
- Feature: Exam engine
- Feature: Certificate engine

### Epic 4 — Learner and Instructor Experience
- Feature: Learner dashboard
- Feature: Instructor dashboard
- Feature: Notifications

### Epic 5 — AI and Analytics
- Feature: AI tutor with approved-content retrieval
- Feature: Reporting and dashboards
- Feature: Search and knowledge base

## Feature Breakdown with User Stories and Estimates

### Epic 1 — Multi-Tenant Core

#### Feature 1.1 — Organization Management
User stories:
- As a super admin, I want to create organizations so each tenant has its own workspace.
- As an organization admin, I want to update branding and settings so the portal reflects the institution.

Engineering tasks:
- Add organization settings form and server actions — 4 days
- Add tenant-aware listing and detail views — 3 days
- Add soft-delete and audit metadata support — 2 days

#### Feature 1.2 — Program and Curriculum Modeling
User stories:
- As an organization admin, I want to define programs so learners can enroll in structured pathways.
- As an organization admin, I want to attach courses to programs so content is organized by qualification.

Engineering tasks:
- Add program CRUD endpoints and UI — 3 days
- Add course CRUD endpoints and UI — 4 days
- Add module and lesson schema support — 3 days

### Epic 2 — Content Authoring

#### Feature 2.1 — Course Authoring
User stories:
- As an organization admin, I want to create courses without editing code.
- As an instructor, I want to publish and unpublish course content safely.

Engineering tasks:
- Create course editor interface — 5 days
- Add draft/publish workflow — 2 days
- Add content validation rules — 2 days

### Epic 3 — Assessment and Certification

#### Feature 3.1 — Question Bank
User stories:
- As an instructor, I want to create reusable questions so assessments can be built quickly.
- As an assessor, I want to organize questions by competency and difficulty.

Engineering tasks:
- Add question model and CRUD API — 4 days
- Add question bank UI — 4 days
- Add import/export for question sets — 3 days

#### Feature 3.2 — Certificate Engine
User stories:
- As an organization admin, I want to issue certificates automatically after program completion.
- As a learner, I want to verify certificates through a public QR flow.

Engineering tasks:
- Add certificate issuance workflow — 5 days
- Add QR code generation and verification endpoint — 3 days
- Add revocation and audit history — 3 days

### Epic 4 — Learner and Instructor Experience

#### Feature 4.1 — Learner Dashboard
User stories:
- As a learner, I want to see enrolled programs and progress.
- As a learner, I want to continue learning from one place.

Engineering tasks:
- Add dashboard shell and layout — 3 days
- Integrate enrollment and progress data — 4 days
- Add progress visualization — 3 days

### Epic 5 — AI and Analytics

#### Feature 5.1 — AI Tutor
User stories:
- As a learner, I want an AI tutor that explains lessons using approved content.
- As an organization admin, I want safe AI behavior with tenant-scoped policies.

Engineering tasks:
- Add approved-content retrieval service — 6 days
- Add chat API and tenant policy enforcement — 5 days
- Add logging and source attribution — 3 days

## Recommended Next Step
Implement Feature 1.2, program and curriculum modeling, as the next increment after the tenant foundation.
