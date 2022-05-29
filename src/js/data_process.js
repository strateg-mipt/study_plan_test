class PlanContainer {
  constructor(jsonData, options) {
    //jsonData contain subjects
    this.name = options.name;
    this.id = options.id;
    this.planName = options.planName; //Printed name of plan
    this.groups = new Set();
    this.megagroups = new Set();
    this.subjects = [];

    var disciplineArray = jsonData.filter(
      (item) => item["Учебный план.Код"] == this.id
    );

    this.addDisciplines(disciplineArray); //Add main subjects to plan
   

    if (options.hasOwnProperty("childId")) {
      this.childId = options.childId;

      disciplineArray = jsonData.filter(
        (item) => (item["Учебный план.Код"] == this.childId)&&(item["Вид цикла"] == "Факультетский")
      );

      this.addDisciplines(disciplineArray,this.getHashbyName("Факультетские дисциплины"));  
      disciplineArray = jsonData.filter(
        (item) => (item["Учебный план.Код"] == this.childId)&&(item["Вид цикла"] !== "Факультетский")
      );

      this.addDisciplines(disciplineArray,"005"); //Standard hash for base disciplines
    } //

    //Clear alternatives
    this.groups.add("Иностранные языки"); //Add forein languages group to simplify plans

    this.subjects.filter(item => item.alternative).forEach(item => {
        if(!this.groups.has(item.parentName)){
            let newparentId = item.parentId.split(".").slice(0, -1).join(".")
            item.parentName = this.getNamebyHash(newparentId)
            item.parentId = newparentId
        } else {
            item.alterGroup = "ag_" + item.alterGroup //If alter group coincide with parentName add prefix
        }
    })
  }

  addDisciplines(jsonArray,prefixId){  
    jsonArray.forEach((element) => {
        let discipline = new Discipline(element,prefixId);

        if (!discipline.alternative) {
          this.groups.add(discipline.group);
          this.megagroups.add(discipline.megagroup);
        }
        this.subjects.push(discipline);
    });
  }
  
  getHashbyName(groupName){
    return this.subjects.find(item => item.parentName==groupName).parentId //Probable error
  }
  getNamebyHash(hash){
    return this.subjects.find(item => item.parentId==hash).parentName //Probable error
  }
}

class Discipline {
  //Class to store subject data in the right format
  /* JSON object example
        {
        "Учебный план.Код": 17916,
        "Сорт": "001.001",
        "Родитель": "Дисциплины (модули)",
        "Выбор из списка": "Нет",
        "Вид цикла": "Институтский",
        "Дисциплина УП": "История",
        "Кафедра": "департамент истории",
        "Семестр.Курс": 1,
        "Семестр.Номер семестра": 1,
        "Семестр.Вид семестра": "Осенний",
        "Вид контрольных испытаний": "Дифференцированный зачет",
        "Факультатив": "Нет",
        "Курс по выбору": "Нет",
        "Рабочая учебная программа": "История_ди_1сем_3++",
        "Всего зачетных единиц": 1,
        "Общее количество часов": 45,
        "Количество курсовых работ": 2,
        "Лекция": 30,
        "Самостоятельная работа": 15,
        "Лекции часов в неделю": 2,
        "Учебный план.Базовая дисциплина": "Профильные дисциплины"
        }
    */
  constructor(jsonObj,prefixHash) {
    this.id = jsonObj["Сорт"];
    this.parentId = jsonObj["Сорт"].split(".").slice(0, -1).join(".");
    this.parentName = jsonObj["Родитель"] ? jsonObj["Родитель"] : "";
    this.name = jsonObj["Дисциплина УП"];
    this.megagroup = jsonObj["Вид цикла"] ? jsonObj["Вид цикла"] : "Институтский";
    this.alternative =
      jsonObj["Выбор из списка"] == "Да" || jsonObj["Курс по выбору"] == "Да"
        ? true
        : false;
    this.department = jsonObj["Кафедра"];
    this.year = jsonObj["Семестр.Курс"];
    this.term = jsonObj["Семестр.Номер семестра"];
    this.season = jsonObj["Семестр.Вид семестра"];
    this.examType = jsonObj["Вид контрольных испытаний"];

    if(jsonObj.hasOwnProperty("Учебный план.Базовая дисциплина")&&this.parentName==""){
        this.parentName = jsonObj["Вид цикла"]=="Факультетский" ? "Факультетские дисциплины" : "Базовые дисциплины";
    }

    if (this.alternative) {
      this.alterGroup = jsonObj["Родитель"];
    //   this.parentId = this.parentId.split(".").slice(0, -1).join(".");
    //   this.parentName = "";
    }

    this.color = "lightGreen";
    if(prefixHash){
        this.addParentHash(prefixHash)
    }
  }

  addParentHash(newParentId){
    this.parentId = [newParentId,this.parentId].filter(Boolean).join(".");
    this.id = [newParentId,this.id].filter(Boolean).join(".");
  }

  get group() {
    return this.parentName;
  }
  get subject() {
    return this.name;
  }
}

function simpleProcessXlItem(item) {
  const chooseColor = function (obj) {
    if (obj.hasOwnProperty("Лабораторная работа")) {
      return "lightGreen";
    } else if (obj.hasOwnProperty("Лекция")) {
      if (obj.hasOwnProperty("Семинар")) {
        return "lightCyan";
      }
      return "lightRed";
    } else return "lightCyan";
  };

  return {
    subject: item["Дисциплина"],
    term: item["Семестр"].match(/(\d+) семестр/)[1],
    color: chooseColor(item),
    group: item["Подгруппа"],
    megagroup: item["Группа"],
    alternative: item.hasOwnProperty("Альтернатива")
      ? item["Альтернатива"]
      : null,
  };
}

const data = require("./data_new.json");
const plansData = data.plans[0];
const plan = new PlanContainer(data.subjects, {
  id: plansData["Код"],
  name: plansData["Учебный план"],
  planName: plansData["Название трека"],
  childId: 17921
});

export default plan
