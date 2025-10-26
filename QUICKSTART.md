# Ignited UI - Quick Start Guide

## 🎯 What is Ignited UI?

Ignited UI is an **enterprise-grade, framework-agnostic UI component library** built with Lit 3.0 web components. It's designed to be:

- ✅ **Design-system agnostic** with generic CSS variables
- ✅ **Accessibility-first** (WCAG 2.1 AA/AAA compliant)
- ✅ **Framework-agnostic** (works with React, Angular, Vue, Svelte, vanilla HTML)
- ✅ **Material Design 3 by default** (but easily customizable)
- ✅ **Production-ready** with full TypeScript support

## 📦 Installation

### Option 1: View the Demo Locally

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm --filter @ignited-ui/core dev
```

Open your browser to the URL shown (typically `http://localhost:5173`)

### Option 2: Use in Your Project (when published)

```bash
# Install packages
npm install @ignited-ui/core @ignited-ui/themes

# Or with pnpm
pnpm add @ignited-ui/core @ignited-ui/themes
```

## 🚀 Usage

### Basic HTML Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>

    <!-- Include the Material Design 3 theme -->
    <link rel="stylesheet" href="node_modules/@ignited-ui/themes/dist/material.css" />

    <!-- Or use a CDN (when published) -->
    <!-- <link rel="stylesheet" href="https://unpkg.com/@ignited-ui/themes/dist/material.css" /> -->
  </head>
  <body>
    <!-- Use components -->
    <ig-button variant="filled">Click Me</ig-button>
    <ig-button variant="outlined">Secondary</ig-button>
    <ig-button variant="text" disabled>Disabled</ig-button>

    <!-- Import the component library -->
    <script type="module">
      import '@ignited-ui/core';

      // Listen to events
      document.querySelector('ig-button').addEventListener('ig-click', (e) => {
        console.log('Button clicked!', e.detail);
      });
    </script>
  </body>
</html>
```

### Dark Mode

```html
<!-- Toggle dark mode by adding data-theme attribute -->
<html data-theme="dark">
  <!-- Your content -->
</html>

<script>
  // Toggle dark mode
  function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  }
</script>
```

### Custom Theme

```html
<head>
  <!-- Load base tokens only (no Material Design) -->
  <link rel="stylesheet" href="@ignited-ui/themes/dist/base.css" />

  <!-- Override with your custom theme -->
  <style>
    :root {
      /* Primary color system */
      --ig-color-primary: #007bff;
      --ig-color-on-primary: #ffffff;
      --ig-color-primary-container: #cce5ff;
      --ig-color-on-primary-container: #001d33;

      /* Shape system (border radius) */
      --ig-radius-xs: 2px;
      --ig-radius-sm: 4px;
      --ig-radius-md: 6px;
      --ig-radius-lg: 8px;
      --ig-radius-xl: 12px;
      --ig-radius-full: 4px; /* Less rounded buttons */

      /* Typography */
      --ig-font-family-base: 'Inter', system-ui, sans-serif;

      /* Motion */
      --ig-transition-duration-base: 200ms;

      /* Customize any other tokens */
    }
  </style>
</head>
```

## 🎨 Available Components

### Currently Built

- ✅ **ig-button** - Filled, outlined, text, elevated, tonal variants with full a11y

### Coming Soon

- ⏳ ig-fab (Floating Action Button)
- ⏳ ig-icon-button
- ⏳ ig-input (Text field)
- ⏳ ig-card
- ⏳ ig-dialog
- ⏳ ig-menu
- ⏳ ig-select
- ⏳ ig-checkbox
- ⏳ ig-radio
- ⏳ ig-switch
- ⏳ ig-slider
- ⏳ ig-chip
- ⏳ ig-snackbar
- ⏳ ig-tabs
- ⏳ ig-nav-bar
- ⏳ ig-nav-drawer
- ⏳ ig-app-bar
- ⏳ ig-badge
- ⏳ ig-progress

## 🔧 ig-button API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'text' \| 'elevated' \| 'tonal'` | `'filled'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows loading state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `fullwidth` | `boolean` | `false` | Makes button full width |
| `aria-label` | `string` | - | Accessible label |
| `aria-describedby` | `string` | - | ID of describing element |
| `aria-labelledby` | `string` | - | ID of labeling element |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `ig-click` | `{ originalEvent: Event }` | Fired when button is clicked |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Button text content |
| `icon-start` | Icon before text |
| `icon-end` | Icon after text |

### Examples

```html
<!-- Basic filled button -->
<ig-button>Click Me</ig-button>

<!-- Outlined button with custom size -->
<ig-button variant="outlined" size="lg">Large Button</ig-button>

