(function () {
  const HINT_KEY = "backgroundHintDismissed";
  const banner = document.querySelector("[data-hint-banner]");
  const closeButton = document.querySelector("[data-hint-close]");

  if (!banner || !closeButton) {
    return;
  }

  if (localStorage.getItem(HINT_KEY) === "true") {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;

  closeButton.addEventListener("click", () => {
    banner.hidden = true;
    localStorage.setItem(HINT_KEY, "true");
  });
})();
