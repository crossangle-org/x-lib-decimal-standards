var assert_equal = require('chai').assert.equal
var assert_expect = require('chai').expect
var convert = require('../src/converter.js')


describe("currency in USD", function() {
  it("under 0 -2", function() {
    assert_equal(convert(0.065264, 'USD'), '$0.07');
  });

  it("under 0 -3", function() {
    assert_equal(convert(0.065264, 'USD', 3), '$0.065');
  });

  it("0 (zero)", function() {
    assert_equal(convert(0, 'USD'), '$0');
  });

  it("1087641653940.0972", function() {
    assert_equal(convert('1087641653940.0972', 'USD'), '$1.09T');
  });

  it("3 (10 ^ 0)", function() {
    assert_equal(convert(3, 'USD'), '$3');
  });

  it("23 (10 ^ 1)", function() {
    assert_equal(convert(23, 'USD', 2, false), '23');
  });

  it("87 (10 ^ 1)", function() {
    assert_equal(convert(87, 'USD'), '$87');
  });

  it("531 (10 ^ 2)", function() {
    assert_equal(convert(531, 'USD'), '$531');
  });

  it("4,785 (10 ^ 3)", function() {
    assert_equal(convert(4785, 'USD'), '$4.79K');
  });

  it("56,996 (10 ^ 4)", function() {
    assert_equal(convert(56996, 'USD'), '$57.00K');
  });

  it("198,672 (10 ^ 5)", function() {
    assert_equal(convert('198672', 'USD'), '$198.67K');
  });

  it("4,785,789 (10 ^ 6)", function() {
    assert_equal(convert(4785789.85, 'USD'), '$4.79M');
  });

  it("56,995,223 (10 ^ 7)", function() {
    assert_equal(convert(56995223, 'USD'), '$57.00M');
  });

  it("844,198,672 (10 ^ 8)", function() {
    assert_equal(convert(844198672, 'USD'), '$844.20M');
  });

  it("1,003,785,789 (10 ^ 9)", function() {
    assert_equal(convert(1003785789, 'USD'), '$1.00B');
  });

  it("10,012,995,223 (10 ^ 10)", function() {
    assert_equal(convert(10012995223, 'USD'), '$10.01B');
  });

  it("100,844,198,672 (10 ^ 11)", function() {
    assert_equal(convert(100844198672, 'USD'), '$100.84B');
  });

  it("1,001,003,785,789 (10 ^ 12)", function() {
    assert_equal(convert(1001003785789, 'USD'), '$1.00T');
  });

  it("10,000,012,995,223 (10 ^ 13)", function() {
    assert_equal(convert(10000012995223, 'USD'), '$10.00T');
  });

  it("100,000,844,198,672 (10 ^ 14)", function() {
    assert_equal(convert(100000844198672, 'USD'), '$100.00T');
  });

  it("1,021,001,003,785,789 (10 ^ 15)", function() {
    assert_equal(convert(1021001003785789, 'USD'), '$1.02Q');
  });

  it("10,010,000,012,995,223 (10 ^ 16)", function() {
    assert_equal(convert(10010000012995223, 'USD'), '$10.01Q');
  });

  it("100,000,000,844,198,672 (10 ^ 17)", function() {
    assert_equal(convert('100000000844198672', 'USD'), '$100.00Q');
  });

  it("345,100,000,000,844,198,672 (over 10 ^ 17)", function() {
    assert_equal(convert('345100000000844198672', 'USD'), '$345,100.00Q');
  });

  it("-898 (negative)", function() {
    assert_expect(convert(-898, 'USD')).to.equal('-');
  });

  it("NaN (undefine)", function() {
    assert_expect(convert(undefined, 'USD')).to.equal('-');
  });
});

