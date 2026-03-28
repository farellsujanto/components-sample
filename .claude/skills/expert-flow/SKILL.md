---
name: expert-flow
description: A multi-model pipeline for high-stakes development (Planning, Implementation, and Quad-Review).
---

# Multi-Model Expert Workflow

When this skill is active, execute the development lifecycle using the following model routing:

## Phase 1: Architecture & Planning
**Model:** `Claude Opus 4.6`
- **Action:** Analyze the requirements and existing codebase to create a detailed implementation plan.
- **Goal:** Create a high-reasoning, multi-step implementation plan.
- **Focus:** Identify edge cases in thermal printing, potential memory leaks in Next.js, and JSX.

## Phase 2: Implementation
**Model:** `Claude Sonnet 4.6`
- **Action:** Follow the plan created by Opus 4.6.
- **Goal:** Write the Next.js code, ensuring compatibility with modern 2026 syntax.
- **Focus:** High-speed, high-accuracy coding with modern 2026 syntax.

## Phase 3: Triple-Pass Review
To ensure the code is production-ready, run the following reviews:

1. **Reviewer A (Optimization):** `Claude Sonnet 4.6`
   - Run two consecutive passes.
   - Pass 1: Syntax and logic errors.
   - Pass 2: Performance optimization and "mini" efficiency.

2. **Reviewer B (Deep Logic):** `Gemini 3`
   - Perform a final comprehensive review.
   - Focus: Cross-referencing the large context of the repository to ensure no breaking changes in existing functionality.

## Phase 4: Consensus / synthesis
After all 3 outputs are collected, YOU (the orchestrator) synthesize the final answer: