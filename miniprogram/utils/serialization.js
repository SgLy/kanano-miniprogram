const { wxSync } = require('./wx_promisify');

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
    return {};
  const str = decompressFromEncodedURIComponent(compressed);
  return JSON.parse(str);
}

function saveData(data) {
  wxSync.setStorageSync('data', stringify(data));
}

function loadData() {
  return parse(wxSync.getStorageSync('data'));
}

module.exports = {
  stringify,
  parse,
  loadData,
  saveData
};