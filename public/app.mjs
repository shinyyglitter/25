import UsergeneratorViewController from "./controller/usergeneratorView.mjs";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}


  document.body.append(UsergeneratorViewController.view)
