import TemplateManager from "../modules/templateManager.mjs";
import { createUser } from "../../modules/generateUser.mjs";
const templateFile = "usergeneratorView.html";

const template = TemplateManager.fetchTemplate(templateFile);
const usergeneratorView = TemplateManager.cloneTemplate(template, document.body);

loginView.getElementById("button").onclick = (evt) => {
    createUser()
    console.log("knappen funker");
}

UsergeneratorViewController = {
    view: usergeneratorView
};


export default LoginViewController