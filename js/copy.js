(function () {
  document.querySelectorAll("button[data-copy-value]").forEach(button => {
    const feedback = button.querySelector(".support-copy-feedback");
    let timeout;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyValue);
        clearTimeout(timeout);
        feedback.classList.add("is-visible");
        timeout = setTimeout(() => {
          feedback.classList.remove("is-visible");
        }, 800);
      } catch (error) {
        console.error("Failed to copy value", error);
      }
    });
  });
})();
