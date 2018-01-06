'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://120.79.138.83:8080"',
  // ICON_API: '"http://120.79.138.83:8080"'
  BASE_API: '"http://localhost:3000"',
  ICON_API: '"http://localhost:3000"'
})
