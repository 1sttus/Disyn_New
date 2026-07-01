# Information Architecture

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | Information Architecture |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/01-product-requirements-document.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the information architecture for the Disyn Vocational Learning Ecosystem. It describes how product areas, navigation, content types, user journeys, dashboards, administrative surfaces, and role-based workspaces are organized.

The goal is to make a large multi-tenant vocational learning platform understandable, scalable, accessible, and maintainable before software architecture and implementation begin.

## 2. IA Principles

| Principle | Application | Rationale |
| --- | --- | --- |
| Role-first navigation | Each user lands in a workspace shaped around their responsibilities. | Learners, instructors, employers, and administrators perform different jobs and should not navigate through irrelevant product areas. |
| Tenant context is always visible | The active organization, role, and workspace are visible in authenticated areas. | Multi-tenant platforms must prevent user confusion and accidental cross-organization action. |
| Competency hierarchy is explicit | Programs, courses, assessments, credentials, and analytics expose their competency relationships. | Vocational education depends on evidence of competence, not only content consumption. |
| CMS-managed content is separated from learning records | Public pages, policies, articles, and course content have content lifecycle states, while enrollments and credentials are official records. | This keeps editorial workflows distinct from transactional education records. |
| Progressive disclosure | Common tasks are prominent; advanced configuration appears where needed. | Enterprise software must remain usable while supporting complex institutions. |
| Audit-sensitive actions are grouped and confirmable | Credential issuance, revocation, role changes, assessment decisions, and tenant settings changes are visibly controlled. | These actions carry legal, academic, and operational consequences. |
| Search is contextual | Global search exists, but each workspace also has scoped search. | Large institutions need quick retrieval without leaking unrelated or unauthorized information. |
| Mobile-first learning, desktop-first administration | Learner flows work well on mobile; complex authoring and administration are optimized for desktop while still responsive. | Learners often use phones; administrators need dense management surfaces. |

## 3. Product Shells

Disyn contains several distinct product shells. A shell is a major environment with its own navigation model, permissions, and information density.

| Shell | Primary Users | Purpose |
| --- | --- | --- |
| Public Tenant Site | Prospective learners, employers, public visitors | Discover programs, read pages, verify credentials, access login and support. |
| Authentication Shell | All users | Login, signup, password reset, MFA, invitation acceptance, account recovery. |
| Learner Workspace | Learners | Learn, submit work, track progress, use AI tutor, manage credentials. |
| Instructor Workspace | Instructors, assessors | Teach, assess, moderate, communicate, monitor learners. |
| Organization Admin Workspace | Organization admins, content authors, training center managers | Configure organization, content, users, courses, assessments, reports, credentials. |
| Super Admin Workspace | Platform operators | Manage tenants, platform settings, plans, limits, feature flags, support, and operations. |
| Employer Portal | Employers, credential verifiers | Verify credentials, review shared profiles, manage job posts when enabled. |
| Career Portal | Learners, alumni, employers | Skills profile, job discovery, credential sharing, employability workflows. |
| Mobile App | Learners, instructors where enabled | Offline learning, notes, bookmarks, push notifications, AI chat, wallet. |
| Developer and API Portal | Integration developers, platform operators | API documentation, webhooks, API keys, integration logs. |

## 4. Core Domain Information Model

The platform information model is organized around tenants, people, learning structures, evidence, and credentials.

### 4.1 Tenant and Organization Model

| Concept | Description | Owned By |
| --- | --- | --- |
| Tenant | A logical customer boundary. Usually one organization or institutional network. | Platform |
| Organization | The branded institution using the platform. For most deployments, tenant and organization are one-to-one. | Tenant |
| Training Center | A physical, virtual, or regional delivery unit. | Organization |
| Department | Academic, vocational, or operational unit. | Organization |
| Cohort | A group of learners assigned to a program or course over a period. | Organization |
| Team | Operational grouping for staff permissions and workflows. | Organization |
| Domain | Branded web domain or subdomain. | Organization |
| Tenant Setting | Configurable policy, branding, feature, localization, security, or AI option. | Organization |

### 4.2 People Model

| Concept | Description |
| --- | --- |
| User | A global identity record. |
| Membership | A user's relationship with a tenant or organization. |
| Role | A named set of permissions within a tenant. |
| Permission | A specific allowed action. |
| Profile | Personal and professional information, scoped by privacy and tenant policy. |
| Learner Record | Enrollment, progress, assessment, credential, and transcript data for a learner. |
| Staff Record | Instructor, assessor, author, administrator, or auditor metadata. |
| Employer Account | Employer organization or verifier identity. |

### 4.3 Learning Hierarchy

Disyn uses a dynamic hierarchy. No courses or structures are hardcoded.

