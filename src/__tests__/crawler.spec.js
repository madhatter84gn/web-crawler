const { normalizeURL } = require("../crawler.mjs")

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
// A URL string
// And returns a "normalized" URL. To "normalize" means to "make the same". For example, all of these URLs are the "same page" according to most websites and HTTP standards:
//
// https://blog.boot.dev/path/
// https://blog.boot.dev/path
// http://blog.boot.dev/path/
// http://blog.boot.dev/path
// We want our normalizeURL() function to map all of those same inputs to a single normalized output: blog.boot.dev/path. Keep in mind, the normalized url isn't going to be used to make requests, it's just going to be used to compare URLs to see if they are the same page.*
