# Pull Request Pre-flight

Before changing code:

1. Fetch `origin` and branch from the latest intended target, never a stale local branch.
2. If a change depends on an open pull request, explicitly stack the branch on that pull request and set the new pull request's base branch to the parent branch.
3. Read the complete affected UI component and preserve approved copy, links, and layout outside the requested change.

Before pushing:

1. Review the full diff against the intended base branch and verify the exact requested UI text and links locally.
2. Run only one Next.js development server per working tree. Stop it before running a production build so concurrent processes do not share `.next`.