| Level | Purpose | Contains |
| --- | --- | --- |
| Program | A complete vocational pathway or qualification. | Courses, outcomes, competencies, credential rules. |
| Course | A structured learning unit within a program. | Modules, assessments, completion rules. |
| Module | A major course section. | Lessons, topics, activities, quizzes. |
| Lesson | A teachable learning unit. | Topics, media, documents, activities, AI source material. |
| Topic | A focused content section inside a lesson. | Text, media, references, checks. |
| Activity | A learning action. | Reading, video, interactive task, discussion, reflection, external activity. |
| Quiz | Formative or summative knowledge check. | Questions, attempts, feedback. |
| Assignment | Submitted work for review. | Instructions, files, rubric, feedback. |
| Practical | Competency evidence task. | Evidence, observations, rubric, assessor decisions. |
| Final Exam | High-stakes assessment. | Timed attempts, pools, grading, accommodations. |
| Certificate | Credential issued after rules are met. | Template, credential number, QR verification, revocation state. |

### 4.4 Competency Model

| Concept | Description |
| --- | --- |
| Qualification Framework | A recognized internal, national, sectoral, or international framework. |
| Qualification Level | Level within a framework, such as diploma, advanced diploma, or competency tier. |
| Competency | A demonstrable skill or capability. |
| Learning Outcome | A measurable outcome taught or assessed. |
| Assessment Criterion | A standard used to evaluate evidence. |
| Evidence | Files, media, observations, scores, feedback, and artifacts proving competence. |
| Mastery State | Not started, developing, competent, advanced, expired, or revoked where applicable. |

### 4.5 Credential Model

| Concept | Description |
| --- | --- |
| Credential Type | Completion certificate, competence certificate, diploma, micro-credential, badge. |
| Credential Template | Tenant-branded layout and metadata configuration. |
| Issued Credential | Official awarded record. |
| Certificate Number | Globally unique credential identifier. |
| QR Verification Record | Public or controlled verification endpoint. |
| Revocation Record | Reason, actor, date, and status history for invalidated credentials. |
| Transcript | Consolidated record of learning, competencies, assessments, and credentials. |
| Wallet Item | Learner-owned credential reference for storage and sharing. |

### 4.6 Content Model

| Content Type | Examples | Lifecycle |
| --- | --- | --- |
| Learning Content | Lessons, topics, activities, PDFs, videos, diagrams. | Draft, review, published, archived, versioned. |
| Assessment Content | Questions, rubrics, instructions, exams. | Draft, review, approved, published, retired, versioned. |
| CMS Content | Homepage, footer, pages, FAQs, blogs, news, policies. | Draft, review, scheduled, published, archived. |
| Knowledge Content | Help articles, AI source documents, internal guides. | Draft, approved, indexed, published, deprecated. |
| Media | Images, videos, documents, audio, downloads. | Uploaded, processing, approved, published, archived. |
| Templates | Certificates, badges, emails, notifications. | Draft, approved, active, retired, versioned. |

## 5. Global Navigation Model

### 5.1 Navigation Layers

| Layer | Purpose |
| --- | --- |
| Tenant Selector | Switch active organization when a user belongs to multiple tenants. |
| Workspace Switcher | Move between learner, instructor, admin, employer, and super admin areas when permitted. |
| Primary Navigation | Main product areas for the active workspace. |
| Secondary Navigation | Subsections inside a product area. |
| Context Navigation | Tabs, filters, side panels, breadcrumbs, and object-level actions. |
| Utility Navigation | Search, notifications, messages, profile, help, language, theme. |

### 5.2 Global Utilities

| Utility | Available To | Notes |
| --- | --- | --- |
| Global Search | Authenticated users | Results are scoped by tenant, role, permission, and workspace. |
| Notifications | Authenticated users | Supports in-app, email, push, and SMS channels by policy. |
| Messages | Learners, instructors, staff | Tenant-scoped conversations and announcements. |
| AI Tutor | Learners and enabled staff | Available only where tenant and course policies allow. |
| Help | All users | Combines support, knowledge base, FAQs, and contact options. |
| Profile | Authenticated users | Account, sessions, security, preferences, privacy. |
| Language | All users where enabled | Tenant-supported locales. |
| Theme | Authenticated users | Light, dark, system where enabled. |

## 6. Public Tenant Site IA

The public site is tenant-branded and CMS-managed.

### 6.1 Public Site Navigation

| Area | Pages |
| --- | --- |
| Home | Tenant homepage, featured programs, announcements, calls to action. |
| Programs | Program catalog, program detail, course previews where public. |
| About | Organization profile, training centers, accreditations, partners. |
| Admissions | Requirements, application information, enrollment guidance where enabled. |
| News | News list and news detail. |
| Blog | Blog list and article detail. |
| FAQs | Public frequently asked questions. |
| Policies | Privacy, terms, learner policies, certificate policies, accessibility statement. |
| Support | Contact, help center, ticket entry where enabled. |
| Verify Certificate | QR and certificate number verification. |
| Careers | Job board and employer information where enabled. |
| Login | Tenant-aware authentication entry point. |

### 6.2 Public Site Content Types

