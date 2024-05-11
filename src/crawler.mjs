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

async function fetchHTML(url) {
  let response
  try {
    response = await fetch(url)
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`)
  }

  if (response.status > 399) {
    throw new Error(`Got HTTP error: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    throw new Error(`Got non-HTML response: ${contentType}`)
  }

  return response.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);

  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages;
  }

  const normCurrent = normalizeURL(currentURL);

  if (pages[normCurrent] > 0) {
    pages[normCurrent]++;
    return pages
  }

  pages[normCurrent] = 1;

  console.log(`Crawling... ${currentURL}`)
  let html = ''
  try {
    html = await fetchHTML(currentURL);
  } catch (err) {
    console.log(err.message)
    return pages;
  }

  const nextURLS = getURLsFromHTML(html, baseURL)
  for (const nextURL of nextURLS) {
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages;
}

export {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}

