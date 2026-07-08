(function () {
  const popups = Array.from(document.querySelectorAll("[data-popup]"));
  const copyIconSrc = "images/copy_icon.png";
  const checkIconSrc = "images/check_icon.png";

  function getParts(root) {
    return {
      root,
      toggle: root.querySelector("[data-popup-toggle]"),
      panel: root.querySelector("[data-popup-panel]"),
      copyButton: root.querySelector("[data-popup-copy]"),
      copyIcon: root.querySelector("[data-popup-copy-icon]"),
      value: root.dataset.copyValue,
      feedbackTimeoutId: null
    };
  }

  const instances = popups.map(getParts).filter(instance =>
    instance.toggle && instance.panel && instance.copyButton && instance.copyIcon && instance.value
  );

  function setOpen(instance, isOpen) {
    instance.toggle.setAttribute("aria-expanded", String(isOpen));
    instance.panel.hidden = !isOpen;
  }

  function closeAll(except) {
    instances.forEach(instance => {
      if (instance !== except) {
        setOpen(instance, false);
      }
    });
  }

  async function copyValue(instance) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(instance.value);
      } else {
        const input = document.createElement("input");
        input.value = instance.value;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }

      showCopyFeedback(instance);
    } catch (error) {
      console.error("Failed to copy value", error);
    }
  }

  function resetCopyFeedback(instance) {
    if (instance.feedbackTimeoutId) {
      clearTimeout(instance.feedbackTimeoutId);
      instance.feedbackTimeoutId = null;
    }

    instance.copyButton.classList.remove("is-feedback");
    instance.copyIcon.src = copyIconSrc;
    instance.copyIcon.alt = "Copy icon";
  }

  function showCopyFeedback(instance) {
    if (instance.feedbackTimeoutId) {
      clearTimeout(instance.feedbackTimeoutId);
    }

    instance.copyButton.classList.add("is-feedback");

    window.setTimeout(() => {
      instance.copyIcon.src = checkIconSrc;
      instance.copyIcon.alt = "Copied";
      instance.copyButton.classList.remove("is-feedback");
    }, 180);

    instance.feedbackTimeoutId = window.setTimeout(() => {
      instance.copyButton.classList.add("is-feedback");

      window.setTimeout(() => {
        instance.copyIcon.src = copyIconSrc;
        instance.copyIcon.alt = "Copy icon";
        instance.copyButton.classList.remove("is-feedback");
      }, 180);

      instance.feedbackTimeoutId = null;
    }, 1200);
  }

  document.addEventListener("click", event => {
    const toggle = event.target.closest("[data-popup-toggle]");
    if (toggle) {
      const instance = instances.find(item => item.toggle === toggle);
      if (!instance) return;

      const willOpen = instance.toggle.getAttribute("aria-expanded") !== "true";
      closeAll(instance);
      setOpen(instance, willOpen);
      return;
    }

    const copyButton = event.target.closest("[data-popup-copy]");
    if (copyButton) {
      const instance = instances.find(item => item.copyButton === copyButton);
      if (instance) void copyValue(instance);
      return;
    }

    if (!event.target.closest("[data-popup]")) {
      closeAll();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeAll();
    }
  });

  instances.forEach(resetCopyFeedback);
})();
