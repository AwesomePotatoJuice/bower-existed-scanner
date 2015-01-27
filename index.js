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
  if(!err){
    printResult(exportData);

    fs.writeFile(exportPath, JSON.stringify(exportData, null, 2), 'utf8', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("The file was saved at: " + exportPath);
      }
    });
  }
}

// ---
// print functions
// ---
function printResult(jsonObj) {
  console.log('Components found:');
  console.log(printJSON(jsonObj, '', 0));
}

function printJSON (jsonObj, str, deep) {
  deep++;
  str += '{\n';
  var i = 0, len = Object.keys(jsonObj).length;
  for(var p in jsonObj){
    str += repeatedChars(deep * 2, ' ') + '"' + p + '": ';
    // simply judge if it's json
    if(typeof jsonObj[p] === 'object'){
      str = printJSON(jsonObj[p], str, deep);
    }else{
      str += '"' + jsonObj[p] + '"';
      if(++i !== len){
        str += ',\n';
      }else{
        str += '\n';
      }
    }
  }
  str += repeatedChars((deep-1) * 2, ' ') + '}';
  if(deep !== 1){
    str += '\n';
  }
  return str;
}
function repeatedChars(times, char) {
  return new Array(times + 1).join(char);
}

