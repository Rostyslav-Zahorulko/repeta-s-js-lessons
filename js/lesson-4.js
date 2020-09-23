// І. Создание функции (с использованием функционального выражения)

// Создается переменная, в которую записывается ссылка на функцию.
// Имя переменной - глагол, который описывает, что делает функция.
// Параметры функции (number1, number2, number3) - локальные переменные, доступные только внутри тела функции.
// Директива (инструкция) return прекращает выполнение функции, возвращает результат выполнения функции на масто ее вызова.
const add = function (number1, number2, number3) {
  console.log(number1);
  console.log(number2);
  console.log(number3);
  console.log('Выполняется функция add');

  return number1 + number2 + number3;
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// ІІ. Вызов функции

// Указывается имя переменной, в которой записана ссылка на функцию, и аргументы этой функции.
// Аргументы (1, 2, 3) - значения, которые записываются в параметры функции.
add(1, 2, 3);
// Результат выполнения функции можна записать в переменную.
const result = add(1, 2, 3);
console.log('Результат сложения чисел: ', result);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// ІІІ. Выведение в консоль функции и результата ее выполнения

// Создает функцию
const fnA = function () {};

// Вызывает функцию
fnA();

// Выводит в консоль функцию
console.log(fnA);

// Выводит в консоль результат ее выполнения
console.log(fnA());

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// Параметры, которым при вызове функции не были переданы аргументы, будут иметь значение undefined

const fnB = function (a, b, c, d) {
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
};

fnB(1, 2, 3);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// https://youtu.be/414JiAS0pPE?t=6220

// Создать функцию, которая для каждого своего исполнения будет принимать разное количество аргументов, можно 2 способами:

// 1. С использованием встроенной локальной переменной arguments - old-school вариант
// 2. С использованием специальной операции rest - современный синтаксис

// 1. Объявлять переменную arguments не нужно, она существует как ключевое слово
// По сути, это псевдомассив (ненастоящий массив: у него нету всех методов массива, есть индексы, свойство длинны).
// Его можно перебрать через for, for of
// Если нужно вызвать какие-то методы, которых у псевдомассива нет, его нужно преобразовать в массив
// Для этого на конструкторе Array вызывается метод from(arguments), результат чего записывается в переменную.

const fnC = function () {
  console.log(arguments);

  // for (const arg of arguments) {
  //   console.log(arg);
  // }

  const args = Array.from(arguments);

  console.log(args);
};

fnC(1, 2, 3);
fnC(1, 2, 3, 4, 5);
fnC(1, 2, 3, 4, 5, 6, 7);

// 2. При объявлении параметров функции используется специальная операция rest
// Она записывается: ...имя переменной

const fnD = function (...args) {
  console.log(args);
};

fnD(1, 1, 1);
fnD(1, 1, 1, 1, 1);
fnD(1, 1, 1, 1, 1, 1, 1);