| Content Type | Key Fields |
| --- | --- |
| Homepage Section | Title, body, media, order, visibility, CTA, audience. |
| Program Listing | Program title, summary, level, duration, mode, credential, availability. |
| Training Center | Name, location, contact, programs, status. |
| Announcement | Title, body, start date, end date, audience, priority. |
| Policy Page | Policy type, version, effective date, content, owner. |
| FAQ | Question, answer, category, order, audience. |
| Article | Title, slug, body, author, category, tags, publish date. |

### 6.3 Public Verification Flow

1. Visitor opens verification URL or scans QR code.
2. System resolves credential number and tenant.
3. Verification view displays approved fields only.
4. Visitor may request expanded transcript access if the learner shared it.
5. Suspicious or revoked credentials display status, issuer, and policy-safe reason.

## 7. Authentication IA

### 7.1 Authentication Pages

| Page | Purpose |
| --- | --- |
| Login | Tenant-aware sign in. |
| Signup | Tenant-controlled self-registration where enabled. |
| Invitation Acceptance | Join organization, set password, accept policies. |
| Password Reset | Request and complete reset. |
| MFA Setup | Configure second factor where required. |
| MFA Challenge | Complete authentication challenge. |
| OAuth Callback | Provider return flow. |
| Session Expired | Re-authentication prompt. |
| Account Recovery | Recovery workflow for locked or compromised accounts. |

### 7.2 Authentication Information Requirements

- Active tenant context.
- Login identifier.
- Authentication method.
- MFA requirement.
- Session device metadata.
- Accepted policy versions.
- Security alerts and recovery options.

## 8. Learner Workspace IA

The learner workspace prioritizes learning continuity, progress, tasks, support, and credentials.

### 8.1 Learner Primary Navigation

| Nav Item | Purpose |
| --- | --- |
| Dashboard | Current progress, next actions, deadlines, alerts. |
| My Learning | Enrolled programs and courses. |
| Calendar | Sessions, deadlines, exams, events. |
| Assignments | Pending, submitted, returned, and graded work. |
| Practicals | Practical tasks, evidence submissions, assessor feedback. |
| Exams | Scheduled, available, completed, and locked exams. |
| Discussions | Course and cohort forums. |
| AI Tutor | Course-grounded help and study support. |
| Notes | Personal notes, bookmarks, highlights. |
| Certificates | Wallet, credentials, badges, transcripts, sharing. |
| Career | Skills profile, jobs, employer sharing where enabled. |
| Messages | Conversations and announcements. |
| Help | Support, FAQs, knowledge base. |

### 8.2 Learner Dashboard Sections

| Section | Content |
| --- | --- |
| Continue Learning | Current lesson or next required task. |
| Progress Overview | Program, course, module, and competency progress. |
| Due Soon | Assignments, practicals, exams, live sessions. |
| Feedback | Recent grades, assessor comments, revision requests. |
| Weaknesses and Recommendations | AI-assisted or analytics-based study suggestions where enabled. |
| Certificates | Earned, pending, expired, revoked, or shared credentials. |
| Announcements | Tenant, program, course, and cohort announcements. |

### 8.3 Course Player IA

| Area | Purpose |
| --- | --- |
| Course Outline | Modules, lessons, topics, assessments, completion state. |
| Content Area | Lesson content, video, PDF, images, activity content. |
| Activity Panel | Checkpoints, questions, reflection, downloads, links. |
| Notes Panel | Learner notes, bookmarks, highlights. |
| AI Tutor Panel | Context-aware lesson help where enabled. |
| Discussion Panel | Lesson or course discussions where enabled. |
| Progress Footer | Previous, next, mark complete, resume, submit. |

### 8.4 Learner Object Detail Pages

| Object | Detail Information |
| --- | --- |
| Program | Overview, courses, competencies, schedule, credential, progress. |
| Course | Outline, instructor, requirements, progress, assessments, resources. |
| Lesson | Content, activities, resources, notes, AI help. |
| Quiz | Instructions, attempts, results, feedback. |
| Assignment | Instructions, rubric, submission, feedback, status. |
| Practical | Evidence requirements, rubric, submission, assessor feedback, competency result. |
| Exam | Schedule, rules, accommodations, status, results where released. |
| Certificate | Credential details, QR, sharing, status, transcript link. |

## 9. Instructor Workspace IA

The instructor workspace centers on delivery, learner monitoring, assessment, communication, and content participation.

### 9.1 Instructor Primary Navigation

| Nav Item | Purpose |
| --- | --- |
| Dashboard | Teaching tasks, learner alerts, submissions, messages. |
| My Courses | Courses assigned to the instructor. |
| Cohorts | Cohort rosters, progress, attendance where enabled. |
| Learners | Learner profiles and progress within permitted scope. |
| Assessments | Quizzes, assignments, practicals, exams, grading queues. |
| Gradebook | Scores, competency status, feedback, exports. |
| Discussions | Moderation and course discussions. |
| Content | Lessons, resources, question contributions where permitted. |
| Calendar | Teaching schedule, deadlines, exams. |
| Messages | Learner and staff communication. |
| Reports | Course and cohort analytics. |

