'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];



// sidebar toggle for mobile: open to the measured content height so nothing is clipped
const sidebar = $("[data-sidebar]");
const sidebarBtn = $("[data-sidebar-btn]");
const sidebarBtnLabel = $("[data-sidebar-btn-label]");

const measureSidebar = function () {
  // scrollHeight leaves out the borders, which border-box max-height includes
  const borders = sidebar.offsetHeight - sidebar.clientHeight;
  sidebar.style.setProperty("--sidebar-open", sidebar.scrollHeight + borders + "px");
}

sidebarBtn.addEventListener("click", function () {
  measureSidebar();
  const open = sidebar.classList.toggle("active");
  sidebarBtn.setAttribute("aria-expanded", String(open));
  sidebarBtnLabel.textContent = open ? "Hide contacts" : "Show contacts";
});

window.addEventListener("resize", () => {
  if (sidebar.classList.contains("active")) measureSidebar();
});



// page navigation (the tab name is mirrored in the URL hash, so links and the back button work);
// in-text links such as "let's connect" also switch pages, but only navbar tabs show the current page
const navigationLinks = $$("[data-nav-link]");
const navbarLinks = $$(".navbar [data-nav-link]");
const pages = $$("[data-page]");
const pageNames = pages.map((page) => page.dataset.page);

const showPage = function (name) {

  if (!pageNames.includes(name)) name = pageNames[0];

  pages.forEach((page) => page.classList.toggle("active", page.dataset.page === name));

  navbarLinks.forEach((link) => {
    const isActive = link.dataset.navLink === name;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  window.scrollTo(0, 0);

}

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const name = this.dataset.navLink;
    history.pushState(null, "", "#" + name);
    showPage(name);
  });
});

window.addEventListener("popstate", () => showPage(location.hash.slice(1)));

if (location.hash) showPage(location.hash.slice(1));



// project filter: tabs show live counts; a card can sit in several categories (space-separated data-category)
const filterTabs = $$("[data-filter]");
const filterItems = $$("[data-filter-item]");

const inCategory = (item, value) => value === "all" || item.dataset.category.split(" ").includes(value);

const applyFilter = function (value) {

  filterItems.forEach((item) => item.classList.toggle("active", inCategory(item, value)));

  filterTabs.forEach((tab) => {
    const isActive = tab.dataset.filter === value;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });

}

filterTabs.forEach((tab) => {

  const count = $("[data-filter-count]", tab);
  if (count) count.textContent = filterItems.filter((item) => inCategory(item, tab.dataset.filter)).length;

  tab.addEventListener("click", function () { applyFilter(this.dataset.filter); });

});

// left/right arrows move between filter tabs
$("[data-filter-bar]").addEventListener("keydown", (event) => {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  const index = filterTabs.indexOf(document.activeElement);
  if (index === -1) return;
  const step = event.key === "ArrowRight" ? 1 : -1;
  filterTabs[(index + step + filterTabs.length) % filterTabs.length].focus();
  event.preventDefault();
});



// lightbox: project visuals open full size; the image's alt text doubles as the caption,
// and the card's frame colour fills the letterbox, unless the visual names its own --lightbox-plate
// (tinted logo and diagram plates open on white, the ground their artwork was drawn on)
const lightbox = $("[data-lightbox-dialog]");
const lightboxImg = $("[data-lightbox-img]");
const lightboxCaption = $("[data-lightbox-caption]");

$$("[data-lightbox]").forEach((trigger) => {
  trigger.addEventListener("click", function () {
    const img = $("img", this);
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    const style = getComputedStyle(this);
    lightbox.style.setProperty("--lightbox-plate", style.getPropertyValue("--lightbox-plate").trim() || style.backgroundColor);
    lightbox.showModal();
  });
});

$("[data-lightbox-close]").addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});



// copy to clipboard: the button label confirms for two seconds and the status region announces it;
// where the Clipboard API is missing or blocked (plain http, embedded frames), the address is selected
// and copied the older way, or left selected for a manual copy if that fails too
$$("[data-copy]").forEach((button) => {

  const label = $("[data-copy-label]", button);
  const status = $("[data-copy-status]", button.parentElement);
  const value = $(".contact-card-link", button.parentElement);
  let timer;

  const flash = function (text, message) {
    label.textContent = text;
    status.textContent = message;
    clearTimeout(timer);
    timer = setTimeout(() => { label.textContent = "Copy"; status.textContent = ""; }, 2000);
  }

  button.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(this.dataset.copy);
      flash("Copied", "Email address copied");
    } catch {
      getSelection().selectAllChildren(value);
      if (document.execCommand("copy")) {
        getSelection().removeAllRanges();
        flash("Copied", "Email address copied");
      } else {
        flash("Selected", "Email address selected; copy it with your keyboard");
      }
    }
  });

});
