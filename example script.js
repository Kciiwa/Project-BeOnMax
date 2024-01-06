const rimValues = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
}

const calcActions = {
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
}

/**
 * @param {string} val
 * @param {number} index
 * @return {[string | number | boolean, string]}
 */
function checkValues(val, index) {
  if (index === 1) {
    return [calcActions[val] ?? false, 'O'];
  } else {
    const rim = rimValues[val];
    if (rim) return [rim, 'R'];
    const arab = Number(val);
    if (!isNaN(arab) && arab > 0 && arab <= 10) {
      return [arab, 'A'];
    }
    return [false, 'E'];
  }
}

/**
 * @param {number} num
 * @return {string}
 */
function romanize(num) {
  if (num < 1) return '';
  const digits = num.toString().split('');
  const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
  ];
  let roman = '';
  let i = 3;
  while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return roman;
}

/**
 * @param {number} res
 * @param {boolean} arab
 * @return {string}
 */
function transformAnswer(res, arab) {
  return `Результат: ${arab ? Math.floor(res).toString() : romanize(Math.floor(res))}`;
}

/**
 * @param {string} calcString
 * @return {string}
 */
function calculator(calcString) {
  if (typeof calcString !== 'string') throw new Error('NOT String');
  /** @type {string[]} */
  let calcValues = calcString.trim().split(' ');
  // Теперь надо понять, все ли значения правильные
  if (calcValues.length !== 3) throw new Error('Неправильная строка');
  let noError = true;
  const arabRim = [];
  const errorIndex = [];
  calcValues = calcValues.map((item, index) => {
    const [res, v] = checkValues(item, index);
    if (res) {
      if (v !== 'O') arabRim.push(v);
    } else {
      noError = false;
      errorIndex.push(`${item} ${v === 'E' ? 'Ошибка преобразования' : v === 'O' ? 'Неправильный оператор' : 'Ошибка диапазона'}`)
    }
    return res
  });
  if (!noError) {
    throw new Error(errorIndex.join('; '))
  }
  if (arabRim[0] !== arabRim[1]) {
    throw new Error('Разные системы счисления')
  }

  switch (calcValues[1]) {
    case '+':
      return transformAnswer(calcValues[0] + calcValues[2], arabRim[0] === 'A');
    case '-':
      return transformAnswer(calcValues[0] - calcValues[2], arabRim[0] === 'A');
    case '*':
      return transformAnswer(calcValues[0] * calcValues[2], arabRim[0] === 'A');
    case '/':
      return transformAnswer(calcValues[0] / calcValues[2], arabRim[0] === 'A');
    default:
      throw new Error('Неизвестный математический оператор')
  }
}

/*****************************
 ТЕСТИРУЕМ
*****************************/

const variantsGood = ['1 + 2', 'II * VII', '10 / 2', '8 - 5', 'III - III', 'III - V'];
const variantsBad = ['2313', '2 +4 ', '2 + 3 + 5', '11 + 1', '1 + I', 'XX + V', '6 : 3', 'e + 2', 123, {},
  ['1 + 2'], ''
];

variantsGood.forEach(item => {
  try {
    console.log(item, calculator(item));
  } catch (e) {
    console.log(item, e)
  }
})

variantsBad.forEach(item => {
  try {
    console.log(item, calculator(item));
  } catch (e) {
    console.log(item, e.message)
  }
})