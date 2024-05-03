const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url) {
  const urlObject = new URL(url)
  let fullPathname = `${urlObject.host}${urlObject.pathname}`
  if (fullPathname.slice(-1) === '/') {
    fullPathname = fullPathname.slice(0, -1)
  }
  return fullPathname
}

function getURLsFromHTML(html, baseURL) {
  const urls = [];
  const { document } = new JSDOM(html).window
  const linkElements = [...document.querySelectorAll("a")]

  linkElements.forEach((link) => {
    if (link.hasAttribute("href")) {
      let href = link.getAttribute("href")
      try {
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch (err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  })
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
}
