if (!customElements.get('tabbed-collection')) {
  class TabbedCollection extends HTMLElement {
    connectedCallback() {
      this.tabs = Array.from(this.querySelectorAll('[data-tabbed-tab]'));
      this.panels = Array.from(this.querySelectorAll('[data-tabbed-panel]'));
      this.boundOnTabClick = this.onTabClick.bind(this);

      this.tabs.forEach((tab) => {
        tab.addEventListener('click', this.boundOnTabClick);
      });

      this.panels.forEach((panel) => this.initRail(panel));
    }

    disconnectedCallback() {
      this.tabs.forEach((tab) => {
        tab.removeEventListener('click', this.boundOnTabClick);
      });
    }

    onTabClick(event) {
      const tab = event.currentTarget;
      const targetId = tab.getAttribute('aria-controls');
      if (!targetId) return;

      this.tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', selected ? 'true' : 'false');
        item.setAttribute('tabindex', selected ? '0' : '-1');
      });

      this.panels.forEach((panel) => {
        const selected = panel.id === targetId;
        panel.classList.toggle('is-active', selected);
        panel.hidden = !selected;
        if (selected) this.updateProgress(panel);
      });
    }

    initRail(panel) {
      const grid = panel.querySelector('[data-tabbed-grid]');
      const next = panel.querySelector('[data-tabbed-next]');
      const progress = panel.querySelector('[data-tabbed-progress]');
      if (!grid) return;

      const update = () => this.updateProgress(panel);

      grid.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);

      if (next) {
        next.addEventListener('click', () => {
          const slide = grid.querySelector('.tabbed-collection__slide');
          const amount = slide ? slide.getBoundingClientRect().width + 24 : grid.clientWidth * 0.8;
          grid.scrollBy({ left: amount, behavior: 'smooth' });
        });
      }

      update();
    }

    updateProgress(panel) {
      const grid = panel.querySelector('[data-tabbed-grid]');
      const next = panel.querySelector('[data-tabbed-next]');
      const bar = panel.querySelector('[data-tabbed-progress]');
      if (!grid) return;

      const maxScroll = grid.scrollWidth - grid.clientWidth;
      const ratio = maxScroll > 0 ? grid.scrollLeft / maxScroll : 0;
      const visibleRatio = grid.scrollWidth > 0 ? grid.clientWidth / grid.scrollWidth : 1;
      const width = Math.max(visibleRatio * 100, 12) + ratio * (100 - Math.max(visibleRatio * 100, 12));

      if (bar) bar.style.width = `${Math.min(width, 100)}%`;
      if (next) next.disabled = maxScroll <= 0 || grid.scrollLeft >= maxScroll - 2;
    }
  }

  customElements.define('tabbed-collection', TabbedCollection);
}