### 9.2 Instructor Dashboard Sections

| Section | Content |
| --- | --- |
| Action Queue | Ungraded submissions, practical evidence, moderation tasks. |
| Course Health | Engagement, completion, risk indicators, upcoming deadlines. |
| Learner Alerts | At-risk learners, missed deadlines, failed attempts. |
| Recent Activity | Submissions, discussions, questions, messages. |
| Schedule | Upcoming sessions, exams, live activities. |

### 9.3 Assessment Queue IA

| Queue | Purpose |
| --- | --- |
| To Grade | Assignments and subjective questions needing review. |
| Practical Evidence | Practical submissions awaiting assessor decision. |
| Moderation | Assessments requiring second review or approval. |
| Resubmissions | Returned work submitted again. |
| Exceptions | Late submissions, academic integrity flags, accommodation cases. |

### 9.4 Learner Profile for Instructors

Instructor-visible learner profiles contain only permitted educational records:

- Contact and cohort metadata.
- Enrollments.
- Progress.
- Assessment attempts.
- Practical evidence status.
- Competency mastery.
- Feedback history.
- Attendance where enabled.
- Support notes where policy permits.
- Certificates and eligibility where permitted.

## 10. Organization Admin Workspace IA

The organization admin workspace is a dense operational surface. It must support search, filtering, bulk actions, audit views, and clear object ownership.

### 10.1 Organization Admin Primary Navigation

| Nav Item | Purpose |
| --- | --- |
| Dashboard | Operational overview, alerts, analytics, pending approvals. |
| Organization | Profile, branding, domains, training centers, departments. |
| Users | Learners, staff, roles, invitations, imports. |
| Programs | Program catalog, framework mapping, credentials. |
| Courses | Course builder, modules, lessons, resources. |
| Curriculum | Competencies, outcomes, qualification frameworks. |
| Assessments | Question bank, quizzes, assignments, practicals, exams, rubrics. |
| Credentials | Certificates, badges, templates, issuance, revocation, transcripts. |
| CMS | Homepage, pages, navigation, footer, FAQs, blogs, news, policies. |
| Media Library | Files, videos, documents, storage, permissions. |
| AI and Knowledge | Knowledge base, source approvals, AI settings, ingestion jobs. |
| Communications | Notifications, announcements, messages, templates. |
| Analytics | Reports, dashboards, exports. |
| Integrations | OAuth, webhooks, API keys, storage, email, SMS, FCM. |
| Audit Logs | Administrative, security, content, assessment, credential events. |
| Settings | Tenant policies, localization, features, security, data retention. |

### 10.2 Admin Dashboard Sections

| Section | Content |
| --- | --- |
| Organization Health | Active learners, instructors, courses, credentials, storage, queue status. |
| Pending Work | Content approvals, assessment moderation, credential approvals, user invitations. |
| Risk Alerts | Failed logins, unusual verification traffic, overdue assessments, storage limits. |
| Learning Outcomes | Completion, competency mastery, assessment status, at-risk cohorts. |
| Credential Activity | Issued, pending, revoked, verification events. |
| Announcements | Organization-level publishing and communication status. |

### 10.3 Course Builder IA

| Builder Area | Purpose |
| --- | --- |
| Course Overview | Title, summary, metadata, status, visibility, prerequisites. |
| Structure | Modules, lessons, topics, activities, assessments. |
| Content Editor | Rich lesson content, media, downloads, references. |
| Assessments | Quizzes, assignments, practicals, exams attached to structure. |
| Competency Mapping | Link content and assessments to competencies and outcomes. |
| Completion Rules | Required lessons, assessment thresholds, practical competence, attendance where enabled. |
| Enrollment Rules | Eligibility, cohorts, dates, capacity, access windows. |
| AI Source Settings | Whether content is approved for AI retrieval. |
| Review and Publish | Validation, approvals, version notes, publication. |

### 10.4 Curriculum Builder IA

| Area | Purpose |
| --- | --- |
| Frameworks | Create or import qualification frameworks. |
| Levels | Define levels, descriptors, credit values where relevant. |
| Competencies | Manage competency library. |
| Outcomes | Manage learning outcomes. |
| Mappings | Link programs, courses, lessons, and assessments to competencies. |
| Evidence Rules | Define what evidence proves competence. |
| Review | Approve curriculum changes and version history. |

### 10.5 Assessment Management IA

| Area | Purpose |
| --- | --- |
| Question Bank | Reusable questions, tags, difficulty, outcomes, explanations. |
| Quiz Builder | Formative and summative quizzes. |
| Assignment Builder | Instructions, attachments, rubrics, due rules. |
| Practical Builder | Evidence requirements, observation forms, assessor rubric. |
| Exam Builder | Timing, pools, attempt rules, accommodations, integrity settings. |
| Rubrics | Criteria, levels, scoring, competency mapping. |
| Moderation | Review workflows and exceptions. |
| Results | Scores, attempts, feedback release, exports. |

