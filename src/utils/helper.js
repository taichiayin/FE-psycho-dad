import { useAppStore } from '@/store/app.js'

// const bebelConfig = require('@/../babel.config')

// import * as bebelConfig from '@/../babel.config'

// const styledComponentsPx2rem = bebelConfig.plugins.find(plugin => plugin[0] === 'styled-components-px2rem')[1]
const unitPrecision = 5; const rootValue = 75

const preciseUnit = Math.pow(10, unitPrecision)
/**
 * 编译时期的px to rem的换算
 * @param px
 * @returns {string}
 */
const pxToRem = px => ((Math.round(Math.floor(px / rootValue * preciseUnit) / 10) * 10 / preciseUnit) || 75) + 'rem'
/**
 * 编译时期的px to rem的换算，回传值为数字
 * @param px
 * @returns {number}
 */
const pxToRemNumber = px => ((Math.round(Math.floor(px / rootValue * preciseUnit) / 10) * 10 / preciseUnit) || 75)

const propsCombinationWithAll = (items) => {
  !Array.isArray(items) && (items = [items])
  items.forEach(({ props, target }) => {
    target.props = { ...target.props, ...props }
  })
}

const propsCombination = (propsArray, target) => {
  !Array.isArray(propsArray) && (propsArray = [propsArray])
  propsArray.forEach(props => {
    target.props = { ...target.props, ...props }
  })
}
/**
 * 执行时间，client端的「设计稿px」换算成「client应要有的px」的比例
 * @returns {number}
 */
const remToPx = px => {
  const app = useAppStore()
  return px * (app.currentFontSize / rootValue)
}

const activeProps = {
  isActive: Boolean
}

const imgProps = {
  imgUrl: String
}

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const checkProduction = () => {
  return window.env.BUILD_CONFIG === 'production'
}

const roundDown = (num, decimal) => {
  return Math.floor((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal)
}

const roundDownNegative = (num, decimal) => {
  return Math.ceil((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal)
}

export {
  pxToRem,
  pxToRemNumber,
  propsCombination,
  propsCombinationWithAll,
  activeProps,
  imgProps,
  remToPx,
  rootValue,
  timeout,
  checkProduction,
  roundDown,
  roundDownNegative
}
