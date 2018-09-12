const { wx } = require('./wx_promisify');
const { PROTO, SERVER, PORT } = require('./server_config');

module.exports = {
  parse: text => {
    return wx.request({
      url: `${PROTO}://${SERVER}:${PORT}/api/parse`,
      method: 'POST',
      data: { text }
    });
  }
};