import data from "./excel/output.json"
import {row,cell,card,cardGrid} from "./js/utils"

console.log(data)

//const data = JSON.parse(data_json)
const $plan = document.querySelector("#plan")

const terms = [... new Set(data.map(item => item.term))].sort((a,b) => a - b)//Terms array
const groups = [... new Set(data.map(item => item.group))]
const resultData = Object.fromEntries(terms.map(term => [term,{}]))

data.forEach(item => {
    if(resultData[item.term].hasOwnProperty(item.group)){
        resultData[item.term][item.group].push(item)
    } else {
        resultData[item.term][item.group] = [item]
    }
})

//console.log(resultData)
//console.log(terms)
//console.log(groups)

let headerHTML = row(cell("" ,["stub","term-col"]) + "\n" + 
    groups.map(group_item => cell(`<p>${group_item}</p>`,["cell-full","cell-md"])).join("\n"), ["header-md"])

let termsHTML = 
terms.map(term_item => {
    let groupsHTML =
    groups.map(group_item => {
        let cards = resultData[term_item][group_item]
        if(cards){
            let cardsHTML = cards.map(card_item => card(card_item.subject,"bg-"+card_item.color)).join("\n")
            return cell(cardGrid(cardsHTML),["cell-full","cell-md"])
        } else {
            return cell("",["cell-full","cell-md"])
        }        
    }).join("\n")

    return row(cell("<p>Семестр "+ term_item +"</p>" ,["stub","term-col", "fg-white"]) + "\n" + groupsHTML)
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