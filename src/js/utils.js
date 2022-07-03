export function colorMapBuilder(keyList) {
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
    "lightGreen",
  ];

  var colorMap = new Map();

  keyList.forEach((key, index) => {
    colorMap.set(key, colorNames[index]);
  });

  return colorMap;
}

// Function return subject card html 
export function createCard(disciplineObj, options) {
  //const { a: a1 = aDefault, b = bDefault } = options;

  let colorClass = "";
  switch (disciplineObj.color) {
    case "red": colorClass = "bg-red"; break;
    case "white": colorClass = "bg-white"; break;
    case "green": colorClass = "bg-green"; break;
    default: colorClass = "bg-blue";
  }
  

  return `<div class="swiper-card swiper-slide ${colorClass}">
                <h3 class="swiper-card__header">
                    ${disciplineObj.name}
                </h3>
                <div class="swiper-card__content">
                      <p> ${disciplineObj.loadTime} а.ч.</p>
                      <p> ${disciplineObj.examType} ${disciplineObj.loadRate} з.е.</p>
                </div>
          </div>`;
}

export function createSection(cardsHTML, options) {
    const { headerText: headerText = "1 семестр, 1 курс"} = options;
  
    return `<div class="section swiper">
    <h2 class="section-header">${headerText} 

    </h2>
    <button class="section-header__left"> < </button>
    <button class="section-header__right"> > </button>

    <!-- <div class="dsc-swiper "> -->
        <div class="dsc-wrapper swiper-wrapper">
            ${cardsHTML}
        </div>
   <!-- </div> -->
</div>`;
}

export function createSectionList(options) {

return `    <div class="section-list">
                <a class="section-list__item section-list__item_active">Все</a>                
                <a class="section-list__item">Институтские дисциплины</a>
                <a class="section-list__item">Факультетские дисциплины</a>
                <a class="section-list__item">Базовые дисциплины</a>
            </div>`;
}
            
export function createLegend(options) {
return `    <div class="legend">
                <div class="legend__item legend__item_blue">
                    Дисциплина
                </div>
                <div class="legend__item legend__item_green">
                    Практика
                </div>
                <div class="legend__item legend__item_red">
                    Итоговая аттестация
                </div>
                <div class="legend__item legend__item_white">
                    Факультативная дисциплина
                </div>
            </div>`;
}