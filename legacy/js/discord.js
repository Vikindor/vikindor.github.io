(function () {
  const root = document.querySelector("[data-discord]");
  const toggle = document.querySelector("[data-discord-toggle]");
  const panel = document.querySelector("[data-discord-panel]");
  const copyButton = document.querySelector("[data-discord-copy]");
  const copyIcon = document.querySelector("[data-discord-copy-icon]");
  const username = "Vikindor";
  const copyIconSrc = "icons/copy_icon.png";
  const checkIconSrc = "icons/check_icon.png";
  let feedbackTimeoutId = null;

  if (!root || !toggle || !panel || !copyButton || !copyIcon) {
    return;
  }

  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    panel.hidden = !isOpen;
  }

  async function copyUsername() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(username);
        showCopyFeedback();
        return;
      }

      const input = document.createElement("input");
      input.value = username;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      showCopyFeedback();
    } catch (error) {
      console.error("Failed to copy Discord username", error);
    }
  }

  function resetCopyFeedback() {
    if (feedbackTimeoutId) {
      clearTimeout(feedbackTimeoutId);
      feedbackTimeoutId = null;
    }

    copyButton.classList.remove("is-feedback");
    copyIcon.src = copyIconSrc;
    copyIcon.alt = "Copy icon";
  }

  function showCopyFeedback() {
    if (feedbackTimeoutId) {
      clearTimeout(feedbackTimeoutId);
    }

    copyButton.classList.add("is-feedback");

    window.setTimeout(() => {
      copyIcon.src = checkIconSrc;
      copyIcon.alt = "Copied";
      copyButton.classList.remove("is-feedback");
    }, 180);

    feedbackTimeoutId = window.setTimeout(() => {
      copyButton.classList.add("is-feedback");

      window.setTimeout(() => {
        copyIcon.src = copyIconSrc;
        copyIcon.alt = "Copy icon";
        copyButton.classList.remove("is-feedback");
      }, 180);

      feedbackTimeoutId = null;
    }, 1200);
  }

  document.addEventListener("click", e => {
    const toggleButton = e.target.closest("[data-discord-toggle]");
    if (toggleButton) {
      e.preventDefault();
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
      return;
    }

    const copyTrigger = e.target.closest("[data-discord-copy]");
    if (copyTrigger) {
      void copyUsername();
      return;
    }

    if (!e.target.closest("[data-discord]")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  });

  resetCopyFeedback();
})();
