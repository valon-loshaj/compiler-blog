---
title: "Your .claude config is drifting. And it is costing you more than you think."
date: "2026-04-14"
subtitle: "How I built a package manager for Claude Code configuration"
---

## Intro

Anyone that has incorporated Claude Code (CC) into their software development workflow will probably agree that their CLAUDE.md file is a very important part of their workflow. Similarly, anyone that has adopted a multi-agent workflow with several parallel agents autonomously working on separate tasks has a distinct appreciation for global and local .claude artifacts.

I've spent quite a bit of time fine tuning my CLAUDE.md for each of the repos I work with. I've also tinkered with different skills, introduced commands to simplify workflows and experimented with plugins both locally and from marketplaces. I've found that these artifacts are tremendously powerful in accelerating my workflow. However, I've also experienced the friction when trying to keep all these artifacts in sync across repos and machines. For example I'll be working in one repo, and notice that a particular skill can be improved with a small adjustment, or a new skill can be added to either eliminate toil or better guide the agent. I adjust for that repo or I adjust the global `.claude` directory, however that enhancement also needs to be reflected in my other repos. Or in the case of the global `.claude` directory, those enhancements don't easily reflect for my other machines, docker containers, or other developers that share that global skill on their machine. This leads to configuration drift across artifacts with no easy way of fixing other than copy-pasting files back and forth.

The cost of this drift goes beyond inconsistency. The content in your CLAUDE.md file and the contents of your `.claude` directory are loaded into Claude's finite context window. Every token in that context window costs money per turn, so unnecessary or duplicate content directly inflates your bill while crowding out the context that actually matters. When CC's context window gets full, it triggers auto-compaction (a process that compresses the conversation and discards a significant chunk of important context). Stale or redundant artifacts accelerate this, leading to premature compaction that causes the agent to forget architectural decisions, re-attempt failed approaches, and lose situational awareness mid-task. Anyone that has experienced this will tell you, it's very frustrating.

We've seen this first hand with a recent Claude Code bug (Issue #29971) which shows stale versions of plugins persisting in system prompts. A developer who thought they only had 30 configured plugins saw 60+ entries (ghost tokens) get injected into their context window because old cached versions were never cleaned up. The result: inflated cost per turn and premature auto-compaction triggered by content that shouldn't have been there at all.

This gets worse when working with teams of engineers. If there are multiple teams working on a monorepo or multi-service org, one team might notice that a particular agent keeps hitting a wall when working on a particular task. They adjust the `.claude` directory files or CLAUDE.md and commit the changes to the repo since this team has integrated these files right into their repo so they can be shared across the org. However, there are several issues with this. Those changes might conflict with the guidance from another team, which creates confusion. The changes introduced to the CLAUDE.md file may introduce an unexpected regression for another team member's workflow when they notice a subtle shift in the agent's behavior. Maybe another team member is working on a similar task, seeing the agent get stuck, but isn't able to pull in those same enhancements because they don't have the most recent version of the `.claude` or CLAUDE.md files. Worse, there's no way to know a newer version exists, or which version they're currently running.

The irony of this situation is that we version our code, our dependencies, our infrastructure, but the critical files that tell our AI agents how to work with all of that are unversioned, copy-paste artifacts that may or may not be shared across the team or organization.

## .claude Directories Are Artifacts, Not Config Files

`.claude` directories are not just documentation, they are operational artifacts that directly impact the behavior of AI agents. A single line in a CLAUDE.md file can change which testing framework the agent reaches for, whether it writes integration tests or unit tests first, or whether it avoids a particular API pattern your team has already tried and abandoned. Changes to skills and hooks can affect the security posture of generated code, the output quality, and even which tools the agent is allowed to invoke. These aren't passive reference files, they shape what the agent does and how it does it.

The CLAUDE.md file in a repo is not a README. Its primary audience isn't you (the human) it's the agent. It contains code style guidelines, architectural guardrails, project constraints, and other critical details that govern how the agent operates within your codebase. One of the ways I find myself using this frequently is as a way of storing past failures and dead-ends so that the agent doesn't burn a ton of tokens and time going down the same rabbit holes. It functions more like an operating system the agent runs on than a reference document it reads.

Skills are also becoming bigger than any single tool. The SKILL.md open specification (standard Markdown with YAML frontmatter) means skills designed for Claude Code are broadly compatible with Copilot, Cursor, Gemini CLI, Codex CLI, and others. This is quickly becoming a cross-platform standard for defining agent capabilities. Versioning these files isn't just about Claude, it's about the portable AI tooling ecosystem that's emerging across the industry.

