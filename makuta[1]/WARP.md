# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**makuta-admin-center** is a Next.js 15 admin dashboard built with React 19, TypeScript, and Tailwind CSS v4. It integrates with AWS Cognito for authentication and uses shadcn/ui components for the UI layer.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### UI Component Management
- Components follow shadcn/ui patterns - use `components.json` for configuration
- New shadcn/ui components should be added to `src/components/ui/`
- Component aliases are configured: `@/components`, `@/lib`, `@/hooks`

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── component/         # Component showcase/demo page
│   ├── login/             # Login page route
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and Tailwind config
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui component library
├── lib/                  # Utilities and business logic
│   ├── component/        # Feature-specific components
│   │   └── feature/      # Login component logic
│   └── utils.ts          # Utility functions (cn helper)
```

### Key Technologies
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom theme variables, tw-animate-css
- **UI Components**: shadcn/ui (Radix UI primitives + class-variance-authority)
- **Icons**: Lucide React
- **Data Tables**: TanStack Table v8
- **Authentication**: AWS Cognito (hosted UI)

### Architecture Patterns

#### Component Organization
- **UI Components**: Pure presentation components in `src/components/ui/`
- **Feature Components**: Business logic components in `src/lib/component/feature/`
- **Page Components**: Route-specific components in `src/app/*/page.tsx`

#### Styling System
- Uses Tailwind CSS v4 with extensive CSS custom properties
- Dark/light theme support via CSS variables
- Component styling via `cn()` utility (clsx + tailwind-merge)
- Custom variant system using class-variance-authority

#### Authentication Flow
- Two-column login layout: branded left panel (hidden on mobile) + login form on right
- Login redirects to AWS Cognito hosted UI
- Cognito URL: `https://eu-central-1lg7yecqer.auth.eu-central-1.amazoncognito.com`
- Expected callback: `http://localhost:3000/auth/callback`
- Scopes: email, openid, phone

### Configuration Files
- **Next.js**: `next.config.ts` (minimal configuration)
- **TypeScript**: `tsconfig.json` with path mapping (`@/*` → `./src/*`)
- **ESLint**: `eslint.config.mjs` with Next.js rules
- **PostCSS**: `postcss.config.mjs` for Tailwind
- **shadcn/ui**: `components.json` with "new-york" style

## Development Guidelines

### Adding New Components
1. Use shadcn/ui CLI for base components: place in `src/components/ui/`
2. Feature components go in `src/lib/component/feature/`
3. Follow existing patterns: use `cn()` for className merging
4. Maintain TypeScript strict mode compliance

### Styling Conventions
- Use CSS custom properties defined in `globals.css` for theming
- Leverage the configured Tailwind theme variables
- Maintain both light and dark mode support
- Use semantic color naming (primary, secondary, accent, etc.)
- Follow mobile-first responsive design with Tailwind breakpoints
- Use `lg:` prefix for desktop-specific layouts (like login page split view)

### Authentication Integration
- All Cognito configuration is hardcoded in `/src/lib/component/feature/login.tsx`
- Update client_id, redirect_uri, and domain when deploying to different environments
- Authentication state management not yet implemented - consider adding context/state management

### Page Structure
- Follow Next.js App Router conventions
- Use server components by default, mark with `"use client"` only when needed
- Maintain consistent layout structure via `src/app/layout.tsx`

## Known Patterns

### Component Export Pattern
- UI components export both component and variants (e.g., `Button`, `buttonVariants`)
- Feature components are default exports
- Page components are default exports following Next.js conventions

### Import Aliases
- `@/components` for UI components
- `@/lib` for utilities and business logic
- `@/hooks` for custom hooks (directory not yet created)

### Data Display
- Uses TanStack Table for complex data tables
- Column definitions follow standard pattern with sorting, filtering, and actions
- Example implementation in `src/app/component/page.tsx`