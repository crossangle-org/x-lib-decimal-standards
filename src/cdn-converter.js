const U_PK = Math.pow(10, 3)
const U_PM = Math.pow(10, 6)
const U_HM = Math.pow(10, 8)  // 1억
const U_PB = Math.pow(10, 9)
const U_PT = Math.pow(10, 12) // 1조
const U_PQ = Math.pow(10, 15) 
const U_TQ = Math.pow(10, 16) // 1경
const U_PX = Math.pow(10, 18) 

class DecimalConverter {

  constructor(target_number, currency, fixed_unit = 2, has_symbol = true) {
    this.number = target_number
    this.symbol = has_symbol
    this.fixed = fixed_unit
    this.currency = currency || 'USD'
  }

  convert(symbol) {
    const number = Number(this.number)
    if (number === 0) return symbol + 0
    if (number < 0.0001) return -1

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
    if (d < U_PM) {
      return s + this._fixUnits(d)
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
        return m.toFixed(this.fixed)
      }
      const [n, g] = m.toFixed(this.fixed).split('.')
      r = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (g ? `.${g}` : _getReplacedUnit()) 
    } catch {
      r = -1
      console.warn('somthing is wrong', d, u)
    }
    return r
  }
  
  _getReplacedUnit() {
    let unit = '.'
    for (let i = 0; i < this.fixed; i++) {
      unit += '0'
    }  
    return unit
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
    f - fix unit (3 -> 1.003, 2 -> 1.01) 
    s - currency symbol to pretend
  output (string):
    '12,345,678' => '$12.00M' (in case c is USD, s is '$')
    otherwise return '-'   
*/
const convert = function(d, c, f, s) {
  const cvt = new DecimalConverter(d, c, f, s)
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
  r = cvt.convert(cvt.symbol ? symbol : '')

  return r < 0 ? '-' : r
}