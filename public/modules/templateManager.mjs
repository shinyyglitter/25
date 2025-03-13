const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {
    try {
        let response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load template: ${path}`);
        let rawTemplate = await response.text();
        
        let div = document.createElement("div");
        div.innerHTML = rawTemplate;
        let template = div.firstChild;

        if (!template) throw new Error(`Template is empty: ${path}`);
        return template;
    } catch (error) {
        console.error(error);
        return null; 
    }
};


TemplateManager.cloneTemplate = (template, target, data) => {
    const clone = template.content.cloneNode(true);
    let html = clone.firstElementChild.innerHTML;

    if (data && typeof data === "object") {
        for (let key of Object.keys(data)) {
            html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), data[key]);
        }
    } else {
        console.warn("Ingen data ble sendt til kloning av template", data);
    }

    clone.firstElementChild.innerHTML = html;
    target.appendChild(clone);
    return clone;
}


export default TemplateManager