If these artifacts affect agent behavior across platforms, they should be versioned, distributed, and managed like any other software dependency. The mental model is straightforward: what npm does for JavaScript packages, the clanchor CLI that I built does for `.claude` packages and CLAUDE.md files. One source of truth, semantic versioning, deterministic resolution. Currently, there isn't a standardized way of doing this which is the gap that motivated me to build clanchor in the first place.

## The Ecosystem Gap: Why Existing Tools Don't Solve This

A few options have risen as potential solutions for this problem. However, in my opinion they all have gaps which prevent them from being the comprehensive solution that teams actually need. Before jumping into clanchor, it's worth walking through what exists and where each falls short.

### Anthropic's Native Marketplace

When I came across this, it looked promising because it provided a way for individuals to discover potential claude artifacts that they want to bring into their workflow. It also provided a pretty simple way of pulling in those plugins and installing the plugin commands right from the CLI. However after a closer look, and trying to use this in my everyday workflow, it quickly falls apart.

The main issue is that when pulling plugins from remote marketplaces there isn't a way to pin the version of the plugin. The marketplace always fetches the default branch, so there is no guarantee that pulling in a plugin on Monday will give you the same logic than pulling the same plugin in on Wednesday. There's no support for pinning a tag, commit SHA, or branch.

Beyond versioning, there's no mechanism for a project to declare "you need these plugins installed." Some teams have resorted to adding content in their CLAUDE.md file that reminds the agent to remind the developer to always pull in the required plugins (see Issue #27113), which feels more like a bandaid than an actual solution. When your dependency management strategy relies on an AI agent nagging humans to manually install things, you have a declarative dependency gap.

### The Tons of Skills Marketplace and ccpi

The ccpi (Claude Code Plugin Installer) is a Node.js based CLI that treats plugins as node packages. There has been a tremendous amount of effort put into this. There are over 400 plugins and ~3,000 skills on their marketplace as of the time of writing this post, with automated governance including a 100-point rubric, alignment checks, and CI smoke tests.

When trying to use this, I found it limiting that I can only pull in skills and plugins, not the entire `.claude` topology nor could I pull in CLAUDE.md files. This meant that all my hooks, agents and project-scoped commands were all left out. Also, the decision to support skills and plugins means someone using this tool cannot treat the entire `.claude` directory as one versioned unit. This is really important when resolving dependencies between the different artifacts within the package.

While ccpi solves the discovery and installation problem well, and is a genuinely simple way to pull down skills and experiment with them, it doesn't address the full scope of what teams need which is synchronizing the entire `.claude` topology as a single versioned unit.

### NPM Registry Integration

I tinkered with the NPM (Node Package Manager) registry integration supported by CC which enables me to pull down plugins in a similar way that I would pull down node modules. This is pretty clever because it leverages an existing battle-tested package manager with versioning and support for enterprise registries like Nexus and Artifactory.

However, similar to ccpi, this also doesn't handle CLAUDE.md files, or other artifacts such as agents, hooks, and project-scoped commands. So we end up in a similar situation where we can bolt on skills and plugins, but no two developers have a simple way of pulling in the full set of CC artifacts that would give them a standardized environment for running their agents.

### The Gap

All of these tools install *plugins*. None of them orchestrate the *environment*. When a new developer clones a monorepo, initializing the AI agent requires the right skills, the right CLAUDE.md context at the right directory levels, the right hook configurations, and the right scope boundaries, and all version-aligned. That's the piece that's missing. Each of these tools solves a slice of the problem, but none of them treat the `.claude` directory as a single deployable unit that can be versioned, shared, and deterministically reproduced across machines and teams.

## How clanchor Works

The workflow is straightforward once you understand the pieces involved: a registry, a manifest, and a lock file.

The registry is a GitHub repo by design. No server to provision, no database to manage, no auth system to configure. You organize your `.claude` packages and CLAUDE.md files as directories in the repo and use git tags to define versions. If `gh` can read it, clanchor can resolve from it. Public, private, and org-internal repos all work.

In your target repo where you want the artifacts installed, you run the following command to scaffold a manifest:

```bash
clanchor init <registry address>
```

This creates a `clanchor.json` file in the root of the target repo. Using that manifest, you add the relevant `packages` (`.claude` artifacts) and `claude_md` (CLAUDE.md artifacts) entries, each pinned to a specific version tag from the registry. The clanchor package manager allows you to specify whether a package targets the global scope (`~/.claude/`) or the project scope (`./.claude/`), satisfying both use cases.

