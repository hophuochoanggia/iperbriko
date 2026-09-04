class MapLocator extends HTMLElement {
  constructor() {
    super();
  }

  async getLocations() {
    const asset_url = this.dataset.url;
    const res = await fetch(asset_url);
    const locations = await res.json();
    this.locations = locations;
    return locations;
  }

  async connectedCallback() {
    const locationsData = await this.getLocations();
    this.showStoresList(locationsData);
    this.showMap();
    this.setupEvents();

    // locationsData.map((location) => {
    //   location.sitemap_query = `?address=${this.slugify(location.address)}`;
    //   location.embed_link = `https://maps.google.com/maps?&q=\"${location.address}\"&output=embed`;
    // });
  }

  onSearch(e) {
    const value = e.target.value?.toLowerCase();

    this.stores.forEach((store) => {
      const txtValue = store.textContent || store.innerText;
      if (txtValue.toLowerCase().indexOf(value) > -1) {
        store.classList.remove("hidden");
      } else {
        store.classList.add("hidden");
      }
    });
  }

  getStoreByCurrentUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get("address");

    const store = this.locations.find((store) => {
      const address_slug = this.slugify(store.address);
      return address_slug == address;
    });

    return store;
  }

  showMap(propStore = null) {
    let store;
    if (propStore) {
      store = propStore;
    }
    if (!store) {
      store = this.getStoreByCurrentUrl();
    }
    if (!store) {
      store = this.locations[0] || {};
    }

    const map = document.getElementById("map-slot");
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", store.embed_link);
    iframe.setAttribute("width", "600px");
    iframe.setAttribute("height", "650px");

    while (map.lastChild) {
      map.removeChild(map.lastChild);
    }

    map.appendChild(iframe);
  }

  showStoresList(stores) {
    if (stores.length == 0) return;

    let panel = document.createElement("div", {
      style: "height: 600px;",
      classList: "panel",
    });

    if (document.getElementById("store-list")) {
      panel = document.getElementById("store-list");
      if (panel.classList.contains("open")) {
        panel.classList.remove("open");
      }
    } else {
      panel.setAttribute("id", "store-list");
      this.appendChild(panel);
    }

    while (panel.lastChild) {
      panel.removeChild(panel.lastChild);
    }

    stores.forEach((store, index) => {
      const item = document.createElement("div");
      item.classList.add("location__item");
      item.classList.add("store");
      if (index === 0) {
        item.classList.add("active");
      }
      item.setAttribute("data-index", index);

      const name = document.createElement("h6");
      name.classList.add("store__name");
      name.innerHTML = store.store;
      item.appendChild(name);

      const address = document.createElement("span");
      address.classList.add("store__address");
      address.textContent = store.address;
      item.appendChild(address);

      // const country = document.createElement("span");
      // country.classList.add("store__country");
      // country.textContent = store.country;
      // item.appendChild(country);

      const phone = document.createElement("span");
      phone.classList.add("store__phone");
      phone.innerHTML = `<strong>Phone: </strong>${store.phone}`;
      item.appendChild(phone);

      const fax = document.createElement("span");
      fax.classList.add("store__fax");
      fax.innerHTML = `<strong>Fax: </strong>${store.fax}`;
      item.appendChild(fax);

      const email = document.createElement("span");
      email.classList.add("store__email");
      email.innerHTML = `<strong>Email: </strong>${store.email}`;
      item.appendChild(email);

      panel.appendChild(item);
    });

    panel.classList.add("open");
    return;
  }

  setupEvents() {
    const stores = document.querySelectorAll(".store");
    this.stores = stores;
    const searchEl = document.querySelector("input[name=search-location]");
    stores.forEach((store) => {
      store.addEventListener("click", this.onStoreClick.bind(this));
    });
    searchEl.addEventListener("keyup", this.onSearch.bind(this));
  }

  onStoreClick(e) {
    const index = e.currentTarget.dataset.index;
    const store = this.locations[index];
    const stores = document.querySelectorAll(".store");
    stores.forEach((store) => {
      store.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    history.pushState({}, null, store.sitemap_query);
    this.showMap(store);
    document
      .getElementById("map-slot")
      .scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  slugify(str) {
    return String(str)
      .normalize("NFKD") // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
  }
}

customElements.define("map-locator", MapLocator);
