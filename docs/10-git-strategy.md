# Git Strategy

## Document Control

| Field | Value |
| --- | --- |
| Product | Disyn Vocational Learning Ecosystem |
| Document | Git Strategy |
| Version | 0.1.0 |
| Status | Draft for stakeholder review |
| Date | 2026-07-01 |
| Depends On | docs/09-monorepo-structure.md |
| Repository | C:\Users\Hp\Disyn |

## 1. Purpose

This document defines the Git workflow, branching model, commit standards, code review expectations, release tags, and repository hygiene for Disyn.

## 2. Strategy Decision

Decision: Use trunk-based development with short-lived feature branches.

Rationale:

- Keeps integration continuous.
- Reduces long-running merge conflicts.
- Supports CI/CD.
- Works well with feature flags.
- Keeps enterprise delivery disciplined without heavy Git Flow overhead.

## 3. Branches

| Branch Type | Pattern | Purpose |
| --- | --- | --- |
| Main | `main` | Always releasable. |
| Feature | `codex/{short-description}` or `feat/{short-description}` | New feature work. |
| Fix | `fix/{short-description}` | Bug fix. |
| Chore | `chore/{short-description}` | Tooling, docs, maintenance. |
| Release | `release/{version}` | Optional hardening branch for major releases. |
| Hotfix | `hotfix/{short-description}` | Urgent production fix. |

Default branch prefix in this workspace should be `codex/` unless the user requests another prefix.

## 4. Commit Convention

Use Conventional Commits.

Format:

```text
type(scope): summary
```

Examples:

```text
docs(architecture): add database design
feat(auth): add tenant-aware login
fix(credentials): prevent revoked certificate verification mismatch
test(assessment): cover practical grading moderation
chore(ci): add prisma migration check
```

Types:

- `feat`
- `fix`
- `docs`
- `test`
- `refactor`
- `perf`
- `chore`
- `ci`
- `build`
- `security`

## 5. Pull Request Rules

Every PR should include:

- Summary.
- Linked epic, feature, or story.
- Testing performed.
- Migration notes if database changed.
- Security impact if relevant.
- Accessibility impact if UI changed.
- Screenshots or videos for UI changes.
- Rollback notes for risky changes.

PR size guidance:

- Prefer small PRs under 500 changed lines when practical.
- Larger PRs require a clear review guide.
- Schema migrations, auth, tenant isolation, credentialing, and AI policy changes require extra scrutiny.

## 6. Required Reviews

| Change Type | Required Review |
| --- | --- |
| Documentation only | 1 reviewer or owner approval. |
| UI feature | Frontend plus design/accessibility review. |
| API feature | Backend review. |
| Database migration | Backend plus database review. |
| Auth/RBAC/security | Security review. |
| Tenant isolation | Security plus backend architecture review. |
| Credentialing | Backend plus product/compliance review. |
| AI tutor behavior | AI plus security/privacy review. |
| Infrastructure | DevOps review. |

## 7. Branch Protection

`main` requires:

- PR review.
- Passing CI.
- Up-to-date branch before merge.
- No unresolved conversations.
- No direct pushes except emergency admin policy.
- Secret scanning pass.
- Migration validation when database files change.

Recommended merge method:

- Squash merge for most PRs.
- Merge commit only for release branches where preserving grouped history matters.

## 8. CI Checks

Required checks:

- Install dependencies.
- Lint.
- Typecheck.
- Unit tests.
- Build.
- Prisma schema validation.
- Migration drift check.
- Secret scan.
- Dependency vulnerability scan.

Conditional checks:

- Integration tests when backend/database touched.
- E2E tests when UI routes or critical workflows touched.
- Accessibility tests when UI components touched.
- AI evals when AI behavior changed.

## 9. Release Tags

Use semantic versioning after production launch:

```text
v1.0.0
v1.1.0
v1.1.1
```

Pre-release tags:

```text
v0.1.0-foundation
v0.2.0-learning-core
v0.3.0-assessment-credentials
```

## 10. Feature Flags

Use feature flags for:

- New workspaces.
- AI tutor.
- Mobile offline sync.
- Employer portal.
- Credential issuance automation.
- High-risk admin workflows.
- Tenant-specific rollout.

Rules:

- Flags have owners.
- Flags have cleanup dates.
- Flags are audited when tenant-visible.
- Long-lived flags require documentation.

## 11. Database Change Workflow

1. Create schema change in feature branch.
2. Generate migration.
3. Review migration SQL.
4. Add migration tests where practical.
5. Validate on local database.
6. Run CI migration checks.
7. Document rollback or forward-fix plan.
8. Deploy migration before code only when expand-contract requires it.

Production rules:

- No `prisma db push`.
- No destructive migration without backup.
- No migration mixed with unrelated changes.

## 12. Documentation Workflow

Docs are updated in the same PR as the feature when behavior changes.

Required updates by change:

| Change | Docs |
| --- | --- |
| Architecture decision | ADR. |
| API change | API docs and OpenAPI. |
| Database change | Database docs and migration notes. |
| UI pattern | Design system or component inventory. |
| Deployment change | Deployment guide. |
| Security behavior | Security docs and threat model. |

## 13. Security Hygiene

Rules:

- Never commit `.env` secrets.
- Use `.env.example` for required variables.
- Rotate secrets if exposure is suspected.
- Keep dependencies current.
- Audit auth, RBAC, tenant isolation, credentials, and AI changes carefully.
- Include security tests for sensitive changes.

## 14. Approval Criteria

This Git Strategy is approved when stakeholders agree that:

- Trunk-based development is acceptable.
- Branch, commit, PR, review, CI, release, and migration standards are clear.
- Security and documentation requirements are enforceable.

## 15. Next Artifact

The next artifact is the Development Roadmap.
