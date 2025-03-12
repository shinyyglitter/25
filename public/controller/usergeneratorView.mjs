import TemplateManager from "../modules/templateManager.mjs";
import { createUser } from "../modules/generateUser.mjs";

const templateFile = "/controller/usergeneratorView.html";

async function loadUsergeneratorView() {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const usergeneratorView = TemplateManager.cloneTemplate(template, document.body);

    usergeneratorView.getElementById("button").onclick = async () => {
        const newUser = await createUser("random_username");
        console.log("Bruker opprettet:", newUser);
    };

    return { view: usergeneratorView };
}

export default loadUsergeneratorView;
