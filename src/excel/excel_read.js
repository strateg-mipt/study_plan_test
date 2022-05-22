var XLSX = require('xlsx')
var workbook = XLSX.readFile('plans.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

var outputData = xlData.map(item =>{

    const chooseColor = function (obj) {
        if(obj.hasOwnProperty("Лабораторная работа")){
            return "lightGreen"
        }
        else if (obj.hasOwnProperty("Лекция")){
            if(obj.hasOwnProperty("Семинар")) {
                return "lightCyan"
            }
            return "lightRed"
        } else return "lightCyan"

    }
    
    return {
        subject: item["Дисциплина"],
        term: item["Семестр"].match(/(\d+) семестр/)[1],
        color: chooseColor(item),
        group: item["Подгруппа"],
        megagroup: item["Группа"],
        alternative: item.hasOwnProperty("Альтернатива") ? item["Альтернатива"] : null
    }
})


//var xlObjData = JSON.parse(xlData);
var fs = require('fs');
fs.writeFile('output.json', JSON.stringify(outputData), 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    });

fs.copyFile('./output.json','../js/data.json',(err) => {
    if (err) {
      console.log("Error Found:", err);
    }})

console.log("Test text")
//console.log(xlData);