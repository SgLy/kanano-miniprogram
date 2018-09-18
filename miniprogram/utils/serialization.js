const {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} = require('../vendor/lz-string');

function stringify(data) {
  const str = JSON.stringify(data);
  return compressToEncodedURIComponent(str);
}

function parse(compressed) {
  if (compressed.length === 0)
    return [];
  const str = decompressFromEncodedURIComponent(compressed);
  return JSON.parse(str);
}

module.exports = {
  stringify,
  parse
};