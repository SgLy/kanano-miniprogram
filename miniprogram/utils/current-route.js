/* global getCurrentPages */
module.exports = () => {
  const pages = getCurrentPages();
  return pages[pages.length - 1].route;
}