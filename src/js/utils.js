//Card with subject
export function card(content, colorClass, tile_class) {
    const addInfo = `
        <div class="card-content p-2">
            110 часов
        </div>`

        let addClasses = Array.isArray(colorClass) ? colorClass.join(" ") : colorClass;
    
        /* h-100 d-flex flex-justify-center flex-align-center p-4*/
        if(!tile_class) {
            tile_class = content.length>60 ? "tile-large" : "tile-medium";
        }

        return `<div class="${tile_class} ${addClasses}">
        <div class="subject-text"> 
            <p class="text-center fg-dark">
                ${content}
            </p>
        </div>
    </div>`
    
    
   /* `
    <div class="card ${colorClass}">
        <div class="card-header">
            ${content}
        </div>
    </div>`*/
}

export function cardGrid(content,classNames = []){

    return `
        <div class="tiles-grid ${classNames.join(' ')}">
            ${content}
        </div>
    `
}

export function cell(content,classNames = ["cell"]){
    return `
    <div class="${classNames.join(' ')}">
        ${content}
    </div>
    `
}

export function row(content,classNames = []){
    return `
    <div class="row ${classNames.join(' ')}">
        ${content}
    </div>
    `
}

export function colorMapBuilder(keyList){
    const colorNames = [
        "stdLightYellow",
        "stdLightRed",
        "stdLightGreen",
        "stdBrightYellow",
        "stdDarkPink",
        "stdBrightOrange", 
        "stdBrightGreen",
        "stdDarkYellow",
        "stdDarkRed",
        "stdLightPink",
        "stdBrightPink", 
    "stdLightGray",
    "lightCyan",
    "lightRed", 
    "lightGreen" ];

    var colorMap = new Map();

    keyList.forEach((key,index) => {
        colorMap.set(key,colorNames[index]);
    });

    return colorMap;
}

