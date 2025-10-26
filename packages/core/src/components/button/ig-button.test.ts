import { expect, fixture, html } from '@open-wc/testing';
import { IgButton } from './ig-button.js';

describe('ig-button', () => {
  describe('basic rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<IgButton>(html`<ig-button>Click Me</ig-button>`);

      expect(el).to.exist;
      expect(el).to.be.instanceOf(IgButton);
      expect(el.variant).to.equal('filled');
      expect(el.size).to.equal('md');
      expect(el.disabled).to.be.false;
      expect(el.loading).to.be.false;
    });

    it('should render slot content', async () => {
      const el = await fixture<IgButton>(html`<ig-button>Click Me</ig-button>`);
      const slot = el.shadowRoot!.querySelector('slot:not([name])');

      expect(slot).to.exist;
    });
  });

  describe('variants', () => {
    it('should render filled variant', async () => {
      const el = await fixture<IgButton>(html`<ig-button variant="filled">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('filled')).to.be.true;
    });

    it('should render outlined variant', async () => {
      const el = await fixture<IgButton>(html`<ig-button variant="outlined">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('outlined')).to.be.true;
    });

    it('should render text variant', async () => {
      const el = await fixture<IgButton>(html`<ig-button variant="text">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('text')).to.be.true;
    });

    it('should render elevated variant', async () => {
      const el = await fixture<IgButton>(html`<ig-button variant="elevated">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('elevated')).to.be.true;
    });

    it('should render tonal variant', async () => {
      const el = await fixture<IgButton>(html`<ig-button variant="tonal">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('tonal')).to.be.true;
    });
  });

  describe('sizes', () => {
    it('should render small size', async () => {
      const el = await fixture<IgButton>(html`<ig-button size="sm">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('size-sm')).to.be.true;
    });

    it('should render medium size', async () => {
      const el = await fixture<IgButton>(html`<ig-button size="md">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('size-md')).to.be.true;
    });

    it('should render large size', async () => {
      const el = await fixture<IgButton>(html`<ig-button size="lg">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.classList.contains('size-lg')).to.be.true;
    });
  });

  describe('states', () => {
    it('should handle disabled state', async () => {
      const el = await fixture<IgButton>(html`<ig-button disabled>Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(el.disabled).to.be.true;
      expect(button?.disabled).to.be.true;
    });

    it('should handle loading state', async () => {
      const el = await fixture<IgButton>(html`<ig-button loading>Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(el.loading).to.be.true;
      expect(button?.disabled).to.be.true;
      expect(button?.getAttribute('aria-busy')).to.equal('true');
    });

    it('should not dispatch click event when disabled', async () => {
      const el = await fixture<IgButton>(html`<ig-button disabled>Button</ig-button>`);
      let clickFired = false;

      el.addEventListener('ig-click', () => {
        clickFired = true;
      });

      const button = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(clickFired).to.be.false;
    });

    it('should not dispatch click event when loading', async () => {
      const el = await fixture<IgButton>(html`<ig-button loading>Button</ig-button>`);
      let clickFired = false;

      el.addEventListener('ig-click', () => {
        clickFired = true;
      });

      const button = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(clickFired).to.be.false;
    });
  });

  describe('events', () => {
    it('should dispatch ig-click event on click', async () => {
      const el = await fixture<IgButton>(html`<ig-button>Button</ig-button>`);
      let eventDetail: any;

      el.addEventListener('ig-click', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      const button = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(eventDetail).to.exist;
      expect(eventDetail.originalEvent).to.exist;
    });

    it('should bubble ig-click event', async () => {
      const container = await fixture(html`
        <div>
          <ig-button>Button</ig-button>
        </div>
      `);

      let eventCaught = false;

      container.addEventListener('ig-click', () => {
        eventCaught = true;
      });

      const button = container
        .querySelector('ig-button')!
        .shadowRoot!.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(eventCaught).to.be.true;
    });
  });

  describe('accessibility', () => {
    it('should have proper role', async () => {
      const el = await fixture<IgButton>(html`<ig-button>Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.tagName).to.equal('BUTTON');
    });

    it('should support aria-label', async () => {
      const el = await fixture<IgButton>(
        html`<ig-button aria-label="Close dialog">X</ig-button>`
      );
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.getAttribute('aria-label')).to.equal('Close dialog');
    });

    it('should support aria-describedby', async () => {
      const el = await fixture<IgButton>(
        html`<ig-button aria-describedby="help-text">Button</ig-button>`
      );
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.getAttribute('aria-describedby')).to.equal('help-text');
    });

    it('should support aria-labelledby', async () => {
      const el = await fixture<IgButton>(
        html`<ig-button aria-labelledby="label-id">Button</ig-button>`
      );
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.getAttribute('aria-labelledby')).to.equal('label-id');
    });

    it('should set aria-busy when loading', async () => {
      const el = await fixture<IgButton>(html`<ig-button loading>Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.getAttribute('aria-busy')).to.equal('true');
    });

    it('should have minimum touch target size', async () => {
      const el = await fixture<IgButton>(html`<ig-button>Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button') as HTMLElement;

      const styles = window.getComputedStyle(button);
      const minHeight = parseInt(styles.minHeight);
      const minWidth = parseInt(styles.minWidth);

      expect(minHeight).to.be.at.least(44);
      expect(minWidth).to.be.at.least(44);
    });
  });

  describe('button type', () => {
    it('should default to type button', async () => {
      const el = await fixture<IgButton>(html`<ig-button>Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.type).to.equal('button');
    });

    it('should support type submit', async () => {
      const el = await fixture<IgButton>(html`<ig-button type="submit">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.type).to.equal('submit');
    });

    it('should support type reset', async () => {
      const el = await fixture<IgButton>(html`<ig-button type="reset">Button</ig-button>`);
      const button = el.shadowRoot!.querySelector('button');

      expect(button?.type).to.equal('reset');
    });
  });

  describe('full width', () => {
    it('should support fullwidth attribute', async () => {
      const el = await fixture<IgButton>(html`<ig-button fullwidth>Button</ig-button>`);

      expect(el.fullwidth).to.be.true;
      expect(el.hasAttribute('fullwidth')).to.be.true;
    });
  });
});
