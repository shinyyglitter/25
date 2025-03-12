import loadUsergeneratorView from "./controller/usergeneratorView.mjs";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}


async function loadApp() {
  const userView = await loadUsergeneratorView();
  if (!userView) {
      console.error("Kunne ikke laste usergeneratorView.");
      return; // Dette er OK, fordi return er inni en funksjon
  }

  document.body.append(userView.view);
}

loadApp();
