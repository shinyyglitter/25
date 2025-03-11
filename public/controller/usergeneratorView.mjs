import TemplateManager from "../modules/templateManager.mjs";
const templateFile = "usergeneratorView.html";

const template = TemplateManager.fetchTemplate(templateFile);
const usergeneratorView = TemplateManager.cloneTemplate(template, document.body);

loginView.getElementById("button").onclick = (evt) => {
    console.log("knappen funker");
}

UsergeneratorViewController = {
    view: usergeneratorView
};


export default LoginViewController