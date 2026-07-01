# UI Component Inventory

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | UI Component Inventory |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/02-information-architecture.md, docs/05-api-specification.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the reusable UI components required to build Disyn across public pages, learner workspace, instructor workspace, organization admin, super admin, employer portal, career portal, API portal, and mobile-adjacent web experiences.

The goal is to avoid one-off UI and create an enterprise component library that is accessible, consistent, testable, and tenant-brandable.

## 2. Component Principles

| Principle | Requirement |
| --- | --- |
| Accessibility first | Components must meet WCAG 2.2 AA patterns for keyboard, focus, labels, contrast, and semantics. |
| Enterprise density | Admin and instructor tools prioritize scanning, comparison, bulk action, and repeated work. |
| Learner clarity | Learner components prioritize progress, next actions, feedback, and low-friction learning. |
| Tenant brandable | Components accept design tokens but preserve usability and contrast. |
| State complete | Components include loading, empty, error, disabled, success, warning, and destructive states. |
| Composable | Complex screens compose smaller primitives rather than duplicating behavior. |
| Permission-aware | Components can hide, disable, or explain unavailable actions without trusting the frontend for security. |

## 3. Foundation Components

| Component | Purpose | Key States |
| --- | --- | --- |
| `Button` | Primary, secondary, ghost, destructive, icon, loading actions. | Default, hover, focus, loading, disabled. |
| `IconButton` | Compact tool actions using lucide icons. | Tooltip, active, disabled, loading. |
| `Link` | Navigational links. | Default, visited where useful, focus, disabled-like unavailable. |
| `Badge` | Status, role, difficulty, credential type. | Neutral, success, warning, danger, info. |
| `StatusPill` | Workflow state such as draft, published, revoked. | Semantic variants. |
| `Avatar` | User or organization identity. | Image, initials, fallback, group. |
| `Tooltip` | Explain icon-only or advanced controls. | Hover, focus, touch fallback. |
| `Separator` | Visual grouping. | Horizontal, vertical. |
| `Skeleton` | Loading placeholder. | Shape variants. |
| `Spinner` | Inline loading. | Sizes. |
| `VisuallyHidden` | Accessible-only text. | N/A. |

## 4. Layout and Shell Components

| Component | Purpose |
| --- | --- |
| `AppShell` | Authenticated workspace frame. |
| `PublicShell` | Tenant public site frame. |
| `AuthShell` | Login, signup, recovery frame. |
| `WorkspaceSwitcher` | Switch learner, instructor, admin, employer, super admin spaces. |
| `TenantSwitcher` | Switch active tenant for multi-tenant users. |
| `SidebarNav` | Desktop primary navigation. |
| `MobileNav` | Mobile navigation drawer or bottom nav. |
| `TopBar` | Search, notifications, profile, tenant context. |
| `Breadcrumbs` | Deep admin and builder navigation. |
| `PageHeader` | Page title, description, actions, metadata. |
| `SectionHeader` | Compact section labeling. |
| `SplitPane` | Course player, editor, and review workflows. |
| `ResizablePanelGroup` | Builder and admin tools where useful. |
| `CommandMenu` | Keyboard-driven search and action launcher. |

## 5. Form Components

| Component | Purpose |
| --- | --- |
| `Form` | React Hook Form wrapper with Zod validation. |
| `TextField` | Standard text input. |
| `Textarea` | Multi-line input. |
| `PasswordField` | Password input with policy help. |
| `SearchField` | Search input with clear action. |
| `Select` | Single option selection. |
| `MultiSelect` | Tags, roles, competencies, users. |
| `Combobox` | Searchable entity selection. |
| `Checkbox` | Boolean or multi-choice selection. |
| `RadioGroup` | Exclusive option selection. |
| `Switch` | Binary setting. |
| `SegmentedControl` | Mode selection. |
| `DatePicker` | Date selection. |
| `DateTimePicker` | Deadlines, schedules, exams. |
| `TimeZoneSelect` | Tenant and user timezone selection. |
| `FileUploadDropzone` | File upload with validation and progress. |
| `RichTextEditor` | CMS, lessons, feedback, announcements. |
| `JsonSchemaEditor` | Advanced settings where required. |
| `ColorPicker` | Branding token selection with contrast validation. |
| `SlugField` | Slug entry with availability check. |
| `FormErrorSummary` | Accessible top-of-form errors. |
| `FieldHelp` | Inline guidance. |

## 6. Data Display Components

