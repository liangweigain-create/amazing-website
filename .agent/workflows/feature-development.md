---
description: Enterprise-Grade Feature Implementation Workflow (React + Tailwind v4)
---

# Professional Feature Implementation Workflow

This workflow encodes the best practices for building robust, scalable, and aesthetically professional features in a React application.

## Phase 1: Reconnaissance & Design
1. **Analyze Specifications**:
   - Review `tech_specs.md` for dependencies and structure blueprint.
   - **Crucial**: Review `.gemini/GEMINI.md` for architectural rules and critical constraints.

2. **Domain Modeling (Type-First Approach)**:
   - **Action**: Define TypeScript interfaces and types *before* writing component logic.
   - **Location**: `src/features/[feature-name]/types/index.ts`.
   - **Content**: Domain entities, Form data schemas, Enums for states/roles.

## Phase 2: Design System & Styling
3. **Theming & Global Styles**:
   - Ensure `src/app/index.css` defines semantic CSS variables.
   - Register reusable component classes in `@layer components`.
   - **Constraint**: Strict adherence to `.gemini/GEMINI.md` constraints (e.g., Tailwind v4 rules).

4. **Component Decomposition**:
   - **Atomic UI**: Generic atoms (Buttons, Inputs) go in `src/components/ui`.
   - **Feature Components**: Business-specific widgets (e.g., `UserEditModal`, `CategoryTree`) go in `src/features/[feature-name]/components`.

## Phase 3: Core Implementation
5. **View Construction**:
   - Build static versions of components first to validate aesthetics (Blue/White professional theme).
   - Use functional components with hooks.

6. **Logic Integration**:
   - Implement state management using `useState` (local) or Zustand (global).
   - Integrate form handling and validation.
   - Connect `src/features/[feature-name]/pages` as the entry point for the route.

## Phase 4: System Integration
7. **Routing Configuration**:
   - Register new routes in `src/app/router.tsx`.
   - Use the `Layout + Outlet` pattern for nested navigation structures.

8. **Navigation Updates**:
   - Add access points (Links/Buttons) in `src/components/layout/MainLayout.tsx`.

## Phase 5: Quality Assurance & Verification
9. **Dev Server Startup**:
// turbo
   - Run `pnpm dev` to ensure the build pipeline is healthy.

10. **Functionality Verification**:
    - Inspect the new feature in the browser.
    - Verify responsive behavior and loading states.
    - Check browser console for hydration errors or React warnings.
    - Validate critical user flows (e.g., Login -> Dashboard -> Feature).