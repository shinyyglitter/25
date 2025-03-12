const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {

    let rawTemplate = await (await fetch(path)).text();
    let div = document.createElement("div");
    div.innerHTML = rawTemplate;
    let template = div.firstChild;
    return template;

}

TemplateManager.cloneTemplate = (template, target, data) => {
    const clone = template.content.cloneNode(true);
    let html = clone.firstElementChild.innerHTML;

    for (let key of Object.keys(data)) {
        html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), data[key]);
    }

    clone.firstElementChild.innerHTML = html;
    target.appendChild(clone);
    return clone;
}


export default TemplateManager