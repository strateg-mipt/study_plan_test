import data from "./excel/output.json"
import {row,cell,card,cardGrid} from "./js/utils"

console.log(data)

//const data = JSON.parse(data_json)
const $plan = document.querySelector("#plan")

const terms = [... new Set(data.map(item => item.term))].sort((a,b) => a - b)  //Select terms array from data
const groups = [... new Set(data.map(item => item.group))]                     //Select groups aaray from data  
const resultData = Object.fromEntries(terms.map(term => [term,{}]))

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

let headerHTML = cell("" ,["stub","term-col"]) + "\n" + cell("" ,["stub","term-col"]) + "\n" +
    cardGrid(groups.map(group_item => cell(`<p>${group_item}</p>`,["cell-full","cell-md","header-md"])).join("\n"))

let termsHTML = 
terms.map(term_item => {
    let groupsHTML =
    groups.map(group_item => {
        let cards = resultData[term_item][group_item]
        if(cards){
            let cardsHTML = cards.map(card_item => card(card_item.subject,"bg-"+card_item.color)).join("\n")
            return cell(cardsHTML,["cell-full","cell-md",cards.length>3 ? "cell-double" : ""])
        } else {
            return cell("",["cell-full","cell-md","d-none"])
        }        
    }).join("\n")

    return (term_item % 2 ? cell("<p>Курс "+ term_item +"</p>" ,["stub","term-col","year-col", "fg-white"]) : "") + "\n" 
         + cell("<p>Семестр "+ term_item +"</p>" ,["stub","term-col", "fg-white"]) + "\n" + cardGrid(groupsHTML)
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