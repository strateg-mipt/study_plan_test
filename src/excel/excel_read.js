const options = require('./import_options.json')
const XLSX = require('xlsx')
const xlData = []

options.filelist.forEach(file =>{
    let workbook = XLSX.readFile(file);
    let sheet_name_list = workbook.SheetNames;

    xlData.push({
        plans: XLSX.utils.sheet_to_json(workbook.Sheets[options.planSheetName]),
        subjects: XLSX.utils.sheet_to_json(workbook.Sheets[options.disciplineSheetName])
    })
})

function simpleProcessXlItem(item){
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
}

var outputData = xlData[0] //.subjects.map(item => simpleProcessXlItem(item))

//var xlObjData = JSON.parse(xlData);
var fs = require('fs');
fs.writeFile('output.json', JSON.stringify(outputData), 'utf8', function(err) {
    if (err) throw err;
    console.log('Processing of XLS files completed.');
    });

/*fs.copyFile('./output.json','../js/data.json',(err) => {
    if (err) {
      console.log("Error Found:", err);
    }

})*/

console.log("Script finished")
//console.log(xlData);