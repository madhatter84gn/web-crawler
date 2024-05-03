const {
  normalizeURL,
  getURLsFromHTML
} = require("../crawler.mjs")

describe('normalizeURL', () => {
  it('should handle stripping protocol http', () => {
    const inputURL = 'http://blog.boot.dev/path'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(inputURL)

    expect(actual).toEqual(expected)
  })

  it('should handle stripping protocol https', () => {
    const inputURL = 'https://blog.boot.dev/path'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(inputURL)

    expect(actual).toEqual(expected)
  })

  it('should handle capital letters', () => {
    const inputURL = 'https://BLOG.BOOT.dev/path'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(inputURL)

    expect(actual).toEqual(expected)
  })


  it('should handle stripping trailing slash', () => {
    const inputURL = 'https://BLOG.BOOT.dev/path/'
    const expected = 'blog.boot.dev/path'
    const actual = normalizeURL(inputURL)

    expect(actual).toEqual(expected)
  })


  it('should handle multiple paths', () => {
    const inputURL = 'https://blog.boot.dev/path1/path2'
    const expected = 'blog.boot.dev/path1/path2'
    const actual = normalizeURL(inputURL)

    expect(actual).toEqual(expected)
  })
})

describe('getURLSFromHTML', () => {
  it('should handle an absolute URL', () => {
    const baseURL = "https://blog.boot.dev";
    const inputHTML = `
      <html>
        <body>
          <a href="https://blog.boot.dev">Boot.dev</a>
        </body>
      </html>
  `;
    const expected = ['https://blog.boot.dev/']
    const actual = getURLsFromHTML(inputHTML, baseURL)

    expect(actual).toEqual(expected)
  })

  it('should handle a relative url', () => {
    const baseURL = "https://blog.boot.dev";
    const inputHTML = `
      <html>
        <body>
          <a href="https:/path1">Boot.dev</a>
        </body>
      </html>
  `;
    const expected = ['https://blog.boot.dev/path1']
    const actual = getURLsFromHTML(inputHTML, baseURL)

    expect(actual).toEqual(expected)
  })
})
