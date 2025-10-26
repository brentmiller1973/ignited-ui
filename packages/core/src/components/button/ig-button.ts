import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('ig-button')
export class IgButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      min-width: var(--ig-min-touch-target, 44px);
      min-height: var(--ig-min-touch-target, 44px);
    }

    :host([hidden]) {
      display: none;
    }

    :host([fullwidth]) {
      display: flex;
      width: 100%;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ig-spacing-2);
      width: 100%;
      padding: var(--ig-spacing-3) var(--ig-spacing-6);
      border: none;
      border-radius: var(--ig-radius-full);
      font-family: var(--ig-font-family-base);
      font-size: var(--ig-font-size-label-large, var(--ig-font-size-sm));
      font-weight: var(--ig-font-weight-medium);
      line-height: var(--ig-line-height-label, var(--ig-line-height-normal));
      letter-spacing: var(--ig-letter-spacing-label, var(--ig-letter-spacing-normal));
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      text-decoration: none;
      transition:
        background-color var(--ig-motion-duration) var(--ig-motion-easing),
        box-shadow var(--ig-motion-duration) var(--ig-motion-easing),
        transform var(--ig-motion-duration) var(--ig-motion-easing);
      min-width: var(--ig-min-touch-target, 44px);
      min-height: var(--ig-min-touch-target, 44px);
      box-sizing: border-box;
    }

    button::-moz-focus-inner {
      border: 0;
      padding: 0;
    }

    /* ===== Variant: Filled (Primary, default Material Design style) ===== */
    .filled {
      background-color: var(--ig-color-primary);
      color: var(--ig-color-on-primary);
      box-shadow: var(--ig-shadow-xs);
    }

    .filled:hover:not(:disabled) {
      box-shadow: var(--ig-shadow-sm);
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        var(--ig-color-on-primary) calc(var(--ig-state-hover-opacity, 0.08) * 100%)
      );
    }

    .filled:focus-visible:not(:disabled) {
      box-shadow: var(--ig-shadow-sm);
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        var(--ig-color-on-primary) calc(var(--ig-state-focus-opacity, 0.12) * 100%)
      );
    }

    .filled:active:not(:disabled) {
      box-shadow: var(--ig-shadow-xs);
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        var(--ig-color-on-primary) calc(var(--ig-state-pressed-opacity, 0.12) * 100%)
      );
      transform: scale(0.98);
    }

    /* ===== Variant: Outlined ===== */
    .outlined {
      background-color: transparent;
      color: var(--ig-color-primary);
      border: var(--ig-border-width-1) solid var(--ig-color-outline);
      box-shadow: none;
    }

    .outlined:hover:not(:disabled) {
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        transparent calc((1 - var(--ig-state-hover-opacity, 0.08)) * 100%)
      );
      border-color: var(--ig-color-primary);
    }

    .outlined:focus-visible:not(:disabled) {
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        transparent calc((1 - var(--ig-state-focus-opacity, 0.12)) * 100%)
      );
      border-color: var(--ig-color-primary);
    }

    .outlined:active:not(:disabled) {
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        transparent calc((1 - var(--ig-state-pressed-opacity, 0.12)) * 100%)
      );
      transform: scale(0.98);
    }

    /* ===== Variant: Text ===== */
    .text {
      background-color: transparent;
      color: var(--ig-color-primary);
      padding: var(--ig-spacing-3);
      box-shadow: none;
    }

    .text:hover:not(:disabled) {
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        transparent calc((1 - var(--ig-state-hover-opacity, 0.08)) * 100%)
      );
    }

    .text:focus-visible:not(:disabled) {
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        transparent calc((1 - var(--ig-state-focus-opacity, 0.12)) * 100%)
      );
    }

    .text:active:not(:disabled) {
      background-color: color-mix(
        in srgb,
        var(--ig-color-primary),
        transparent calc((1 - var(--ig-state-pressed-opacity, 0.12)) * 100%)
      );
      transform: scale(0.98);
    }

    /* ===== Variant: Elevated ===== */
    .elevated {
      background-color: var(--ig-color-surface-container-low, var(--ig-color-surface));
      color: var(--ig-color-primary);
      box-shadow: var(--ig-shadow-sm);
    }

    .elevated:hover:not(:disabled) {
      box-shadow: var(--ig-shadow-md);
      background-color: color-mix(
        in srgb,
        var(--ig-color-surface-container-low, var(--ig-color-surface)),
        var(--ig-color-primary) calc(var(--ig-state-hover-opacity, 0.08) * 100%)
      );
    }

    .elevated:focus-visible:not(:disabled) {
      box-shadow: var(--ig-shadow-md);
      background-color: color-mix(
        in srgb,
        var(--ig-color-surface-container-low, var(--ig-color-surface)),
        var(--ig-color-primary) calc(var(--ig-state-focus-opacity, 0.12) * 100%)
      );
    }

    .elevated:active:not(:disabled) {
      box-shadow: var(--ig-shadow-sm);
      background-color: color-mix(
        in srgb,
        var(--ig-color-surface-container-low, var(--ig-color-surface)),
        var(--ig-color-primary) calc(var(--ig-state-pressed-opacity, 0.12) * 100%)
      );
      transform: scale(0.98);
    }

    /* ===== Variant: Tonal ===== */
    .tonal {
      background-color: var(--ig-color-secondary-container);
      color: var(--ig-color-on-secondary-container);
      box-shadow: none;
    }

    .tonal:hover:not(:disabled) {
      box-shadow: var(--ig-shadow-xs);
      background-color: color-mix(
        in srgb,
        var(--ig-color-secondary-container),
        var(--ig-color-on-secondary-container) calc(var(--ig-state-hover-opacity, 0.08) * 100%)
      );
    }

    .tonal:focus-visible:not(:disabled) {
      box-shadow: var(--ig-shadow-xs);
      background-color: color-mix(
        in srgb,
        var(--ig-color-secondary-container),
        var(--ig-color-on-secondary-container) calc(var(--ig-state-focus-opacity, 0.12) * 100%)
      );
    }

    .tonal:active:not(:disabled) {
      box-shadow: none;
      background-color: color-mix(
        in srgb,
        var(--ig-color-secondary-container),
        var(--ig-color-on-secondary-container) calc(var(--ig-state-pressed-opacity, 0.12) * 100%)
      );
      transform: scale(0.98);
    }

    /* ===== Focus Indicator (WCAG 2.4.7 compliant) ===== */
    button:focus-visible {
      outline: var(--ig-focus-ring-width, 2px) var(--ig-focus-ring-style, solid)
        var(--ig-focus-ring-color, var(--ig-color-primary));
      outline-offset: var(--ig-focus-ring-offset, 2px);
    }

    /* ===== Disabled State (WCAG compliant) ===== */
    button:disabled {
      cursor: not-allowed;
      opacity: var(--ig-state-disabled-opacity, 0.38);
      pointer-events: none;
    }

    .filled:disabled {
      background-color: color-mix(
        in srgb,
        var(--ig-color-on-surface),
        transparent calc((1 - var(--ig-state-disabled-container-opacity, 0.12)) * 100%)
      );
      color: color-mix(
        in srgb,
        var(--ig-color-on-surface),
        transparent calc((1 - var(--ig-state-disabled-opacity, 0.38)) * 100%)
      );
      box-shadow: none;
    }

    .outlined:disabled,
    .text:disabled,
    .elevated:disabled,
    .tonal:disabled {
      color: color-mix(
        in srgb,
        var(--ig-color-on-surface),
        transparent calc((1 - var(--ig-state-disabled-opacity, 0.38)) * 100%)
      );
    }

    .outlined:disabled {
      border-color: color-mix(
        in srgb,
        var(--ig-color-on-surface),
        transparent calc((1 - var(--ig-state-disabled-container-opacity, 0.12)) * 100%)
      );
    }

    /* ===== Size Variants ===== */
    .size-sm {
      min-height: var(--ig-button-height-sm, 32px);
      padding: var(--ig-spacing-2) var(--ig-spacing-4);
      font-size: var(--ig-font-size-label-medium, var(--ig-font-size-xs));
    }

    .size-md {
      min-height: var(--ig-button-height-md, 40px);
    }

    .size-lg {
      min-height: var(--ig-button-height-lg, 48px);
      padding: var(--ig-spacing-4) var(--ig-spacing-8);
      font-size: var(--ig-font-size-label-large, var(--ig-font-size-base));
    }

    /* ===== Icon Support ===== */
    ::slotted([slot='icon-start']),
    ::slotted([slot='icon-end']) {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    /* ===== High Contrast Mode Support ===== */
    @media (prefers-contrast: high) {
      button:focus-visible {
        outline-width: 3px;
      }

      .outlined {
        border-width: 2px;
      }
    }

    /* ===== Loading State ===== */
    .loading {
      pointer-events: none;
      position: relative;
    }

    .loading::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-radius: 50%;
      border-top-color: transparent;
      animation: ig-button-spin 0.6s linear infinite;
    }

    @keyframes ig-button-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      @keyframes ig-button-spin {
        to {
          transform: rotate(0deg);
        }
      }
    }
  `;

  @property({ type: String })
  variant: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal' = 'filled';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedby: string | null = null;

  @property({ type: String, attribute: 'aria-labelledby' })
  ariaLabelledby: string | null = null;

  @property({ type: Boolean, reflect: true })
  fullwidth = false;

  render() {
    const classes = {
      filled: this.variant === 'filled',
      outlined: this.variant === 'outlined',
      text: this.variant === 'text',
      elevated: this.variant === 'elevated',
      tonal: this.variant === 'tonal',
      'size-sm': this.size === 'sm',
      'size-md': this.size === 'md',
      'size-lg': this.size === 'lg',
      loading: this.loading,
    };

    return html`
      <button
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${ifDefined(this.ariaLabel)}
        aria-describedby=${ifDefined(this.ariaDescribedby)}
        aria-labelledby=${ifDefined(this.ariaLabelledby)}
        aria-busy=${this.loading}
        @click=${this._handleClick}
      >
        <slot name="icon-start"></slot>
        ${this.loading ? nothing : html`<slot></slot>`}
        <slot name="icon-end"></slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('ig-click', {
        detail: { originalEvent: e },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ig-button': IgButton;
  }
}