| Component | Purpose |
| --- | --- |
| `DataTable` | Admin and reporting tables. |
| `ColumnManager` | Show/hide table columns. |
| `BulkActionBar` | Bulk actions for selected rows. |
| `FilterBar` | Structured filters. |
| `SavedViewPicker` | Saved report and table views. |
| `PaginationControls` | Cursor and page controls. |
| `SortHeader` | Accessible table sorting. |
| `DescriptionList` | Object details. |
| `Timeline` | Audit, assessment, content review, credential history. |
| `ActivityFeed` | Recent events. |
| `MetricTile` | Dashboard metric summary. |
| `TrendIndicator` | Delta and trend display. |
| `EmptyState` | No data guidance with action. |
| `ErrorState` | Recoverable error display. |
| `PermissionDeniedState` | Unauthorized action explanation. |

## 7. Navigation and Discovery Components

| Component | Purpose |
| --- | --- |
| `GlobalSearch` | Permission-aware global search. |
| `ScopedSearch` | Search inside a product area. |
| `SearchResultsList` | Grouped search results. |
| `Tabs` | Related object views. |
| `Stepper` | Multi-step workflows. |
| `ProgressStepper` | Learner and admin progress. |
| `TreeView` | Course outline, curriculum, navigation builder. |
| `OutlineNavigator` | Course modules and lessons. |
| `JumpList` | Fast navigation within large admin pages. |

## 8. Feedback and Overlay Components

| Component | Purpose |
| --- | --- |
| `Toast` | Non-blocking notifications. |
| `Alert` | Inline success, warning, error, info. |
| `Dialog` | Focus-trapped modal decisions. |
| `ConfirmDialog` | Destructive and high-risk confirmations. |
| `Drawer` | Side detail or editing panel. |
| `Popover` | Compact contextual content. |
| `Menu` | Action menus. |
| `ContextMenu` | Advanced table and builder interactions. |
| `ProgressBar` | Uploads, course progress, jobs. |
| `JobStatusBanner` | Async job status. |

## 9. Public Site Components

| Component | Purpose |
| --- | --- |
| `TenantHero` | Tenant-branded first viewport for public site. |
| `ProgramCard` | Public program listing. |
| `ProgramFilterPanel` | Public catalog filters. |
| `TrainingCenterList` | Public centers. |
| `AnnouncementBanner` | Public or authenticated announcements. |
| `ArticleCard` | Blog and news listing. |
| `FAQAccordion` | FAQs. |
| `PolicyViewer` | Versioned policies. |
| `CertificateVerificationForm` | Public credential lookup. |
| `VerificationResult` | Valid, revoked, expired, not found states. |

## 10. Learner Components

| Component | Purpose |
| --- | --- |
| `LearnerDashboard` | Composite learner home. |
| `ContinueLearningCard` | Resume current lesson or task. |
| `CourseProgressCard` | Course progress summary. |
| `CompetencyProgressMap` | Competency mastery status. |
| `DueSoonList` | Deadlines and upcoming events. |
| `FeedbackInbox` | Recent grading and assessor feedback. |
| `CoursePlayer` | Lesson learning environment. |
| `LessonContentRenderer` | Rich lesson content. |
| `LessonResourceList` | PDFs, links, downloads. |
| `NotesPanel` | Notes, bookmarks, highlights. |
| `LearnerAssignmentPanel` | Assignment instructions and submission. |
| `PracticalEvidenceUploader` | Practical evidence submission. |
| `ExamLaunchPanel` | Exam rules and start flow. |
| `WalletCredentialCard` | Certificate and badge in wallet. |
| `CredentialShareDialog` | Share credential with employer. |

## 11. Instructor and Assessor Components

| Component | Purpose |
| --- | --- |
| `InstructorDashboard` | Teaching work queue. |
| `CohortProgressTable` | Cohort scanning. |
| `LearnerRiskList` | At-risk learners. |
| `AssessmentQueue` | To-grade, practical, moderation queues. |
| `SubmissionReviewPanel` | Review assignment or exam answers. |
| `EvidenceReviewPanel` | Review practical evidence. |
| `RubricScoringGrid` | Score rubric criteria. |
| `FeedbackComposer` | Structured feedback entry. |
| `GradebookTable` | Scores and competency states. |
| `ModerationDecisionPanel` | Approve, request change, escalate. |

## 12. Admin Components

| Component | Purpose |
| --- | --- |
| `AdminDashboard` | Organization operations overview. |
| `UserManagementTable` | Users, roles, status, bulk actions. |
| `InvitationDialog` | Invite users. |
| `BulkImportWizard` | CSV import and validation. |
| `RolePermissionMatrix` | RBAC management. |
| `OrganizationSettingsForm` | Tenant settings. |
| `BrandingEditor` | Logos, colors, theme, certificate defaults. |
| `TrainingCenterManager` | Centers and departments. |
| `FeatureFlagPanel` | Tenant capabilities. |
| `AuditLogViewer` | Filtered audit events. |

