const getType = require('./get-type');

const numberPad = (x, n) => {
  const s = x.toString(10);
  return Array(Math.max(0, n - s.length)).fill('0').join('') + s;
};

module.exports = {
  formatDatetime: t => {
    if (getType(t) === 'Number')
      t = new Date(t);
    const Y = numberPad(t.getFullYear(), 4);
    const M = numberPad(t.getMonth(), 2);
    const D = numberPad(t.getDate(), 2);
    const h = numberPad(t.getHours(), 2);
    const m = numberPad(t.getMinutes(), 2);
    const s = numberPad(t.getSeconds(), 2);
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
  }
};