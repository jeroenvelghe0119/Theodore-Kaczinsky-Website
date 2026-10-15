
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");
  const goButtons = document.querySelectorAll("[data-go]");
  const brand = document.querySelector(".brand");

  function openTab(tabId, updateAddress = true) {
    const target = document.getElementById(tabId);

    // Do not open an ID that isn't a content panel.
    if (!target || !target.classList.contains("tab-panel")) {
      return;
    }

    // Hide all panels first.
    panels.forEach(function (panel) {
      panel.classList.remove("active");
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
    });

    // Remove the active style from all buttons.
    buttons.forEach(function (button) {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
    });

    // Show only the chosen panel.
    target.hidden = false;
    target.classList.add("active");
    target.setAttribute("aria-hidden", "false");

    // Highlight the matching sidebar button.
    buttons.forEach(function (button) {
      if (button.dataset.tab === tabId) {
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");

        // Keep the selected tab visible in the horizontal menu.
        button.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "auto"
        });
      }
    });

    // Update the URL without triggering another navigation event.
    if (updateAddress && location.hash !== "#" + tabId) {
      history.pushState({ tab: tabId }, "", "#" + tabId);
    }

    window.scrollTo(0, 0);
  }

  // Set up the navigation buttons.
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      openTab(button.dataset.tab);
    });
  });

  // Set up buttons inside the page.
  goButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openTab(button.dataset.go);
    });
  });

  // Clicking the logo opens Home.
  if (brand) {
    brand.addEventListener("click", function (event) {
      event.preventDefault();
      openTab("home");
    });
  }

  // Open a section directly when its URL hash is used.
  function readAddress() {
    const tabId = window.location.hash.slice(1);
    const target = document.getElementById(tabId);

    if (target && target.classList.contains("tab-panel")) {
      openTab(tabId, false);
    } else {
      openTab("home", false);
    }
  }

  // Initialize the page.
  readAddress();

  // Support browser back and forward buttons.
  window.addEventListener("popstate", readAddress);
  window.addEventListener("hashchange", readAddress);
});
