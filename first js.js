let money = prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');
let appData = {
   budjet: money,
   timeData: time,
   expenses: {},
   optionalExpenses: {},
   income: [],
   savings: false,
}
let a1 = prompt("Введите обязательную статью расходов в этом месяце");
    a2 = prompt("Во сколько обойдется?");
    a3 = prompt("Введите обязательную статью расходов в этом месяце");
    a4 = prompt("Во сколько обойдется?");