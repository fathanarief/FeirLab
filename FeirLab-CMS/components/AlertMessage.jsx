import Toastify from "toastify-js";

export default function showAlert(message, type = "success") {
  if (!message) return;

  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type === "error" ? "#404040" : "#171717",
      color: "#ffffff",
      border: "1px solid #171717",
      borderRadius: "6px",
    },
  }).showToast();
}
