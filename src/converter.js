const U_PK = 1e3
const U_PM = 1e6
const U_HM = 1e8  // 1억
const U_PB = 1e9 
const U_PT = 1e12 // 1조
const U_PQ = 1e15 
const U_TQ = 1e16 // 1경
const U_PX = 1e18 

class DecimalConverter {

  constructor(targetNumber, currency, options) {
    // required
    this.number = targetNumber
    this.currency = currency || 'USD'
    
    // optional
    const { symbol, axis, point } = options
    this.noSymbol = symbol === false
    this.isAxis = axis

    this.fixed = this._decimalPoint(targetNumber)
    if (point >= 0) {
      this.fixed = point
    }
  }

  convert(symbol) {
    const number = Number(this.number)
    if (number === 0) return symbol + 0

    if      (this.currency === 'KRW') return this._convertToKRW(number, symbol)
    else if (this.currency === 'IDR') return this._convertToIDR(number, symbol)
    else if (this.currency === 'JPY') return this._convertToKRW(number, symbol)

    return this._convertToUSD(number, symbol) // RUB
  }

  _convertToUSD(d, s) {
    if (d < U_PK) {
      return s + this._fixUnits(d)
    } else if (d < U_PM) {
      return s + this._fixUnits(d, U_PK) + (s === '₽' ? 'тыс.' : 'K')
    } else if (d < U_PB) {
      return s + this._fixUnits(d, U_PM) + (s === '₽' ? 'млн.' : 'M')
    } else if (d < U_PT) {
      return s + this._fixUnits(d, U_PB) + (s === '₽' ? 'млрд.' : 'B')
    } else if (d < U_PQ) {
      return s + this._fixUnits(d, U_PT) + (s === '₽' ? 'трлн.' : 'T')
    }
    return s + this._fixUnits(d, U_PQ) + (s === '₽' ? 'квдр.' : 'Q')
  }
  
  _convertToKRW(d, s) {
    if (d < U_PK) {
      return s + this._fixUnits(d)
    } else if (d < U_PM) {
      return s + (this.isAxis ? this._noFixUnits(d) : this._fixUnits(d))
    } else if (d < U_HM) {
      return s + this._fixUnits(d, U_PM) + (s === '¥' ? '万円' : '백만')
    } else if (d < U_PT) { 
      return s + this._fixUnits(d, U_HM) + (s === '¥' ? '億円' : '억')
    } else if (d < U_TQ) { 
      return s + this._fixUnits(d, U_PT) + (s === '¥' ? '兆円' : '조')
    } 
    return s + this._fixUnits(d, U_TQ) + (s === '¥' ? '京円' : '경')
  }
  
  _convertToIDR(d, s) {
    if (d < U_PM) {
      return s + this._fixUnits(d)
    } else if (d < U_PB) {
      return s + this._fixUnits(d, U_PM) + 'M'
    } else if (d < U_PT) {
      return s + this._fixUnits(d, U_PB) + 'B'
    } else if (d < U_PQ) {
      return s + this._fixUnits(d, U_PT) + 'T'
    } else if (d < U_PX) {
      return s + this._fixUnits(d, U_PQ) + 'Qa'
    }
    return s + this._fixUnits(d, U_PQ * U_PK) + 'Qi'
  }
  
  _fixUnits(d, u) {
    let r = 0
    try {
      const m = !u ? d : d / u
      if (this.fixed === 0) {
        return this._noFixUnits(m)
      } else {
        const [n, g] = m.toFixed(this.fixed).split('.')
        r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (g ? `.${g}` : _replacedUnit()) 
        // console.log(r, d, n, g)
      }
    } catch {
      r = -1
      console.warn('somthing is wrong', d, u)
    }
    return r
  }
  
  _replacedUnit() {
    let unit = '.'
    for (let i = 0; i < this.fixed; i++) {
      unit += '0'
    }  
    return unit
  }

  _decimalPoint(v) {
    if (v >= 10) return v >= 100 || this.isAxis ? 2 : 3

    if (v < 1) {
        const point = Math.floor(Math.log10(v))
        return Math.abs(point) + (this.isAxis ? 2 : 3)
    }
  
    return 3 // 1 <= v <
  }

  _noFixUnits(d) {
    let r = 0
    try {
      const n = d.toFixed(0)
      r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } catch {
      r = -1
      console.warn('somthing is wrong', d)
    }
    return r
  }
}

const CURRENCY_MAP = {
  'USD': '$',
  'KRW': '₩',
  'RUB': '₽',
  'IDR': 'Rp',
  'JPY': '¥'
}
/*
  input:
    d - target string or number to convert('12345678.90', 12345678.90)
    c - currency information to convert (USD, KRW, IDR, RUB, JPY)
    o - options {
      point - number of points to fix explictly  
      symbol - prepend currency symbol or not, (default true)
      axis - strict convert or not to display y axis on a chart or not(only KRW), (default false)
    }
  output (string):
    '12,345,678' => '$12.34M' (in case c is USD, s is '$')
    '0.000123' => '0.00012' (in case c is USD, s is '$', {symbol: false, point: 5})
    '123,456' => '₩123,456' (in case c is USD, s is '$', {axis: true})
    otherwise return '-'   
*/
module.exports = function (d, c, o = {}) {
  const cvt = new DecimalConverter(d, c, o)
  let r = '-'

  try {
    const n = Number(cvt.number)
    if (n < 0 || isNaN(n)) {
      return r; 
    }
  } catch {
    console.error('error occur')
    return r
  }
  
  const symbol = CURRENCY_MAP[cvt.currency]
  r = cvt.convert(cvt.noSymbol ? '' : symbol)

  return r < 0 ? '-' : r
}
