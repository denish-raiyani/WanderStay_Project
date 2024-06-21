/* --- flash.ejs --- */

document.addEventListener("DOMContentLoaded", () => {
  const hideAlertMessage = document.getElementById("alert-message");

  setTimeout(() => {
    hideAlertMessage.remove();
  }, 6000);
});
