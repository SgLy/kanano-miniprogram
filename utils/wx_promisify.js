const wx_p = (() => {
  const _wx = {};
  const ret = {};
  Object.keys(wx).forEach(n => {
    _wx[n] = wx[n];
    ret[n] = (args = {}) => new Promise((resolve, reject) => {
      args.success = (res) => { resolve(res); };
      args.fail = (res) => { reject(res); };
      _wx[n](args);
    });
  });
  return ret;
})();

console.log(wx, wx_p)

module.exports = {
  wxSync: wx,
  wx: wx_p
};