## 13. Builder Components

| Component | Purpose |
| --- | --- |
| `CourseBuilder` | Course creation workspace. |
| `ProgramBuilder` | Program structure and credential rules. |
| `CurriculumMapper` | Competency and outcome mapping. |
| `LessonBuilder` | Rich lesson editing. |
| `ActivityBuilder` | Activities and checkpoints. |
| `QuestionEditor` | Question authoring. |
| `QuestionBankBrowser` | Select and reuse questions. |
| `QuizBuilder` | Quiz structure and rules. |
| `AssignmentBuilder` | Assignment instructions and rubric. |
| `PracticalBuilder` | Evidence and rubric configuration. |
| `ExamBuilder` | Timed exam and pools. |
| `RubricBuilder` | Criteria and levels. |
| `CertificateTemplateDesigner` | Certificate and badge templates. |
| `PublishReviewPanel` | Validation, review, publish. |

## 14. AI and Knowledge Components

| Component | Purpose |
| --- | --- |
| `AITutorChat` | Learner AI chat. |
| `AISourceCitationList` | Sources used in answer. |
| `AIRefusalMessage` | Clear refusal when materials are insufficient. |
| `AIFeedbackActions` | Helpful, not helpful, report. |
| `FlashcardDeck` | Generated or authored flashcards. |
| `StudyPlanPanel` | Revision plan. |
| `WeaknessSummary` | Learner weakness signals. |
| `KnowledgeSourceTable` | AI source approvals. |
| `IngestionJobMonitor` | AI ingestion status. |
| `AISettingsPanel` | Tenant AI policy. |

## 15. Credential Components

| Component | Purpose |
| --- | --- |
| `CredentialTemplateList` | Manage templates. |
| `CredentialPreview` | Preview certificate or badge. |
| `CredentialEligibilityQueue` | Ready-to-issue learners. |
| `CredentialIssueDialog` | Issue confirmation. |
| `CredentialDetail` | Official record detail. |
| `CredentialTimeline` | Issue, verify, revoke history. |
| `CredentialRevocationDialog` | Revoke with reason. |
| `TranscriptViewer` | Transcript display. |
| `QRCodeBlock` | QR display and download. |

## 16. Analytics Components

| Component | Purpose |
| --- | --- |
| `DashboardGrid` | Responsive dashboard layout. |
| `ChartCard` | Chart container with title and actions. |
| `LineChart` | Trends. |
| `BarChart` | Comparisons. |
| `StackedBarChart` | Completion distribution. |
| `DonutChart` | Composition summaries. |
| `Heatmap` | Engagement and mastery. |
| `ReportBuilder` | Saved report configuration. |
| `ExportJobPanel` | Report export progress. |

## 17. Integration and Developer Components

| Component | Purpose |
| --- | --- |
| `ApiClientTable` | API client management. |
| `ApiKeyCreatedDialog` | One-time key display. |
| `WebhookSubscriptionForm` | Webhook setup. |
| `WebhookDeliveryLog` | Delivery debugging. |
| `ApiDocsViewer` | API reference. |
| `EventSchemaViewer` | Webhook schema docs. |

## 18. Mobile-Web Responsive Requirements

Components must define behavior for:

- Desktop.
- Tablet.
- Mobile.
- Touch.
- Keyboard.
- Screen reader.
- High zoom.
- Reduced motion.
- Dark mode.

Admin tables may transform into list/detail views on narrow screens, but learner workflows must be fully mobile-usable.

## 19. Component Quality Requirements

Each shared component must include:

- TypeScript props.
- Accessibility notes.
- Keyboard behavior.
- Loading state.
- Empty state where relevant.
- Error state where relevant.
- Storybook or equivalent examples when the component library is established.
- Unit tests for logic-heavy components.
- Visual regression coverage for critical states when tooling is available.

## 20. Ownership Model

| Component Category | Owning Domain |
| --- | --- |
| Primitives | Design system |
| Layout shells | Platform frontend |
| Forms | Design system and platform frontend |
| Data tables | Design system and admin platform |
| Course player | Learning delivery |
| Assessment review | Assessment |
| Credential views | Credentialing |
| AI chat | AI and knowledge |
| Analytics charts | Analytics |
| Public site CMS | CMS |

## 21. Approval Criteria

This inventory is approved when stakeholders agree that:

- The component set covers the product modules.
- Components are reusable across workspaces.
- Accessibility and state requirements are explicit.
- Builder, assessment, credential, AI, analytics, and admin components are sufficiently represented.

## 22. Next Artifact

The next artifact is the Design System.
