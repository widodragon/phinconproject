let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'mobi_master.csv'; 
let fileOutputName = 'mobimaster.json';
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);