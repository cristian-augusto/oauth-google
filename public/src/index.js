import { getGoogleUrl } from "./utils.js";

const googleIcon = document.getElementById("google");

googleIcon.addEventListener("click", () => {
  const from = window.location.pathname;
  const googleUrl = getGoogleUrl(from);
  window.location.href = googleUrl;
});
