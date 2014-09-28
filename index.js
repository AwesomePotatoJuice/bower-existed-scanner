var fs = require('fs'),
    readdirp = require('readdirp');

var scanDirPath, exportPath = './_bower.json';
var exportData = {
    "dependencies": {}
};
// 'D:/works/test/itownet_internal_study/www/lib';
// './_bower.json';
process.argv.forEach(function (val, index) {
  switch(index){
    case 2:
      scanDirPath = val;
      break;
    case 3:
      exportPath = val;
      break;
  }
});

if(!scanDirPath) throw '---\nError: Directory location is not given, \nplease run it like: "node index.json /work/js/components".';
if(!fs.lstatSync(scanDirPath).isDirectory()) throw '---\nError: The given ' + scanDirPath + ' is not a directory.';

readdirp({
    root: scanDirPath,
    fileFilter: 'bower.json'
}, fileProcessed, allProcessed);

function fileProcessed(entry) {
    fs.readFile(entry.fullPath, 'utf8', function(err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        exportData.dependencies[json.name] = json.version;
    })
};
function allProcessed(err, res) {
    console.log('Components found:', exportData.dependencies);

    fs.writeFile(exportPath, JSON.stringify(exportData, null, 2), 'utf8', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved at: " + exportPath);
        }
    });
};
