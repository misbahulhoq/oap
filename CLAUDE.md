@AGENTS.md

# Figma MCP Integration Rules

These rules define how to translate Figma designs into code for this project and must be followed for every Figma-driven change.

## Project Overview

- **Framework**: Next.js 16 with React 19 (App Router)
- **Styling**: Tailwind CSS v4 with CSS variables (oklch color space)
- **UI Library**: shadcn/ui with "radix-mira" style
- **Icons**: Lucide Icons (`lucide-react`)
- **TypeScript**: Strict mode enabled

## Component Organization

- **UI Components**: `src/components/ui/` — Reusable primitive components (Button, Input, Card, etc.)
- **Feature Components**: Create in `src/components/` organized by feature
- **Page Components**: `src/app/` — Next.js App Router pages and layouts
- **Utilities**: `src/lib/utils.ts` — Shared utility functions
- **Hooks**: `src/hooks/` — Custom React hooks

## Design Tokens

All design tokens are defined as CSS variables in `src/app/globals.css`:

### Colors

- IMPORTANT: Never hardcode hex colors or arbitrary color values
- Use semantic tokens: `var(--primary)`, `var(--secondary)`, `var(--background)`, etc.
- Available tokens: `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--card`, `--popover`, `--foreground`, `--border`, `--input`, `--ring`, and their `-foreground` variants
- Dark mode tokens are defined in `.dark` class and automatically applied

### Typography

- Font family: `--font-sans` (DM Sans), `--font-geist-sans`, `--font-geist-mono`
- Apply with Tailwind: `font-sans`, `font-mono`

### Spacing & Radius

- Use Tailwind's default spacing scale
- Border radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-3xl`, `--radius-4xl`
- Apply via Tailwind: `rounded-sm`, `rounded-md`, `rounded-lg`, etc.

## Figma Implementation Flow

### Required Steps (do not skip)

1. **Get design context**: Run `get_design_context` with nodeId and fileKey from the Figma URL
2. **Get screenshot**: Run `get_screenshot` for visual reference of the node being implemented
3. **Map Figma colors**: Figma colors should map to semantic tokens from `globals.css`, not hardcoded values
4. **Check existing components**: Look for matching components in `src/components/ui/` before creating new ones
5. **Download assets**: If Figma MCP returns localhost sources for images/SVGs, use them directly
6. **Validate**: Compare implementation against Figma screenshot for 1:1 visual parity

### Handling Figma MCP Output

- The Figma MCP server outputs React + Tailwind as a reference representation
- IMPORTANT: Translate Tailwind classes to match this project's conventions
- Replace arbitrary colors with semantic tokens from `globals.css`
- Use existing shadcn/ui components when they match the design intent

## Styling Conventions

### Utility Classes

- Use Tailwind utility classes for all styling
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Example: `className={cn("base-classes", condition && "conditional-class")}`

### Component Variants

- Use `class-variance-authority` (cva) for components with multiple variants
- Follow the pattern in `src/components/ui/button.tsx`
- Define variants: `variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'`
- Define sizes: `size: 'default' | 'sm' | 'lg' | 'icon'`

### Dark Mode

- Dark mode is supported via CSS variables in `.dark` class
- Apply dark mode classes using Tailwind's `dark:` prefix
- Example: `dark:bg-muted`, `dark:text-foreground`

## Icon Usage

- IMPORTANT: DO NOT install new icon libraries
- Use Lucide Icons from `lucide-react`
- Icons should use size and color props appropriately
- Example: `<MyIcon size={24}  />`

## Import Conventions

- Use path aliases: `@/components`, `@/lib`, `@/hooks`
- Group imports: React/Next.js, third-party, internal, types
- Example:
  ```tsx
  import * as React from "react";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  ```

## Component Patterns

### Standard Component Structure

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva("base-classes-here", {
  variants: {
    variant: {
      default: "default-variant-classes",
      // other variants
    },
    size: {
      default: "default-size-classes",
      // other sizes
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ComponentProps
  extends React.ComponentProps<"div">, VariantProps<typeof componentVariants> {
  // additional props
}

function Component({
  className,
  variant = "default",
  size = "default",
  ...props
}: ComponentProps) {
  return (
    <div
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Component, componentVariants };
```

### Data Attributes

- Use `data-slot` attribute for component identification
- Use `data-variant` and `data-size` for styling hooks
- Example: `data-slot="button"`, `data-variant={variant}`

## Accessibility

- All interactive elements must have proper aria attributes
- Use semantic HTML elements (`button`, `a`, etc.) over `div` with click handlers
- Ensure focus-visible states: `focus-visible:ring-2 focus-visible:ring-ring/30`
- Support keyboard navigation for interactive components

## Asset Handling

- The Figma MCP server provides assets via localhost sources
- IMPORTANT: If a localhost source is provided for an image or SVG, use it directly
- IMPORTANT: DO NOT create placeholder images or use external image services
- Static assets go in `public/` directory
- Use Next.js `Image` component for images: `import Image from "next/image"`

## shadcn/ui Integration

- This project uses shadcn/ui with the "radix-mira" style preset
- When adding new components, use shadcn CLI: `npx shadcn@latest add <component>`
- Components are located in `src/components/ui/`
- Always extend existing shadcn components rather than creating duplicates

## Common Patterns

### Buttons

- Use `Button` from `@/components/ui/button`
- Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
- Sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`

### Layout

- Use Tailwind flexbox and grid utilities
- Main layout uses `min-h-full flex flex-col` on body
- Pages should handle their own padding and max-width constraints

### Forms

- Use Radix UI primitives for complex form elements
- Style with Tailwind classes
- Support both light and dark modes

## Do Not

- DO NOT hardcode colors — always use semantic tokens
- DO NOT create new icon libraries or import from other sources
- DO NOT use inline styles — use Tailwind classes
- DO NOT skip the Figma validation step after implementation
- DO NOT create components without checking `src/components/ui/` first
- DO NOT use arbitrary values when semantic tokens exist
