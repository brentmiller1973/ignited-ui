# Contributing to Ignited UI

Thank you for your interest in contributing to Ignited UI! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ignited-ui.git
cd ignited-ui

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Run the demo page with hot reload
pnpm --filter @ignited-ui/core dev

# Build specific package
pnpm --filter @ignited-ui/core build
pnpm --filter @ignited-ui/themes build

# Run tests
pnpm --filter @ignited-ui/core test

# Lint
pnpm lint

# Format
pnpm format
```

## Component Development Guidelines

### 1. Design System Agnostic

All components MUST use generic `--ig-*` CSS variables:

✅ **Good:**
```css
color: var(--ig-color-primary);
border-radius: var(--ig-radius-md);
```

❌ **Bad:**
```css
color: var(--md-sys-color-primary);
border-radius: 12px;
```

### 2. Accessibility First (WCAG 2.1 AA Minimum)

Every component must include:

#### Required Accessibility Features

- [ ] Proper ARIA labels, roles, and states
- [ ] Full keyboard navigation support
- [ ] Focus indicators meeting 3:1 contrast ratio
- [ ] Minimum 44x44px touch targets
- [ ] Screen reader support
- [ ] Color contrast: 4.5:1 for text, 3:1 for UI
- [ ] Support for `prefers-reduced-motion`
- [ ] Support for `prefers-contrast: high`
- [ ] No color-only information
- [ ] Text resizable up to 200%

#### Focus Management

```typescript
button:focus-visible {
  outline: var(--ig-focus-ring-width, 2px)
          var(--ig-focus-ring-style, solid)
          var(--ig-focus-ring-color, var(--ig-color-primary));
  outline-offset: var(--ig-focus-ring-offset, 2px);
}
```

#### Touch Targets

```css
:host {
  min-width: var(--ig-min-touch-target, 44px);
  min-height: var(--ig-min-touch-target, 44px);
}
```

### 3. Component Structure

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ig-component-name')
export class IgComponentName extends LitElement {
  static styles = css`
    /* Component styles using --ig-* variables */
  `;

  @property({ type: String })
  variant: 'default' | 'alternate' = 'default';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  render() {
    return html`
      <!-- Template with proper ARIA attributes -->
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ig-component-name': IgComponentName;
  }
}
```

### 4. Event Naming

All custom events MUST use the `ig-` prefix:

```typescript
this.dispatchEvent(
  new CustomEvent('ig-change', {
    detail: { value: this.value },
    bubbles: true,
    composed: true,
  })
);
```

### 5. Testing Requirements

Every component must have:

1. **Unit Tests**
   - Basic rendering
   - All variants and states
   - Event handling
   - Keyboard interactions

2. **Accessibility Tests**
   - ARIA attributes
   - Keyboard navigation
   - Focus management
   - Touch target sizes

3. **Visual Tests** (in Storybook)
   - All variants
   - All states (hover, focus, disabled, etc.)
   - Light and dark themes

Example test structure:

```typescript
describe('ig-component', () => {
  describe('basic rendering', () => {
    it('should render with default properties', async () => {
      // Test code
    });
  });

  describe('variants', () => {
    // Variant tests
  });

  describe('states', () => {
    // State tests
  });

  describe('events', () => {
    // Event tests
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      // Test code
    });

    it('should support keyboard navigation', async () => {
      // Test code
    });

    it('should have minimum touch target size', async () => {
      // Test code
    });
  });
});
```

## Theme Development

### Creating a New Theme

1. Create a new theme file in `packages/themes/`:

```css
/* packages/themes/my-theme/my-theme.css */

:root {
  /* Override primitives if needed */
  --ig-font-family-base: 'Custom Font', sans-serif;

  /* Override shape system */
  --ig-radius-sm: 2px;
  --ig-radius-md: 4px;
  --ig-radius-lg: 8px;

  /* Override colors */
  --ig-palette-primary-40: #custom-color;

  /* Override motion */
  --ig-transition-duration-base: 200ms;
}
```

2. Users can then load your theme:

```html
<link rel="stylesheet" href="@ignited-ui/themes/my-theme.css">
```

## Pull Request Process

1. **Branch Naming**
   - Feature: `feature/component-name` or `feature/description`
   - Bug fix: `fix/issue-description`
   - Docs: `docs/description`

2. **Commit Messages**
   - Follow [Conventional Commits](https://www.conventionalcommits.org/)
   - Examples:
     - `feat(button): add loading state`
     - `fix(input): resolve focus trap issue`
     - `docs: update accessibility guidelines`
     - `test(checkbox): add keyboard navigation tests`

3. **PR Checklist**
   - [ ] Code follows style guidelines (run `pnpm lint`)
   - [ ] All tests pass (run `pnpm test`)
   - [ ] New tests added for new features
   - [ ] Accessibility requirements met
   - [ ] Documentation updated (if needed)
   - [ ] Changeset added (run `pnpm changeset`)
   - [ ] Component works in demo page

4. **Review Process**
   - All PRs require at least one review
   - Address all review comments
   - Ensure CI passes

## Adding a New Component

1. Create component directory:
   ```bash
   mkdir -p packages/core/src/components/my-component
   ```

2. Create component file:
   ```
   packages/core/src/components/my-component/
   ├── ig-my-component.ts
   └── ig-my-component.test.ts
   ```

3. Export component:
   ```typescript
   // packages/core/src/index.ts
   export { IgMyComponent } from './components/my-component/ig-my-component.js';
   ```

4. Add to demo page:
   ```html
   <!-- packages/core/index.html -->
   <ig-my-component>Content</ig-my-component>
   ```

5. Write tests

6. Create Storybook story (when Storybook is set up)

## Code Style

### TypeScript

- Use strict mode
- Prefer `const` over `let`
- Use type annotations for public APIs
- Avoid `any` (use `unknown` if needed)

### CSS

- Use CSS custom properties for all theming
- Follow BEM-like naming for classes (if needed)
- Use CSS logical properties (`inline-start` vs `left`)
- Mobile-first responsive design

### Naming Conventions

- Component prefix: `ig-*`
- Event prefix: `ig-*`
- CSS variables: `--ig-*`
- TypeScript: camelCase for properties, PascalCase for classes

## Accessibility Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Material Design Accessibility](https://m3.material.io/foundations/accessible-design/overview)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Testing Accessibility

### Automated Testing

```bash
# Run accessibility tests
pnpm test
```

### Manual Testing

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Test arrow keys (where applicable)
   - Test Enter/Space activation
   - Test Escape cancellation
   - Verify focus indicators visible

2. **Screen Reader Testing**
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)

3. **Color Contrast**
   - Use browser DevTools
   - Test in light and dark modes
   - Test in high contrast mode

4. **Motion Sensitivity**
   - Enable `prefers-reduced-motion`
   - Verify animations disabled

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management.

1. Create a changeset:
   ```bash
   pnpm changeset
   ```

2. Select packages and change type (major/minor/patch)

3. Write changelog entry

4. Commit the changeset

5. Maintainers will handle publishing

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Join our community chat (link TBD)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
