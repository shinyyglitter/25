import TemplateManager from "../modules/templateManager.mjs";   

const templateFile = "/view/userView.html";

async function loadUserTemplate() {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const userView = TemplateManager.cloneTemplate(template, document.body);
    return { view: userView };
}

export default loadUserTemplate;