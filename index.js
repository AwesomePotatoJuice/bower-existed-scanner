var fs = require('fs'),
    readdirp = require('readdirp');

var scanDirPath, exportPath = './_bower.json';
var exportData = {
  "dependencies": {}
};

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

if(!scanDirPath) {
  console.error(
    'Error: the path of bower components is not given, which could be a relative or absolute path. \n' +
    'Some examples of running command: \n' +
    '    node . ./lib/bower_components \n' +
    '    node . /Users/u/works/bower_components \n' +
    '    node . D:/works/bower_components\n' +
    '    node . D:/works/bower_components ./output.json'
  );
  return;
}
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
}

function allProcessed(err, res) {
  console.log('Components found:');
  printJSON(exportData.dependencies);

  fs.writeFile(exportPath, JSON.stringify(exportData, null, 2), 'utf8', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("The file was saved at: " + exportPath);
    }
  });
}

function printJSON(jsonObj) {
  console.log('{');
  var str = '';
  for(var p in jsonObj){
    str += '  ' + '"' + p + '":"' + jsonObj[p] + '"' + ',\n';
  }
  str = str.slice(0, -2);
  console.log(str);
  console.log('}');
}