Once the manifest is in place, you run:

```bash
clanchor install
```

This fetches the correct versions from the registry, writes the files into the appropriate directories, and generates a `clanchor-lock.json` file. The lock file pins the exact resolved versions along with per-file SHA-256 hashes, so running `clanchor install` on any machine produces an identical `.claude` directory. No ambiguity, no drift.

That's it. Commit the manifest, the lock file, and the resolved output. Your `.claude` configuration is now versioned and reproducible.

## What You Can Distribute

There are two artifact types that clanchor manages: `.claude` packages and standalone CLAUDE.md files.

### .claude Packages

This artifact type captures the entire directory tree including skills, agents, commands, and hooks. After pulling in a `.claude` package, you should have all the necessary operational context for an agent to go complete work on a task for that particular repo.

A project has a single `.claude` directory, but your manifest can reference multiple source packages that get merged into it. For example, you might pull in a shared "platform-standards" package from your org registry alongside a team-specific "backend-services" package. When resolving the directory tree, clanchor tracks every file with SHA-256 hashes for integrity and detects conflicts before writing anything. If two packages provide the same file, you'll know about it immediately rather than discovering it through unexpected agent behavior.

One thing I've learned through experience: the balance you want to strike is giving the package exactly what it needs to complete work efficiently and accurately without bloating the context. Everything in a `.claude` package gets loaded into the agent's context window, so each file should earn its place. If a skill isn't being used or a hook is outdated, it's not just dead weight; it's consuming tokens that could be used for actual task context.

### CLAUDE.md Files

These are standalone context files placed at specific directories in your repo. They're useful for org-wide or team-level guidance that doesn't ship with skills, things like coding conventions, architectural principles, or constraints that apply across multiple services.

This maps directly to how Claude Code resolves context. It reads up the directory tree, loading CLAUDE.md files at each level: global (`~/.claude/CLAUDE.md`), then project root (`./CLAUDE.md`), then child directories (`child/CLAUDE.md`). This layering is powerful because you can set broad organizational context at the root and progressively narrow it at deeper levels with team-specific or service-specific guidance.

clanchor lets you manage this full hierarchy from a single manifest. Instead of manually placing CLAUDE.md files at different directory levels and hoping they stay in sync, you declare which context files go where and at which version. The result is a consistent, version-controlled context hierarchy that every developer on the team inherits when they run `clanchor install`.

## Design Decisions

A few decisions shaped how clanchor works under the hood. These are the ones I get asked about most and the ones I think are worth understanding if you're evaluating whether this fits into your workflow.

### Why a Registry Is Just a Git Repo

No infrastructure to set up. No server, no database, no auth system beyond what GitHub already provides. The registry is a Git repo where directory structure defines the namespace and git tags define versions. If `gh` can read it, clanchor can resolve from it. Public, private, and org-internal repos all work the same way.

This was deliberate. I wanted the barrier to entry to be zero beyond what a typical engineering team already has. I've noticed that if adopting a tool requires provisioning infrastructure before a user can even try it, most people won't bother. A Git repo is something every engineering team already maintains and understands.

### Why Go

A single static binary with no runtime dependencies is the fastest path to setup. You download it and it works. No Node.js runtime, no Python virtual environment, no dependency resolution just to run the tool that manages your other dependencies.

Go is also the go-to (pun-intended) for DevEx CLI tools. If you've used `gh`, `docker`, `kubectl`, or `terraform`, you've used Go CLIs. I feel that familiarity really matters for contributors who want to read the source or open a PR.

### Why a Centralized Manifest Instead of Scattered Markers

The first version of clanchor used per-directory marker files to track what was installed where. It worked, but it was hard to reason about. Reviewing the full dependency set meant hunting through multiple directories, and cross-directory concerns like scope and conflict detection didn't fit the model cleanly.

Version 2 moved to a single `clanchor.json` at the repo root. One file to review, one file to diff, one file to reason about. Teams can see the entire dependency set at a glance during code review. This also simplified conflict detection since the CLI can evaluate all packages together before writing any files.

### Why a Lock File

The lock file gives you reproducibility. A teammate clones the repo and runs `clanchor install`, and they get the exact same `.claude` directory you have. If someone bumps a version or removes a package, the diff surfaces it explicitly instead of things silently changing underneath you.

