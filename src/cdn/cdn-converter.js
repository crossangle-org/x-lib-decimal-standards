const U_PK = 10e2
const U_PM = 10e5
const U_HM = 10e7  // 1억
const U_PB = 10e8 
const U_PT = 10e11 // 1조
const U_PQ = 10e14 
const U_TQ = 10e15 // 1경
const U_PX = 10e17 

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
      let m = !u ? d : d / u
      if (this.fixed === 0) {
        return this._noFixUnits(m)
      } else {
        const [n, g] = m.toFixed(this.fixed).split('.')
        r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (g ? `.${g}` : _replacedUnit()) 
        // console.log(r, d, n, g)
      }
    } catch (e) {
      r = -1
      console.warn(`(fix) somthing is wrong ${e}`, d, u)
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
    if (v >= 100) return 2
  
    for (let i = 7; i > 1; i--) {
      const point = 1 / Math.pow(10, i)
      if (v < point) {
        return i + 3
      }
    }
  
    return v < 1 ? 4 : 3 // < 100
  }

  _noFixUnits(d) {
    let r = 0
    try {
      const n = d.toFixed(0)
      r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } catch {
      r = -1
      console.warn('(noFix) somthing is wrong', d)
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
      symbol - currency symbol to prepend
      axis - strict convert (drop points)
      point - number to fix
      volume - eq. market cap, volume (default true)
    }
  output (string):
    '12,345,678' => '$12.34M' (in case c is USD, s is '$')
    otherwise return '-'   
*/
const convert = function (d, c, o = {}) {
  const cvt = new DecimalConverter(d, c, o)
  let r = '-'

  try {
    const n = Number(cvt.number)
    if (n < 0 || isNaN(n)) {
      return r; 
    }
  } catch {
    console.error('ocurred error')
    return r
  }
  
  const symbol = CURRENCY_MAP[cvt.currency]
  r = cvt.convert(cvt.noSymbol ? '' : symbol)

  return r < 0 ? '-' : r
}