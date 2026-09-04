document.addEventListener("DOMContentLoaded", function () {
  // Desktop
  var megaMenuLinks = document.querySelectorAll(
    "header-menu ul li a.mega-menu__link",
  );
  // Mobile
  var mobileMegaMenuLinks = document.querySelectorAll(
    "header-drawer ul li a.menu-drawer__menu-item.list-menu__item",
  );

  [...megaMenuLinks, ...mobileMegaMenuLinks].forEach(function (link) {
    link.addEventListener("click", function (event) {
      const level_string = getLevel(event.target);
      sendEvent(level_string);
    });
  });
});

const sendEvent = async (level) => {
  await gtag("event", level, {
    app_name: "CPAP Online Store",
    page: window.location.pathname,
  });
};

const getSlug = (url) => {
  if (!url) return;
  let split = url.split("/");
  let slug = split[split.length - 1];
  slug = slug.replaceAll("#", "");
  return slug;
};

const getLevel = (element) => {
  let result = "mega_menu$1$2$3";

  for (let i = 3; i > 0; i--) {
    let level = element.dataset[`level${i}`];
    level = getSlug(level);
    if (level) result = result.replaceAll(`$${i}`, ` > ${level}`);
    else result = result.replaceAll(`$${i}`, "");
  }

  return result;
};
