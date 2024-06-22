/* --- flash.ejs --- */

document.addEventListener("DOMContentLoaded", () => {
  const hideAlertMessage = document.getElementById("alert-message");

  if (hideAlertMessage) {
    setTimeout(() => {
      hideAlertMessage.remove();
    }, 6000);
  }
});
