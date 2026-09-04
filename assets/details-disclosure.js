class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector("details");
    this.content =
      this.mainDetailsToggle.querySelector("summary").nextElementSibling;

    this.mainDetailsToggle.addEventListener(
      "focusout",
      this.onFocusOut.bind(this),
    );
    this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();
    if (this.mainDetailsToggle.hasAttribute("open")) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute("open");
    this.mainDetailsToggle
      .querySelector("summary")
      .setAttribute("aria-expanded", false);
  }
}

customElements.define("details-disclosure", DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector(".header-wrapper");

    this.megaMenuItems =
      this.mainDetailsToggle.querySelectorAll(".mega-menu__item");

    this.megaMenuFirst = this.megaMenuItems[0];

    this.megaMenuItems.forEach((item) => {
      item.addEventListener("mouseenter", (e) => {
        e.preventDefault();
        const target = e.target;
        this.onMegaMenuEnter(target);
      });

      item.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        const target = e.target;
        this.onMegaMenuLeave(target);
      });
    });

    this.mainDetailsToggle.addEventListener(
      "mouseenter",
      this.onHover.bind(this),
    );
    this.mainDetailsToggle.addEventListener(
      "mouseleave",
      this.close.bind(this),
    );
  }

  onResetMegaMenuActive() {
    this.megaMenuItems.forEach((item) =>
      item.classList.remove("mega-menu__item-active"),
    );
  }

  onMegaMenuEnter(item) {
    this.onResetMegaMenuActive();
    item.classList.add("mega-menu__item-active");
  }

  onMegaMenuLeave(item) {
    if (item.classList.contains("mega-menu__item-first")) {
      return;
    }

    if (item.classList.contains("mega-menu__item-last")) {
      return;
    }

    item.classList.remove("mega-menu__item-active");
  }

  onHover() {
    this.mainDetailsToggle.setAttribute("open", true);
    this.mainDetailsToggle
      .querySelector("summary")
      .setAttribute("aria-expanded", true);

    this.onResetMegaMenuActive();
    this.megaMenuFirst?.classList.add("mega-menu__item-active");
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (
      document.documentElement.style.getPropertyValue(
        "--header-bottom-position-desktop",
      ) !== ""
    )
      return;
    document.documentElement.style.setProperty(
      "--header-bottom-position-desktop",
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`,
    );
  }
}

customElements.define("header-menu", HeaderMenu);
