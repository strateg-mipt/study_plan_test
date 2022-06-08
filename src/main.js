import {colorMapBuilder,cell,card,cardGrid} from "./js/utils"
import plan from "./js/data_process"
//import data from "./js/data.json"
const data = plan.subjects //require("./js/data.json")

console.log(data)

//const data = JSON.parse(data_json)
const $plan = document.querySelector("#plan")

const terms = [... new Set(data.map(item => item.term))].sort((a,b) => a - b)  //Select terms array from data
const groups = [... new Set(data.map(item => item.group))]                     //Select groups aaray from data 
const megagroups = [... plan.megagroups] 
const resultData = Object.fromEntries(terms.map(term => [term,{}]))
const colorMap = colorMapBuilder(groups)
const colorMapHeader = colorMapBuilder(megagroups)

// Reshape data with subject in term/group matrix
data.forEach(item => {
    if(resultData[item.term].hasOwnProperty(item.group)){
        resultData[item.term][item.group].push(item)
    } else {
        resultData[item.term][item.group] = [item]
    }
})

//console.log(resultData)
console.log(terms)
console.log(groups)

let headerHTML = cell("" ,["term-col","d-none-sm"]) + "\n" + cell("" ,["term-col","d-none-sm"]) + "\n" +
    cardGrid(megagroups.map(group_item => cell(`<p>${group_item}</p>`,["tile-header","d-none-sm","cell-double","bg-"+colorMapHeader.get(group_item)])).join("\n"))

let termsHTML = 
terms.map(term_item => {
    let groupsHTML =
    groups.map(group_item => {
        let cards = resultData[term_item][group_item]
        if(cards){
            let alternatives = new Set()
            let cardsGroupHead = card(group_item,["bg-"+colorMap.get(group_item),"d-none-md"],"tile-header") + "\n"
            let cardsHTML = cards.map(card_item => {
                let alternativeClass = ""
                if(card_item.alternative){
                    if(alternatives.has(card_item.alterGroup)){
                        alternativeClass = "d-none"
                    } else {
                        alternatives.add(card_item.alterGroup)
                    }
                }
                return card(card_item.subject,["bg-"+colorMap.get(group_item),alternativeClass])
            }).join("\n")
            return cell(cardsGroupHead + cardsHTML,["cell-full","cell-md",cards.length>6 ? "cell-double" : ""])
        } else {
            return cell("",["cell-full","cell-md","d-none"])
        }        
    }).join("\n")

    return (term_item % 2 ? cell("<p>Курс "+ Math.ceil(term_item/2) +"</p>" ,["term-col","year-col", "fg-white"]) : "") + "\n" 
         + cell("<p>Семестр "+ term_item +"</p>" ,["term-col", "fg-white"]) + "\n" + cardGrid(groupsHTML)
}).join("\n")

$plan.innerHTML = ""
$plan.insertAdjacentHTML("beforeend",
`
    <div class="grid">
        ${headerHTML}
        ${termsHTML}
    </div>
`)

console.log(resultData)