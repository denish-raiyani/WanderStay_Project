/* --- USE BOOTSTRAP for "needs-validation" class --- */

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

/* --- password visibility ---*/
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", () => {
  const type = password.getAttribute("type");
  if (type === "password") {
    password.setAttribute("type", "text");
    togglePassword.classList.add("fa-eye");
  } else {
    password.setAttribute("type", "password");
    togglePassword.classList.remove("fa-eye");
  }
});