<!-- Loading state -->
<ig-button loading>Loading...</ig-button>

<!-- Disabled button -->
<ig-button disabled>Disabled</ig-button>

<!-- With icons -->
<ig-button>
  <svg slot="icon-start" width="18" height="18"><!-- icon --></svg>
  With Icon
</ig-button>

<!-- Full width -->
<ig-button fullwidth>Full Width Button</ig-button>

<!-- Accessible button -->
<ig-button aria-label="Close dialog" variant="text">×</ig-button>

<!-- Submit button in form -->
<form>
  <ig-button type="submit" variant="filled">Submit Form</ig-button>
</form>
```

## ♿ Accessibility Features

All Ignited UI components are built with accessibility first:

- ✅ **WCAG 2.1 AA compliant** (AAA where possible)
- ✅ **Full keyboard navigation** (Tab, Enter, Space, Escape, Arrow keys)
- ✅ **Screen reader support** with proper ARIA labels
- ✅ **Focus indicators** meeting 3:1 contrast ratio
- ✅ **44x44px minimum touch targets**
- ✅ **Color contrast** of 4.5:1 for text, 3:1 for UI
- ✅ **Respects motion preferences** (`prefers-reduced-motion`)
- ✅ **High contrast mode support**
- ✅ **No color-only information**
- ✅ **Text resizable up to 200%**

### Keyboard Shortcuts (ig-button)

- **Tab / Shift+Tab**: Navigate between buttons
- **Enter / Space**: Activate button
- **Focus indicators**: Automatically shown when navigating with keyboard

## 🎭 Design Token System

Ignited UI uses a **three-tier token system**:

### 1. Primitives (Base Values)
Raw color palettes, spacing scales, typography scales, etc.

```css
--ig-palette-primary-40: #6750a4;
--ig-spacing-4: 1rem;
--ig-font-size-base: 1rem;
```

### 2. Semantic Tokens (Purpose-Driven)
Map primitives to meaningful names based on purpose.

```css
--ig-color-primary: var(--ig-palette-primary-40);
--ig-color-on-primary: var(--ig-palette-primary-100);
```

### 3. Component Tokens (Component-Specific)
Fine-grained control for individual components.

```css
--ig-button-height-md: 40px;
--ig-button-padding-horizontal: var(--ig-spacing-6);
```

## 🌙 Theme Customization Examples

### Bootstrap-Style Theme

```css
:root {
  --ig-color-primary: #0d6efd;
  --ig-color-on-primary: #ffffff;
  --ig-radius-sm: 0.25rem;
  --ig-radius-md: 0.375rem;
  --ig-radius-lg: 0.5rem;
  --ig-radius-full: 0.375rem; /* Less rounded */
  --ig-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Minimal Flat Design

```css
:root {
  --ig-radius-xs: 0;
  --ig-radius-sm: 0;
  --ig-radius-md: 0;
  --ig-radius-lg: 0;
  --ig-radius-xl: 0;
  --ig-radius-full: 0;
  --ig-shadow-xs: none;
  --ig-shadow-sm: none;
  --ig-shadow-md: none;
  --ig-transition-duration-base: 100ms;
}
```

### Retro/Brutalist Style

```css
:root {
  --ig-color-primary: #ff6b6b;
  --ig-color-on-primary: #000000;
  --ig-font-family-base: 'Courier New', monospace;
  --ig-radius-sm: 0;
  --ig-radius-md: 0;
  --ig-shadow-sm: 4px 4px 0 rgba(0, 0, 0, 1);
  --ig-shadow-md: 6px 6px 0 rgba(0, 0, 0, 1);
}
```

## 📚 Resources

- **Project Overview**: See `PROJECT_OVERVIEW.md` for complete project details
- **Contributing Guide**: See `CONTRIBUTING.md` for development guidelines
- **Lit Documentation**: https://lit.dev/
- **Material Design 3**: https://m3.material.io/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Practices**: https://www.w3.org/WAI/ARIA/apg/

## 🐛 Troubleshooting

### Components not rendering?

Make sure you've:
1. Imported the component library: `import '@ignited-ui/core'`
2. Loaded the theme CSS: `<link rel="stylesheet" href="@ignited-ui/themes/dist/material.css">`

### Dark mode not working?

Add the `data-theme="dark"` attribute to your `<html>` element.

### Styles look wrong?

Check that CSS custom properties are cascading correctly. If using Shadow DOM in your own components, you may need to explicitly pass through custom properties.

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for guidelines.

## 📄 License

MIT License - feel free to use in commercial and open-source projects.

---

**Built with ❤️ and ♿ accessibility in mind**
