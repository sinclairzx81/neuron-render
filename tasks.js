//------------------------------------------------------
// task helper scripts:
//------------------------------------------------------

const shell = (command) => new Promise((resolve, reject) => {
  const { spawn } = require('child_process')
  const windows = /^win/.test(process.platform)
  console.log(`\x1b[32m${command}\x1b[0m` )
  const ls      = spawn(windows ? 'cmd' : 'sh', [windows ? '/c' : '-c', command] )
  ls.stdout.pipe(process.stdout)
  ls.stderr.pipe(process.stderr)
  ls.on('close', (code) => resolve(code))
})

const watch = (directory, func) => new Promise((resolve, reject) => {
  const fs   = require("fs")
  const path = require("path")
  fs.watch(directory, func)
  const paths = fs.readdirSync(directory).map(n => path.join(directory, n))
  const stats = paths.map(n => ({path: n, stat: fs.statSync(n)}))
  const dirs  = stats.filter(stat => stat.stat.isDirectory())
  return Promise.all([dirs.map(dir => watch(dir.path, func))])
})

const cli = async (args, tasks) => {
  const task = (args.length === 3) ? args[2] : "none"
  const func = (tasks[task]) ? tasks[task] : () => {
    console.log("tasks:")
    Object.keys(tasks).forEach(task => console.log(` - ${task}`))
  }; await func()
}

//------------------------------------------------------
//  constants:
//------------------------------------------------------

const TYPESCRIPT_SRC = "tsc-bundle --project ./src/tsconfig.json"

//------------------------------------------------------
//  tasks:
//------------------------------------------------------
const clean = async () => {
  await shell("shx rm -rf ./dist/index.js")
  await shell("shx rm -rf ./node_modules")
}

const build = async () => {
  await shell("npm install")
  await shell(`${TYPESCRIPT_SRC}`)
}

const start = async () => {
  await shell("npm install")
  await shell(`${TYPESCRIPT_SRC}`)
  await Promise.all([
    shell(`${TYPESCRIPT_SRC} --watch > /dev/null`),
    shell("fsweb ./dist 5000")
  ])
}

//------------------------------------------------------
//  cli:
//------------------------------------------------------
cli(process.argv, {
  clean,
  build,
  start
}).catch(console.log)
