const path = require("path")
const options = require(path.join(__dirname,'import_options.json'))
const XLSX = require('xlsx')
const xlData = []

options.filelist.forEach(file =>{
    let workbook = XLSX.readFile(path.resolve(__dirname,file));
    //let sheet_name_list = workbook.SheetNames;

    xlData.push({
        plans: XLSX.utils.sheet_to_json(workbook.Sheets[options.planSheetName]),
        subjects: XLSX.utils.sheet_to_json(workbook.Sheets[options.disciplineSheetName])
    })
})

var outputData = xlData[0] //.subjects.map(item => simpleProcessXlItem(item))

//var xlObjData = JSON.parse(xlData);
var fs = require('fs');
fs.writeFile(
  path.resolve(__dirname, options.outputFilePath),
  JSON.stringify(outputData),
  "utf8",
  function (err) {
    if (err) throw err
    
    console.log("Processing of XLS files completed.")

    if(options.copyFilePath) {
    fs.copyFile(
      path.resolve(__dirname, options.outputFilePath),
      path.resolve(__dirname, options.copyFilePath),
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        }
        console.log("Script finished");
      }
    )
    }
  }
);