### 10.6 Credential Management IA

| Area | Purpose |
| --- | --- |
| Credential Rules | Eligibility, completion, competency, assessment, expiry. |
| Templates | Certificate and badge templates. |
| Issuance Queue | Credentials ready for approval or auto-issue. |
| Issued Credentials | Official credential records. |
| Revocation | Revoke, restore if policy allows, and audit credentials. |
| Verification | QR URLs, employer views, public verification policy. |
| Wallet Management | Learner wallet policy and sharing settings. |
| Transcripts | Transcript templates, generation, access controls. |

### 10.7 CMS IA

| Area | Purpose |
| --- | --- |
| Pages | Static and structured public pages. |
| Homepage | Tenant homepage sections. |
| Navigation | Public and authenticated menus. |
| Footer | Footer groups, links, contact, legal. |
| Announcements | Audience-targeted announcements. |
| FAQs | Public and internal questions. |
| Blogs | Editorial articles. |
| News | Institutional news. |
| Policies | Versioned policy pages. |
| Knowledge Base | Help and AI-approved knowledge sources. |

## 11. Super Admin Workspace IA

The super admin workspace is for platform operations. It must not be a shortcut around tenant security without audit.

### 11.1 Super Admin Primary Navigation

| Nav Item | Purpose |
| --- | --- |
| Platform Dashboard | System status, tenant usage, alerts, trends. |
| Tenants | Tenant creation, status, limits, plans, domains. |
| Users | Platform-level support and security views. |
| Feature Flags | Enable or disable capabilities by tenant, plan, or environment. |
| Plans and Limits | Plan metadata, quotas, storage, AI limits, users. |
| Operations | Queues, background jobs, health checks, incidents. |
| Security | Audit events, suspicious activity, access review, rate limits. |
| AI Operations | AI usage, ingestion status, vector indexes, cost, quality review. |
| Integrations | Global provider settings and integration health. |
| Billing Readiness | Usage metrics and plan data, not full accounting in initial scope. |
| Support | Tenant support tools with controlled impersonation policy if approved. |
| System Settings | Platform configuration and defaults. |

### 11.2 Super Admin Guardrails

- All tenant access is audited.
- Support access requires reason capture.
- Sensitive tenant actions require explicit permission.
- Tenant data export is controlled and logged.
- Feature changes are traceable by actor, time, and tenant.

## 12. Employer Portal IA

The employer portal builds trust in credentials and enables career outcomes.

### 12.1 Employer Navigation

| Nav Item | Purpose |
| --- | --- |
| Verify Credential | Certificate number and QR verification. |
| Shared Profiles | Learner-authorized credential and profile views. |
| Job Posts | Employer-managed jobs where enabled. |
| Applicants | Learner applications where job board is enabled. |
| Organization Profile | Employer identity, verification, contacts. |
| Messages | Communication with learners or institution where enabled. |
| Help | Verification policy and support. |

### 12.2 Verification Result IA

| Section | Content |
| --- | --- |
| Status | Valid, expired, revoked, not found, access required. |
| Issuer | Organization name, logo, verification authority. |
| Holder | Policy-approved learner identity fields. |
| Credential | Type, title, number, issue date, expiry date. |
| Program | Program or course name and level. |
| Competencies | Displayed only when allowed. |
| Transcript | Available only when learner or tenant policy permits. |
| Revocation | Status and safe reason where permitted. |

## 13. Career Portal IA

The career portal is learner-centered and optional by tenant.

### 13.1 Career Navigation

| Nav Item | Purpose |
| --- | --- |
| Career Dashboard | Skill profile, readiness, suggested actions. |
| Skills Profile | Competencies, evidence, credentials, portfolio. |
| Resume | Structured resume or export where enabled. |
| Jobs | Job discovery and saved jobs. |
| Applications | Application status and history. |
| Shared Credentials | Employer sharing links and permissions. |
| Guidance | Career articles, AI career help where enabled. |

## 14. Mobile App IA

The mobile app prioritizes learner continuity and offline access.

### 14.1 Mobile Primary Tabs

| Tab | Purpose |
| --- | --- |
| Home | Continue learning, due tasks, announcements. |
| Learn | Programs, courses, downloaded content. |
| Tasks | Assignments, practicals, quizzes, exams. |
| AI Tutor | Chat, summaries, flashcards, revision. |
| Wallet | Certificates, badges, transcripts, QR sharing. |
| More | Notes, bookmarks, messages, settings, help. |

### 14.2 Offline IA

| Offline Area | Behavior |
| --- | --- |
| Downloads | Approved lessons, PDFs, videos, and resources. |
| Notes | Offline notes synced later. |
| Bookmarks | Offline bookmarks synced later. |
| Progress | Local progress events queued for sync. |
| AI | Offline AI is not assumed. Cached summaries may be available by policy. |
| Submissions | Offline draft creation allowed; final submission sync requires conflict checks. |

## 15. Developer and API Portal IA

The API portal is for controlled integration, not casual data browsing.

