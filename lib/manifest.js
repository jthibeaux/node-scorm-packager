var
  os = require('os'),
  builder = require('xmlbuilder'),
  path = require('path'),
  schema = require('./schema.js'),
  files = require('./files.js'),
  url = require('url');

var manifest = function (version, obj) {
  var
    configObj = schema.config(obj),
    lisOfFiles = files(path.join(configObj.destination, 'Scorm' + obj.version));

  configObj.files = lisOfFiles.map(function(value){
    var rObj = {};
    rObj['@href'] = url.format(value);
    return rObj;
  });

  return builder.create('manifest', {
    version: '1.0',
    encoding: 'utf-8',
    standalone: false
  })
    .ele(schema[version](configObj))
    .end({
      pretty: true,
      newline: os.EOL
    });
};

module.exports = manifest;
