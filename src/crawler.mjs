function normalizeURL(url) {
  const urlObject = new URL(url)
  let fullPathname = `${urlObject.host}${urlObject.pathname}`
  if (fullPathname.slice(-1) === '/') {
    fullPathname = fullPathname.slice(0, -1)
  }
  return fullPathname
}

module.exports = {
  normalizeURL
}