### 15.1 API Portal Navigation

| Nav Item | Purpose |
| --- | --- |
| Overview | API capabilities, environments, versioning. |
| API Keys | Tenant-scoped keys and rotation. |
| Webhooks | Event subscriptions, signing secrets, delivery logs. |
| Documentation | REST and optional GraphQL documentation. |
| Events | Credential, enrollment, assessment, user lifecycle events. |
| Logs | Request logs and webhook delivery history. |
| Sandbox | Test data and integration testing where enabled. |

## 16. Search IA

### 16.1 Search Scopes

| Scope | Users | Results |
| --- | --- | --- |
| Global Authenticated Search | Authenticated users | Courses, lessons, users, credentials, articles, discussions, depending on permission. |
| Learner Search | Learners | Enrolled courses, lessons, notes, resources, discussions, certificates. |
| Instructor Search | Instructors | Assigned courses, cohorts, learners, submissions, assessments. |
| Admin Search | Organization admins | Users, programs, courses, content, credentials, media, audit logs. |
| Employer Search | Employers | Shared credentials and job-related records. |
| Public Search | Public visitors where enabled | Public pages, programs, articles, FAQs. |

### 16.2 Search Filters

Common filters:

- Tenant or organization where permitted.
- Training center.
- Program.
- Course.
- Cohort.
- Status.
- Date range.
- Role.
- Credential type.
- Competency.
- Content type.
- Language.
- Tags.
- Owner.
- Publication state.

## 17. Taxonomy and Metadata

### 17.1 Core Taxonomies

| Taxonomy | Used For |
| --- | --- |
| Program Category | Catalog browsing and reporting. |
| Occupation or Trade | Vocational classification. |
| Skill Area | Competency grouping. |
| Qualification Level | Framework alignment. |
| Delivery Mode | Online, blended, in-person, workplace. |
| Language | UI, learning content, AI, certificates. |
| Content Type | Search, filtering, CMS, learning resources. |
| Assessment Type | Quiz, assignment, practical, final exam. |
| Credential Type | Certificate, diploma, badge, micro-credential. |
| Difficulty | Question bank, learning recommendations. |
| Tags | Discovery, reuse, analytics. |

### 17.2 Required Metadata by Object

| Object | Required Metadata |
| --- | --- |
| Program | Tenant, title, status, category, level, competencies, credential rules. |
| Course | Tenant, program, title, status, owner, version, outcomes. |
| Lesson | Tenant, course, module, title, status, version, AI source approval. |
| Question | Tenant, type, difficulty, tags, outcomes, status, version. |
| Practical | Tenant, course, evidence rules, rubric, competencies, status. |
| Certificate | Tenant, credential number, type, issuer, holder, status, issue date. |
| Media | Tenant, file type, owner, permissions, processing status, usage. |
| CMS Page | Tenant, slug, status, audience, version, publish date. |
| Audit Event | Tenant, actor, action, target, timestamp, metadata, request context. |

## 18. User Journeys

### 18.1 Learner Starts a Course

1. Learner signs in.
2. Learner lands on dashboard.
3. Learner sees current program and next course.
4. Learner opens course.
5. Learner views outline and requirements.
6. Learner resumes the next lesson.
7. Learner completes activities.
8. Progress updates and next task appears.

### 18.2 Learner Completes a Practical Assessment

1. Learner opens Practicals.
2. Learner selects assigned practical.
3. Learner reviews evidence requirements and rubric.
4. Learner uploads files, images, video, or notes.
5. Learner submits evidence.
6. Assessor reviews evidence.
7. Assessor gives feedback and competence decision.
8. Learner sees result and next step.
9. Competency mastery updates.

### 18.3 Instructor Grades Practical Evidence

1. Instructor opens assessment queue.
2. Instructor filters by cohort, course, or practical.
3. Instructor opens learner submission.
4. Instructor reviews evidence and rubric.
5. Instructor records comments, scores, and competency decision.
6. Submission moves to moderation if required.
7. Learner receives feedback after release.
8. Gradebook and competency records update.

### 18.4 Admin Publishes a Course

1. Admin opens Courses.
2. Admin creates or edits course structure.
3. Admin adds modules, lessons, activities, and assessments.
4. Admin maps outcomes and competencies.
5. Admin configures completion and enrollment rules.
6. Admin submits course for review.
7. Reviewer approves course.
8. Admin publishes course to selected audience.
9. Learners can enroll or be assigned.

### 18.5 Credential Is Issued

1. Learner completes required learning and assessment rules.
2. Credential eligibility engine marks learner as eligible.
3. Credential enters issuance queue or auto-issues by policy.
4. Authorized user approves if required.
5. System generates certificate number and QR verification URL.
6. Certificate appears in learner wallet.
7. Employer can verify credential using QR or certificate number.

### 18.6 Employer Verifies a Certificate

1. Employer scans QR code or enters certificate number.
2. Verification service finds credential.
3. System checks status, visibility, and revocation state.
4. Employer sees verification result.
5. Employer requests transcript if needed and allowed.
6. Verification event is logged.

