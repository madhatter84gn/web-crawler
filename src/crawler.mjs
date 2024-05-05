import { JSDOM } from 'jsdom'

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

async function crawlPage(pageAddress) {
  let response;
  try {
    response = await fetch(pageAddress);
  } catch (err) {
    throw new Error(`A network error has occurred: ${err.message}`)
  }

  if (response.status >= 400) {
    console.log('Http Error: ${response.status} ${response.text}')
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`Response does not contain correct response type: ${contentType}`)
    return
  }

  console.log(await response.text())
}

export {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}

