import {colorMapBuilder} from "./js/utils"
import plan from "./js/data_process"
//import data from "./js/data.json"
const data = plan.subjects //require("./js/data.json")

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