describe("currency in KRW", function() {
  it("under 0 -2", function() {
    assert_equal(convert(0.065264, 'KRW'), '₩0.07');
  });

  it("under 0 -3", function() {
    assert_equal(convert(0.065264, 'KRW', 3), '₩0.065');
  });

  it("0 (zero)", function() {
    assert_equal(convert(0, 'KRW'), '₩0');
  });

  it("3 (10 ^ 0)", function() {
    assert_equal(convert(3, 'KRW'), '₩3');
  });

  it("87 (10 ^ 1)", function() {
    assert_equal(convert(87, 'KRW'), '₩87');
  });

  it("531 (10 ^ 2)", function() {
    assert_equal(convert(531, 'KRW'), '₩531');
  });

  it("4,785 (10 ^ 3)", function() {
    assert_equal(convert(4785, 'KRW'), '₩4,785');
  });

  it("56,996 (10 ^ 4)", function() {
    assert_equal(convert(56996, 'KRW'), '₩56,996');
  });

  it("198,672 (10 ^ 5)", function() {
    assert_equal(convert('198672', 'KRW'), '₩198,672');
  });

  it("943926.8530263979 (10 ^ 5)", function() {
    assert_equal(convert(943926.8530263979, 'KRW'), '₩943,927');
  });

  it("4,785,789 (10 ^ 6)", function() {
    assert_equal(convert(4785789.85, 'KRW'), '₩4.79백만');
  });

  it("56,995,223 (10 ^ 7)", function() {
    assert_equal(convert(56995223, 'KRW'), '₩57.00백만');
  });

  it("844,198,672 (10 ^ 8)", function() {
    assert_equal(convert(844198672, 'KRW'), '₩8.44억');
  });

  it("1,003,785,789 (10 ^ 9)", function() {
    assert_equal(convert(1003785789, 'KRW'), '₩10.04억');
  });

  it("10,012,995,223 (10 ^ 10)", function() {
    assert_equal(convert(10012995223, 'KRW'), '₩100.13억');
  });

  it("100,844,198,672 (10 ^ 11)", function() {
    assert_equal(convert(100844198672, 'KRW'), '₩1,008.44억');
  });

  it("1,001,003,785,789 (10 ^ 12)", function() {
    assert_equal(convert(1001003785789, 'KRW'), '₩1.00조');
  });

  it("10,000,012,995,223 (10 ^ 13)", function() {
    assert_equal(convert(10000012995223, 'KRW'), '₩10.00조');
  });

  it("100,000,844,198,672 (10 ^ 14)", function() {
    assert_equal(convert(100000844198672, 'KRW'), '₩100.00조');
  });

  it("1,021,001,003,785,789 (10 ^ 15)", function() {
    assert_equal(convert(1021001003785789, 'KRW'), '₩1,021.00조');
  });

  it("10,010,000,012,995,223 (10 ^ 16)", function() {
    assert_equal(convert('10010000012995223', 'KRW'), '₩1.00경');
  });

  it("100,000,000,844,198,672 (10 ^ 17)", function() {
    assert_equal(convert('100000000844198672', 'KRW'), '₩10.00경');
  });

  it("5,345,100,000,844,198,672 (10 ^ 18)", function() {
    assert_equal(convert('5345100000844198672', 'KRW'), '₩534.51경');
  });

  it("95,345,100,000,844,198,672 (10 ^ 19)", function() {
    assert_equal(convert('95345100000844198672', 'KRW'), '₩9,534.51경');
  });

  it("1e-8 (under 1)", function() {
    assert_expect(convert(1e-8, 'KRW')).to.equal('-');
  });

  it("-898 (negative)", function() {
    assert_expect(convert(-898, 'KRW')).to.equal('-');
  });

  it("NaN (undefine)", function() {
    assert_expect(convert(undefined, 'KRW')).to.equal( '-');
  });
});
/*
describe("currency in RUB", function() {
  it("0 (zero)", function() {
    assert_equal(convert(0, 'RUB'), '₽0');
  });

  it("3 (10 ^ 0)", function() {
    assert_equal(convert(3, 'RUB'), '₽3');
  });

  it("87 (10 ^ 1)", function() {
    assert_equal(convert(87, 'RUB'), '₽87');
  });

  it("531 (10 ^ 2)", function() {
    assert_equal(convert(531, 'RUB'), '₽531');
  });

  it("4,785 (10 ^ 3)", function() {
    assert_equal(convert(4785, 'RUB'), '₽4.79тыс.');
  });

  it("56,996 (10 ^ 4)", function() {
    assert_equal(convert(56996, 'RUB'), '₽57.00тыс.');
  });

  it("198,672 (10 ^ 5)", function() {
    assert_equal(convert('198672', 'RUB'), '₽198.67тыс.');
  });

  it("4,785,789 (10 ^ 6)", function() {
    assert_equal(convert(4785789.85, 'RUB'), '₽4.79млн.');
  });

  it("56,995,223 (10 ^ 7)", function() {
    assert_equal(convert(56995223, 'RUB'), '₽57.00млн.');
  });

  it("844,198,672 (10 ^ 8)", function() {
    assert_equal(convert(844198672, 'RUB'), '₽844.20млн.');
  });

  it("1,003,785,789 (10 ^ 9)", function() {
    assert_equal(convert(1003785789, 'RUB'), '₽1.00млрд.');
  });

  it("10,012,995,223 (10 ^ 10)", function() {
    assert_equal(convert(10012995223, 'RUB'), '₽10.01млрд.');
  });

  it("100,844,198,672 (10 ^ 11)", function() {
    assert_equal(convert(100844198672, 'RUB'), '₽100.84млрд.');
  });

  it("1,001,003,785,789 (10 ^ 12)", function() {
    assert_equal(convert(1001003785789, 'RUB'), '₽1.00трлн.');
  });

  it("10,000,012,995,223 (10 ^ 13)", function() {
    assert_equal(convert(10000012995223, 'RUB'), '₽10.00трлн.');
  });

  it("100,000,844,198,672 (10 ^ 14)", function() {
    assert_equal(convert(100000844198672, 'RUB'), '₽100.00трлн.');
  });

  it("1,021,001,003,785,789 (10 ^ 15)", function() {
    assert_equal(convert(1021001003785789, 'RUB'), '₽1.02квдр.');
  });

  it("10,010,000,012,995,223 (10 ^ 16)", function() {
    assert_equal(convert(10010000012995223, 'RUB'), '₽10.01квдр.');
  });

  it("100,000,000,844,198,672 (10 ^ 17)", function() {
    assert_equal(convert('100000000844198672', 'RUB'), '₽100.00квдр.');
  });

  it("345,100,000,000,844,198,672 (over 10 ^ 17)", function() {
    assert_equal(convert('345100000000844198672', 'RUB'), '₽345,100.00квдр.');
  });

  it("-898 (negative)", function() {
    assert_expect(convert(-898, 'RUB')).to.equal('-');
  });

  it("NaN (undefine)", function() {
    assert_expect(convert(undefined, 'RUB')).to.equal('-');
  });
});

describe("currency in JPY", function() {
  it("0 (zero)", function() {
    assert_equal(convert(0, 'JPY'), '¥0');
  });

  it("3 (10 ^ 0)", function() {
    assert_equal(convert(3, 'JPY'), '¥3');
  });

  it("87 (10 ^ 1)", function() {
    assert_equal(convert(87, 'JPY'), '¥87');
  });

  it("531 (10 ^ 2)", function() {
    assert_equal(convert(531, 'JPY'), '¥531');
  });

  it("4,785 (10 ^ 3)", function() {
    assert_equal(convert(4785, 'JPY'), '¥4,785');
  });

  it("56,996 (10 ^ 4)", function() {
    assert_equal(convert(56996, 'JPY'), '¥56,996');
  });

  it("198,672 (10 ^ 5)", function() {
    assert_equal(convert('198672', 'JPY'), '¥198,672');
  });

  it("4,785,789 (10 ^ 6)", function() {
    assert_equal(convert(4785789.85, 'JPY'), '¥4.79万円');
  });

  it("56,995,223 (10 ^ 7)", function() {
    assert_equal(convert(56995223, 'JPY'), '¥57.00万円');
  });

  it("844,198,672 (10 ^ 8)", function() {
    assert_equal(convert(844198672, 'JPY'), '¥8.44億円');
  });

  it("1,003,785,789 (10 ^ 9)", function() {
    assert_equal(convert(1003785789, 'JPY'), '¥10.04億円');
  });

  it("10,012,995,223 (10 ^ 10)", function() {
    assert_equal(convert(10012995223, 'JPY'), '¥100.13億円');
  });

  it("100,844,198,672 (10 ^ 11)", function() {
    assert_equal(convert(100844198672, 'JPY'), '¥1,008.44億円');
  });

  it("1,001,003,785,789 (10 ^ 12)", function() {
    assert_equal(convert(1001003785789, 'JPY'), '¥1.00兆円');
  });

  it("10,000,012,995,223 (10 ^ 13)", function() {
    assert_equal(convert(10000012995223, 'JPY'), '¥10.00兆円');
  });

  it("100,000,844,198,672 (10 ^ 14)", function() {
    assert_equal(convert(100000844198672, 'JPY'), '¥100.00兆円');
  });

  it("1,021,001,003,785,789 (10 ^ 15)", function() {
    assert_equal(convert(1021001003785789, 'JPY'), '¥1,021.00兆円');
  });

  it("10,010,000,012,995,223 (10 ^ 16)", function() {
    assert_equal(convert('10010000012995223', 'JPY'), '¥1.00京円');
  });

  it("100,000,000,844,198,672 (10 ^ 17)", function() {
    assert_equal(convert('100000000844198672', 'JPY'), '¥10.00京円');
  });

  it("5,345,100,000,844,198,672 (10 ^ 18)", function() {
    assert_equal(convert('5345100000844198672', 'JPY'), '¥534.51京円');
  });

  it("95,345,100,000,844,198,672 (10 ^ 19)", function() {
    assert_equal(convert('95345100000844198672', 'JPY'), '¥9,534.51京円');
  });

  it("-898 (negative)", function() {
    assert_expect(convert(-898, 'JPY'), '-');
  });

  it("NaN (undefine)", function() {
    assert_expect(convert(undefined, 'JPY'), '-');
  });
});

describe("currency in INR", function() {
  it("0 (zero)", function() {
    assert_equal(convert(0, 'IDR'), 'Rp0');
  });

  it("3 (10 ^ 0)", function() {
    assert_equal(convert(3, 'IDR'), 'Rp3');
  });

  it("87 (10 ^ 1)", function() {
    assert_equal(convert(87, 'IDR'), 'Rp87');
  });

  it("531 (10 ^ 2)", function() {
    assert_equal(convert(531, 'IDR'), 'Rp531');
  });

  it("4,785 (10 ^ 3)", function() {
    assert_equal(convert(4785, 'IDR'), 'Rp4,785');
  });

  it("56,996 (10 ^ 4)", function() {
    assert_equal(convert(56996, 'IDR'), 'Rp56,996');
  });

  it("198,672 (10 ^ 5)", function() {
    assert_equal(convert('198672', 'IDR'), 'Rp198,672');
  });

  it("4,785,789 (10 ^ 6)", function() {
    assert_equal(convert(4785789.85, 'IDR'), 'Rp4.79M');
  });

  it("56,995,223 (10 ^ 7)", function() {
    assert_equal(convert(56995223, 'IDR'), 'Rp57.00M');
  });

  it("844,198,672 (10 ^ 8)", function() {
    assert_equal(convert(844198672, 'IDR'), 'Rp844.20M');
  });

  it("1,003,785,789 (10 ^ 9)", function() {
    assert_equal(convert(1003785789, 'IDR'), 'Rp1.00B');
  });

  it("10,012,995,223 (10 ^ 10)", function() {
    assert_equal(convert(10012995223, 'IDR'), 'Rp10.01B');
  });

  it("100,844,198,672 (10 ^ 11)", function() {
    assert_equal(convert(100844198672, 'IDR'), 'Rp100.84B');
  });

  it("1,001,003,785,789 (10 ^ 12)", function() {
    assert_equal(convert(1001003785789, 'IDR'), 'Rp1.00T');
  });

  it("10,000,012,995,223 (10 ^ 13)", function() {
    assert_equal(convert(10000012995223, 'IDR'), 'Rp10.00T');
  });

  it("100,000,844,198,672 (10 ^ 14)", function() {
    assert_equal(convert(100000844198672, 'IDR'), 'Rp100.00T');
  });

  it("1,021,001,003,785,789 (10 ^ 15)", function() {
    assert_equal(convert(1021001003785789, 'IDR'), 'Rp1.02Qa');
  });

  it("10,010,000,012,995,223 (10 ^ 16)", function() {
    assert_equal(convert('10010000012995223', 'IDR'), 'Rp10.01Qa');
  });

  it("100,000,000,844,198,672 (10 ^ 17)", function() {
    assert_equal(convert('100000000844198672', 'IDR'), 'Rp100.00Qa');
  });

  it("5,345,100,000,844,198,672 (10 ^ 18)", function() {
    assert_equal(convert('5345100000844198672', 'IDR'), 'Rp5.35Qi');
  });

  it("95,345,100,000,844,198,672 (10 ^ 19)", function() {
    assert_equal(convert('95345100000844198672', 'IDR'), 'Rp95.35Qi');
  });

  it("-898 (negative)", function() {
    assert_expect(convert(-898, 'IDR')).to.equal('-');
  });

  it("NaN (undefine)", function() {
    assert_expect(convert(undefined, 'IDR')).to.equal('-');
  });
});
*/