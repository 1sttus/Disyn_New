# Design System

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | Design System |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/06-ui-component-inventory.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the enterprise design system for Disyn. It establishes foundations, tokens, component behavior, layout rules, accessibility standards, theming, and quality expectations for a multi-tenant vocational learning platform.

The design system must support dense administrative workflows, calm learner experiences, tenant branding, dark mode, and WCAG 2.2 AA accessibility.

## 2. Design Principles

| Principle | Meaning |
| --- | --- |
| Clear before clever | Interfaces must communicate state, next action, and consequence plainly. |
| Work-focused | Admin and instructor screens prioritize scanning, filtering, bulk action, and reliability. |
| Learning-centered | Learner screens emphasize progress, feedback, continuity, and confidence. |
| Accessible by default | Keyboard, screen reader, contrast, focus, and error handling are built into components. |
| Brandable but governed | Tenants can express identity without breaking contrast, layout, or product consistency. |
| State-rich | Empty, loading, error, disabled, success, warning, and destructive states are designed. |
| Durable | The system favors predictable patterns that will still make sense years from now. |

## 3. Foundations

### 3.1 Typography

Typography should be legible, restrained, and scalable across dense enterprise screens.

| Token | Use |
| --- | --- |
| `font-sans` | Primary UI text. |
| `font-mono` | Codes, IDs, logs, API examples. |
| `text-display` | Public hero or major learner milestone only. |
| `text-heading-1` | Page title. |
| `text-heading-2` | Section title. |
| `text-heading-3` | Card or panel title. |
| `text-body` | Standard text. |
| `text-body-sm` | Dense tables and metadata. |
| `text-caption` | Supporting labels and timestamps. |

Rules:

- Do not scale font size directly with viewport width.
- Letter spacing remains `0` unless typography testing proves a specific need.
- Compact panels use compact headings, not hero-scale type.
- Tables use readable row height and clear numeric alignment.

### 3.2 Spacing

Use a consistent spacing scale:

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | 4px | Tight internal gaps. |
| `space-2` | 8px | Control gaps. |
| `space-3` | 12px | Form field grouping. |
| `space-4` | 16px | Standard component padding. |
| `space-5` | 20px | Panel padding. |
| `space-6` | 24px | Section gaps. |
| `space-8` | 32px | Page section spacing. |
| `space-10` | 40px | Large layout spacing. |
| `space-12` | 48px | Public content sections. |

Rules:

- Dense admin interfaces use smaller vertical spacing with clear grouping.
- Learner content uses more breathing room than admin tables.
- Cards must not be nested inside cards.
- Page sections are full-width bands or unframed layouts, not floating card stacks.

### 3.3 Radius

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | 4px | Inputs, badges, small controls. |
| `radius-md` | 6px | Buttons, panels, table containers. |
| `radius-lg` | 8px | Cards and dialogs. |

Cards should stay at 8px radius or less unless a future brand system explicitly requires otherwise.

### 3.4 Elevation

Use elevation sparingly.

| Token | Use |
| --- | --- |
| `shadow-focus` | Focus ring support. |
| `shadow-popover` | Menus, tooltips, popovers. |
| `shadow-dialog` | Modals and drawers. |

Avoid decorative shadows on every panel. Enterprise screens should feel stable, not floaty.

## 4. Color System

### 4.1 Semantic Tokens

| Token | Purpose |
| --- | --- |
| `background` | App background. |
| `foreground` | Primary text. |
| `surface` | Panels and component backgrounds. |
| `surface-muted` | Subtle grouped areas. |
| `border` | Standard borders. |
| `border-strong` | High-emphasis borders. |
| `primary` | Primary action and brand-accented controls. |
| `primary-foreground` | Text on primary. |
| `secondary` | Secondary action. |
| `success` | Completion, valid, issued. |
| `warning` | Attention, pending, expiring. |
| `danger` | Destructive, revoked, failed. |
| `info` | Neutral informational state. |
| `focus` | Focus outline. |

