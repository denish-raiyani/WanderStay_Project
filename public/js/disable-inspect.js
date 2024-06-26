// Disable Right-click
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Disable Keyboard Shortcuts
window.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "K")) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
