import TemplateManager from "../modules/templateManager.mjs";
import { generateUserButtonSetup } from "../modules/generateUser.mjs";


const templateFile = "/view/usergeneratorView.html";


async function loadTemplate() {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const usergeneratorView = TemplateManager.cloneTemplate(template, document.body);

    generateUserButtonSetup();

    return { view: usergeneratorView };
    
}


export default loadTemplate;
