//Card with subject
export function card(content, colorClass) {
    const addInfo = `
        <div class="card-content p-2">
            110 часов
        </div>`
    
        /* h-100 d-flex flex-justify-center flex-align-center p-4*/
    const tile_class = content.length>60 ? "tile-large" : "tile-medium";

    return `<div class="${tile_class} ${colorClass}">
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
