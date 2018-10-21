const { wxSync } = require('./wx_promisify');
const { parse, stringify } = require('./serialization');

// polyfill
(() => {
  const m = new Map();
  console.time = s => m.set(s, new Date());
  console.timeEnd = s => {
    const time = new Date() - m.get(s);
    console.log(`[${s}] ${time}ms`);
  };
})();

function saveData(data) {
  wxSync.setStorageSync('data', stringify(data));
}

function loadData() {
  const raw = wxSync.getStorageSync('data');
  console.log('Data size:', raw.length);
  const parsed = parse(raw);
  return parsed;
}

module.exports = {
  loadData,
  saveData
};
