var fs = require('fs');
var path = require('path');

var _walk = function(dir, callback) {
  var
    fileList = fs.readdirSync(dir),
    finalFileList = [];

  fileList.forEach(function(file) {
    var isDirectory = fs.statSync(path.join(dir, file)).isDirectory();
    if (isDirectory) {
      var newDir = path.join(dir, file);
      _walk(newDir, function(results) {
        finalFileList = finalFileList.concat(results);
      });
    } else {
      var newFile = path.join(dir, file);
      finalFileList.push(newFile);
    }
  });

  return callback(finalFileList);
};

var files = function(dir) {
  var fileList = [];

  dir = path.normalize(dir);

  _walk(dir, function(results) {
    results.forEach(function(value, index) {
      value = value[index].split(dir + path.sep)[1] || value;
      fileList.push(value);
    });
  });

  return fileList;
};

module.exports = files;