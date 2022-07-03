import Swiper, {Navigation} from 'swiper'; // Swiper.js
import {createCard,createSection,createSectionList,createLegend} from "./js/utils";
import planArray from "./js/data_process";
//import 'swiper/swiper.min.css';

// Get HTML objects
const $plan = document.querySelector("#plan");
// const $filters TODO filter init

//One plan draw
const plan = planArray[0];
//const data = plan.subjects; //require("./js/data.json")
//const terms = [... plan.terms].sort((a,b) => a - b);  //Select terms array from data
//const groups = [... new Set(data.map(item => item.group))]                     //Select groups aaray from data 
//const megagroups = [... plan.megagroups];

//TODO draw section list
//TODO draw legend

const sectionsHTML = [... plan.terms].sort((a,b) => a - b).map(term => {
    const cardsHTML = plan.getSubjectsByTerm(term).map(subjectObj => createCard(subjectObj)).join("\n");

    return createSection(cardsHTML,{headerText: term + " семестр, " + Math.ceil(term/2) + " курс"})
}).join("\n");


$plan.innerHTML = "";
$plan.insertAdjacentHTML("beforeend",
`
        ${createSectionList()}
        ${createLegend()}
        ${sectionsHTML}
`);

const swiper = new Swiper('.swiper',{
    slidesPerView: 'auto',
    slidesOffsetAfter: 300,
    modules: [Navigation],
    uniqueNavElements: true,
    navigation: {
        nextEl: '.section-header__right',
        prevEl: '.section-header__left',
      }
});

//console.log(resultData)