But the lock file is also a security boundary, and I think this is under-appreciated. Agent skills aren't passive text. They can execute arbitrary bash, read environment variables, trigger webhooks, and bridge to cloud APIs via MCP servers. An unpinned skill update from a compromised registry is fundamentally the same attack vector as the npm supply chain incidents we've seen with typo-squatting and malicious post-install hooks.

A lock file with pinned versions and per-file SHA-256 hashes means you can audit exactly what your agent is authorized to do. A `clanchor install` on a clean machine gives you the exact same attack surface as the machine that created the lock file. In a world where agents are becoming more autonomous, that kind of audit-ability shouldn't be optional.

## Where I Want to Take It

clanchor solves the core problem today, but there are clear areas where it needs to grow. Here's what's on the roadmap.

**Parallel resolution.** The current resolve loop processes packages sequentially. This is fine for a handful of packages, but monorepos with dozens of dependencies need concurrency. This is the next performance-focused change.

**`clanchor add`.** Right now, adding a package means editing `clanchor.json` by hand. A single command that adds a package entry, validates the tag against the registry, and updates the manifest would remove that friction.

**Batch version updates with `clanchor bump`.** When you update a package in the registry, you shouldn't have to manually edit every repo that consumes it. A bump command that updates a package version across all repos that reference it is the natural next step for teams managing multiple services.

**VS Code extension.** A custom file icon for `clanchor.json` and JSON schema validation for autocomplete would make the manifest easier to work with. Small quality-of-life improvements, but they add up when you're editing manifests frequently.

**Additional registry backends.** Git repos work well as registries, but many organizations have stricter network policies that require artifacts to flow through systems like Nexus, Artifactory, or S3. Supporting these as alternative backends is important for enterprise adoption.

**Container and CI documentation.** clanchor already works in Docker and CI environments using a `GH_TOKEN` for authentication, but the setup isn't well documented yet. Teams running Claude Code in dedicated containers or CI pipelines need clear guidance on how to integrate clanchor into those workflows.

If any of these are particularly important to your workflow, I'd love to hear about it. Contributions and feedback are welcome, and I'll talk more about how to get involved at the end of this post.

## The Bigger Picture

We're in the early days of AI-assisted development. The tools, patterns, and infrastructure that will define how teams work with AI agents are still being figured out. A lot of attention goes to model capabilities, context window sizes, and benchmark performance. Less attention goes to the operational layer underneath: how to manage the configurations that govern what these agents actually do?

Context management is an unsexy but critical piece of this infrastructure. The quality of what your AI produces is directly proportional to the quality of context it receives. Right now, most teams treat their `.claude` directory as an afterthought. Someone writes a CLAUDE.md once, maybe adds a skill or two, and then it sits there unchanged while the codebase evolves around it. clanchor is an attempt to change that by making these files first-class managed artifacts with the same lifecycle as any other dependency.

I'm already seeing the industry is starting to move in this direction. I recently read that JFrog has adapted Artifactory to serve as an agent skills repository with immutable versioning and trust controls. The framing is the same one this entire post is built on: agent skills are software assets that require the same lifecycle management as compiled code. When companies that build enterprise package infrastructure start treating agent configuration this way, it's a signal that this problem is real and growing.

As AI agents become more autonomous, the configuration they operate with becomes more important, not less. Anthropic's internal C compiler project reportedly ran roughly 2,000 sessions autonomously. At that scale, the agent's CLAUDE.md is its persistent memory across sessions. The skills define its capabilities. The hooks govern its side effects and the context is the working memory. These aren't nice-to-haves. They're the control plane.

Getting this right early compounds. The teams that treat their agent configuration as managed infrastructure today will have a structural advantage as agentic workflows become the default way software gets built. The tooling is still nascent, and the patterns are still forming. That's exactly why it's worth investing in now.

## Try It

If any of this resonated, give clanchor a try. The quickest way to get started:

```bash
# Homebrew
brew tap valon-loshaj/tap
brew install clanchor

# Go
go install github.com/valon-loshaj/clanchor/cmd/clanchor@latest

# Or grab a binary from the releases page
```

The repo is here: [clanchor](https://github.com/valon-loshaj/clanchor)

### Contributing

The project is early and there's a lot of room to shape it. The areas where help would be most valuable right now include additional registry backend support, testing across different monorepo structures, and documentation for CI and container workflows.

Details on how to contribute are in the CONTRIBUTING.md file within the repo.

If you've run into the same configuration drift problems this post describes, or if you have thoughts on how clanchor could better fit your workflow, I'd genuinely like to hear from you. Open an issue, submit a PR, or reach out directly.
