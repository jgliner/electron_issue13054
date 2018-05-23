const bodyParser = require('body-parser')
const child = require('child_process')
const electron = require('electron')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const app = express()
const spawn = child.spawn

const port = 3005

app.use(morgan('dev'))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDev = require('webpack-dev-middleware')
  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  app.use(webpackDev(compiler, {
    publicPath: config.output.publicPath,
    color: true,
  }))

  app.use(express.static(path.resolve(__dirname, '../src')))
}

app.listen(port, () => {
  const childProc = spawn(electron, ['--inspect=5858', './electron-app/entry.js'], {
    env: {
      ...{
        NODE_ENV: 'development',
      },
      ...process.env
    },
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })

  // ***
  // Pardon the mess below. I tried to use different methods of getting things to log
  // to the inspector
  // **

  try {
////////////////////////////////////////////////////////////

    childProc.stdout.on('message', (a,b,c,d,e) => {
      try {
        process.stdout.write('1)', a, b, c, d, e)
      }
      catch(err) {
        console.log('XS1) NO STDOUT WRITE MSG')
      }

      console.log('2) MSG (childProc.stdout)', a, b, c, d, e)
    })

////////////////////////////////////////////////////////////

    childProc.stdout.on('data', (a,b,c,d,e) => {
      try {
        process.stdout.write('3)', a, b, c, d, e)
      }
      catch(err) {
        console.log('XS3) NO STDOUT WRITE DATA')
      }

      console.log('4) DATA (childProc.stdout)', a, b, c, d, e)
    })
  }
  catch(err) {
    console.log('***X***) DOES NOT HAVE STDOUT LISTENERS\n', err)
  }

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

  childProc.on('message', (a,b,c,d,e) => {
    try {
      process.stdout.write('5)', a, b, c, d, e)
    }
    catch(err) {
      console.log('XS5) NO STDOUT WRITE MSG')
    }

    console.log('6) MSG', a, b, c, d, e)
  })

////////////////////////////////////////////////////////////

  childProc.on('data', (a,b,c,d,e) => {
    try {
      process.stdout.write('7)', a, b, c, d, e)
    }
    catch(err) {
      console.log('XS7) NO STDOUT WRITE DATA')
    }

    console.log('8) DATA', a, b, c, d, e)
  })

////////////////////////////////////////////////////////////

  childProc.on('close', () => {
    process.exit()
  })

  console.log(chalk.cyan('\n\n-_-_-_-_SMALL SCALE DEV SERVER-_-_-_-_\n', 'Port', port, '\n\n\n'))
})
