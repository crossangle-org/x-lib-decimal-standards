/*
  input:
    d - string or number to convert('12345678.90', 12345678.90)
    c - currency information (USD, KRW, IDR, RUB, JPY)
    s - whether prepend a currency symbol or not
  output (string):
    if result is NaN (Not a Number) or occur error, return default '-'
    '12,345,678' (only d) or '$12.00M' (in case c is USD, s is '$')   
*/
module.exports = function (d, c = 'USD', s = true) {
  let r = '-'

  try {
    d = Number(d)
    if (d < 0 || isNaN(d)) {
      return r; 
    }
  } catch {
    console.error('ocurred error')
    return r
  }
  
  if (c === 'USD') r = _convertToUSD(d, s ? '$' : '')
  else if (c === 'KRW') r = _convertToKRW(d, s ? '₩' : '')
  else if (c === 'RUB') r = _convertToUSD(d, s ? '₽' : '')
  else if (c === 'IDR') r = _convertToIDR(d, s ? 'Rp' : '')
  else if (c === 'JPY') r = _convertToKRW(d, s ? '¥' : '')

  return r
}

const U_PK = Math.pow(10, 3)
const U_HK = Math.pow(10, 5)
const U_PM = Math.pow(10, 6)
const U_HM = Math.pow(10, 8) // 1억
const U_PB = Math.pow(10, 9)
const U_PT = Math.pow(10, 12) // 1조
const U_PQ = Math.pow(10, 15) 
const U_TQ = Math.pow(10, 16) // 1경
const U_PX = Math.pow(10, 18) 

function _convertToUSD(d, s) {
  if (d === 0) return s + 0

  if (d < U_PK) {
    return s + d
  } else if (d < U_PM) {
    return s + _fixUnits(d, U_PK) + (s === '₽' ? 'тыс.' : 'K')
  } else if (d < U_PB) {
    return s + _fixUnits(d, U_PM) + (s === '₽' ? 'млн.' : 'M')
  } else if (d < U_PT) {
    return s + _fixUnits(d, U_PB) + (s === '₽' ? 'млрд.' : 'B')
  } else if (d < U_PQ) {
    return s + _fixUnits(d, U_PT) + (s === '₽' ? 'трлн.' : 'T')
  }
  return s + _fixUnits(d, U_PQ) + (s === '₽' ? 'квдр.' : 'Q')
}

function _convertToKRW(d, s) {
  if (d === 0) return s + 0

  if (d < U_PK) {
    return s + d
  } else if (d < U_PM) {
    return s + _noFixUnits(d)
  } else if (d < U_HM) {
    return s + _fixUnits(d, U_PM) + (s === '¥' ? '万円' : '백만')
  } else if (d < U_PT) { 
    return s + _fixUnits(d, U_HM) + (s === '¥' ? '億円' : '억')
  } else if (d < U_TQ) { 
    return s + _fixUnits(d, U_PT) + (s === '¥' ? '兆円' : '조')
  } 
  return s + _fixUnits(d, U_TQ) + (s === '¥' ? '京円' : '경')
}

function _convertToIDR(d, s) {
  if (d === 0) return s + 0

  if (d < U_PK) {
    return s + d
  } else if (d < U_PM) {
    return s + _noFixUnits(d)
  } else if (d < U_PB) {
    return s + _fixUnits(d, U_PM) + 'M'
  } else if (d < U_PT) {
    return s + _fixUnits(d, U_PB) + 'B'
  } else if (d < U_PQ) {
    return s + _fixUnits(d, U_PT) + 'T'
  } else if (d < U_PX) {
    return s + _fixUnits(d, U_PQ) + 'Qa'
  }
  return s + _fixUnits(d, U_PQ * U_PK) + 'Qi'
}

function _fixUnits(d, u) {
  let r = 0
  try {
    const m = d / u
    const [n, g] = m.toFixed(2).split('.')
    r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (g ? `.${g}` : '.00') 
    // console.log(r, n, g)
  } catch {
    r = -1
    console.warn('somthing wrong', d, u)
  }
  return r
}

function _noFixUnits(d) {
  let r = 0
  try {
    n = d.toFixed(0)
    r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } catch {
    r = -1
    console.warn('somthing wrong', d)
  }
  return r
}