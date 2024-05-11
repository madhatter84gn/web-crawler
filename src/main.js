import { argv, exit } from 'node:process';
import { crawlPage } from './crawler.mjs';

async function main() {
  if (argv.length < 3) {
    console.log('To few arguments')
    exit()
  }

  if (argv.length > 3) {
    console.log('To many arguments')
    exit()
  }

  const baseURL = argv[2]
  console.log(`The webcrawler is starting with a baseURL of ${baseURL}`)
  const pages = await crawlPage(baseURL)

  console.log(pages)
}

main()
