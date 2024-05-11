function printReport(pages) {
  console.log('Report Printing....')
  console.log('REPORT')
  console.log('====================')
  for (const [key, value] of Object.entries(pages)) {
    console.log(`Found ${value} internal links to ${key}`)
  }
}

function sortPages(pages) {
  const pagesArray = Object.entries(pages);

  pagesArray.sort((pageLeft, pageRight) => {
    if (pageRight[1] === pageLeft[1]) {
      return pageLeft[0].localeCompare(pageRight[0])
    }

    return pageRight[1] - pageLeft[1]
  })

  return pagesArray
}

export { printReport, sortPages }