### 18.7 AI Tutor Answers a Lesson Question

1. Learner opens AI Tutor from a lesson or course.
2. Learner asks a question.
3. System determines tenant, user, course, lesson, language, and source policy.
4. Retrieval searches only approved accessible learning materials.
5. AI generates answer grounded in retrieved sources.
6. Answer includes source references where available.
7. Interaction is logged according to policy.
8. Weakness signals update where enabled.

## 19. Content Lifecycle IA

### 19.1 Standard Lifecycle

| State | Meaning |
| --- | --- |
| Draft | Editable and not visible to learners. |
| In Review | Submitted for approval. |
| Changes Requested | Reviewer requires updates. |
| Approved | Approved but not necessarily published. |
| Scheduled | Publication date set. |
| Published | Visible to intended audience. |
| Archived | Hidden from new use but retained for records. |
| Retired | No longer used for new courses or assessments. |

### 19.2 Versioning Rules

- Learning content changes create version history.
- Published courses should preserve learner records against the version used.
- Assessment changes after attempts begin must create a new assessment version.
- Certificate template changes do not alter already issued credentials unless explicitly reissued.
- AI source indexes must track content version and approval status.

## 20. Permission-Aware IA

The same object may appear differently depending on role.

| Object | Learner | Instructor | Admin | Employer |
| --- | --- | --- | --- | --- |
| Course | Enrolled content and progress. | Assigned teaching and learners. | Full configuration and publishing. | Public preview only where enabled. |
| Assessment | Instructions, attempt, feedback. | Grading and moderation scope. | Builder, rules, results, audit. | Not visible. |
| Credential | Wallet, sharing, transcript. | Eligibility view where permitted. | Issuance, revocation, templates. | Verification only. |
| User | Own profile. | Learners in assigned scope. | Tenant users by permission. | Shared learner profile only. |
| Audit Log | Not visible except own security events. | Limited course events if enabled. | Tenant audit scope. | Own verification events if enabled. |
| AI Logs | Own interactions where policy allows. | Learner weakness summaries where enabled. | Tenant AI quality and safety logs. | Not visible. |

## 21. Dashboard IA Summary

| Dashboard | Primary Questions Answered |
| --- | --- |
| Learner | What should I do next? How am I progressing? What feedback or credentials do I have? |
| Instructor | Who needs attention? What must I grade? How are my cohorts performing? |
| Organization Admin | Is the organization operating well? What content, users, credentials, and risks need action? |
| Super Admin | Are tenants healthy? Is the platform reliable, secure, and within operational limits? |
| Employer | Is this credential valid? Which shared candidates or jobs need action? |

## 22. Reporting IA

### 22.1 Report Categories

| Category | Examples |
| --- | --- |
| Enrollment | Active learners, completion, drop-off, cohort distribution. |
| Learning Progress | Course progress, lesson completion, time spent, activity completion. |
| Assessment | Attempts, pass rates, grading backlog, practical competence. |
| Competency | Mastery by learner, cohort, program, center, framework. |
| Credential | Issued, pending, expired, revoked, verified. |
| Operations | Storage, jobs, notifications, AI usage, system health. |
| Security | Failed logins, privileged actions, rate limits, suspicious activity. |
| Content | Publishing status, AI indexing, media usage, course versions. |

### 22.2 Report Interaction Pattern

Reports should support:

- Saved filters.
- Date ranges.
- Tenant-safe exports.
- Drill-down from summary to record.
- Permission-aware columns.
- Scheduled exports where enabled.
- Audit trail for sensitive exports.

## 23. Notification IA

### 23.1 Notification Categories

| Category | Examples |
| --- | --- |
| Learning | New lesson, deadline, feedback, course update. |
| Assessment | Submission received, grade released, practical returned, exam scheduled. |
| Credential | Certificate issued, revoked, expiring, verified. |
| Administrative | Invitation, role change, policy update, account status. |
| Communication | Message, announcement, discussion reply. |
| Security | Login alert, password changed, MFA update, suspicious activity. |
| System | Maintenance, outage, feature changes. |

### 23.2 Notification Destinations

- In-app notification center.
- Email.
- Push notification.
- SMS where configured.
- Webhook for integration events.

## 24. Audit IA

Audit records are navigable from object detail pages and central audit views.

### 24.1 Audit Event Families

| Family | Examples |
| --- | --- |
| Authentication | Login, logout, failed login, token refresh, MFA change. |
| Authorization | Role assignment, permission changes, access denial. |
| Tenant | Branding, settings, domains, feature flags. |
| Content | Create, edit, approve, publish, archive. |
| Assessment | Attempt, submit, grade, moderate, release feedback. |
| Credential | Issue, verify, revoke, restore, template change. |
| AI | Source ingestion, answer generation, policy refusal, admin review. |
| Files | Upload, download, delete, permission change. |
| Export | Report export, transcript export, credential export. |

## 25. Accessibility IA

