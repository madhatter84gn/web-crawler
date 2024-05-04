import { argv, exit } from 'node:process';

function main() {
  if (argv.length < 3) {
    console.log('To few arguments')
    exit()
  }

  if (argv.length > 3) {
    console.log('To many arguments')
    exit()
  }

  console.log(`The webcrawler is starting with a baseURL of ${argv[2]}`)
}

main()
