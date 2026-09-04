class PriceRequestModal extends HTMLElement {
  constructor() {
    super();
    this.detailsContainer = this.querySelector("#price-modal-detail");
    this.toggle = this.querySelector("#open-price-request");
    this.detailsContainer.addEventListener(
      "keyup",
      (event) => event.code.toUpperCase() === "ESCAPE" && this.close(),
    );
    this.toggle.addEventListener("click", this.onSummaryClick.bind(this));
    this.toggle.setAttribute("role", "button");
    this.querySelector("#ContactForm").addEventListener(
      "change",
      this.formChange.bind(this),
    );
    this.querySelector("#ContactForm-confirm").addEventListener(
      "change",
      this.onConfirmChanged.bind(this),
    );
    this.boundBodyClick = this.onBodyClick.bind(this);
  }

  isOpen() {
    return this.detailsContainer.hasAttribute("open");
  }

  onSummaryClick(event) {
    event.preventDefault();
    event.target.closest("#price-modal-detail").hasAttribute("open")
      ? this.close()
      : this.open(event);
  }

  onBodyClick(event) {
    if (
      !this.contains(event.target) ||
      event.target.classList.contains("modal-overlay")
    )
      this.close();
  }

  open(event) {
    event.target.closest("#price-modal-detail").setAttribute("open", true);
    document.body.addEventListener("click", this.boundBodyClick);
    document.body.classList.add("overflow-hidden");
    document.getElementById("price-modal-content").classList.remove("hidden");

    trapFocus(
      this.detailsContainer.querySelector('[tabindex="-1"]'),
      this.detailsContainer.querySelector('input:not([type="hidden"])'),
    );
  }

  close(focusToggle = true) {
    removeTrapFocus(focusToggle ? this.toggle : null);
    this.detailsContainer.removeAttribute("open");
    document.body.removeEventListener("click", this.boundBodyClick);
    document.body.classList.remove("overflow-hidden");

    document.getElementById("price-modal-content").classList.add("hidden");
  }

  formChange(event) {
    const form = event.currentTarget;
    if (
      event.target.id !== "ContactForm-offer" &&
      event.target.id !== "ContactForm-website"
    )
      return;
    const current_url = form.querySelector("#ContactForm-id");
    const offer = form.querySelector("#ContactForm-offer");
    const website = form.querySelector("#ContactForm-website");
    const body = form.querySelector("#ContactForm-body");

    body.value = `Offer about product: ${current_url.value}\nI saw this products at ${website.value}. I would like CPAP Discount to match the price of $${offer.value}`;
  }

  onConfirmChanged() {
    const confirm = this.querySelector("#ContactForm-confirm");
    const submit = this.querySelector('button[type="submit"]');
    submit.disabled = !confirm.checked;
    console.log(confirm.checked);
  }
}

customElements.define("price-request-modal", PriceRequestModal);