Information architecture must support accessibility before visual design.

Requirements:

- Landmark regions for header, navigation, main content, complementary panels, and footer.
- Predictable navigation order.
- Breadcrumbs for deep admin and course builder flows.
- Clear page titles and object names.
- Search and filters accessible by keyboard.
- Tables with captions, headers, sorting labels, and bulk action descriptions.
- Form sections grouped by purpose.
- Error summaries at the top of complex forms.
- Status text paired with non-color indicators.
- Course player layout that works with screen readers and keyboard navigation.
- Captions, transcripts, and alt text metadata surfaced in media workflows.

## 26. URL and Route IA

These are conceptual route patterns. Final route implementation will be confirmed during software architecture and frontend design.

### 26.1 Public Routes

| Pattern | Purpose |
| --- | --- |
| `/` | Platform or tenant-aware landing depending on domain. |
| `/programs` | Public program catalog. |
| `/programs/{programSlug}` | Public program detail. |
| `/news` | News list. |
| `/news/{slug}` | News detail. |
| `/blog` | Blog list. |
| `/blog/{slug}` | Blog detail. |
| `/faqs` | FAQs. |
| `/policies/{slug}` | Public policy page. |
| `/verify` | Certificate verification entry. |
| `/verify/{credentialNumber}` | Verification result. |
| `/login` | Authentication entry. |

### 26.2 Authenticated Routes

| Pattern | Purpose |
| --- | --- |
| `/app` | Workspace router. |
| `/app/learn` | Learner dashboard. |
| `/app/learn/courses/{courseId}` | Course overview. |
| `/app/learn/courses/{courseId}/lessons/{lessonId}` | Course player. |
| `/app/learn/assignments` | Learner assignment list. |
| `/app/learn/practicals` | Learner practical list. |
| `/app/learn/exams` | Learner exam list. |
| `/app/learn/certificates` | Wallet and credentials. |
| `/app/instructor` | Instructor dashboard. |
| `/app/instructor/courses` | Instructor courses. |
| `/app/instructor/assessments` | Grading and assessment queue. |
| `/app/admin` | Organization admin dashboard. |
| `/app/admin/users` | User management. |
| `/app/admin/programs` | Program management. |
| `/app/admin/courses` | Course management. |
| `/app/admin/curriculum` | Competency and framework management. |
| `/app/admin/assessments` | Assessment management. |
| `/app/admin/credentials` | Credential management. |
| `/app/admin/cms` | CMS. |
| `/app/admin/settings` | Tenant settings. |
| `/app/super-admin` | Platform administration. |
| `/app/employer` | Employer portal. |
| `/app/career` | Career portal. |

## 27. IA Decisions and Rationale

| Decision | Rationale |
| --- | --- |
| Separate shells by role instead of one universal dashboard. | Different users have different mental models. Role-specific workspaces reduce cognitive load and authorization mistakes. |
| Treat credentials as official records separate from course content. | Credentials require stronger auditability, revocation, verification, and legal integrity than editable learning content. |
| Keep CMS separate from course builder. | Public institutional content and learning content have different audiences, lifecycles, and approval flows. |
| Make competencies visible across program, course, assessment, and credential areas. | Competency alignment is the core vocational differentiator. |
| Provide contextual AI entry points from lessons and dashboards. | AI is most useful when it knows the learner's current learning context and approved sources. |
| Use both global and scoped search. | Large tenants need broad discovery, while task-specific search prevents overwhelming result sets. |
| Use object detail pages with audit trails for sensitive records. | Enterprise administrators need traceability from the record itself, not only central logs. |
| Prioritize mobile IA for learners and desktop IA for administrators. | Learners often use mobile devices; administrators require complex tables, builders, and analytics. |

## 28. Open IA Questions

- Should the platform support multiple organizations inside one tenant, or should tenant and organization remain one-to-one for the first release?
- Should public program applications be part of the first release or deferred?
- Which roles can author, approve, and publish course content in the first release?
- Which credential verification fields are legally acceptable in the first deployment country?
- Should employer accounts be globally reusable across tenants or tenant-specific?
- Should training centers have their own branded public pages?
- Should learner discussions be enabled by default or tenant opt-in?
- What is the minimum mobile IA for the first release: wallet plus learning, or full learner workspace?
- Should AI tutor be available from all courses or only courses with approved indexed materials?

## 29. Approval Criteria

This Information Architecture is approved when stakeholders agree that:

- The product shells are correct.
- Role-based navigation is clear.
- Course, competency, assessment, credential, CMS, AI, and reporting structures are complete enough for architecture planning.
- Public, learner, instructor, admin, super admin, employer, mobile, and API portal areas are represented.
- Key journeys match the intended product behavior.
- Open IA questions are answered or intentionally deferred.

## 30. Next Artifact

After Information Architecture approval, the next artifact is the Software Architecture. It will define system boundaries, service/module architecture, clean architecture layers, domain boundaries, deployment topology, integration patterns, event model, security architecture, and major architecture decisions.