### 4.2 Palette Rules

- Do not create a one-note palette dominated by a single hue.
- Avoid overusing purple, beige, dark slate, or brown/orange as the whole visual identity.
- Tenant primary colors must pass contrast checks for text and controls.
- Semantic colors must remain recognizable even under tenant branding.
- Dark mode is a first-class theme, not a color inversion.

### 4.3 Status Mapping

| Status | Color Direction |
| --- | --- |
| Draft | Neutral. |
| In review | Info. |
| Published | Success. |
| Scheduled | Info. |
| Changes requested | Warning. |
| Archived | Neutral muted. |
| Retired | Neutral strong. |
| Failed | Danger. |
| Revoked | Danger. |
| Expiring | Warning. |

All status colors must include text, icon, or shape cues. Do not rely on color alone.

## 5. Iconography

Rules:

- Use lucide icons where available.
- Icon-only buttons require accessible labels and visible tooltips.
- Use familiar symbols for common actions such as save, download, search, edit, delete, undo, redo, filter, settings, and more.
- Do not replace familiar icons with text-only rounded buttons when an icon is clearer.
- Icons support meaning but do not carry essential information alone.

## 6. Motion

Use Framer Motion sparingly for:

- Route transitions where helpful.
- Dialog and drawer entry.
- Toasts.
- Loading transitions.
- Progress feedback.

Rules:

- Respect `prefers-reduced-motion`.
- Avoid decorative motion in dense workspaces.
- Motion should clarify state or continuity.

## 7. Layout System

### 7.1 Breakpoints

Use Tailwind defaults unless later design testing requires adjustment:

- `sm`
- `md`
- `lg`
- `xl`
- `2xl`

### 7.2 Layout Patterns

| Pattern | Use |
| --- | --- |
| Single column | Auth, public articles, learner reading. |
| Sidebar plus content | Workspaces and admin areas. |
| Split pane | Course player, builders, review workflows. |
| Data grid | Admin tables and reports. |
| Dashboard grid | Metrics and analytics. |
| Wizard | Imports, setup, publishing, credential issuance. |

### 7.3 Responsive Behavior

- Learner workflows must be fully usable on mobile.
- Admin tables may become card lists or require horizontal scroll with clear affordances on small screens.
- Fixed-format UI elements such as boards, grids, counters, and toolbar buttons need stable dimensions.
- Text must not overflow buttons, cards, table cells, or panels.

## 8. Component Behavior Standards

### 8.1 Buttons

Variants:

- Primary.
- Secondary.
- Ghost.
- Destructive.
- Icon.
- Link.

Rules:

- One primary action per major section.
- Destructive actions require confirmation when data or official records are affected.
- Loading state prevents duplicate submission.
- Disabled state includes a reason when the user might expect access.

### 8.2 Forms

Rules:

- Use React Hook Form and Zod.
- Validate client-side for UX and server-side for authority.
- Show field-level errors and top error summary for complex forms.
- Preserve entered data after recoverable errors.
- Required fields are explicit.
- Long forms are grouped into sections or steps.

### 8.3 Tables

Rules:

- Tables include column headers, sorting labels, filters, pagination, and empty states.
- Bulk actions appear only when rows are selected.
- Row actions use menus for secondary actions.
- Dangerous actions are visually distinct and confirmed.
- Important IDs can be copied.
- Tables support keyboard navigation where interactive.

### 8.4 Dialogs and Drawers

Rules:

- Dialogs trap focus.
- Escape and close controls are supported unless blocking confirmation is required.
- Drawers are used for side detail and lightweight edit flows.
- Dialogs are used for decisions, confirmations, and focused tasks.

### 8.5 Charts

Rules:

- Charts include text summaries.
- Do not rely on color alone.
- Axes and labels must be readable.
- Tooltips must be keyboard-accessible where practical.
- Provide export or table equivalent for important reports.

