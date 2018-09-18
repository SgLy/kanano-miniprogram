const {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync
} = require('fs');
const { join } = require('path');

const lzStringPath = './node_modules/lz-string/libs/lz-string.min.js';
let content = readFileSync(lzStringPath, { encoding: 'utf8' });

const magicNum = 34;
const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$';
const newStr = Array(str.length).fill(0).map((_, i) => str[(i + magicNum) * magicNum % str.length]).join('');
content = content.replace(str, newStr);

const vendorPath = './miniprogram/vendor';
if (!existsSync(vendorPath))
  mkdirSync(vendorPath);
const newPath = join(vendorPath, 'lz-string.js');
writeFileSync(newPath, content);