import loadUsergeneratorView from "./controller/usergeneratorView.mjs";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}


async function loadTemplate() {
  const generateUserView = await loadUsergeneratorView();
  if (!userView) {
      console.error("Kunne ikke laste usergeneratorView.");
      return; 
  }

  document.body.append(generateUserView.view);
}

loadTemplate();