## 9. Domain Pattern Standards

### 9.1 Course Player

Must include:

- Outline.
- Lesson content.
- Progress.
- Notes and bookmarks.
- Resources.
- AI tutor entry where enabled.
- Previous and next navigation.
- Completion state.

### 9.2 Builders

Must include:

- Autosave or explicit save state.
- Draft/review/publish lifecycle.
- Validation checklist.
- Version notes.
- Preview.
- Permission-aware actions.
- Audit trail access for high-risk objects.

### 9.3 Assessment Review

Must include:

- Learner identity and attempt context.
- Submission evidence.
- Rubric.
- Feedback composer.
- Grade or competence decision.
- Moderation state.
- Audit history.

### 9.4 Credential Views

Must include:

- Credential status.
- Holder.
- Issuer.
- Credential number.
- Issue and expiry dates.
- QR verification.
- Revocation state.
- History timeline.

### 9.5 AI Tutor

Must include:

- Clear source-grounded behavior.
- Source references.
- Refusal state when material is insufficient.
- Feedback/report controls.
- Tenant policy messaging where relevant.
- No claim that AI makes official assessment or credential decisions.

## 10. Accessibility Requirements

Target: WCAG 2.2 AA.

Required:

- Semantic landmarks.
- Keyboard navigation.
- Visible focus states.
- Accessible names for controls.
- Error summaries for complex forms.
- Captions and transcripts workflows for media.
- Alt text workflows for images.
- Sufficient color contrast.
- Reduced motion support.
- Screen reader-friendly status updates.
- Tables with headers and captions.
- Modal focus trapping.
- Toast alternatives for critical messages.

Accessibility is a release requirement, not a polish phase.

## 11. Tenant Theming

Tenant theming supports:

- Logo.
- Primary color.
- Secondary color.
- Accent color.
- Public site imagery.
- Certificate visual defaults.
- Email branding.
- Domain.

Governance rules:

- Semantic status colors remain system-controlled.
- Contrast validation blocks inaccessible color combinations.
- Admin and learning workflows retain product layout consistency.
- Tenant branding can style public pages more strongly than core application workspaces.

## 12. Dark Mode

Dark mode requirements:

- Token-based colors.
- No hardcoded light-only surfaces.
- Charts have dark palettes.
- Code blocks and API docs support dark mode.
- Focus, success, warning, danger, and info states remain visible.

## 13. Content Guidelines

Tone:

- Clear.
- Calm.
- Direct.
- Institutionally trustworthy.

Rules:

- Buttons use verbs: `Publish`, `Invite`, `Submit`, `Revoke`.
- Destructive actions name the consequence.
- Empty states explain what belongs there and offer the next permitted action.
- Error messages explain what happened and how to recover.
- Avoid in-app explanatory marketing copy inside functional tools.

## 14. Quality Gates

Before a shared component is accepted:

- Props are typed.
- Keyboard behavior is documented.
- Accessibility behavior is tested.
- Loading, empty, error, disabled, and success states are present where relevant.
- Dark mode is tested.
- Mobile behavior is tested.
- Visual regression examples exist when tooling is available.

## 15. Tooling Direction

Recommended:

- Tailwind CSS for tokens and utility styling.
- shadcn/ui as accessible component foundation.
- lucide-react for icons.
- React Hook Form and Zod for forms.
- TanStack Query for server state.
- Framer Motion for controlled motion.
- Storybook or equivalent once component library work begins.
- Playwright for critical UI and accessibility flows.
- axe tooling for automated accessibility checks.

## 16. Approval Criteria

This Design System is approved when stakeholders agree that:

- Design principles match the product.
- Tokens and component behavior are sufficient for implementation.
- Tenant branding rules preserve accessibility.
- Learner, admin, assessment, credential, AI, and analytics patterns are represented.

## 17. Next Artifact

The next artifact is the Project Folder Structure.
